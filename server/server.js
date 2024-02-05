// Clear and set up new run
console.clear();
console.log("New run-------------------------------------------------------------------------------------");

// Import dependencies
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const knex = require("knex")(require("./knexfile"));
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());


app.use((req, _res, next) => {
    const moment = new Date();
    console.log(moment.toLocaleTimeString('en-US', { timeZone: "America/New_York" }), "|", req.method, "|", req.originalUrl);
    next();
});


// Basic response for home page
app.get("/", (_req, res) => {
    res.send("you've hit the home page. this means you can access our server =)");
});


const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const getAuth = async () => {
    try {
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = { 'grant_type': 'client_credentials' };

        const response = await axios.post(token_url, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        console.log("new access token received at", Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
        return response.data.access_token;

    } catch (error) {
        console.log("server failed to get auth token:", error);
    }
}

let access_token;

app.get("/search/:search", async (req, res) => {
    try {
        // need to add handling so this automatically refreshes on timeout
        access_token = access_token ? access_token : await getAuth();   // first initialized on line current-5

        const url = `https://api.spotify.com/v1/search?q=${req.params.search}&type=track&market=US&limit=10`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })

        res.json(response.data);

    } catch (error) {
        console.log("server error in app.get /:search", error);
    }
});


app.get("/auto/:search", async (req, res) => {
    try {
        const response = await axios.get(`https://musicautocomplete.deno.dev/search?q=${req.params.search}`)

        response.data.error ? res.send('No results found') : res.json(response.data);
    } catch (error) {
        console.log("server error in autocomplete get:", error);
    }
})

app.post("/save", async (req, res) => {
    console.log("server req.body from POST /save:", req.body);

    try {
        let response = await knex('song').insert(req.body.song)
        response = await knex('activity').insert(req.body.activity)
        res.send(response.data);
    } catch (error) {
        console.log("server error trying to put into db:", error)
    }
})

app.get("/db/activity", async (_req, res) => {
    try {

        const data = await knex
            .select(
                'activity.id as activity_id',
                'activity.user_id as activity_user_id',
                'activity.song_id as activity_song_id',
                'activity.time as activity_time',
                'user.name as user_name',
                'song.name as song_name',
                'song.image as song_image',
                'comment.id as comment_id',
                'comment.user_id as comment_user_id',
                'comment.content as comment_content',
                'comment_user.name as comment_user_name'
            )
            .from('activity')
            .join('user', 'activity.user_id', 'user.id')
            .join('song', 'activity.song_id', 'song.id')
            .leftJoin('comment', 'activity.id', 'comment.activity_id')
            .leftJoin('user as comment_user', 'comment.user_id', 'comment_user.id')
            .orderBy('activity.id', 'desc')
            .orderBy('comment.id')
            .groupBy('activity.id', 'comment.id');

        // Process the data to group comments for the same activity
        const commentedData = data.reduce((acc, row) => {
            const existingActivity = acc.find((activity) => activity.activity_id === row.activity_id);

            if (existingActivity) {
                // Add comment to existing activity
                if (row.comment_id) {
                    existingActivity.comments.push({
                        comment_id: row.comment_id,
                        comment_user_id: row.comment_user_id,
                        comment_content: row.comment_content,
                        comment_user_name: row.comment_user_name,
                    });
                }
            } else {
                // Create a new activity with or without comments
                acc.push({
                    activity_id: row.activity_id,
                    activity_user_id: row.activity_user_id,
                    activity_song_id: row.activity_song_id,
                    activity_time: row.activity_time,
                    user_name: row.user_name,
                    song_name: row.song_name,
                    song_image: row.song_image,
                    comments: row.comment_id
                        ? [
                            {
                                comment_id: row.comment_id,
                                comment_user_id: row.comment_user_id,
                                comment_content: row.comment_content,
                                comment_user_name: row.comment_user_name,
                            },
                        ]
                        : [],
                });
            }

            return acc;
        }, []);

        // res.json(data)
        res.json(commentedData)
    } catch (error) {
        console.log("server something wrong wtih accessing db activity it seems:", error)
    }
});

app.get("/db/:activityId/comments", async (req, res) => {
    try {
        const data = await knex('comment').where({ activity_id: req.params.activityId })
        // .leftJoin("comment", "activity_id", "activity.id")
        // .orderBy('time', 'desc');
        // .select('activity.*', 'comment.id as comment_id', 'comment.created_at', 'comment.user_id', 'comment.content', 'comment.activity_id')
        // .limit(10);
        res.json(data);
    } catch (error) {
        console.log("server something wrong wtih accessing db it seems:", error)
    }
});

app.post("/db/comments", async(req, res) => {
    try {
        const response = await knex('comment').insert(req.body);
        console.log("server first response from posting/comment:", response[0]);

        const comment = await knex('comment').where({ id: response[0] }).first();
        console.log("server comment from posting/comment:", comment);
        res.json(response);
    } catch (error) {
        console.log('server error trying to post a comment:', error)
    }
});

app.get("/db/:table", async (req, res) => {
    try {
        const data = await knex(req.params.table);
        res.json(data);
    } catch (error) {
        console.log("server something wrong wtih accessing db it seems:", error)
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await knex('user').where({ username: req.body.username }).first();
        console.log("server user from posting/login:", user);

        // if (!user) {
        //     return res.status(401).json({ message: 'Credentials not found' });
        // }
        res.send(user);
    } catch (error) {
        console.log("error server trying to log in:", error); // should probably send a 401 error or something
    }
});

app.post("/signup", async (req, res) => {
    try {
        const response = await knex('user').insert(req.body);
        console.log("server first response from posting/signup:", response[0]);

        const user = await knex('user').where({ id: response[0] }).first();
        console.log("server user from posting/signup:", user);

        res.send(user);
    } catch (error) {
        console.log("error server trying to sign up:", error);
    }
});

app.get('/user/:userId', async (req, res) => {

    try {
        const user = await knex('user').where({ id: req.params.userId }).first();

        res.json(user)
    } catch (error) {
        console.log("something wrong server getting user info:", error)
    }
});

app.put('/user/:userId', async (req, res) => {

    try {
        const user = await knex('user').where({ id: req.params.userId }).update(req.body);
        console.log("user from server getting user:", user);
        res.json(user)
    } catch (error) {
        console.log("something wrong server updating user info:", error)
    }
});

app.get('/:userId/playlists', async (req, res) => {

    try {
        const playlists = await knex('user_playlist').where({ user_id: req.params.userId });

        console.log("server getting user's playlists:", playlists)
        res.json(playlists)
    } catch (error) {
        console.log("something wrong server getting user's playlists:", error)
    }
});

app.get('/playlist/:playlistId', async (req, res) => {

    try {
        const playlist = await knex('playlist')
            .where({ 'playlist.playlist_group_id': req.params.playlistId })
            .join('song', 'playlist.song_id', 'song.id')
            .join('user_playlist', 'playlist.playlist_group_id', 'user_playlist.playlist_group_id')
            .select('playlist.*', 'song.name as song_name', 'song.artist as song_artist', 'playlist_name');

        console.log("server getting one playlist:", playlist)
        res.json(playlist)
    } catch (error) {
        console.log("something wrong server getting a playlist:", error)
    }
});

app.post("/playlist", async(req, res) => {
    try {
        const response = await knex('user_playlist').insert(req.body);
        console.log("server first response from posting/user_playlist:", response[0]);

        const playlist = await knex('user_playlist').where({ id: response[0] }).first();
        console.log("server playlist from posting/user_playlist:", playlist);
        res.json(response);
    } catch (error) {
        console.log('server error trying to create a playlist:', error)
    }
});

app.post('/playlist/:playlistId', async (req, res) => {

    try {
        const playlist = await knex('playlist').where({ playlist_group_id: req.params.playlistId }).insert(req.body);

        console.log("server adding to playlist:", playlist)
        res.json(playlist)

    } catch (error) {
        console.log("server something wrong adding to playlist:", error)
    }
});

app.delete('/playlist/:songId', async (req, res) => {
    console.log("server delete song from playlist req params:", req.params.songId);

    try {
        const playlist = await knex('playlist').where({ id: req.params.songId }).del();

        console.log("server deleting from playlist:", playlist)
        res.json(playlist)

    } catch (error) {
        console.log("server something wrong deleting from playlist:", error)
    }
});

// Spin up server
app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));
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

// app.get("/db/activity", async (_req, res) => {
//     try {
//         const data = await knex('activity')
//             // .leftJoin("comment", "activity_id", "activity.id")
//             .orderBy('time', 'desc')
//             // .select('activity.*', 'comment.id as comment_id', 'comment.created_at', 'comment.user_id', 'comment.content', 'comment.activity_id')
//             .limit(4);

//         // const commentedData = data.map(async element => {
//         //     const commentData = await knex('comment').where({activity_id: element.id});
//         //     // console.log("commentData|", commentData);
//         //     // if (commentData.length > 0) console.log("commentData exists");
//         //     if (commentData.length > 0) element.comments = commentData;
//         //     return element
//         // })

//         // console.log("server GET/activity:", commentedData);
//         console.log("server GET/activity:", data);
//         res.json(data);
//     } catch (error) {
//         console.log("server something wrong wtih accessing db activity it seems:", error)
//     }
// });

app.get("/db/activity", async (_req, res) => {
    try {
        const data = await knex('activity')
            .leftJoin("comment", "comment.activity_id", "activity.id")
            .orderBy('time', 'desc')
            .select('activity.*', 'comment.id as comment_id', 'comment.created_at as comment_created_at', 'comment.user_id as comment_user_id', 'comment.content as comment_content', 'comment.activity_id as comment_activtiy_id')
            .limit(10);


        const commentedData = data.reduce((result, current) => {
            const existingEntry = result.find(entry => entry.id === current.id);

            if (existingEntry) {
                // append the comment to the existing entry only if it exists
                if (current.comment_id !== null) {
                    existingEntry.comments.push({
                        comment_id: current.comment_id,
                        comment_created_at: current.comment_created_at,
                        comment_user_id: current.comment_user_id,
                        comment_content: current.comment_content,
                    });
                }
            } else {
                // create a new entry
                const newEntry = {
                    id: current.id,
                    user_id: current.user_id,
                    song_id: current.song_id,
                    time: current.time,
                };

                // append the comment if it exists
                if (current.comment_id !== null) {
                    newEntry.comments = [{
                        comment_id: current.comment_id,
                        comment_created_at: current.comment_created_at,
                        comment_user_id: current.comment_user_id,
                        comment_content: current.comment_content,
                    }];
                }

                result.push(newEntry);
            }

            return result;
        }, []);

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
        console.log("response from posting/signup:", response[0]);

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
        const playlist = await knex('playlist').where({ playlist_group_id: req.params.playlistId });

        console.log("server getting one playlist:", playlist)
        res.json(playlist)
    } catch (error) {
        console.log("something wrong server getting a playlist:", error)
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
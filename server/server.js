const knex = require("knex")(require("./knexfile"));

// Clear and set up new run
console.clear();
console.log("New run-------------------------------------------------------------------------------------");

// Import dependencies
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());
// const knex = require('./knexfile.js');
// const qs = require('qs');

let data = {
    users: {},
    activity: {},
    playlists: { asdf: [] }
};

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
        // const data = qs.stringify({ 'grant_type': 'client_credentials' });

        const response = await axios.post(token_url, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        console.log("new access token received at", Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
        return response.data.access_token;

    } catch (error) {
        console.log("failed to get auth token:", error);
    }
}

let access_token;

app.get("/search/:search", async (req, res) => {
    try {
        // need to add handling so this automatically refreshes on timeout
        access_token = access_token ? access_token : await getAuth();   // first initialized on line current-5

        const url = `https://api.spotify.com/v1/search?q=${req.params.search}&type=track&market=US&limit=3`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })

        res.json(response.data);

    } catch (error) {
        console.log("error in app.get /:search", error);
    }
});


// app.get("/auto/:search", async (req, res) => {
//     try {
//         const response = await axios.get
//     } catch (error) {
//         console.log("error in autocomplete get:", error);
//     }
// })

app.post("/save", async (req, res) => {
    console.log("req.body from POST /save:", req.body);
    // data.playlists.asdf.push(req.body.id);
    // console.log(data);
    try {
        let response = await knex('song').insert(req.body.song)
        response = await knex('activity').insert(req.body.activity)
        res.send(response.data);
    } catch (error) {
        console.log("error trying to put into db:", error)
    }
})

app.get("/data", (_req, res) => {
    res.json(data);
});

app.get("/db/activity", async (_req, res) => {
    try {
        const data = await knex('activity').orderBy('time', 'desc').limit(10);
        res.json(data);
    } catch (error) {
        console.log("something wrong wtih accessing db it seems:", error)
    }
});

app.get("/db/:table", async (req, res) => {
    try {
        const data = await knex(req.params.table);
        res.json(data);
    } catch (error) {
        console.log("something wrong wtih accessing db it seems:", error)
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await knex('user').where({ username: req.body.username }).first();
        console.log("user from posting/login:", user);

        // if (!user) {
        //     return res.status(401).json({ message: 'Credentials not found' });
        // }
        res.send(user);
    } catch (error) {
        console.log("error server trying to log in:", error);
    }
});

app.post("/signup", async (req, res) => {
    try {
        const response = await knex('user').insert(req.body);
        console.log("response from posting/signup:", response[0]);

        const user = await knex('user').where({ id: response[0] }).first();
        console.log("user from posting/signup:", user);

        // if (!user) {
        //     return res.status(401).json({ message: 'Credentials not found' });
        // }
        res.send(user);
    } catch (error) {
        console.log("error server trying to log in:", error);
    }
});

app.get('/user/:userId', async (req, res) => {
    // console.log("user from server getting pararms.userId:", req.params.userId);
    try {
        const user = await knex('user').where({ id: req.params.userId }).first();
        // console.log("user from server getting user:", user);
        res.json(user)
    } catch (error) {
        console.log("something wrong server getting user info:", error)
    }
});

app.put('/user/:userId', async (req, res) => {
    // console.log("user from server getting pararms.userId:", req.params.userId);
    try {
        const user = await knex('user').where({ id: req.params.userId }).update(req.body);
        console.log("user from server getting user:", user);
        res.json(user)
    } catch (error) {
        console.log("something wrong server updating user info:", error)
    }
});

// Spin up server
app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));
# HearHere

## Overview

HearHere is an app for sharing songs and playlists with friends and family. It's meant as an accompaniment to Spotify and helps organize songs and playlists.

### Problem

How many times have you heard a friend play a song and then wonder what song it was? How many times have you been at a party or event where the DJ was playing great music, only to never find that playlist again? HearHere aims to solve that problem by providing a platform for just that - a place to share and save music, using Spotify as the source of music.

### User Profile

- People who listen to music regularly and want to save their songs
- People who want to share and comment on what they're listening to
- People who want to discover what other people are listening to

### Features

- Visitor
    - Search for songs
    - Sign up for an account
- Logged in user
    - Search for songs
    - Save individual songs
    - Save and update playlists
    - Share a song or playlist (to feed/to user)
    - Change basic user info

## Implementation

### Tech Stack

Front End:
- React
- JavaScript
- SASS/SCSS

Back End:
- MySQL
- Express

### APIs

- Spotify's Web API: search for songs and get basic track data
- Giorgio Bellisario's Music Autocomplete API: autocomplete when searching for a song
- Custom API: handle user, song, comment, activity, and playlist data

### Sitemap

- Login page
- Sign up page
- Landing/home page
- Song search page
- Playlist page
- User page

### Mockups

#### Login Page
![](/mockups/login.png)

#### Sign Up Page
![](/mockups/signup.png)

#### Landing Page
![](/mockups/landing.png)

#### Song Search Page
![](/mockups/search.png)

#### Saved Songs/Playlist Page
![](/mockups/saved.png)

#### User Page
![](/mockups/user.png)


### Data

The database contains the following tables:
- user: table for users and user information
- playlist: table for songs and their associated playlists
- user_playlist: table to map playlists to their owning users
- song: table for songs and song information
- activity: table for user activity (saving songs)
- comment: table for user activity (commenting)

The structure and relationships can be seen below.

![](/mockups/sql.png)

### Endpoints

**GET /search/:search**
- Will run the Spotify API for a specific query

**GET /auto/:search**
- Will run the Autocomplete API for a specific query

**POST /save**
- Will save a song, documenting it as activity

**GET /db/activity**
- Will get recent user activity

**GET /db/:activityId/comments**
- Will get comments from one specific activity

**POST /db/comments**
- Will save a user's comment on an activity

**GET /db/:table**
- Will return any table from the database

**POST /login**
- Will check for an existing user

**POST /signup**
- Will create a new account for a user

**GET /user/:userId**
- Will get a user's info

**PUT /user/:userId**
- Will update a user's info

**GET /:userId/playlists**
- Will get a user's playlists

**GET /playlist/:playlistId**
- Will get a specific playlist and its songs

**POST /playlist**
- Will create a new playlist

**POST /playlist/:playlistId**
- Will add a song to a specific playlist

**DELETE /playlist/:songId**
- Will remove a song from a specific playlist

### Auth

- Will use a basic table lookup to begin with

## Roadmap

- Sprint 1: POC | Days 1-3
    - Test Spotify API
    - Create basic back end and endpoints
        - Create database
        - Create Spotify calls and wrappers from custom API
    - Create skeletons for front end
        - Basic info/content on each page
        - C**R**UD operations with back end

- Sprint 2: MVP | Days 3-6
    - Add components and modularize pages
        - Add header/footer
        - Reuse components where needed
    - Make pages dynamic with back end
        - Hook up API calls to database
        - **C**R**UD** operations with back end

- Sprint 3: Polish + Extras | Days 6-10
    - Add all remaining styling
    - Bug test and stress test
    - Add nice to haves

- Prep for presentation | Days 10-11

## Nice-to-haves

- JWT auth | For better security and access control
- ~~Autocomplete | For a more convenient search mechanism~~ | Completed
- ~~Spotify player embedded so user can play songs~~ | Completed
- Song recommendations once one's been saved | For more functionality
- ~~Comment,~~ rating, liking functionality | To make it more of a social media app | Partially completed
- DM and/or live update functionality using Socket.io | To make it more of a social media app

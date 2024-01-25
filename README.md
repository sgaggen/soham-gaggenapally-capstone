# HearHere

## Overview

HearHere is an app for sharing songs and playlists with friends and family. It's meant as an accompaniment to Spotify and helps organize songs and playlists.

### Problem

How many times have you heard a friend play a song and then wonder what song it was? How many times have you been at a part or event where the DJ was playing great music, only to never find that playlist again? HearHere aims to solve that problem by providing a platform for just that - a place to share and save music, using Spotify as the source of music.

### User Profile

- People who listen to music regularly and want to save their songs
- People who want to share what they're listening to
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

- Spotify API: search for songs and get basic track data
- Custom API: handle user, song, and playlist data

### Sitemap

- Login page
- Sign up page
- Landing page
- Song search page
- Saved songs page
- Saved playlist page
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

The database will contain a table for users, a table for playlists, and possibly a table for activity.

### Endpoints

**GET /song/:songId**
- Will get information on a specific song

**GET /playlist/:playlistId**
- Will get a information on a specific playlist

**POST /playlist/:playlistId/:songId**
- Will add a song to a specific playlist

**DELETE /playlist/:playlistId/:songId**
- Will remove a song from a specific playlist

**GET /user/:userId**
- Will get a user's basic info, saved songs, and playlists

**PUT /user/:userId**
- Will update a user's info, saved songs, and/or playlists

### Auth

- Will use basic string checks to begin with

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

- JWT auth | For more security
- Spotify player embedded so user can play songs | For a more standalone experience
- Song recommendations once one's been saved | For more functionality
- Comment, rating, liking functionality | To make it more of a social media app
- DM and/or live update functionality using Socket.io | To make it more of a social media app

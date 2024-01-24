# HearHere

## Overview

HearHere is a social media app for sharing songs and playlists with friends and family.

### Problem

How many times have you heard a friend play a song and then wonder what song it was? How many times have you been at a part or event where the DJ was playing a great music, only to never find that playlist again? Herehere aims to solve that problem by providing a platform for just that - a place to share and save music.

### User Profile

- People who listen to music regularly and want to save their songs
- People who want to share what they're listening to
- People who want to discover what other people are listening to

### Features

- Visitor
    - Search for songs
    - Sign up for an account
- Logged in user
    - Save individual songs
    - Save and update playlists
    - Share a song or playlist with another user

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

- Possible use of the Spotify API
- Will create and use a custom API

### Sitemap

- Home Page/Browse
- Sign Up Page
- Login Page
- Saved Songs Page
- Saved Playlists Page

### Mockups

#### Login Page
![](/mockups/login.png)

#### Sign Up Page
![](/mockups/signup.png)

#### Landing Page
![](/mockups/landing.png)


### Data

The database will contain a table for users, a table for playlists, and possibly a table for activity.

### Endpoints

**GET /song/:songId**
- Will get information on a specific song

**GET /playlist/:playlistId**
- Will get information on a specific song

**POST /playlist/:playlistId/:songId**
- Will add a song to a playlist

**DELETE /playlist/:playlistId/:songId**
- Will remvoe a song from a playlist

### Auth

- Will use JWT auth

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

- Comment functionality
- DM functionality

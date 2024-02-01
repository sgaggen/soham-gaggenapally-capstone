/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

    await knex('user').del()
    await knex('user').insert([
        {
            "id": 1,
            "name": "Soham Gaggenapally",
            "username": "skrg",
            "password": "skrg",
            "email": "skrg@skrg.com",
            "created_at": "2024-01-30 17:23:36.000",
            "updated_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 2,
            "name": "Jane Doe",
            "username": "janedoe",
            "password": "janedoe",
            "email": "janedoe@janedoe.com",
            "created_at": "2024-01-30 17:23:36.000",
            "updated_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 3,
            "name": "BLANK",
            "username": "testu4",
            "password": "testp4",
            "email": "teste4",
            "created_at": "2024-01-31 15:29:27.000",
            "updated_at": "2024-01-31 15:29:27.000"
        },
        {
            "id": 4,
            "name": "BLANK",
            "username": "testu2",
            "password": "testp2",
            "email": "teste2",
            "created_at": "2024-01-31 15:31:00.000",
            "updated_at": "2024-01-31 15:31:00.000"
        },
        {
            "id": 5,
            "name": "BLANK",
            "username": "testu3",
            "password": "testp3",
            "email": "teste3",
            "created_at": "2024-01-31 15:31:43.000",
            "updated_at": "2024-01-31 15:31:43.000"
        },
        {
            "id": 6,
            "name": "testing",
            "username": "testu1",
            "password": "testp1",
            "email": "teste1@asdf.com",
            "created_at": "2024-01-31 15:34:38.000",
            "updated_at": "2024-01-31 21:55:46.000"
        }
    ]);

    await knex('song').del()
    await knex('song').insert([
        {
            "id": "11ozIUBoXAgRTVWelDn4pL",
            "name": "Lights",
            "artist": "Ellie Goulding",
            "image": "https://i.scdn.co/image/ab67616d0000b27391538eb04634de568637b8be",
            "loaded_at": "2024-01-30 23:34:27.000"
        },
        {
            "id": "1wuREzmBFrK8IgUG2A9vwR",
            "name": "Sdp Interlude",
            "artist": "Charuss",
            "image": "https://i.scdn.co/image/ab67616d0000b273ebc3faeea07c1a7a2caec0d0",
            "loaded_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": "2Bf9wpg79TeZip0lqEl9UX",
            "name": "Alive, Dreaming",
            "artist": "Mellow Fellow",
            "image": "https://i.scdn.co/image/ab67616d0000b273c3d6b13c3c3d93fe62188615",
            "loaded_at": "2024-01-30 23:32:09.000"
        },
        {
            "id": "2cECFOWBuNNmPVUhlKLNtV",
            "name": "Higher",
            "artist": "Madison Ryann Ward",
            "image": "https://i.scdn.co/image/ab67616d0000b2738a082f9befc0a7cf3b72be0c",
            "loaded_at": "2024-01-30 22:57:17.000"
        },
        {
            "id": "2K7xn816oNHJZ0aVqdQsha",
            "name": "Softcore",
            "artist": "The Neighbourhood",
            "image": "https://i.scdn.co/image/ab67616d0000b2739b6ac98a52f62d5cb473da40",
            "loaded_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": "2ksOAxtIxY8yElEWw8RhgK",
            "name": "China",
            "artist": "Anuel AA",
            "image": "https://i.scdn.co/image/ab67616d0000b2735fa6dc9fc261344044c301a9",
            "loaded_at": "2024-01-30 23:29:19.000"
        },
        {
            "id": "2mWp5olnLmpzAReIGK18dA",
            "name": "Trying",
            "artist": "Jordan Davis",
            "image": "https://i.scdn.co/image/ab67616d0000b273dfdefe159fd457b152e9d367",
            "loaded_at": "2024-01-31 15:34:51.000"
        },
        {
            "id": "2QdSb68BzZGMgCbsrFmSLc",
            "name": "Higher",
            "artist": "Tems",
            "image": "https://i.scdn.co/image/ab67616d0000b2730ab4d3e1c0b5c5e453287a4c",
            "loaded_at": "2024-01-30 22:56:20.000"
        },
        {
            "id": "2Sjx8DWZO5zaTyTAmgo2gY",
            "name": "Gone Girl",
            "artist": "SZA",
            "image": "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
            "loaded_at": "2024-01-31 15:17:53.000"
        },
        {
            "id": "35mvY5S1H3J2QZyna3TFe0",
            "name": "positions",
            "artist": "Ariana Grande",
            "image": "https://i.scdn.co/image/ab67616d0000b2735ef878a782c987d38d82b605",
            "loaded_at": "2024-01-30 23:32:40.000"
        },
        {
            "id": "3AJwUDP919kvQ9QcozQPxg",
            "name": "Yellow",
            "artist": "Coldplay",
            "image": "https://i.scdn.co/image/ab67616d0000b2733d92b2ad5af9fbc8637425f0",
            "loaded_at": "2024-01-31 15:21:23.000"
        },
        {
            "id": "3DamFFqW32WihKkTVlwTYQ",
            "name": "Fireflies",
            "artist": "Owl City",
            "image": "https://i.scdn.co/image/ab67616d0000b273785d4e702802da500fc78b32",
            "loaded_at": "2024-01-30 23:33:50.000"
        },
        {
            "id": "3uvyMKTLtt8mtaWT93UTVb",
            "name": "Asdfmovie12 Song",
            "artist": "LilDeuceDeuce",
            "image": "https://i.scdn.co/image/ab67616d0000b27307cf1ec3d3037a674ac075f6",
            "loaded_at": "2024-01-31 15:38:32.000"
        },
        {
            "id": "42VsgItocQwOQC3XWZ8JNA",
            "name": "FE!N (feat. Playboi Carti)",
            "artist": "Travis Scott",
            "image": "https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44",
            "loaded_at": "2024-01-31 15:38:59.000"
        },
        {
            "id": "4cix9zymmhisLuM56RDcB7",
            "name": "Mellow Yellow",
            "artist": "Donovan",
            "image": "https://i.scdn.co/image/ab67616d0000b273133c89e032d8478515ed526c",
            "loaded_at": "2024-01-30 23:32:06.000"
        },
        {
            "id": "4gh0nHzaTM 1sDga7Ek0N",
            "name": "sdp interlude",
            "artist": "Travis Scott",
            "image": "https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ce",
            "loaded_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": "4MXqpnu9lAqqkjSHVlBVoZ",
            "name": "Pickup Man (feat. Post Malone)",
            "artist": "HIXTAPE",
            "image": "https://i.scdn.co/image/ab67616d0000b273380c77d3748c454553271961",
            "loaded_at": "2024-01-30 23:32:44.000"
        },
        {
            "id": "4r6eNCsrZnQWJzzvFh4nlg",
            "name": "Firework",
            "artist": "Katy Perry",
            "image": "https://i.scdn.co/image/ab67616d0000b273d20c38f295039520d688a888",
            "loaded_at": "2024-01-30 23:34:05.000"
        },
        {
            "id": "57RA3JGafJm5zRtKJiKPIm",
            "name": "Are You Bored Yet? (feat. Clairo)",
            "artist": "Wallows",
            "image": "https://i.scdn.co/image/ab67616d0000b27384feca0133d9a8e6539a8325",
            "loaded_at": "2024-01-30 23:33:20.000"
        },
        {
            "id": "5aIVCx5tnk0ntmdiinnYvw",
            "name": "Water",
            "artist": "Tyla",
            "image": "https://i.scdn.co/image/ab67616d0000b273d20231861e86a6f74ef2393e",
            "loaded_at": "2024-01-30 23:28:01.000"
        },
        {
            "id": "5TxRUOsGeWeRl3xOML59Ai",
            "name": "ARE WE STILL FRIENDS?",
            "artist": "Tyler, The Creator",
            "image": "https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57",
            "loaded_at": "2024-01-30 23:33:17.000"
        },
        {
            "id": "6DCZcSspjsKoFjzjrWoCdn",
            "name": "God's Plan",
            "artist": "Drake",
            "image": "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5",
            "loaded_at": "2024-01-30 23:08:54.000"
        },
        {
            "id": "6FE2iI43OZnszFLuLtvvmg",
            "name": "Classic",
            "artist": "MKTO",
            "image": "https://i.scdn.co/image/ab67616d0000b2739474419f15773875a495eed3",
            "loaded_at": "2024-01-31 15:40:45.000"
        },
        {
            "id": "6Qs4SXO9dwPj5GKvVOv8Ki",
            "name": "Dancing With A Stranger (with Normani)",
            "artist": "Sam Smith",
            "image": "https://i.scdn.co/image/ab67616d0000b2733b52eca47232bedfbb5e9443",
            "loaded_at": "2024-01-31 05:17:19.000"
        },
        {
            "id": "6UelLqGlWMcVH1E5c4H7lY",
            "name": "Watermelon Sugar",
            "artist": "Harry Styles",
            "image": "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a",
            "loaded_at": "2024-01-30 23:30:46.000"
        },
        {
            "id": "75ZvA4QfFiZvzhj2xkaWAh",
            "name": "I Fall Apart",
            "artist": "Post Malone",
            "image": "https://i.scdn.co/image/ab67616d0000b27355404f712deb84d0650a4b41",
            "loaded_at": "2024-01-30 23:32:37.000"
        },
        {
            "id": "7eqoqGkKwgOaWNNHx90uEZ",
            "name": "Nights",
            "artist": "Frank Ocean",
            "image": "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
            "loaded_at": "2024-01-30 23:34:11.000"
        },
        {
            "id": "7oolFzHipTMg2nL7shhdz2",
            "name": "Eraser",
            "artist": "Ed Sheeran",
            "image": "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
            "loaded_at": "2024-01-30 23:01:29.000"
        },
        {
            "id": "7sliFe6W30tPBPh6dvZsIH",
            "name": "Area Codes",
            "artist": "Kaliii",
            "image": "https://i.scdn.co/image/ab67616d0000b2733eecc265c134153c14794aab",
            "loaded_at": "2024-01-30 23:33:18.000"
        }
    ]);

    await knex('playlist').del()
    await knex('playlist').insert([
        {
            "id": 1,
            "playlist_group_id": "testskrg",
            "song_id": "4gh0nHzaTM 1sDga7Ek0N",
            "added_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 2,
            "playlist_group_id": "testjane",
            "song_id": "4gh0nHzaTM 1sDga7Ek0N",
            "added_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 3,
            "playlist_group_id": "testskrg",
            "song_id": "2K7xn816oNHJZ0aVqdQsha",
            "added_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 4,
            "playlist_group_id": "testjane",
            "song_id": "2K7xn816oNHJZ0aVqdQsha",
            "added_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 5,
            "playlist_group_id": "testjane",
            "song_id": "1wuREzmBFrK8IgUG2A9vwR",
            "added_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 6,
            "playlist_group_id": "testjane2",
            "song_id": "1wuREzmBFrK8IgUG2A9vwR",
            "added_at": "2024-01-30 17:23:36.000"
        }
    ]);

    await knex('user_playlist').del()
    await knex('user_playlist').insert([
        {
            "id": 1,
            "user_id": 2,
            "playlist_group_id": "testjane",
            "playlist_name": "jane playlist 1",
            "created_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 2,
            "user_id": 1,
            "playlist_group_id": "testskrg",
            "playlist_name": "skrg playlist 1",
            "created_at": "2024-01-30 17:23:36.000"
        },
        {
            "id": 3,
            "user_id": 2,
            "playlist_group_id": "testjane2",
            "playlist_name": "jane playlist 2",
            "created_at": "2024-01-30 17:23:36.000"
        }
    ]);

    await knex('activity').del()
    await knex('activity').insert([
        {
            "id": 35,
            "user_id": 1,
            "song_id": "6FE2iI43OZnszFLuLtvvmg",
            "time": "2024-01-31 15:40:45.000"
        },
        {
            "id": 34,
            "user_id": 6,
            "song_id": "42VsgItocQwOQC3XWZ8JNA",
            "time": "2024-01-31 15:38:59.000"
        },
        {
            "id": 33,
            "user_id": 6,
            "song_id": "3uvyMKTLtt8mtaWT93UTVb",
            "time": "2024-01-31 15:38:32.000"
        },
        {
            "id": 32,
            "user_id": 6,
            "song_id": "2mWp5olnLmpzAReIGK18dA",
            "time": "2024-01-31 15:34:51.000"
        },
        {
            "id": 31,
            "user_id": 1,
            "song_id": "3AJwUDP919kvQ9QcozQPxg",
            "time": "2024-01-31 15:21:23.000"
        },
        {
            "id": 30,
            "user_id": 2,
            "song_id": "2Sjx8DWZO5zaTyTAmgo2gY",
            "time": "2024-01-31 15:17:53.000"
        },
        {
            "id": 29,
            "user_id": 1,
            "song_id": "6Qs4SXO9dwPj5GKvVOv8Ki",
            "time": "2024-01-31 05:17:19.000"
        },
        {
            "id": 28,
            "user_id": 1,
            "song_id": "11ozIUBoXAgRTVWelDn4pL",
            "time": "2024-01-30 23:34:27.000"
        },
        {
            "id": 27,
            "user_id": 1,
            "song_id": "7eqoqGkKwgOaWNNHx90uEZ",
            "time": "2024-01-30 23:34:11.000"
        },
        {
            "id": 26,
            "user_id": 1,
            "song_id": "4r6eNCsrZnQWJzzvFh4nlg",
            "time": "2024-01-30 23:34:05.000"
        }
    ]);


};

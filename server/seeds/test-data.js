/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('user').del()
    await knex('user').insert([
        {
            id: 1,
            name: 'Soham Gaggenapally',
            username: 'skrg',
            password: 'skrg',
            email: 'skrg@skrg.com'
        },
        {
            id: 2,
            name: 'Jane Doe',
            username: 'janedoe',
            password: 'janedoe',
            email: 'janedoe@janedoe.com'
        }
    ]);

    await knex('song').del()
    await knex('song').insert([
        {
            id: '4gh0ZnHzaTMT1sDga7Ek0N',
            name: 'sdp interlude',
            artist: 'Travis Scott',
            image: 'https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ce'
        },
        {
            id: '2K7xn816oNHJZ0aVqdQsha',
            name: 'Softcore',
            artist: 'The Neighbourhood',
            image: 'https://i.scdn.co/image/ab67616d0000b2739b6ac98a52f62d5cb473da40'
        },
        {
            id: '1wuREzmBFrK8IgUG2A9vwR',
            name: 'Sdp Interlude',
            artist: 'Charuss',
            image: 'https://i.scdn.co/image/ab67616d0000b273ebc3faeea07c1a7a2caec0d0'
        }
    ]);

    await knex('playlist').del()
    await knex('playlist').insert([
        {
            id: 1,
            playlist_group_id: 'testskrg',
            song_id: '4gh0ZnHzaTMT1sDga7Ek0N'
        },
        {
            id: 2,
            playlist_group_id: 'testjane',
            song_id: '4gh0ZnHzaTMT1sDga7Ek0N'
        },
        {
            id: 3,
            playlist_group_id: 'testskrg',
            song_id: '2K7xn816oNHJZ0aVqdQsha'
        },
        {
            id: 4,
            playlist_group_id: 'testjane',
            song_id: '2K7xn816oNHJZ0aVqdQsha'
        },
        {
            id: 5,
            playlist_group_id: 'testjane',
            song_id: '1wuREzmBFrK8IgUG2A9vwR'
        },
        {
            id: 6,
            playlist_group_id: 'testjane2',
            song_id: '1wuREzmBFrK8IgUG2A9vwR'
        }
    ]);

    await knex('user_playlist').del()
    await knex('user_playlist').insert([
        {
            id: 1,
            user_id: 2,
            playlist_group_id: 'testjane',
            playlist_name: 'jane playlist 1'
        },
        {
            id: 2,
            user_id: 1,
            playlist_group_id: 'testskrg',
            playlist_name: 'skrg playlist 1'
        },
        {
            id: 3,
            user_id: 2,
            playlist_group_id: 'testjane2',
            playlist_name: 'jane playlist 2'
        }
    ]);

    await knex('activity').del()
    await knex('activity').insert([
        {
            id: 1,
            user_id: 1,
            song_id: '4gh0ZnHzaTMT1sDga7Ek0N'
        },
        {
            id: 2,
            user_id: 2,
            song_id: '4gh0ZnHzaTMT1sDga7Ek0N'
        },
        {
            id: 3,
            user_id: 1,
            song_id: '2K7xn816oNHJZ0aVqdQsha'
        },
        {
            id: 4,
            user_id: 2,
            song_id: '2K7xn816oNHJZ0aVqdQsha'
        },
        {
            id: 5,
            user_id: 2,
            song_id: '1wuREzmBFrK8IgUG2A9vwR'
        },
        {
            id: 6,
            user_id: 2,
            song_id: '1wuREzmBFrK8IgUG2A9vwR'
        }
    ]);


};

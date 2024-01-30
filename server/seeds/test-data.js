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
            id: '',
            name: '',
            artist: '',
            image: ''
        }
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
    ]);

    await knex('playlist').del()
    await knex('playlist').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
    ]);

    await knex('user_playlist').del()
    await knex('user_playlist').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
    ]);

    await knex('activity').del()
    await knex('activity').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
    ]);


};

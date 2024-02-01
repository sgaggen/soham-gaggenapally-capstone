/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('comment').del()
    await knex('comment').insert([
        {
            activity_id: 35,
            user_id: 1,
            content: "this is a test comment 1"
        },
        {
            activity_id: 35,
            user_id: 4,
            content: "this is a test comment 2"
        },
        {
            activity_id: 34,
            user_id: 2,
            content: "this is a test comment 3"
        }
    ]);
};

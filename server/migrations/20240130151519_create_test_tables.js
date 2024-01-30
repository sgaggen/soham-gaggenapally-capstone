/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("user", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("username").notNullable();
            table.string("password").notNullable();
            table.string("email").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
        .createTable("song", (table) => {
            // table.increments("id").primary();
            // table.string("spotify_id").notNullable();
            table.string("id").primary(); // spotify id
            table.string("name").notNullable();
            table.string("artist").notNullable();
            table.string("image").notNullable();
            table.timestamp("loaded_at").defaultTo(knex.fn.now());
        })
        .createTable("playlist", (table) => {
            table.increments("id").primary();
            table.string("playlist_group_id").notNullable();
            // table.string("song_id").notNullable();
            table
                .string("song_id")
                .unsigned()
                .references("song.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("added_at").defaultTo(knex.fn.now());
        })
        .createTable("user_playlist", (table) => {
            table.increments("id").primary();
            table
                .integer("user_id")
                .unsigned()
                .references("user.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.string("playlist_group_id").notNullable();
            table.string("playlist_name").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        .createTable("activity", (table) => {
            table.increments("id").primary();
            table
                .integer("user_id")
                .unsigned()
                .references("user.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .string("song_id")
                .unsigned()
                .references("song.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("time").defaultTo(knex.fn.now());
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("user").dropTable("song").dropTable("playlist").dropTable("user_playlist").dropTable("activity");
};

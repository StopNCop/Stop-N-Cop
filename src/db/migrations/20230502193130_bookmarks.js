/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.createTable('bookmarks', (table) => {
        table.increments('id');
        table.integer('post_id').references('id').inTable('posts');
        table.integer('user_id').references('id').inTable('users');
        table.timestamps(true, true);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable('bookmarks');
};

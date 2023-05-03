/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 *     return knex.schema.createTable('bookmarks', (table) => {
        table.increments('id');
        table.integer('post_id').references('id').inTable('posts');
        table.integer('user_id').references('id').inTable('users');
        table.timestamps(true, true);
      })
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bookmarks').insert([
    {post_id: 1, user_id: 2},
  ]);
};

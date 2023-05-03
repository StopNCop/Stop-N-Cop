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
  // await knex('bookmarks').del()
  await knex('bookmarks').insert([
    {id: 1000, post_id: 1000, user_id: 2},
  ]);
};

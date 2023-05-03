/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 *         table.increments('id');
        table.integer('user_id').references('id').inTable('users');
        table.string('name');
        table.string('link');
        table.string('city');
        table.string('price');
        table.timestamp(true, true);
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('posts').del()
  await knex('posts').insert([
    {user_id: 1, name: "Nikes", link: "", city: "BK", price: 100},
    {user_id: 1, name: "Yeezys", link: "", city: "Bronx", price: 300},
  ]);
};

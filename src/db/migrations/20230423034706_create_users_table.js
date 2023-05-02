/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.up = (knex) => knex.schema.createTable('users', (table) => {
//   table.increments();
//   table.string('username').notNullable().unique();
//   table.string('password_hash').notNullable();
//   table.string('email').notNullable()
//   table.timestamps(true, true);
// });

exports.up = async (knex) => {
  await knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('username').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('email').notNullable()
  });

  await knex.schema.createTable('listings', function(table) {
    table.increments('id');
    table.string('name');
    table.string('link');
    table.string('city');
    table.string('price');
    table.integer('user_id').references('id').inTable('users');
  });

  await knex.schema.createTable('bookmarks', function(table){
    table.increments('id');
    table.string('image_link');
    table.string('city');
    table.integer('listing_id').references('id').inTable('listings');
    table.string('listing_price');
    table.timestamps(true, true);

  })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.down = (knex) => knex.schema.dropTable('users');
exports.down = async function(knex) {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('listings');
  await knex.schema.dropTable('bookmarks');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up =  (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password_hash').notNullable();
    table.string('email').notNullable()
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.down = (knex) => knex.schema.dropTable('users');
exports.down = (knex) => {
  return knex.schema.dropTable('users');
};

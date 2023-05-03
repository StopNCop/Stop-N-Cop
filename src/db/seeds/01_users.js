const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('bookmarks').del()
  await knex('posts').del()
  await knex('users').del()
  await User.create('cool_cat', 'password1', 'email@email.com');
  await User.create('l33t-guy', 'password1', 'email@email.com');
};

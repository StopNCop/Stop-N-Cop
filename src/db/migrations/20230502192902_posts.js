/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id');
        table.integer('user_id').references('id').inTable('users');
        table.string('name');
        table.string('link');
        table.string('city');
        table.string('price');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable('posts');
};

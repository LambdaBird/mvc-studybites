export const up = (knex) =>
  knex.schema.createTable('subscriptions', (table) => {
    table.increments();
    table.string('email').notNullable();
    table.string('ip');
    table.string('pathname');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

export const down = (knex) => knex.schema.dropTable('subscriptions');

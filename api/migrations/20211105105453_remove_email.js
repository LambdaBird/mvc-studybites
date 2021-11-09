export const up = (knex) =>
  knex.schema.alterTable('users', (table) => {
    table.string('email').nullable().alter();
  });

export const down = (knex) =>
  knex.schema.alterTable('users', (table) => {
    table.string('email').unique().notNullable().alter();
  });

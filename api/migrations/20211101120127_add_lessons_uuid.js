export const up = (knex) =>
  knex.schema.alterTable('lessons', (table) => {
    table.uuid('edit_id').unique().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('public_id').unique().defaultTo(knex.raw('gen_random_uuid()'));
  });

export const down = (knex) =>
  knex.schema.alterTable('lessons', (table) => {
    table.dropColumn('edit_id');
    table.dropColumn('public_id');
  });

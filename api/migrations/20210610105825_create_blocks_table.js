export const up = (knex) =>
  knex.schema.createTable('blocks', (table) => {
    table
      .uuid('block_id')
      .notNullable()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('revision_id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.json('content');
    table.string('type');
    table.json('answer');
    table.float('weight', [1.0]);
  });

export const down = (knex) => knex.schema.dropTable('blocks');

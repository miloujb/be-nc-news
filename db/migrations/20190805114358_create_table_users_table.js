
exports.up = function(knex, Promise) {
    console.log('creating users table');
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.string('username').primary().notNullable();
        usersTable.string('avatar_url');
        usersTable.string('name');
    })
};

exports.down = function(knex, Promise) {
    console.log('removing users table');
    return knex.schema.dropTable('users')
};

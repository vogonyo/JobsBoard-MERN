const bcrypt = require('bcryptjs');

const users = [
    {
        username: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('pass1234', 10),
        isAdmin: true
    },
    {
        username: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('jane1234', 10),
    },
    {
        username: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('john1234', 10),
    },
    {
        username: 'Super Admin',
        email: 'superadmin@example.com',
        password: bcrypt.hashSync('pass1234', 10),
        isAdmin: true
    },  
    {
        username: 'Alien',
        email: 'alien@example.com',
        password: bcrypt.hashSync('pass1234', 10),
        isAdmin: true
    },

]

module.exports = users;
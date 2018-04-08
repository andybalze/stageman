module.exports = require('knex')({
  client: 'mysql',
  connection: {
    user     : 'andybalze',
    database : 'stage'
  }
});
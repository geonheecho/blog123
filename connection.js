var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "3.138.173.228",
  user: "shane",
  password: "Tkfkdgody!2",
  database: "blog_project",
});

connection.connect();



module.exports = connection;

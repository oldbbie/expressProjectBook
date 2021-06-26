var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : '',
  multpleSatements:true
});
db.connect();
module.exports=db;
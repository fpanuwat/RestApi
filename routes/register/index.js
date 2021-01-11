let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.post('/',async(req,res)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;
        const f_name = req.body.f_name;
        const l_name = req.body.l_name;
        const address = req.body.address;
        const b_day = req.body.b_day;
        const telephone = req.body.telephone;
        const emp_id = req.body.emp_id;
        const sex = req.body.sex;
        let connection = await mysql.createConnection(config.database)
        let sql = 'INSERT INTO employee(emp_id, emp_name, telephone, address, birthday, sex, emp_lname, username, password,author) VALUES ?';
        const values = [[emp_id,f_name,telephone,address,b_day,sex,l_name,username,password,'8']];
       
        connection.query(sql, [values], function (err, result) {
            if (username<= 0){
                res.status(400).send("not found");
          
              }
            
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });
    } catch (error) {
        console.log(error.message)
        res.status(502).send(error.message)
    }
})

module.exports = router
/*

app.get('/api/updateList',(req,res) =>{
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO student (std_name, std_score) VALUES ?";
      var values = [
        ['John', 'Highway'],
        ['Peter', 'Lowstreet'],
        ['Amy', 'Apple'],
        ['Hannah', 'Mountain'],
       
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });
  
  });*/
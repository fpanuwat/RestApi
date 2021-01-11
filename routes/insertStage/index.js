let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.post('/',async(req,res)=>{
    try {
        const detail = req.body.detail;
        const emp_name = req.body.emp_name;
        const date_time = req.body.date_time;
        const job_number = req.body.job_number;
        
        const comment = req.body.comment;
        const stg_id = null;

        let connection = await mysql.createConnection(config.database)
        let sql = 'INSERT INTO stage (stg_id, detail, emp_name, date_time, job_number,comment) VALUES  ?';
        const values = [[stg_id,detail,emp_name,date_time,job_number,comment]];
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
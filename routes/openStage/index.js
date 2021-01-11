let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.post('/:id',async(req,res)=>{
    try {
        //const status= req.body.status;
        const id = req.params.id;
        let connection = await mysql.createConnection(config.database)
        let sql = 'UPDATE job SET status = 1 WHERE job_number = ?';
        console.log(id);
        connection.query(sql,id, function (err, result) {
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
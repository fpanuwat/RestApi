let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.delete('/:id',async(req,res)=>{
    try {
      const id = req.params.id;
        let connection = await mysql.createConnection(config.database)
        let sql = 'DELETE FROM job WHERE job_number = ?';
      
        connection.query(sql,id,function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
        });
      
    } catch (error) {
        console.log(error.message)
        res.status(502).send(error.message)
    }
})

module.exports = router

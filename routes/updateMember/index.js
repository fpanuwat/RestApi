let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.post('/:id',async(req,res)=>{
    try {
        const author= req.body.author;
        const password= req.body.password;
        const emp_name= req.body.emp_name;
        const emp_lname= req.body.emp_lname;
        const telephone= req.body.telephone;
        const birthday= req.body.birthday;
        const sex= req.body.sex;
        const address= req.body.address;
        const id = req.params.id;
        let connection = await mysql.createConnection(config.database)
        let sql = "UPDATE employee SET author = '"+author+"' ,password ='"+password
        +"' ,emp_name ='"+emp_name+"' ,emp_lname ='"+emp_lname+"' ,telephone ='"+telephone
        +"' ,sex ='"+sex+"',address ='"+address+"' ,birthday ='"+birthday
        +"' WHERE emp_id = ?";
        //console.log(sql);
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
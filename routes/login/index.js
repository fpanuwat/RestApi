let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.post('/',async(req,res)=>{
    try {
        //const username = req.params.username;
        const username = req.body.username;
        const password = req.body.password;
        let connection = await mysql.createConnection(config.database)
        let sql = 'select * from employee where username = ? ';
        const [data] = await connection.query(sql,username)
        res.status(200).send(data)
    } catch (error) {

        console.log(error.message)
        res.status(502).send(error.message)
    }
})

module.exports = router
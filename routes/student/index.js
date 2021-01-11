let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.get('/',async(req,res)=>{
    try {
        let connection = await mysql.createConnection(config.database)
        let sql = 'select * from student'
        const [data] = await connection.query(sql)
        res.status(200).send(data)
    } catch (error) {
        console.log(error.message)
        res.status(502).send(error.message)
    }
})

module.exports = router
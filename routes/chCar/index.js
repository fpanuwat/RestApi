let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        //const id = '1607741653';
        let connection = await mysql.createConnection(config.database)
        
        let sql = 'select * from car where car_number = ?'
        const [data] = await connection.query(sql,id)
        res.status(200).send(data)
    } catch (error) {

        console.log(error.message)
        res.status(502).send(error.message)
    }
})

module.exports = router

let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.get('/',async(req,res)=>{
    try {


        const username = req.body.username;
        const password = req.body.password;
        
        let connection = await mysql.createConnection(config.database)
        let sql = 'select  * from employee '
        const [data] = await connection.query(sql)

        const user = await data.findOne({
            username
        }).lean();
        if(!user){
            return res.status(403).json({
                message: "Wrong username or password"
            });
        }

        const passwordValid = await verifyPassword(
            password,
            user.password
        )
        if(passwordValid){
            const {password, bio , ...rest} = user;
            const userInfo = Object.assign({},{...rest});

            const token = createToken(userInfo);

            const decodeToken = jwtDecode(token);
            const expiresAt = decodeToken.exp;
            
            req.session.user = userInfo;
            res.json({
                message: 'Authention succesful!',
                token,
                userInfo,
                expiresAt
            });
        }else{
            res.status(403).json({
                message: 'wrong user/pass'
            });
        }

    } catch (error) {

        console.log(error.message)
        res.status(502).send(error.message)
    }
})

module.exports = router
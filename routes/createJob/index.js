let express = require('express')
let router = express.Router()
let mysql = require('mysql2/promise')
let config = require('../../config')

router.post('/',async(req,res)=>{
   function counter (txt){
        var set=[];
        var j =0;
        var h=0;
        for(var i=0; i<txt.length;i++){
            if(txt[i] === ',' || txt[i] === '/' ){
                set[h]=txt.substring(j, i);
                j=i+1;
                h++;
            }else if(txt.length){
                set[h]=txt.substring(j,txt.length);
            }
        }
        return set;
    }
    try {
        //req body value
        const s_date = req.body.s_date;
        const e_date = req.body.e_date;
        const car_number = req.body.car_number;
        const brand = req.body.bran;
        const serie = req.body.serie;
        const color = req.body.color;
        const c_year = req.body.c_year;
        const gear = req.body.gear;
        const model_number = req.body.model_number;
        const insurance = req.body.insurance;
        const c_name = req.body.c_name;
        const address = req.body.address;
        const e_mail = req.body.e_mail;
        const c_tel = req.body.c_tel;
        const d_detail = req.body.d_detail;
        const damage = req.body.damage;
        const c_card_number = req.body.c_card_number;
        const car_type = req.body.car_type;
        const kilo_numb = req.body.kilo_numb;
        const id_customer = req.body.id_customer;
        const acc_date = req.body.acc_date;
        const acc_number = req.body.acc_number;
        const sub_insurance = req.body.sub_insurance;
        const ins_tel = req.body.ins_tel;
        const ins_fax = req.body.ins_fax;
        const ins_number = req.body.ins_number;
        const ins_type = req.body.ins_type;
        const clam_number = req.body.clam_number;
        const limit_amount = req.body.limit_amount;
        const report_date = req.body.report_date;
        const re_name = req.body.re_name;
        const rep_name = req.body.rep_name;
        const i_name = req.body.i_name;
        const i_tel = req.body.i_tel;
        const n_color = req.body.n_color;
        const job_number = req.body.job_number;
        const date_time = req.body.date_time; 
        const haveOn = req.body.haveOnstate; 
        
        // connection 
        let connection = await mysql.createConnection(config.database)
        if(haveOn != true || haveOn != 'true'){
            //sql insert to job
            let sql_job ='INSERT INTO job (job_number, car_number, start_date, end_date, date_time, re_name, rep_name, status,damage,i_name,i_tel,n_color) VALUES ?';
            const values_job = [[job_number,car_number,s_date,e_date,date_time,re_name,rep_name,'0',damage,i_name,i_tel,n_color]];
            connection.query(sql_job,[values_job],function(err,result){
                if(err) throw err;
                console.log("Number records inserted on jobo"+ result.affectedRows);
            })
            //end job

            //sql insert to customer 
            let sql_customer = 'INSERT INTO customer(c_id, c_name, address, telephone, drive_id, email,car_number) VALUES ?';
            const values_cus =[[id_customer,c_name,address,c_tel,c_card_number,e_mail,car_number]];
            connection.query(sql_customer,[values_cus], function(err,result){
                if(err)throw err;
                console.log("Number records inserted on customer"+ result.affectedRows);
            })
            //end customer

            // sql insert to car
            let sql_car = 'INSERT INTO car (car_number, brand,serie,color, year, gear, model_number, type, kilo_number, c_id,job_number) VALUES ?';
            const values_car =[[car_number,brand,serie,color,c_year,gear,model_number,car_type,kilo_numb,id_customer,job_number]];
            connection.query(sql_car,[values_car], function(err,result){
                if(err)throw err;
                console.log("Number records inserted on customer"+ result.affectedRows);
            })
            //end
            // sql insert to insurance
            let sql_ins = 'INSERT INTO insurance (ins_id,company, sub_company, telephone, fax, claim_number, limit_pay, acc_number, acc_date, rep_date,ins_number,ins_type,car_number) VALUES ?';
            const values_ins =[[null,insurance,sub_insurance,ins_tel,ins_fax,clam_number,limit_amount,acc_number,acc_date,report_date,ins_number,ins_type,car_number]];
            connection.query(sql_ins,[values_ins], function(err,result){
                if(err)throw err;
                console.log("Number records inserted on customer"+ result.affectedRows);
            })
            //end
            //damage detail  
        /* const detial = counter(d_detail);
            let sql_detail = 'INSERT INTO  damagedetail(dmd_id, detail, job_number, status) VALUES ?';
            for(var i=0; i<detial.length;i++){//for insert array
                const values_detail =[[null,detial[i],job_number,'0']];
                connection.query(sql_detail,[values_detail], function(err,result){
                    if(err)throw err;
                    console.log("Number records inserted on customer"+ result.affectedRows);
                })
            } //end for */
            let sql_detail = 'INSERT INTO  damagedetail(dmd_id, detail, job_number, status) VALUES ?';
            const values_detail =[[null,d_detail,job_number,'0']];
            connection.query(sql_detail,[values_detail], function(err,result){
                if(err)throw err;
                console.log("Number records inserted on customer"+ result.affectedRows);
            })
        }else{
            //sql insert to job
            let sql_job ='INSERT INTO job (job_number, car_number, start_date, end_date, date_time, re_name, rep_name, status,damage,i_name,i_tel,n_color) VALUES ?';
            const values_job = [[job_number,car_number,s_date,e_date,date_time,re_name,rep_name,'0',damage,i_name,i_tel,n_color]];
            connection.query(sql_job,[values_job],function(err,result){
                if(err) throw err;
                console.log("Number records inserted on jobo"+ result.affectedRows);
            })
            //end job  
            
            let sql_detail = 'INSERT INTO  damagedetail(dmd_id, detail, job_number, status) VALUES ?';
            const values_detail =[[null,d_detail,job_number,'0']];
            connection.query(sql_detail,[values_detail], function(err,result){
                if(err)throw err;
                console.log("Number records inserted on customer"+ result.affectedRows);
            })

        }
          
        //end damage deatail

    } catch (error) {
        console.log(error.message)
        res.status(502).send(error.message)
    }
})

module.exports = router
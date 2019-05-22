var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var sql = require('mssql');
var cors = require('cors');


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, cache-control');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbConfig = {
    user: 'sa',
    password: '1qaz2wsx',
    server: 'LAPTOP-P7LB9J4T',   //這邊要注意一下!!
    driver: 'tedious',
    database: 'GoodsStore',
    options: {
        instanceName: 'TESTDB'
    }
}

const pool = new sql.ConnectionPool(dbConfig);

pool.on('error', err => {
    console.log(err);
})


app.get("/api/get", async function (req, res) {
    try {
        await pool.connect();
        let result = await pool.request().query('select * from DEB_Goods');
        //console.dir(result)
        res.json(result);
        return { success: result };
    } catch (err) {
        console.dir(err);
        return { err: err };
    } finally {
        pool.close();
    }
});

//Order event
app.post("/api/order", async function (req, res) {
    try {
        //console.log(req)
        // console.log(req.body)
        
        await pool.connect();
        for(var i in req.body) {
            console.log(req.body[i].inputEmail)
            await pool.request()
            .input('Email', sql.NVarChar, req.body[i].inputEmail)
            .input('Goods_Id', sql.NChar, req.body[i].Goods_id)
            .input('Good_Name', sql.NChar, req.body[i].Name)
            .input('Order_Amount', sql.Int, req.body[i].inputOrder_Amount)
            .input('Good_price', sql.Int, req.body[i].Price)
            .input('Order_Time', sql.NVarChar, req.body[i].inputOrder_Time)
            .input('Demand_Time', sql.NVarChar, req.body[i].inputDemand_Time)
            .input('FullName', sql.NVarChar, req.body[i].inputFullName)
            .input('Department', sql.NVarChar, req.body[i].inputDepartment)
            .input('Phone', sql.NVarChar, req.body[i].inputPhone)
            .query("INSERT INTO DEB_Order (Goods_Id,Good_Name,Order_Amount,Good_price,Order_Time,Demand_Time,FullName,Department,Email,Phone,Order_Id) VALUES (@Goods_Id,@Good_Name,@Order_Amount,@Good_price,@Order_Time,@Demand_Time,@FullName,@Department,@Email,@Phone,sys.fn_VarBinToHexStr( HASHBYTES( 'MD5' , HASHBYTES( 'MD5' , @Email + @FullName + @Demand_Time + @Order_Time ) ) ))");
            // await pool.request()
            // .input('Goods_Id', sql.NChar, req.body[i].Goods_id)
            // .input('Order_Amount', sql.Int, req.body[i].inputOrder_Amount)
            // .query('UPDATE DEB_Goods Set Amount = Amount - @Order_Amount where Goods_id = @Goods_Id');
        }
        console.log("success");
        return { success: "success" };
    } catch (err) {
        console.dir(err);
        return { err: err };
    } finally {
        pool.close();
    }
});

// // //PUT API
// // app.put("/api/user/:id", function(req , res){
// //     var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
// //     executeQuery (res, query);
// // });

// // // DELETE API
// // app.delete("/api/user /:id", function(req , res){
// //     var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
// //     executeQuery (res, query);
// // });

var server = app.listen(5000, function () {
    console.log('Server is running!');
});
/*
    이곳으로 요청이 들어오면,
    해당 사용자가 자신이 저장한 파일들의 정보를 받을 수 있도록
    데이터를 보내주는 곳이다.
*/

const express = require('express');
var mysql = require('mysql');


// 라우터 처리를 위한 변수 정의
var router = express.Router();

// MySQL DB와 연동하기 위한 변수 정의
var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '70017621',
    port : '3306',
    database : 'capstone'
});


// DB 연결!
db.connect();


// GET 메소드 처리
router.get('/', function(req, res) {
    console.log(req.query);

    var userID = req.query.userID;

    var sql = 'select * from cloud where userID=?';

    var L = [];

    db.query(sql, userID, function(err, rows, fields){
        if(err){
            console.log(err);
            throw err;
        }

        // select 쿼리문의 결과를 리스트에 담기
        for(var i=0; i<rows.length; i++)
        {
            L.push(rows[i]);
            console.log(rows[i]);
        }

        console.log(L);

        res.send(L);

    })
})

module.exports=router;
/*
    이곳으로 요청이 들어오면,
    해당 사용자가 보낸 자신의 로컬 파일을 
    클라우드와 엣지 DB로 분산해서 저장한다.
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


// POST 메소드로 여기에 접근한다!
router.post('/', function(req, res, next) {
    console.log("/store for POST method here!");

    var L = [];

    var requestData;

    // JSON 데이터의 key만 추출!
    for(key in req.body) {
        L.push(key);
    }

    requestData = JSON.parse(L[0]);

    requestData = requestData.body;

    console.log(requestData);

    var userID = requestData.userID;
    var timeStamp = requestData.timeStamp;
    var hashValue = requestData.hashValue;
    var fileName = requestData.fileName;
    var fileSize = requestData.fileSize;
    var fileType = requestData.fileType;
    var fileContents = requestData.fileContents;

    /*
        엣지 DB로 저장하는 쿼리문 정의!
    */
   var edge_sql = 'insert into edge(userID, timeStamp, hashValue) VALUES(?,?,?)';
   var edge_params = [userID, timeStamp, hashValue];

   // 엣지 DB로 데이터 저장!
   db.query(edge_sql, edge_params, function(err, result) {

        if(err) {
            throw err;
        }

        console.log("엣지 DB 저장 성공!");
   })

    /*
        클라우드 DB로 저장하는 쿼리문 정의!
    */
    var cloud_sql = 'insert into cloud(userID, timeStamp, hashValue, fileName, fileType, fileSize, fileContents) VALUES(?,?,?,?,?,?,?)';
    var cloud_params = [userID, timeStamp, hashValue, fileName, fileType, fileSize, fileContents];

    // 엣지 DB로 데이터 저장!
    db.query(cloud_sql, cloud_params, function(err, result) {

        if(err) {
            throw err;
        }

        console.log("클라우드 DB 저장 성공!");
    })

    res.send("SUCCESS");
});


module.exports=router;
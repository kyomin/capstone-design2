/*
    이곳으로 요청이 들어오면,
    해당 사용자가 자신이 정한 파일의 무결성이 보장되는지
    응답을 해주는 곳이다.
*/
const express = require('express');
var mysql = require('mysql');
var sha256 = require('js-sha256');

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
    var timeStamp = req.query.timeStamp;

    // userID와 timeStamp를 PK로 사용하여 파일을 특정할 것이다.
    var edge_sql = 'select * from cloud where userID=? and timeStamp=?';
    var params = [userID, timeStamp]
    db.query(edge_sql, params, function(err, rows, fields){
        if(err){
            console.log(err);
            throw err;
        }

        var data = rows[0];

        /*
            클라우드로부터 받아온
            file 정보들, date, ID를 담은 폼 데이터를 이용하여 해시 값 추출!
        */
        var hash = sha256(data.userID + data.timeStamp + 
            data.fileName + data.fileType + 
            data.fileSize + data.fileContents);

    
        var edge_sql = 'select * from cloud where userID=? and timeStamp=?';

        // 엣지 서버로부터 해시값을 가져온다.
        db.query(edge_sql, params, function(err, rows, fields){
            if(err){
                console.log(err);
                throw err;
            }

            // 클라우드 원본으로부터 만든 해시값과 엣지에 저장된 해시값을 비교하여
            // 같으면 원본 파일 변조가 되지 않아 무결성이 보장된 것이다.
            if(hash == rows[0].hashValue)
            {
                res.send("OK");
            } else {
                res.send("NO");
            }

        });

    });
})

module.exports=router;
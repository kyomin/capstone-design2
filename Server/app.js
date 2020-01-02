const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const cors = require('cors');


// '저장' 작업을 처리하는 서버 정의
var storeRouter = require('./routes/store');
// '조회' 작업을 처리하는 서버 정의
var readRouter = require('./routes/read');
// 무결성 확인을 처리하는 서버 정의
var confirmRouter = require('./routes/confirm');

// express 모듈을 사용하기 위한 변수 정의
var app = express();

// POST에 담겨오는 json 형태의 데이터를 읽기 위한 코드
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// cors 에러 해결 코드
app.use(cors());

/*
    다음은 특정 라우터를 타고 들어온 요청에 대해 처리하는
    작업들을 정의해 놓는 것이다.
*/
// /store를 타고 오면 store 작업 처리하는 서버 시작
app.use('/store', storeRouter);
app.use('/read', readRouter);
app.use('/confirm', confirmRouter);

const server = http.createServer(app);

// port 3000에서 메인 서버 시작!
server.listen(3001, function() {
    console.log("Server is running at port 3001");
});














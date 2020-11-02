const express = require('express');
const app = express();
const port = 5000;
const bodyparser = require('body-parser');
const db = require('./models');

/* create server */
const runServer = async () => {
    try {
        /* database connection */
        await db.sequelize.sync();

        /* 미들웨어 추가 */
        app.use(bodyparser.urlencoded({extended: true}));
        app.use(bodyparser.json());

        /* 라우팅 설정 */
        app.use('/api/store', require('./routes/store'));
        app.use('/api/read', require('./routes/read'));
        app.use('/api/confirm', require('./routes/confirm'));

        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    } catch(err) {
        console.error(err);
    }
}

runServer();
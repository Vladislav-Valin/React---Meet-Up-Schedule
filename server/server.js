const app = require('express')();
const cors = require('cors'); // to connect between domians
const bodyParser = require('body-parser');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskno3'
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Connected to DB')
});

// middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

// reciving the dev_teams deta
app.get('/dev_teams', (req, res) => {
    conn.query('SELECT * FROM dev_teams', (error, result) => {
        // console.log(result);
        res.json(result);
    })
});

//----------------------------------------------------------------

// recieving meeting list
// http://localhost:3030/meetings
app.get('/meetings', (req, res) => {
   let sql = `SELECT meetings.*, dev_teams.team_name teamName FROM meetings
   INNER JOIN dev_teams ON meetings.team_code = dev_teams.id`;
    
   conn.query(sql, (error, result) => {
    // console.log(results)
   res.json(result);
    })
});

//----------------------------------------------------------------

// creating new meeting 
// http://localhost:3030/create
app.post('/create', (req, res) => {
    let sql = `INSERT INTO meetings (team_code, strat_time, end_time, subject, room_name)
    VALUES ("${req.body.code}", "${req.body.start}", "${req.body.end}", "${req.body.subject}", "${req.body.room}")`;
    conn.query(sql, (error, result) => {
        console.log(result);
        res.json(result);
    })
})

app.listen(3030, () => {
    console.log('Listening to port 3030');
  });
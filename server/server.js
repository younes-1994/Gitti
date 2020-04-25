var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var projectList = require('./projectList');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.post("/login", (req, res, next) => {
    const { userName, password } = req.body;
    if (userName === 'test' && password === "test") {
        res.json({ data: [], state: "success", message: 'شما با موفقیت وارد سیستم شدید' });
    }
    else {
        res.json({ data: [], state: "fail", message: 'نام کاربری یا رمز عبور نادرست است' });
    }
});
app.post("/GetProjectList", (req, res, next) => {
    res.json({ data: projectList, state: "success", message: '' });
});
app.post("/GetProjectDetails", (req, res, next) => {
    const { id } = req.body;
    var data = projectList.filter(item => item.intId == id)[0];
    console.log("id:", id);
    console.log("data:", data);
    res.json({ data: data, state: "success", message: '' });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
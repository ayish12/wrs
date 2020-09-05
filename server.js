const express = require('express')
const bodyParser = require('body-parser')
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

//models
var user = require('./controllers/models/user')
var admin = require('./controllers/models/admin')



const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3000


app.get('/', function (req, res) { res.send('Hello world') })

app.get('/post', function (req, res) { res.send('post api') })



app.listen(port, function () {
    console.log('Server listening at 3000')
})

//Mongoose Connection

const mongodbURL =
    "mongodb+srv://ayish:clanrapa@cluster0.fgupc.mongodb.net/sample?retryWrites=true&w=majority";
var db = mongoose.connection;

db.once("open", () => console.log("mongodb connected")).on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


//LOGIN 

app.post("/login", async function (req, res) {
    var secret = "qwertyui";
    console.log("bodyyy", req.body);
    var obj = req.body;
    var username = obj.username;
    var password = obj.password;

    if (!obj) {
        res.json({ success: false, message: "body missing" });
    } else {
        var login = {
            username: username,
            password: password,
        };
        var user = new User(login);
        user.save(login, function (err, resp) {
            const response = {
                status_code: 200,
                data: resp,
                message: "USER ADDED SUCCESFULLY"
            };
            if (err) {
                res.send(err)
            } else {
                res.send(response)
            }
        })

    }
})

//ADMIN

app.post("/admin", async function (req, res) {
    var adm = {
        username: admin,
        password: 123456
    }
    var admin = new admin(adm);
    admin.save(adm, function (err, resp) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(resp)
        }

    })
})


//EDIT
app.post("/modify", async function (req, res) {

})

//DELETE
app.post("/delete", async function (req, res) {
    const {
        body: { id }
    } = req;
    user.findByIdAndDelete(id, function (err, docs) {
        if (!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    });
})
const express = require("express");
const bodyParser = require("body-parser");
const collection = require("./config");
const path = require("path")
const bcrypt = require("bcrypt");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signUp", (req, res) => {
    res.render("signUp");
});

app.post("/signUp", async (req, res) => {
    const data = {
        email: req.body.userEmail,
        password: req.body.password
    }

    // Check if the user already exist

    const existingUser = await collection.findOne({ email: data.email });
    if (existingUser) {
        res.send("This email is already exist. Please choose another email.");
    } else {
        // Hash the password using bcrypt
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRound);
        data.password = hashedPassword;
        const userData = await collection.insertMany(data);
        console.log(userData);
    }

});

// login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.userEmail });
        if (!check) {
            res.send("User email can not be found");
        }
        // compair the hash password from the database with the plain text.
        const isHashPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isHashPasswordMatch) {
            res.render(home);
        } else {
            req.send("worng Details");
        }
    } catch {
        res.send("something worng");
    }

});


app.listen("3000", () => {
    console.log("Yes, you are in port 3000");
});
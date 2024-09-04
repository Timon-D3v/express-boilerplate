// Import Modules
import session from "express-session";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import timon from "timonjs";
import cors from "cors";
import fs from "fs";

// Import Components
import functions from "./components/functions.js";

// Import Constants
import CONFIG from "./config.js";

// Import Routes
import ROUTES___ROOT from "./routes/root.js";



// Constants
const { 
    ENV,
    PORT,
    SESSION_SECRET_KEY
} = CONFIG;



// Setup
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 432000000
    }
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cors());



// Set up morgan aka log
app.use(morgan("[:date[web]] :status :method :url | :total-time[3]ms | :remote-addr | :http-version :referrer"));

if (ENV === "prod") {

    let date = new Date().toLocaleDateString("en-US", {year: "2-digit", month: "2-digit", day: "2-digit"});

    date = date.slice(6, 8) + date.slice(3, 5) + date.slice(0, 2);

    fs.writeFile(`./logs/log_${date}.log`, "", err => {if (err) throw new Error(err);});

    app.use(morgan("[:date[web]] :status :method :url | :total-time[3]ms | :remote-addr | :http-version :referrer", {

        stream: fs.createWriteStream(`./logs/log_${date}.log`, {flags: "w"})

    }));
}



// Routes
app.use("/", ROUTES___ROOT);



// Listen
app.listen(PORT, functions.listening);
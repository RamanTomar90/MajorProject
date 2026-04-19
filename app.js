if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


// ✅ DB URL
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
  throw new Error("MONGO_URL is missing in environment variables");
}


// ✅ Mongo Store
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO STORE:", err);
});


// ✅ Trust proxy (IMPORTANT for Render)
app.set("trust proxy", 1);


// ✅ Session Config
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ production fix
  },
};

app.use(session(sessionOptions));
app.use(flash());


// ✅ Passport Config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ✅ Flash Middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// ✅ View Engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


// ✅ DB Connection (ONLY ONCE)
mongoose.connect(dbUrl)
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log(err));


// ✅ Routes
app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings", listingRouter);
app.use("/", userRouter);


// ✅ Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});


// ✅ Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
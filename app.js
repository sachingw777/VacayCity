var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    methodOverride = require("method-override"),
    Site        = require("./models/site"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    // Comment     = require("./models/comments")

//REQUIRING ROUTES    
var commentRoutes    = require("./routes/comments"),
    siteRoutes = require("./routes/sites"),
    indexRoutes      = require("./routes/index");

let url = process.env.DATABASEURL;
mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true }); //create yelpcamp db inside mongodb
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "pizza",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //passport authenticate middleware
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next(); //to move to next middleware
});


app.use("/", indexRoutes);
app.use("/sites", siteRoutes);
app.use("/sites/:id/comments", commentRoutes);

// app.listen(3031, function(){
//   console.log("APP.JS START");
// });

app.listen(process.env.PORT, process.env.IP, () => console.log("The VacayCity Server Has Started!"));
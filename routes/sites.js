var express = require("express");
var router = express.Router(); //a new instance of express router and adding routes to this router. 
var Site = require("../models/site");
var middleware = require("../middleware");

//INDEX ROUTE - show all sites
router.get("/", function(req, res) {
    // Get all sites from DB
    Site.find({}, function(err, allSites){
        if (err) {
            console.log(err);
        } else {
             res.render("sites/index", {sites:allSites, currentUser: req.user}); //data + name passing in
        }   
    });
});


//CREATE - add new sites to database
router.post("/", middleware.isLoggedIn, function (req, res){
    // get data from form and add to sites array
    var name= req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newSite = {name: name, price: price, image: image, description: desc, author:author};
   //create a new site and save to db
   Site.create(newSite, function(err, newlyCreated){
      if (err) {
          console.log(err);
      } else {
            //redirect back to sites page
            console.log(newlyCreated);
          res.redirect("/sites"); //
      }
   });
});


//NEW - show form to create new site 
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("sites/new");
});


//SHOW - shows more info about site selected - to be declared after NEW to not overwrite
router.get("/:id", function(req, res){
    //find the site with the provided ID
    Site.findById(req.params.id).populate("comments").exec(function(err, foundSite){
       if (err) {
           console.log(err);
       } else {
            //render show template with that site
           res.render("sites/show", {site: foundSite});
       }
    });
});

//EDIT SITE ROUTE
router.get("/:id/edit", middleware.checkSiteOwnership, function (req, res){
       Site.findById(req.params.id, function(err, foundSite){
           if (err){
               req.flash("error", "Site not found!");
           } else {
          res.render("sites/edit", {site: foundSite});
           }
    });
});


//UPDATE SITE ROUTE
router.put("/:id", middleware.checkSiteOwnership, function(req, res){
   //find and update the correct site
   Site.findByIdAndUpdate(req.params.id, req.body.site, function(err, updatedSite){
      if(err){
          res.redirect("/sites");
      } else {
          res.redirect("/sites/" + req.params.id);
      }
   });
   //redirect to show page
});


//DESTROY SITE ROUTE

router.delete("/:id", middleware.checkSiteOwnership, function(req, res){
   Site.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/sites");
      } else {
          res.redirect("/sites");
             }
    });
});

module.exports = router; //returning/exporting router at the end

var express = require("express");
var router = express.Router({mergeParams: true}); //a new instance of express router and adding routes to this router - MERGES PARAMS FROM SITES AND COMMENTS TOGETHER SO THAT INSIDE THE COMMENT ROUTES, WE'RE ABLE TO ACCESS THE :id WE DEFINED
var Site = require("../models/site");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ============================
// COMMENTS ROUTES
// ============================

//COMMENTS NEW

router.get("/new", middleware.isLoggedIn, function(req, res){
    //find site by id
    Site.findById(req.params.id, function(err, site){
       if(err){
            console.log(err);
       } else {
            res.render("comments/new", {site: site});
       } 
    });
});

//COMMENTS CREATE

router.post("/", middleware.isLoggedIn, function(req, res){
   // look up site using ID
    Site.findById(req.params.id, function(err, site){
        if(err){
            console.log(err);
            res.redirect("/sites");
        } else {
            Comment.create(req.body.comment, function(err, comment){
        if(err){
            console.log(err);          
            } else {
                //add username and ID to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    site.comments.push(comment);
                    site.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/sites/" + site._id);
                }
            });
        }
    });
});

// EDITING COMMENT ROUTE

//comment edit route and edit button
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {site_id: req.params.id, comment: foundComment});
        }
    });
});

//comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/sites/" + req.params.id);
        }
    });
});

//DELETE COMMENT ROUTE -> DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           
            res.redirect("back");
       } else {
            req.flash("success", "Comment deleted");
            res.redirect("/sites/" + req.params.id);       
       }
   });
});


module.exports = router; //returning/exporting router at the end
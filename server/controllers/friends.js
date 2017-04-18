console.log("///Friends.js file ready to go///")
var mongoose = require('mongoose')
var Friend = mongoose.model('Friend')


function FriendsController(){
  this.index = function(req,res){
    Friend.find({}, function(err,results){
      res.json(results);
    })
  };

  this.create = function(req,res){
    console.log(req.body)
    Friend.create(req.body,function(err,result){
      if(err){
        console.log(err)
      }else{
        res.json(result)
      }
    })
  };

  this.update = function(req,res){
    Friend.findOne({_id:req.params.id},function(err,friend){
      if(err){
        console.log(err);
      }else{
        friend.name = req.body.name;
        friend.favoriteLanguage = req.body.favoriteLanguage;
        friend.save(function(err,updatedFriend){
          if(err){
            console.log(err);
          }else{
            res.json(updatedFriend);
          }
        })
      }
    })
  };

  this.delete = function(req,res){
    Friend.remove({_id:req.params.id}, function(err){
      if(err){
        console.log(err);
      }else{
        res.json({message: "Friend Deleted!"})
      }
    })
  };

  this.show = function(req,res){
    Friend.findOne({_id:req.params.id}, function(err,result){
      res.json(result);
    })
  };
}
module.exports = new FriendsController();

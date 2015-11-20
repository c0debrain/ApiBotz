

Meteor.startup(function () {
  console.log("server startup");

  Meteor.methods({
    doSomethig:function(){
      console.log("doing something");
    },

    updateCrawler:function(crawler){
      console.log("updating crawler");
      Crawlers.update(crawler._id,crawler);
    }
  });//methods

});//startup

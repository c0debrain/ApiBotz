
Template.example_index.events({
    "change label.btn": function (event) {
      console.log("selection chagned");
      Session.set("selected",event.target.id);
    }
 });

Template.example_index.onRendered(function () {
  console.log("doing render");
   $('[data-toggle="popover"]').popover();
   Session.set("selected","5647fdf259ac96898c68b830");
});

crawler = null;

var callback = function(error,response){
  console.log("error: "+error);
  console.log("response "+response);
}

Template.editor.helpers({
    configAce: function () {
      return function(editor) {
        console.log("doing ace config");
        Edtr = editor;
        editor.getSession().setMode('ace/mode/javascript');
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWrapMode(true);
        editor.setValue(crawler.content);

        editor.on("blur",function(){
          crawler.content = editor.getValue();
        });

      }
    },

    connectAce :function(){
      console.log("connecting ace");
    },

    editor: function(){
      console.log("retrun new crawler");
      crawler = Crawlers.findOne(new Meteor.Collection.ObjectID(Session.get("selected")));
      return crawler;
    },

  });

 Template.editor.events({
    "change #url": function (event,context) {
      crawler.url = event.target.value;
    },

    "change #name": function (event,context){
      crawler.name = event.target.value;
    }
 });

  Template.run.events({
    "click #run": function (event) {
      console.log("button clicked - should save first:");
      console.dir(crawler);
      Meteor.call("updateCrawler",crawler);
    }
 });

//App router
define(['backbone','views/keyHandler'],
  function(Backbone, KeyHandler) {

    var AppRouter = Backbone.Router.extend({

     // Hash maps for routes
     routes : {
      "" : "index"
    },

    initialize: function() {
      //SET ALL LISTS MODELS,ETC.
    },

    index: function() {
      console.log("index called");
      var keyHandler = new KeyHandler();
      keyHandler.render();
      $('#content').html(keyHandler.el);
    }
  });

  return AppRouter;
});

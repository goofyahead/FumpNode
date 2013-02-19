//App router
define(['backbone','views/keyHandler','views/modal'],
  function(Backbone, KeyHandler, ModalView) {

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

      // var modalView = new ModalView();
      // modalView.render();

      // var $modalEL = $("#modal");

      // $('#modal').html(modalView.el);
      // $('#modal').modal();
    }
  });

  return AppRouter;
});

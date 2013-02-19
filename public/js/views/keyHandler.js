
define(['backbone'], function (Backbone){
	var KeyHandler = Backbone.View.extend({
		render: function() {
			this.$el.html('<div> holaaa vista </div> <br> <input> </input>');
		},

		events: {
			'keydown' : 'keyHandle'
		},

		keyHandle: function(e) {
			var timeStamp = new Date().getTime();
			if (e.keyCode == 32) {
				console.log('space pressed, should call API ' + timeStamp);
				$.post("/api/fump", { 'timestamp' : timeStamp, 'id' : 12345 },
				  function(data){
				    console.log(data);
				    var modalView = new ModalView({
				    	contact: data
				    });
				  }, "json");
			}
		}
	});

	return KeyHandler;
});
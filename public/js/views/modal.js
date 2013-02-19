
define(['backbone','text!templates/modalFump.html'], function(Backbone,mytemplate){

	var ModalFump = Backbone.View.extend({
		
		template : _.template(mytemplate),

		initialize: function(){
			console.log("initializing modal fumper");
		},

		render: function(){
			console.log(this.options.contact);
			var compiledTemplate = this.template();
			this.$el.html(compiledTemplate);
			return this;
		},

		open: function () {
			this.$el.modal();
		}
	});

	return ModalFump;
});
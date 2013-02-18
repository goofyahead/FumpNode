
define(['backbone','text!templates/modalFump.html'], function(Backbone,mytemplate){

	var ModalFump = Backbone.View.extend({
		
		template = _.template(mytemplate),
		tagName: 'div',
		id: 'modal',

		initialize: function(){
			console.log("initializing modal fumper");
		},

		render: function(){
			console.log(this.options.fumper);
			var compiledTemplate = this.template({
            	contact: this.options.contact.toJSON()
        	});
			this.$el.html(compiledTemplate);
			return this;
		}
	});

	return ModalFump;
});
window.StartView = Backbone.View.extend({
	initialize: function(){
		this.template = _.template( tpl.get('start'));
	},
	events:{
		"click p": "log"
	},
	log: function(e){
		console.log(e);
	},
	render: function(){
		this.$el.html(this.template());
		return this.el;    // returning just this would make view chainable
	}
});
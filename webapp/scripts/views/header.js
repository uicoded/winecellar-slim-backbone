window.HeaderView = Backbone.View.extend({

	initialize: function(){
		this.template = _.template( tpl.get('header'));
	},
	render: function(){
		this.$el.html(this.template());
		return this.el;	// returning just this would make view chainable
	},
	events: {
		"click #newBtn" : "newWine"
	},
	//  navigate? should this be job of controller?
	newWine: function(){
		app.navigate('wines/new', true);
		return false;
	}
})
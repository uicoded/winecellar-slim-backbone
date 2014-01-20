window.StartView = Backbone.View.extend({
	initialize: function(){
		this.template = _.template( tpl.get('start'));
	},
	render: function(){
		this.$el.html(this.template());
		return this.el;    // returning just this would make view chainable
	}
});
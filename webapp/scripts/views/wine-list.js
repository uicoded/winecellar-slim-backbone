/*
	@param model
*/
window.WineListView = Backbone.View.extend({

	tagName: 'ul',
	className: 'winelist',

	initialize: function(){
		var self = this;
		this.model.bind('reset', this.render, this);		// the model is the collection
		this.model.bind('add', function(wine){
			$(self.el).append( new WineListItemView({model:wine}).render() )
		})
	},

	render: function () {
		_.each( this.model.models , function( wine ){
			this.$el.append( new WineListItemView({model:wine}).render() )
		},this);

		return this.el; // returning just this would make view chainable
	}
});

window.WineListItemView = Backbone.View.extend({

	tagName: 'li',

	initialize: function(){
		// this.template = _.template( $('#wine-list-tmpl').html() );
		this.template = _.template( tpl.get('wine-list-item') );
		this.model.bind( 'change', this.render(), this);
		this.model.bind( 'destroy', this.close(), this);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.el; // returning just this would make view chainable
	}
});
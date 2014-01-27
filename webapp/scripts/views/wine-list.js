/*
	@param model
*/
window.WineListView = Backbone.View.extend({

	tagName: 'ul',
	className: 'winelist',

	initialize: function(){
		var self = this;
		this.model.on('reset', this.render, this);		// the model is the collection
		this.model.on('add', function(wine){
			$(self.el).append( new WineListItemView({model:wine}).render() )
		});
		this.model.on('remove', this.render, this);		// don't try to search for it, just refresh all
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
		this.model.on( 'change', this.render, this);					// change is not triggered upon save
		this.model.on( 'destroy', this.close, this);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this.el; // returning just this would make view chainable
	}
});
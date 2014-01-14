Backbone.View.prototype.close = function(){
	console.log('Closing view ' + this);
	if (this.beforeClose){
		this.beforeClose();
	}
	this.remove();
	this.unbind(); // likely duplicate
};

var AppRouter = Backbone.Router.extend({

	initialize: function(){
		$('#header').html( new HeaderView().render() );
	},

	routes: {
		"" : "list",
		"wines/new" : "newWine",
		"wines/:id" : "wineDetails"
	},

	list: function(){
		this.before(function(){
			this.showView('#content', new StartView());
		});
	},

	// make sure the view is clean before rendering
	showView: function(selector,view){
		if (this.currentView) {
			this.currentView.close();
		}
		$(selector).html(view.render());
		this.currentView = view;
		return view;
	},

	wineDetails: function(id){
		this.before(function(){
			var wine = this.wineList.get(id);
			this.showView("#content", new WineDetailView({model:wine}));
		});
	},

	newWine: function(){
		this.before(function(){
			this.showView('#content', new Wine());
		});
	},

	// make sure you can get wine data
	before: function(callback){
		if (this.wineList){
			if (callback) { callback.call(this); }
		} else {
			this.wineList = new WineCollection();
			var self = this;
			this.wineList.fetch({
				success: function(){
					var winelist = new WineListView({
						model: self.wineList
					}).render();
					$('#sidebar').html(winelist);
					if(callback){ callback.call(self); }
				}
			});
		}
	}
});

// load the templates
tpl.loadTemplates(['header','wine-detail','wine-list-item','start'], function(){
	app = new AppRouter();
	Backbone.history.start();
});
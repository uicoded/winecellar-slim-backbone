/* 
	Revisit why is this necessary - why it is not part of framework.
	Now views do not levarage the el atrribute to render to for another function
	before() to make decision where to render?

	bug the detail view did not return this in render() it was not chainable, but
	also it did not append the rendered html nor returned the rendered html for the before 
	function to correctly append it to the selector
*/ 
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
		$(selector).html(view.render());  // <- WineDetailView.render() bug, there is no return value also it probably meant : view.render().el
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
			this.showView('#content', new WineDetailView({model:wine}));  // new Wine()
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

$(document).ready(function () { //neccessary?
	// load the templates
	tpl.loadTemplates(['header','wine-detail','wine-list-item','start'], function(){
		app = new AppRouter();
		Backbone.history.start();
	});
});
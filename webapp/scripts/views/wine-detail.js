window.WineDetailView = Backbone.View.extend({
	initialize: function(){
		this.template= _.template( tpl.get('wine-detail') );
		this.model.bind("change", this.render, this);			// View called with option, here: new WineDetailView({model: XYZ});
	},
	render: function(){
		//this.$el.html( this.template(this.model.toJSON()));
		return this.template(this.model.toJSON()); // see main.js where the showView() tries to append views to different containers
	},
	events: {
		'click save':'saveWine',
		'click delete': 'deleteWine'
	},
	saveWine : function(){
		this.model.set({
			name: $('#name').val(),
			grapes: $('#grapes').val(),
			country: $('#country').val(),
			region: $('#region').val(),
			year: $('#year').val(),
			description: $('#description').val()
		});

		if(this.model.isNew()){
			var self = this;
			/*
				http://documentcloud.github.io/backbone/#Collection-create
				Equivalent to instantiating a model with a hash of attributes,
				saving the model to the server, and adding the model to the set
				after being successfully created. Returns the new model.
			*/
			app.wineList.create(this.model,{
				success: function(){
					app.navigate('wine?' + self.model.id, false);	// #wine/id
				}
			});
		}else{
			this.model.save();
		}

		return false;
	},

	deleteWine: function(){
		this.model.destroy({
			success: function(){
				alert('Wine deleted successfully');
				window.history.back();
			}
		});
		return false;
	}
});
window.WineDetailView = Backbone.View.extend({
	// View called with options, e.g. new WineDetailView({model: XYZ});
	initialize: function(){
		this.template = _.template( tpl.get('wine-detail') );
		//this.model.on("change", this.render, this);			// causes errors :/
		//this.listenTo(this.model, 'change', this.render);
		this.model.on("error", function(model, xhr, options){   // when a model's save call fails on the server.
			console.log("sync 'error'");
			console.log(model);
			console.log(xhr);
			console.log(options);				
		});
		this.model.on("request", function(model, xhr, options){
			console.log("'request' event on model");
			console.log(model);
			console.log(xhr);
			console.log(options);
		});
		this.model.on("sync", function(model, xhr, options){
			console.log("'sync' event on model");
			console.log(model);
			console.log(xhr);
			console.log(options);
		});
	},
	events:{
		"click #saveBtn": "saveWine",
		"click #deleteBtn": "deleteWine"
	},
	render: function(){
		// "change" event returns callback with (model, options)
		// "change:attribute" returns callback with (model, attribute, options)
		this.$el.html( this.template(this.model.toJSON()));
		//return this.template(this.model.toJSON()); // see main.js where the showView() tries to append views to different containers
		return this.el;
	},
	saveWine : function(){
		//just for debug save with attribute hash
		var modelData = {
			name: $('#name').val(),
			grapes: $('#grapes').val(),
			country: $('#country').val(),
			region: $('#region').val(),
			year: $('#year').val(),
			description: $('#description').val()
		}
		/* 
			Comment out to wait for successful save on server before updating
			Originally save() should 

			set() seems not to trigger 'change' event and hence the List is not updated
			it triggers 'change' first time the view is displayed and save button clicked
			(and ends with Backbone error on line 206) 
		*/
		this.model.set(modelData); 		// wait for successful save on server
		/**/

		if(this.model.isNew()){
			var self = this;
			/*
				http://documentcloud.github.io/backbone/#Collection-create
				Equivalent to instantiating a model with a hash of attributes,
				saving the model to the server, and adding the model to the set
				after being successfully created. Returns the new model.
			
				After creating new wine and adding it to the collection,
				update the URL based on newly retrieved id
			*/
			// app.wineList.create(modelData);
			/**/
			app.wineList.create(modelData, {
				success: function(returnedModel){						// never gets here because of Backbone error triggered by "change" event 
					app.navigate('wines/' + returnedModel.id, false);	// #wines/id
				}
			});
			/**/
		}else{

			this.model.save();
			/** /
			this.model.save(modelData, {								// does not trigger "change" when model data was changed?
				//(model, response, options) and (model, xhr, options)
				success: function(model, response, options){
					console.log('[UPDATE] Model: '+model.id+' successfully saved.');
					console.log(model);
					console.log(response);
					console.log(options);
					alert('Wine ' + model.id + ' successfully updated.');
				},
				error: function(model, xhr, options){
					console.log('[UPDATE] Model: '+model.id+' server error.');
					console.log(model);
					console.log(xhr);
					console.log(options);
					alert('Sorry, Server error during save.');					
				}
			});
			/**/
		}

		return false;
	},

	deleteWine: function(){
		this.model.destroy({
			success: function(){
				alert('Wine deleted successfully.');
				//window.history.back();								// just going back one step, does not mean the previous is not deleted as well. Delete from history
				app.navigate("", {trigger: true, replace: true});	// triggers router, replaces current history entry (wine/id will no longer exist)
			},
			error: function(){
				alert('Something went wrong on server.');
				//window.history.back();
				//app.navigate("help/troubleshooting", {trigger: true, replace: true});
			}
		});
		return false;
	}
});
window.Wine = Backbone.Model.extend({
    defaults: {
        id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    },
    urlRoot: "wines/"
});

window.WineCollection = Backbone.Collection.extend({
	model: Wine,
	url: "wines/"
});
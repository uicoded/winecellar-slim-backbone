window.Wine = Backbone.Model.extend({
    defaults: {
        id: null,
        name: "",
        grapes: "",
        country: "",
        region: "",
        year: "",
        description: "",
        picture: null
    },
    urlRoot: "api/wines"
});

window.WineCollection = Backbone.Collection.extend({
	model: Wine,
	url: "api/wines"
});
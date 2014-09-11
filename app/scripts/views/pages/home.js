(function(namespace) {
    'use strict';

    namespace.Views.Home = Backbone.View.extend({

        template: JST['app/scripts/templates/pages/home.ejs'],

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });
})(App);

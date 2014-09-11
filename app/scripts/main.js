/**
 * @namespace App
 * @description Initial configuration and Namespce for this App
 * @author lester <lesterzone@gmail.com>
 */
(function(root) {
    'use strict';
    root.App = {

        /**
         * Store all Backbone views
         * @name App#Views
         * @type {Object}
         */
        Views: {},

        /**
         * Main config
         * @name App#config
         * @type {Object}
         */
        config: {},

        /**
         * Awesome utils
         * @type {Object}
         */
        utils: {

            /**
             * $('selector').empty() but with vanilla js and a lot faster
             */
            empty: function(id) {
                var wrap = document.getElementById(id);
                while (wrap.firstChild) {
                    wrap.removeChild(wrap.firstChild);
                }
            }
        },

        init: function() {
            /**
             * Override remove function from View
             * @return {Object} view instance
             */
            Backbone.View.prototype.remove = function() {
                // this.$el.html('');
                this.stopListening();
                this.undelegateEvents();
                return this;
            };

            new App.Router();
            Backbone.history.start();
        }
    };
})(window);

if (!PHONEGAP) {
    /**
     * Start application
     */
    $(document).ready(function() {
        'use strict';
        App.init();
    });
}

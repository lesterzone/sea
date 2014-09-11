/**
 * @constructor
 * @class Router
 * @name App.Router
 * @description Main router
 * @author lesterzone <lesterzone@gmail.com>
 */
'use strict';
(function(namespace) {
    namespace.Router = Backbone.Router.extend({

        /**
         * @description Router Initialize function
         * @name Router#initialize
         * @memberOf Router
         */
        initialize: function() {
            this.currentView = null;

            /**
             * currentPage comes from ratchet as a function/object
             */
            var currentPage = currentPage || '';
            this.currentPage = currentPage;
            this.stateHistory = [];
            this.container = $('body');
        },

        /**
         * All routes for this App
         * @name Router#routes
         * @type {Object}
         */
        routes: {

            /**
             * Static pages and Home
             */
            '': 'home',
        },

        /**
         * @name Router#cleanView
         * @description Remove events associated to a view
         *              Un-delegate events associated to a view
         * @memberOf Router
         * @param  {Object} view A Backbone View instance
         */
        cleanView: function(view) {
            if (this.currentView) {
                this.currentView.remove();
            }
            this.currentView = view;
        },

        handleProgress: function(event) {
            var percentComplete = 0;
            if (event.lengthComputable) {
                percentComplete = event.loaded / event.total;
            }
        },

        /**
         * Visit /
         */
        home: function() {
            var view = new App.Views.Home();

            /**
             * Transition to home by slide[left/right]
             */
            this.slidePage(view.render().$el);

            /**
             * Clean view
             */
            this.cleanView(view);
        },

        /**
         * Use this function if you want PageSlider to automatically determine
         * the sliding direction based on the state history
         * @param  {Object} page A render result of a backbone view instance
         * @return {Function}    A call to slidePageFrom
         */
        slidePage: function(page) {
            if (!page) {
                return;
            }

            var length = this.stateHistory.length,
                state = window.location.hash;

            console.log('route:', state);
            if (length === 0) {
                this.stateHistory.push(state);
                return this.slidePageFrom(page);
            }

            if (state === this.stateHistory[length - 2]) {
                this.stateHistory.pop();
                return this.slidePageFrom(page, 'left');
            }

            this.stateHistory.push(state);
            return this.slidePageFrom(page, 'right');
        },

        /**
         * @param  {Object} page An instance of backbone view rendered
         * @param  {String} from left or right
         */
        slidePageFrom: function(page, from) {
            this.container.append(page);

            if (!this.currentPage || !from) {
                page.attr('class', 'page center');
                this.currentPage = page;
                return;
            }

            // Position the page at the starting position of the animation
            page.attr('class', 'page ' + from);

            this.currentPage.one('webkitTransitionEnd', function(e) {
                $(e.target).remove();
            });

            /**
             * Position the new page and the current page at the ending position of
             * their animation with a transition class indicating the duration of
             * the animation
             */
            page.attr('class', 'page transition center');
            var direction = from === 'left' ? 'right' : 'left';

            this.currentPage.attr('class', 'page transition ' + direction);
            this.currentPage = page;
        }
    });
})(App);

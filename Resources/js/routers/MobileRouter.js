define([
    "jquery",
    "backbone",
    "models/ConfigModel",
    "models/UserModel",
    "../../ui/handheld/LoginView",
    "collections/TasksCollection"
], function( $, Backbone, ConfigModel, UserModel, MenuBarView, LoginView, TasksCollection ) {
    var Router = Backbone.Router.extend({

        initialize: function() {
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },

        routes: {
            "": "login",

            "home": "home",
            "login": "login"
        },

        home: function() {
            console.log('at home');
        },

        login: function() {
            var user = new UserModel();

            user.authenticate()
                .done(function() {
                    router.navigate( 'home', { trigger: true } );
                })
                .fail(function() {
                    loginView = new LoginView( {
                        model: user,
                        router: this
                    } );

                    loginView.render();
                });
        }

    });

    return Router;
});
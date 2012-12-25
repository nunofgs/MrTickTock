define([
    "jquery",
    "backbone",
    "models/ConfigModel",
    "models/UserModel",
    "models/UpdateModel",
    "views/MenuBarView",
    "views/LoginView",
    "collections/TasksCollection"
], function( $, Backbone, ConfigModel, UserModel, UpdateModel, MenuBarView, LoginView, TasksCollection ) {
    var Router = Backbone.Router.extend({

        initialize: function() {
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },

        routes: {
            "": "settings",

            "home": "home",
            "settings": "settings"
        },

        home: function() {
            var user = new UserModel(),
                tasks = new TasksCollection( {
                    user: user
                } ),
                loginView = new LoginView( {
                    model: user,
                    router: this
                } ),
                mainView = new MenuBarView( {
                    loginView: loginView,
                    collection: tasks
                } );

            tasks.bind( 'reset', mainView.render );
            tasks.fetch();
        },

        settings: function() {
            var user = new UserModel(),
                update = new UpdateModel();

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
define([
    "app",
    "jquery",
    "backbone",
    "models/TaskModel",
    "models/NotificationModel"
], function( App, $, Backbone, Task ) {
    var Tasks = Backbone.Collection.extend({

        model: Task,

        initialize: function( options ) {
            this.email = options.user.get( 'email' );
            this.password = options.user.get( 'password' );
        },

        url: function() {
            return App.get( 'base_url' ) + 'app/api/get_tasks';
        },

        sync: function( method, model, options ) {
            var self = this,
                data = {};

            if ( method === 'read' ) {
                data = {
                    visible: true,
                    closed: false,
                    type: 'user',
                    get_hidden_timer: true
                };
            }

            // always POST
            method = 'create';

            data = _.extend( data, {
                email: this.email,
                password: this.password
            } );

            options.data = $.param( _.extend( data, options.data ) );

            return Backbone.sync( method, model, options )
                .done( function() {
                    self._updateActiveTask.call( self );
                } );
        },

        parse: function( response ) {
            return response.content;
        },

        _updateActiveTask: function() {
            var self = this;

            $.ajax( {
                url: App.get( 'base_url' ) + 'app/api/is_timer_active',
                type: 'POST',
                data: {
                    email: this.email,
                    password: this.password
                }
            } ).done( function( response ) {
                var jsonTask = _.first( response.content );

                if (jsonTask.is_timer) {
                    var task = self.get({ id: jsonTask.task_id });

                    if (task) {
                        task.set({ active: jsonTask.is_timer });
                    }
                }
            } );
        }

    });

    return Tasks;
});
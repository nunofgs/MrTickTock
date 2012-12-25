define([
    "app",
    "jquery",
    "backbone"
], function( App, $, Backbone ) {
    var Task = Backbone.Model.extend({

        defaults: {
            id: 0,
            task_name: "",
            project_name: "",
            menuItem: null,
            active: false
        },

        initialize: function() {
            this.on( "change:active", this.changeActive, this );
        },

        changeActive: function( model, val, options ) {
            model.get('menuItem').setState( val );
        },

        sync: function( method, model, options ) {
            if ( method === 'update' ) {
                this.url = App.get( 'base_url' ) + (model.get( 'active' ) ? 'app/api/start_timer' : 'app/api/stop_timer');
            }

            options.data = {
                task_id: model.get( 'id' )
            };

            return this.collection.sync( method, this, options );
        }

    });

    return Task;
});
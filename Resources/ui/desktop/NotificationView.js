define([
    'jquery',
    'backbone'
], function( $, Backbone ){
    var View = Backbone.View.extend({

        initialize: function () {
            _.bindAll( this );
        },

        render: function() {
            try {
                var notification = Ti.Notification.createNotification();

                notification.setIcon( this.model.get( 'icon' ) );
                notification.setTitle( this.model.get( 'title' ) );
                notification.setMessage( this.model.get( 'message' ) );
                notification.setTimeout( this.model.get( 'timeout' ) );

                notification.show();
            } catch( e ) {
                alert( e );
            }
        }

    });

    return View;
});
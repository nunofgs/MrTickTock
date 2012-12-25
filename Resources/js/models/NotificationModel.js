define([
    'app',
    "jquery",
    "backbone"
], function( App, $, Backbone ) {
    var Notification = Backbone.Model.extend({

        defaults: {
            title: 'title',
            message: 'message',
            timeout: 5000,
            icon: App.get( 'icon' )
        }

    });

    return Notification;
});
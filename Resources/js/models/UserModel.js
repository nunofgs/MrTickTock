define([
    "app",
    "jquery",
    "backbone"
], function( App, $, Backbone ) {
    var User = Backbone.Model.extend({

        defaults: {
            email: '',
            password: ''
        },

        initialize: function() {
            _.bindAll( this );

            this.load();

            this.bind( "change", this.save );
        },

        load: function() {
            this.set({
                email: Ti.App.Properties.getString( 'email', this.defaults.email ),
                password: Ti.App.Properties.getString( 'password', this.defaults.password )
            });
        },

        save: function() {
            Ti.App.Properties.setString( 'email', this.get('email') );
            Ti.App.Properties.setString( 'password', this.get('password') );
        },

        authenticate: function( options ) {
            var deferred = $.Deferred();

            if (! (this.get( 'email' ) && this.get( 'password' )) ) {
                deferred.reject();
            }

            $.ajax( {
                url: App.get( 'base_url' ) + 'app/api/is_timer_active',
                type: 'POST',
                data: {
                    email: this.get( 'email' ),
                    password: this.get( 'password' )
                }
            } ).done( function( response ) {
                if ( response.errors.length ) {
                    deferred.reject( response.errors );
                } else {
                    deferred.resolve( response );
                }
            } ).fail( deferred.reject );

            return deferred.promise();
        }

    });

    return User;
});
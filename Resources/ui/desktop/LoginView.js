define([
    'jquery',
    'backbone'
], function( $, Backbone ){
    var View = Backbone.View.extend({

        el: $('#login'),

        events: {
            "submit": "loginSubmit",
            "change #email": "emailChange",
            "change #password": "passwordChange"
        },

        template: _.template( $( "#template-login" ).html() ),

        initialize: function () {
            _.bindAll( this );
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );

            Ti.UI.currentWindow.show();
        },

        emailChange: function( event ) {
            this.model.set({ email: $( event.currentTarget ).val() });
        },

        passwordChange: function( event ) {
            this.model.set({ password: $( event.currentTarget ).val() });
        },

        loginSubmit: function( event ) {
            var self = this;

            self.model.authenticate()
                .done( function( response ) {
                    self.model.save();

                    router.navigate( 'home', { trigger: true } );

                    Ti.UI.currentWindow.hide();
                } ).fail( function() {
                    alert( 'Invalid login or password.' );
                } );

            return false;
        }

    });

    // Returns the View class
    return View;
});
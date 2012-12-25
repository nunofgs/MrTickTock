define([
    'jquery',
    'backbone'
], function( $, Backbone ){
    var View = Backbone.View.extend({

        initialize: function () {
            var self = Titanium.UI.createWindow({
                title:'Login'
            });
            self.open({modal:true});
        }

    });

    // Returns the View class
    return View;
});
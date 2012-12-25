define([
    "app",
    "jquery",
    "backbone"
], function( App, $, Backbone ) {
    var Update = Backbone.Model.extend({

        defaults: {
            interval: 60000
        },

        initialize: function() {
            _.bindAll( this );

            this.overrideStreamURL();
            this.checkForUpdate();
        },

        // FIXME: This is a workaround while the real UpdateManager is not implemented
        overrideStreamURL: function() {
            Ti.Network.online = function() {
                return navigator.onLine;
            };

            Ti.App.getStreamURL = function() {
                return "http://nunofgs.github.com/MrTickTock/updates/latest.json";
            };
        },

        checkForUpdate: function() {
            this.updateMonitorId = Ti.UpdateManager.startMonitor( [Ti.App.getID()], this.updateDetected, this.get('interval') );
        },

        updateDetected: function( details ) {
            // Stop looking for updates
            Ti.UpdateManager.cancelMonitor( this.updateMonitorId );

            // FIXME: This is a workaround while the real UpdateManager is not implemented
            if (!Ti.UpdateManager.compareVersions(Ti.App.getVersion(), details.version)) {
                return;
            }

            var message = 'Version ' + details.version + ' is available. Do you want to update?';

            if( confirm( message ) ) {
                Ti.UpdateManager.installAppUpdate(details);
            }
        }

    });

    return Update;
});
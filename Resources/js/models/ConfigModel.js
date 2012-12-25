define([
    "jquery",
    "backbone"
], function( $, Backbone ) {
    var Config = Backbone.Model.extend({

        defaults: {
            // MrTickTock api
            base_url: "https://mrticktock.com/",
            icon: 'app://images/logo-small.png',

            // Platform
            os_name: Ti.Platform.osname || Ti.Platform.getName(),
            version: Ti.Platform.version || Ti.Platform.getVersion(),
            width: Ti.Platform.displayCaps ? Ti.Platform.displayCaps.platformWidth : Ti.UI.getCurrentWindow().width,
            height: Ti.Platform.displayCaps ? Ti.Platform.displayCaps.platformHeight : Ti.UI.getCurrentWindow().height,
            isTablet: Ti.Platform.osname === 'ipad' || ( Ti.Platform.osname === 'android' && ( width > 899 || height > 899 ) ),
            isHandheld: !this.isTablet && ( Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'android' ),
            isDesktop: !this.isTablet && !this.isHandheld
        }

    });

    return Config;
});
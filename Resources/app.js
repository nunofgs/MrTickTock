//Ti.include('js/libs/require.js');

require.config({
    baseUrl: '/js',

    // Core Libraries
    paths: {
        "jquery": "libs/jquery",
        "underscore": "libs/underscore",
        "backbone": "libs/backbone",
        "views": "../ui/desktop/"
    },

    // third party scripts that are not AMD compatible
    shim: {
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"  //attaches "Backbone" to the window object
        },
    }

});

define('app', [ 'models/ConfigModel' ], function( ConfigModel ) {
    var App = new ConfigModel();

    require([
        'jquery',
        'backbone',
        'routers/DesktopRouter',
        'routers/MobileRouter'
    ], function( $, Backbone, DesktopRouter, MobileRouter ) {

        if ( App.get( 'isHandheld' ) ) {
            this.router = new MobileRouter();
        } else if ( App.get( 'isDesktop' ) ) {
            this.router = new DesktopRouter();
        }

    });

    return App;
});
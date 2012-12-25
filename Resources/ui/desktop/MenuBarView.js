define([
    'jquery',
    'backbone',
    'models/TaskModel',
    'models/NotificationModel',
    'views/NotificationView'
], function( $, Backbone, TaskModel, NotificationModel, NotificationView ){
    var menu,
        tray;

    var View = Backbone.View.extend({

        initialize: function() {
            _.bindAll( this );

            menu = Ti.UI.createMenu();

            tray = Ti.UI.addTray( "app://images/menubar.png" );
            tray.setMenu( menu );

            $(document)
                .ajaxStart(function() {
                    tray.setIcon( "app://images/loading.gif" );
                })
                .ajaxStop(function() {
                    tray.setIcon( "app://images/menubar.png" );
                });
        },

        render: function() {
            menu.clear();

            var projects = this.collection.groupBy( 'project_name' );
            for ( var project in projects ) {
                _addMenuItem( project ).disable();

                for ( var task_index in projects[project] ) {
                    var task = projects[project][task_index];

                    var tm = _addMenuItem( '  ' + task.get( 'task_name' ) );
                    tm.task = task;
                    tm.addEventListener( 'clicked', this.toggleTimer );

                    task.set({ menuItem: tm });
                }
            }

            function _addMenuItem( name, func ) {
                if (name !== null) {
                    var item = Ti.UI.createCheckMenuItem( name, func );
                    item.setAutoCheck( false );

                    menu.appendItem( item );
                } else {
                    menu.addSeparatorItem();
                }

                return item;
            }

            _addMenuItem( null );
            _addMenuItem( 'Refresh', this.refresh );
            _addMenuItem( 'Settings', this.openSettings );
            _addMenuItem( null );
            _addMenuItem( 'Quit MrTickTock', Ti.App.exit );
        },

        uncheckAllMenuItems: function () {
            for ( var i=0; i < menu.getLength(); i++ ) {
                var item = menu.getItemAt( i );

                if ( item.isCheck() ) {
                    item.setState( false );
                }
            }
        },

        toggleTimer: function( event ) {
            this.uncheckAllMenuItems();

            var item = event.getTarget(),
                active = !item.task.get( 'active' );

            item.task.save({
                active: active
            }).done(function() {
                var notification = new NotificationModel({
                        title: active ? 'Timer active'
                                      : 'Timer inactive',
                        message: active ? 'The timer is now running on task '+ item.task.get( 'task_name' ) +' for project '+ item.task.get( 'project_name' ) +'.'
                                        : 'The timer has been stopped on task '+ item.task.get( 'task_name' ) +' for project '+ item.task.get( 'project_name' ) +'.',
                    }),
                    view = new NotificationView({ model: notification });

                view.render();
            });
        },

        openSettings: function( event ) {
            this.options.loginView.render();
        },

        refresh: function( event ) {
            this.collection.fetch();
            this.render();
        }

    });

    return View;
});

//jQuery
import $ from 'jquery';//../src/js/jquery-1.9.1.js
import jQuery from 'jquery';//../src/js/jquery-1.9.1.js
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

//Angular Framework
require('angular');
//Bootstrap Components
require('bootstrap');
require('../src/js/jquery-nestable.js');
//Angular Plugins
require('angular-ui-router');
require('angular-messages');
require('ng-storage');
require('angular-sessionstorage');
require('../bower_components/angular-ui-tree/dist/angular-ui-tree.js');


//App Configuration
require('../src/app.js');

//controllers
require('../src/controllers/main-controller.js');
require('../src/controllers/login-controller.js');
require('../src/controllers/home-controller.js');

//services

//factories
require('../src/services/interceptor.js');
require('../src/services/authentification-service.js');
require('../src/services/angular-nestable.js');

//directives
require('../src/directives/modals/new-board.js');
require('../src/directives/file-upload.js');
require('../src/directives/confirm-click.js');

//filters
require('../src/filters/is-empty.js');
require('../src/filters/to-date.js');
require('../src/filters/base64.js');
require('../src/filters/file-extension.js');
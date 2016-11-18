
<?php
// Autoload; 
require 'vendor/autoload.php';

// SQLLite Database
require 'www/lib/Database.php';
// Register database
Flight::register('db', 'MyDB'); 

// Base Controller
require 'www/lib/base-controller.php';

//Include Controllers
require 'www/controllers/auth.php'; 
require 'www/controllers/index.php'; 
require 'www/controllers/boards.php'; 
require 'www/controllers/templates.php'; 
require 'www/controllers/fileupload.php'; 

// Register Controllers
Flight::register('index', 'Index'); 
Flight::register('auth', 'Auth'); 
Flight::register('boards', 'Boards'); 
Flight::register('templates', 'Templates'); 
Flight::register('fileupload', 'File_Upload'); 





// Register Views Path
Flight::set('flight.views.path', 'www/views');


// Router
require ('www/lib/Routes.php');

//Framework start
Flight::start();
?>

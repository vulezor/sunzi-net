<?php 
$production = true; 
?>
<!DOCTYPE html>
<html lang="en" ng-app="sunzinet">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contenttool</title>
	<link rel="shortcut icon" href="/public/assets/img/icons/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="/public/assets/img/icons/apple-touch-icon.png" />
	<link rel="apple-touch-icon" sizes="57x57" href="/public/assets/img/icons/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="/public/assets/img/icons/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="/public/assets/img/icons/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="/public/assets/img/icons/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/public/assets/img/icons/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="/public/assets/img/icons/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/public/assets/img/icons/apple-touch-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/public/assets/img/icons/apple-touch-icon-180x180.png" />

    <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,400i,500,500i,700,700i&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="/public/assets/css/all.css" >
    <?php
       echo'<script src="/public/bundle.js?q='.md5(time()).'"></script>';
   ?>
</head>
<body ng-controller="mainController">
    <div id="loadicon">
    	<svg xmlns="http://www.w3.org/2000/svg" style="" width="126px" height="126px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gears"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"/><g transform="translate(-20,-20)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="#8f7f59" transform="rotate(29.9184 50 50)"><animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"/></path></g><g transform="translate(20,20) rotate(15 50 50)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="#9f9fab" transform="rotate(60.0816 50 50)"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"/></path></g></svg>
    </div>
   <div class="main-content" ui-view></div>
   
</body>
</html>
<?php
Flight::route('/', function(){
    $index = Flight::index()->index();
});

//AUTH
Flight::route('POST /authentificate', function(){
    $index = Flight::auth()->login();
});
//MEBER
Flight::route('GET /check_member', function(){
    $index = Flight::index()->check_member();
});

Flight::route('GET /check_members/@id', function($id){
    $index = Flight::index()->check_member($id);
});

Flight::route('POST /insert_member', function(){
    $index = Flight::index()->insert();
});

Flight::route('PUT /update_member/@id', function($id){
    $index = Flight::index()->insert($id);
});

Flight::route('DELETE /delete_member/@id', function($id){
    // print_r(Flight::request());
    $index = Flight::index()->delete_member($id);
});
Flight::route('DELETE /delete_members', function(){
    $index = Flight::index()->delete_members();
});

//BOARDS
Flight::route('GET /get_boards', function(){
    $index = Flight::boards()->get_boards();
});

Flight::route('GET /get_board/@id/@user', function($id, $user){
    $index = Flight::boards()->get_boards($id, $user);
});

Flight::route('GET /get_board_transfer/@id', function($id){
    $index = Flight::boards()->get_boards($id);
});

Flight::route('POST /insert_board', function(){
    $index = Flight::boards()->insert_board();
});

Flight::route('PUT /update_board/@id', function($id){
    $index = Flight::boards()->insert_board($id);
});

Flight::route('DELETE /delete_board/@id', function($id){
    $index = Flight::boards()->delete_board($id);
});

Flight::route('PUT /unlockboard/@id', function($id){
   // print_r($id);die();
    $index = Flight::boards()->unlock_board( (int) $id);
});

Flight::route('PUT /lockboard/@id/@user', function($id, $user){
    //print_r($id);print_r($user);die();
    $index = Flight::boards()->lock_board( (int) $id, $user);
});


//file upload, download
flight::route('POST /file_uploads/@id/@uid', function($id, $uid){
    $index = Flight::fileupload()->upload_files($id, $uid);
});


flight::route('GET /file_download', function(){
    $index = Flight::fileupload()->download_file();
});

flight::route('GET /download_zip', function(){
    $index = Flight::fileupload()->download_zip();
});

//templates
Flight::route('GET /nodes_render', function(){
    $index = Flight::templates()->nodes_render();
});




?>
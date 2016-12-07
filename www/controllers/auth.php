<?php
class Auth extends Base_Controller {
    private $table = 'members';

    public function __construct(){
        parent::__construct();
    }

    public function login(){
       /* print_r($_POST);
        die();*/
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $sql = "SELECT * FROM boards";
        $result = Flight::db()->get($sql);
        $datetime = date('Y-m-d H:i:s');
            foreach($result as $key=>$value){
                $date1 = new DateTime($datetime);
                $date2 = new DateTime($value['modified']);
                $diff = $date2->diff($date1);
                if($diff->h >= 1 || $diff->i>30){
                    $where = 'id = "' . $value['id'] . '"';
                    $data = array(
                        "lock"=>0,
                        "user"=>"",
                        "modified" => date('Y-m-d H:i:s')
                    );
                    Flight::db()->update('boards', $data, $where);
                } 
            }
        
        //create user token
        $token = substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 1).substr(md5(time()),1);
        $return_data = array('token'=>$token, 'user'=>$username);

        header("Content-type: application/json");
        echo json_encode($return_data);
    }
}
?>
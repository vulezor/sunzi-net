<?php
class Auth extends Base_Controller {
    private $table = 'members';

    public function __construct(){
        parent::__construct();
    }

    public function login(){
     $data = json_decode(file_get_contents('php://input'), true);
        /*$sql = "SELECT * FROM $this->table WHERE email= :email";
        $result = Flight::db()->get($sql, [':email'=>$data['username']]);
       
        if($result){
            $result = $result[0];
            $token = hash('sha256', $result['id'].$result['email'].$this->randomString());
            $data = ['token'=>$token];
            $where = 'id="' . $result['id'] . '"';
            Flight::db()->update($this->table, $data, $where);
            unset($result['password']);
            unset($result['created']);
            unset($result['modified']);
            unset($result['is_active']);
            $result['token'] = $token;
            
        } */

        
        $token = hash('sha256', $data['username'].$this->randomString());
        $data = ['token'=>$token, 'user'=>$data['username']];
        header("Content-type: application/json");
        echo json_encode($data);//$result
    }

    private function randomString(){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randstring = '';
        for ($i = 0; $i < 10; $i++) {
            $randstring = $characters[rand(0, strlen($characters))];
        }
        return $randstring;
    }
}
?>
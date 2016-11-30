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
        
        //check if inactivity of all users higher than 30 min and set it board unlock if it is
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
        $token = hash('sha256', $data['username'].$this->randomString());
        $data = ['token'=>$token, 'user'=>$data['username']];

        header("Content-type: application/json");
        echo json_encode($data);//$result
    }

    private function randomString(){
        return substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 1).substr(md5(time()),1);
    }
}
?>
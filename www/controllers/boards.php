<?php 
class Boards extends Base_Controller
{

    private $table = 'boards';
    
    public function __construct(){
        parent::__construct();
    }
    public function get_boards($id=null, $user=null){
        
        
        if($id){
            
            $sql = "SELECT * FROM $this->table WHERE id= :id";
            $result = Flight::db()->get($sql, [':id'=>$id]);
            //unlocking/locking board
            if($id && $user){
                $sql = "SELECT * FROM $this->table WHERE user= :user";
                $check = Flight::db()->get($sql, [':user'=>$user]);
                foreach($check as $key=>$value){
                    if($value['user'] == $user){
                        $this->unlock_board( (int) $value['id'] );
                    }
                }
                if($result[0]['lock']==0 && $result[0]['user'] == ""){
                    $this->lock_board( (int) $id, $user);
                    $result[0]['edit_board'] = 'edit';
                } else {
                    $result[0]['edit_board'] = 'no_edit';
                }
            }

        } else {
           $sql = "SELECT * FROM $this->table";
           $result = Flight::db()->get($sql);
        }

        if(isset($_GET["temp_board_id"])){
           
            $temp_board_id = (int) $_GET["temp_board_id"];
            $user = $_GET["user"];
            $sql = "SELECT * FROM $this->table WHERE id= :id";
            $check_result = Flight::db()->get($sql, [':id'=>$temp_board_id]);
           
            if($check_result[0]['lock']==0 && $check_result[0]['user']==""){
                $this->lock_board($temp_board_id, $user);
                $check_result[0]['edit_board'] = 'edit';
                $check_result[0]['lock'] = 1;
                $check_result[0]['user'] = $user;
                $result[] = $check_result[0];
            } else {
                $check_result[0]['edit_board'] = 'no_edit';
                $result[] = $check_result[0];
            }
        }
        header("Content-type: application/json");
        echo json_encode($result);
    }

    public function unlock_board($id=null){
         $where = 'id = "' . $id . '"';
            $data = array(
                "lock"=>0,
                "user"=>"",
                "modified" => date('Y-m-d H:i:s')
            );
            $result = Flight::db()->update($this->table, $data, $where);
    }
  
    public function lock_board($id=null, $user=""){
         $where = 'id = "' . $id . '"';
            $data = array(
                "lock"=>1,
                "user"=>$user,
                "modified" => date('Y-m-d H:i:s')
            );
            $result = Flight::db()->update($this->table, $data, $where);
    }


    public function insert_board($id=null){
        $data = json_decode(file_get_contents('php://input'), true);
        if($id){
            $where = 'id = "' . $id . '"';
            if(isset($data['data'])){
                 $data['data'] = json_encode($data['data']);
                 $data['modified'] = date('Y-m-d H:i:s');
            }
            $result = Flight::db()->update($this->table, $data, $where);
        }else {
            $data['data'] = json_encode($data['data']);
            $data['lock'] = 0;
            $data['user'] = "";
            $data['modified'] = date('Y-m-d H:i:s');
            $data['created'] = date('Y-m-d H:i:s');
            $result = Flight::db()->add($this->table, $data);
        }
        header("Content-type: application/json");
        echo json_encode($result, JSON_NUMERIC_CHECK);
    }

    public function delete_board($id=null) { 
       $data = Flight::db()->delete($this->table, $id);
       if($data){
           echo json_encode(['error'=>0,'message'=>'Succesfull delete board']);
       };
    }


}
?>
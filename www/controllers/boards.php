<?php 
class Boards extends Base_Controller
{

    private $table = 'boards';
    
    public function __construct(){
        parent::__construct();
    }
    public function get_boards($id=null){
        
        if($id){
           $sql = "SELECT * FROM $this->table WHERE id= :id";
           $result = Flight::db()->get($sql, [':id'=>$id]);
           

            

            if(isset($_GET['edit_board'])){

                if($result[0]['lock']==1 && $result[0]['user'] == $_GET['user']){
                    $this->unlock_board( (int) $_GET['leaving_board_id'] );
                    $this->lock_board( (int) $id, $_GET['user'] );
                    $result[0]['edit_board'] = 'edit';
                } 

                if($result[0]['lock']==1 && $result[0]['user'] != $_GET['user'] &&  $_GET['edit_board']=='edit'){
                    $this->unlock_board( (int) $_GET['leaving_board_id'] );
                    $result[0]['edit_board'] = 'no_edit';
                } 
                if($result[0]['lock']==1 && $result[0]['user'] != $_GET['user'] &&  $_GET['edit_board']=='no_edit'){
                     $result[0]['edit_board'] = 'no_edit';
                }

                if($result[0]['lock']==0 &&  $_GET['edit_board']=='edit') {
                    if(isset($_GET['leaving_board_id'])){
                        $this->unlock_board( (int) $_GET['leaving_board_id'] );
                    }
                    $result[0]['edit_board'] = 'edit';
                    $this->lock_board( (int) $id, $_GET['user'] );
                } 

                if($result[0]['lock']==0 &&  $_GET['edit_board']=='no_edit') {
                    $result[0]['edit_board'] = 'edit';
                    $this->lock_board( (int) $id, $_GET['user'] );
                } 

            } else {

                if($result[0]['lock']==0) {
                    $result[0]['edit_board'] = 'edit';
                    if(isset($_GET['leaving_board_id'])){
                        $this->unlock_board( (int) $_GET['leaving_board_id'] );
                    }
                    $this->lock_board( (int) $id, $_GET['user'] );
                }

                if($result[0]['lock']==1 && $result[0]['user'] != $_GET['user']){
                    if(isset($_GET['leaving_board_id'])){
                        $this->unlock_board((int) $_GET['leaving_board_id']);
                    }
                    $result[0]['edit_board'] = 'no_edit';
                }

                 if($result[0]['lock']==1 && $result[0]['user'] == $_GET['user']){
                     if(isset($_GET['leaving_board_id'])){
                    $this->unlock_board( (int) $_GET['leaving_board_id'] );
                     }
                    $this->lock_board( (int) $id, $_GET['user'] );
                    $result[0]['edit_board'] = 'edit';
                } 
            }
            
           

        } else {
           $sql = "SELECT * FROM $this->table";
           $result = Flight::db()->get($sql);
        }
        header("Content-type: application/json");
        echo json_encode($result);
    }

    private function unlock_board($id=null){
        //print_r($id);die();
         $where = 'id = "' . $id . '"';
            $data = array(
                "lock"=>0,
                "user"=>""
            );
            $result = Flight::db()->update($this->table, $data, $where);
    }

    private function lock_board($id=null, $user=""){
        //print_r($id);die();
         $where = 'id = "' . $id . '"';
            $data = array(
                "lock"=>1,
                "user"=>$user
            );
            $result = Flight::db()->update($this->table, $data, $where);
    }


    public function insert_board($id=null){
        $data = json_decode(file_get_contents('php://input'), true);
        if($id){
            $where = 'id = "' . $id . '"';
            if(isset($data['data'])){
                 $data['data'] = json_encode($data['data']);
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
<?php
class Index extends Base_Controller
{

    private $table = 'members';

    public function __construct(){
        parent::__construct();
    }

    public function index(){
        Flight::render('index.php');
    } 


    public function check_member($id=null){
        if($id){
            $sql = "SELECT * FROM $this->table WHERE id= :id";
           $result = Flight::db()->get($sql, [':id'=>$id]);
        } else {
           $sql = "SELECT * FROM $this->table";
           $result = Flight::db()->get($sql);
        }
        header("Content-type: application/json");
        echo json_encode($result);
    } 

    public function insert($id=null){
        $data = json_decode(file_get_contents('php://input'), true);
        if($id){
            $where = 'id = "' . $id . '"';
            $result = Flight::db()->update($this->table, $data, $where);
        }else {
            $result = Flight::db()->add($this->table, $data);
        }
        header("Content-type: application/json");
        echo json_encode($result);
    }

    public function delete_member($id=null) { 
       $data = Flight::db()->delete($this->table, $id);
       if($data){
           echo json_encode(['error'=>0,'message'=>'Succesfull delete member']);
       };
    }

    public function delete_members() { 
       $id = array('1,2,3,5,6,7');
       $data = Flight::db()->delete($this->table, $id);
       if($data){
           echo json_encode(['error'=>0,'message'=>'Succesfull delete members']);
       };
    }


  

  
}

?>
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
        } else {
           $sql = "SELECT * FROM $this->table";
           $result = Flight::db()->get($sql);
        }
        header("Content-type: application/json");
        echo json_encode($result);
    }

    public function insert_board($id=null){
        $data = json_decode(file_get_contents('php://input'), true);
       /* echo'<pre>';
        print_r(json_encode($data['data']));
        die;*/
        if($id){
            $where = 'id = "' . $id . '"';
            if(isset($data['data'])){
                 $data['data'] = json_encode($data['data']);
            }
            $result = Flight::db()->update($this->table, $data, $where);
        }else {
            $data['data'] = json_encode($data['data']);
            $data['lock'] = '0';
            $data['modified'] = date('Y-m-d H:i:s');
            $data['created'] = date('Y-m-d H:i:s');
            $result = Flight::db()->add($this->table, $data);
        }
        header("Content-type: application/json");
        echo json_encode($result, JSON_NUMERIC_CHECK);
    }

   
}
?>
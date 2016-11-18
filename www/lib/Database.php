<?php
class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('db/test.s3db');
    }

    //GET
    /**
    *@param $sql string
    *@param $array array
    *@param $fetchMode SQLITE3 fetch mode type
    *@return array
    */
    public function get($sql, $array=array(), $fetchMode=SQLITE3_ASSOC){
        $data = [];
        $stmt = $this->prepare($sql);
        foreach($array as $key=>$value){
            $stmt->bindValue("$key" , $value);
        }
        $result = $stmt->execute();
       
        while($row = $result->fetchArray($fetchMode)) {
            $data[]=$row;  
        }
        return $data;
    }

    //INSERT
    /**
    *@param string $tabe name of table to insert into
    *@param string $data  associative array
    *@return array
    */
    public function add($table, $data){
    	ksort($data);
    	$fieldNames = implode(', ', array_keys($data));
    	$fieldValues = ':' . implode(', :', array_keys($data));
    	$stmt = $this->prepare("INSERT INTO $table ($fieldNames) VALUES ($fieldValues)");
    	foreach ($data as $key => $value){
    		$stmt->bindValue(":$key", $value); 
    	}
    	$stmt->execute();
        $id = $this->lastInsertRowID();
       // print_r($id); die;
        $sql = 'SELECT * FROM '. $table .' WHERE id= :id';
        $data = $this->get($sql, array(':id'=>$id));
        return $data;
    }

    //UPDATE
    /**
    *@param string $tabe a name of table to update 
    *@param string $data an associative array
    *@param string $where The WHERE query part
   */
    public function update($table, $data, $where){
        ksort($data);
        $fieldDetails = NULL;
        foreach($data as $key => $value){
            $fieldDetails .="$key=:$key, ";
        }
        $fieldDetails = rtrim($fieldDetails, ', ');
        $stmt = $this->prepare("UPDATE $table SET $fieldDetails WHERE $where");
        foreach($data as $key=>$value){
            $stmt->bindValue(":$key", $value);
        }
        $stmt->execute();
        $sql = 'SELECT * FROM '. $table .' WHERE '. $where;
        $data = $this->get($sql);
        return $data;
    }

    //DELETE
    /**
    *@param $table string a name of table
    *@param $id intiger
    */
    public function delete($table=null, $id=null){
        if(!is_array($id)){
            $stmt = $this->exec("DELETE FROM $table WHERE id= $id");
        } else {
            $id = implode(',', $id);
            $stmt = $this->exec("DELETE FROM $table  WHERE id IN ($id)");
        }
         return (bool)$stmt;
    }
}

?>
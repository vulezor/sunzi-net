<?php
class File_Upload extends Base_Controller{
    public function __construct(){
        parent::__construct();
    }

    public function upload_files($id, $uid){
       
        $file = $_FILES["file"]["tmp_name"];
        $filename = $_FILES["file"]["name"];
        $only_name= explode(".", $filename);
        $newfilename = $only_name[0].'_'.strtotime(date('Y-m-d H:i:s')) .".".end($only_name);

        $dir = './uploads';
        $board_dir = $dir.'/board_'.$id;
        $page_dir = $board_dir.'/'.$uid;
        if(!is_dir($dir)){
            mkdir($dir, 0755, true);
        }
        if(!is_dir($board_dir)){
            mkdir($board_dir, 0755, true);
        }
        if(!is_dir($page_dir)){
            mkdir($page_dir, 0755, true);
        }
        $filepath = $page_dir."/". $newfilename;
        move_uploaded_file($file, $filepath);
        header('Content-Type: application/json');
        echo json_encode(
            array(
            'file_path'=>$filepath, 
            'file_name'=>$newfilename, 
            'file_status'=>'open',
            'file_comment'=> isset($_POST['comment']) && $_POST['comment']!="undefined" ? strip_tags($_POST['comment']) : '',
            'file_date'=> date('Y-m-d H:i:s'),
            'user'=> isset($_POST['user']) && $_POST['user']!="undefined" ? strip_tags($_POST['user']) : '',
            )
        );
    }

    public function download_file(){
        if (empty($_GET['mime']) OR empty($_GET['token']))
        {
            exit('Invalid download token 8{');
        }
        // Set operation params
        $mime = filter_var($_GET['mime']);
        $ext  = str_replace(array('/', 'x-'), '', strstr($mime, '/'));
        $url  = base64_decode(filter_var($_GET['token']));
        $name = urldecode($_GET['title']). '.' .$ext; 
       
        // Fetch and serve
        if ($url)
        {
            $size= filesize($url);
          
            // Generate the server headers
            if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== FALSE)
            {
                header('Content-Type: "' . $mime . '"');
                header('Content-Disposition: attachment; filename="' . $name . '"');
                header('Expires: 0');
                header('Content-Length: '.$size);
                header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
                header("Content-Transfer-Encoding: binary");
                header('Pragma: public');
            }
            else
            {
                header('Content-Type: "' . $mime . '"');
                header('Content-Disposition: attachment; filename="' . $name . '"');
                header("Content-Transfer-Encoding: binary");
                header('Expires: 0');
                header('Content-Length: '.$size);
                header('Pragma: no-cache');
            }

            readfile($url);
            exit;
        }

        // Not found
        exit('File not found 8{');
    }

    public function download_zip(){
        $dir = $_GET['url'];
        $zip_file = str_replace(" ", "_", $_GET['page_name']);
        $zip_file = $zip_file.'.zip';
        $rootPath = realpath($dir);

        // Initialize archive object
        $zip = new ZipArchive();
        $zip->open($zip_file, ZipArchive::CREATE | ZipArchive::OVERWRITE);

        // Create recursive directory iterator
        /** @var SplFileInfo[] $files */
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($rootPath),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $name => $file)
        {
            // Skip directories (they would be added automatically)
            if (!$file->isDir())
            {
                // Get real and relative path for current file
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($rootPath) + 1);

                // Add current file to archive
                $zip->addFile($filePath, $relativePath);
            }
        }

        // Zip archive will be created only after closing object
        $zip->close();


        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename='.basename($zip_file));
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($zip_file));
        readfile($zip_file);
    }
}
?>
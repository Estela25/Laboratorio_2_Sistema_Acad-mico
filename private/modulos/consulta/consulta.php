<?php
class BaseDeDatos {
    public function obtener_registros($tabla){
        header('Content-Type: application/json');
        try {
            $pdo = new PDO('mysql:host=localhost;dbname=db_academica', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
            $stmt = $pdo->query('SELECT * FROM '.$tabla);
            $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
         
            echo json_encode($registros);
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
  }
?>
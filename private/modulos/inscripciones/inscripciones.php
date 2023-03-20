<?php

include '../../config/config.php';
include '../../modulos/consulta/consulta.php';

$bd = new BaseDeDatos();
$bd->obtener_registros('Inscripciones');

extract($_REQUEST);
$Inscripcion = isset($Inscripcion) ? $Inscripcion : '[]';
$accion = isset($accion) ? $accion : '';
$class_Inscripcion = new Inscripcion($conexion);
print_r($class_Inscripcion->recibir_datos($Inscripcion));

class Inscripcion{
    public $datos=[], $db;
    public $respuesta = ['msg'=>'ok'];

    public function __construct($db){
        $this->db=$db;
    }
    public function recibir_datos($Inscripcion){
        $this->datos = json_decode($Inscripcion, true);
        return $this->validar_datos();
    }
    
    private function validar_datos(){
        if( empty($this->datos['idInscripcion']) ){
            $this->respuesta['msg'] = 'NO se ha espesificado un ID';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese un codigo de Inscripcion, el codigo es un numero de 3 digitos';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor digite su nombre';
        }
        if( empty($this->datos['direccion']) ){
            $this->respuesta['msg'] = 'Por favor digite su direeccon';
        }

        return $this->administrar_Inscripcion();
    }
    private function administrar_Inscripcion(){
        global $accion;
        if( $this->respuesta['msg']=='ok'){
            if($accion=='nuevo'){
                $this->db->consultas('
                INSERT INTO Inscripciones(idInscripcion,codigo,nombre,direccion,municipio,departamento,telefono,nacimiento,sexo,dui,titulo) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                $this->datos['idInscripcion'],$this->datos['codigo'], $this->datos['nombre'],$this->datos['direccion'],
                $this->datos['municipio'],$this->datos['departamento'],$this->datos['telefono'],$this->datos['nacimiento'],$this->datos['sexo'],$this->datos['dui'],$this->datos['titulo']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='modificar'){
                $this->db->consultas('
                UPDATE Inscripciones SET codigo=?,nombre=?,direccion=?,municipio=?,departamento=?,telefono=?,nacimiento=?,sexo=? WHERE idInscripcion=?',
                 $this->datos['nombre'],$this->datos['direccion'],
                $this->datos['municipio'],$this->datos['departamento'],$this->datos['telefono'],$this->datos['nacimiento'],$this->datos['sexo'],$this->datos['dui'],$this->datos['titulo'],$this->datos['idInscripcion']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='eliminar'){
                $this->db->consultas('
                DELETE
                FROM Inscripciones
                WHERE Inscripciones . idInscripcion=?',
                $this->datos['idInscripcion']
            );
            return $this->db->obtener_respuesta();
            }else{
            return $this->respuesta;
        }
    }
}
}
?>
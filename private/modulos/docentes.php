<?php

include '../../config/config.php';
include '../../modulos/consulta/consulta.php';

extract($_REQUEST);
$docente = isset($docente) ? $docente : '[]';
$accion = isset($accion) ? $accion : '';
$class_docente = new Docente($conexion);
print_r($class_docente->recibir_datos($docente));

$bd = new BaseDeDatos();
$bd->obtener_registros('docentes');

class Docente{
    public $datos=[], $db;
    public $respuesta = ['msg'=>'ok'];

    public function __construct($db){
        $this->db=$db;
    }
    public function recibir_datos($docente){
        $this->datos = json_decode($docente, true);
        return $this->validar_datos();
    } 

    private function validar_datos(){
        if( empty($this->datos['idDocente']) ){
            $this->respuesta['msg'] = 'NO se ha espesificado un ID';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese un codigo de docente, el codigo es un numero de 3 digitos';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor digite su nombre';
        }
        if( empty($this->datos['direccion']) ){
            $this->respuesta['msg'] = 'Por favor digite su direeccon';
        }

        return $this->administrar_docente();
    }
    private function administrar_docente(){
        global $accion;
        if( $this->respuesta['msg']=='ok'){
            if($accion=='nuevo'){
                $this->db->consultas('
                INSERT INTO docentes(idDocente,codigo,nombre,direccion,municipio,departamento,telefono,nacimiento,sexo) VALUES(?,?,?,?,?,?,?,?,?)',
                $this->datos['idDocente'],$this->datos['codigo'], $this->datos['nombre'],$this->datos['direccion'],
                $this->datos['municipio'],$this->datos['departamento'],$this->datos['telefono'],$this->datos['nacimiento'],$this->datos['sexo']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='modificar'){
                $this->db->consultas('
                UPDATE docentes SET codigo=?,nombre=?,direccion=?,municipio=?,departamento=?,telefono=?,nacimiento=?,sexo=? WHERE idDocente=?',
                 $this->datos['nombre'],$this->datos['direccion'],
                $this->datos['municipio'],$this->datos['departamento'],$this->datos['telefono'],$this->datos['nacimiento'],$this->datos['sexo'],$this->datos['idDocente']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='eliminar'){
                $this->db->consultas('
                DELETE
                FROM docentes
                WHERE docentes . idDocente=?',
                $this->datos['idDocente']
            );
            return $this->db->obtener_respuesta();
            }else{
            return $this->respuesta;
        }
    }
}

}
?>
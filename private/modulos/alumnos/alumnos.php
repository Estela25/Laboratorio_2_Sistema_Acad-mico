<?php

include '../../config/config.php';
include '../../modulos/consulta/consulta.php';

$bd = new BaseDeDatos();
$bd->obtener_registros('alumnos');

extract($_REQUEST);
$alumno = isset($alumno) ? $alumno : '[]';
$accion = isset($accion) ? $accion : '';
$class_alumno = new Alumno($conexion);
print_r($class_alumno->recibir_datos($alumno));

class Alumno{
    public $datos=[], $db;
    public $respuesta = ['msg'=>'ok'];

    public function __construct($db){
        $this->db=$db;
    }
    public function recibir_datos($alumno){
        $this->datos = json_decode($alumno, true);
        return $this->validar_datos();
    }
    
    private function validar_datos(){
        if( empty($this->datos['idAlumno']) ){
            $this->respuesta['msg'] = 'NO se ha espesificado un ID';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese un codigo de alumno, el codigo es un numero de 3 digitos';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor digite su nombre';
        }
        if( empty($this->datos['direccion']) ){
            $this->respuesta['msg'] = 'Por favor digite su direeccon';
        }

        return $this->administrar_alumno();
    }
    private function administrar_alumno(){
        global $accion;
        if( $this->respuesta['msg']=='ok'){
            if($accion=='nuevo'){
                $this->db->consultas('
                INSERT INTO alumnos(idAlumno,codigo,nombre,direccion,municipio,departamento,telefono,nacimiento,sexo) VALUES(?,?,?,?,?,?,?,?,?)',
                $this->datos['idAlumno'],$this->datos['codigo'], $this->datos['nombre'],$this->datos['direccion'],
                $this->datos['municipio'],$this->datos['departamento'],$this->datos['telefono'],$this->datos['nacimiento'],$this->datos['sexo']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='modificar'){
                $this->db->consultas('
                UPDATE alumnos SET codigo=?,nombre=?,direccion=?,municipio=?,departamento=?,telefono=?,nacimiento=?,sexo=? WHERE idAlumno=?',
                 $this->datos['nombre'],$this->datos['direccion'],
                $this->datos['municipio'],$this->datos['departamento'],$this->datos['telefono'],$this->datos['nacimiento'],$this->datos['sexo'],$this->datos['idAlumno']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='eliminar'){
                $this->db->consultas('
                DELETE
                FROM alumnos
                WHERE alumnos . idAlumno=?',
                $this->datos['idAlumno']
            );
            return $this->db->obtener_respuesta();
            }else{
            return $this->respuesta;
        }
    }
}
}
?>
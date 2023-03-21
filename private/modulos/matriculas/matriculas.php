<?php

include '../../config/config.php';
include '../../modulos/consulta/consulta.php';

extract($_REQUEST);
$matricula = isset($matricula) ? $matricula : '[]';
$accion = isset($accion) ? $accion : '';
$class_matricula = new Matricula($conexion);
print_r($class_matricula->recibir_datos($matricula));

$bd = new BaseDeDatos();
$bd->obtener_registros('matricula');

class Matricula{
    public $datos=[], $db;
    public $respuesta = ['msg'=>'ok'];

    public function __construct($db){
        $this->db=$db;
    }
    public function recibir_datos($matricula){
        $this->datos = json_decode($matricula, true);
        return $this->validar_datos();
    } 

    private function validar_datos(){
        if( empty($this->datos['idMatricula']) ){
            $this->respuesta['msg'] = 'NO se ha espesificado un ID';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor ingrese un codigo de matricula, el codigo es un numero de 3 digitos';
        }
        if( empty($this->datos['fecha']) ){
            $this->respuesta['msg'] = 'Por favor digite su nombre';
        }
        if( empty($this->datos['pago']) ){
            $this->respuesta['msg'] = 'Por favor digite su direeccon';
        }

        return $this->administrar_matricula();
    }
    private function administrar_matricula(){
        global $accion;
        if( $this->respuesta['msg']=='ok'){
            if($accion=='nuevo'){
                $this->db->consultas('
                INSERT INTO matricula(idMatricula,nombre,fecha,comprobante,pago) VALUES(?,?,?,?,?)',
                $this->datos['idMatricula'],$this->datos['nombre'], $this->datos['fecha'],$this->datos['comprobante'],
                $this->datos['pago']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='modificar'){
                $this->db->consultas('
                UPDATE matricula SET nombre=?,fecha=?,comprobante=?,pago=? WHERE idMatricula=?',
                 $this->datos['nombre'],$this->datos['fecha'],
                $this->datos['comprobante'],$this->datos['pago'],$this->datos['idMatricula']
            );
            return $this->db->obtener_respuesta();
            }else if ($accion=='eliminar'){
                $this->db->consultas('
                DELETE
                FROM matricula
                WHERE matricula . idMatricula=?',
                $this->datos['idMatricula']
            );
            return $this->db->obtener_respuesta();
            }else{
            return $this->respuesta;
        }
    }
}

}
?>
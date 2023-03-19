VTTCue.componet('alumnos', {
    data() {
        return {
            db      :'',
            buscar  :'',
            alumnos : [],
            accion  : 'nuevo',
            alumno  : {
                idAlumno :'',
                codigo   :'',
                nombre   : ''
            }
        }
    }
},
)
methods:{
    nuevoAlumno();
    this.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
}
modificarAlumno(alumno){
    this.accion = 'modificar';
    this.alumno = alumno;
}
    

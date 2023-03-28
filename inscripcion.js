Vue.component('inscripciones', {
  data() {
      return {
          db       : '',
          buscar   : '',
          inscripciones : [],
          accion   : 'nuevo',
          inscripcion  : {
              idInscripcion : '',
              codigo    : '',
              nombre    : '',
              direccion : '',
              municipio: '',
              departamento:'',
              telefono: '',
              nacimiento:'',
              sexo:''

          }
      }
  },
  methods:{
      nuevoInscripcion(){
          this.accion = 'nuevo';
          this.inscripcion.idInscripcion = '';
          this.inscripcion.codigo = '';
          this.inscripcion.nombre = '';
          this.inscripcion.direccion = '';
          this.inscripcion.direccion = '';
          this.inscripcion.municipio = '';
          this.inscripcion.departamento = '';
          this.inscripcion.telefono = '';
          this.inscripcion.nacimiento = '';
          this.inscripcion.sexo = '';
      },
      modificarInscripcion(inscripcion){
          this.accion = 'modificar';
          this.inscripcion = inscripcion;
      },
      guardarInscripcion(){
          if( this.inscripcion.nombre=='' || 
              this.inscripcion.codigo=='' ){
              console.log( 'Por favor ingrese los datos correspondientes' );
              return;
          }
          let store = abrirStore('tblinscripcion', 'readwrite');
          if( this.accion==='nuevo' ){
              this.inscripcion.idInscripcion = new Date().getTime().toString(16);//las cantidad milisegundos y lo convierte en hexadecimal   
          }
          let query = store.put( JSON.parse( JSON.stringify(this.inscripcion) ));
          query.onsuccess = resp=>{
              fetch(`private/modulos/inscripciones/inscripciones.php?accion=${this.accion}&inscripcion=${JSON.stringify(this.inscripcion)}`)
              .then(resp=>resp.json())
              .then(resp=>{
                  console.log(resp);
              });
              this.nuevoInscripcion();
              this.listar();
          };
          query.onerror = err=>{
              console.error('ERROR al guardar inscripcion', err);
          };
      },
      eliminarInscripcion(inscripcion){
          if( confirm(`Esta seguro de eliminar el inscripcion ${inscripcion.nombre}?`) ){
              let store = abrirStore('tblinscripcion', 'readwrite'),
                  req = store.delete(inscripcion.idInscripcion);
              req.onsuccess = res=>{
                  fetch(`private/modulos/inscripciones/inscripciones.php?accion=eliminar&inscripcion=${JSON.stringify(this.inscripcion)}`)
                  .then(resp=>resp.json())
                  .then(resp=>{
                      console.log(resp);
                  });
                  this.listar();
              };
              req.onerror = err=>{
                  console.error('ERROR al guardar inscripcion');
              };
          }
      },
      listar(){
          let store = abrirStore('tblinscripcion', 'readonly'),
              data = store.getAll();
          data.onsuccess = resp=>{
              this.inscripciones = data.result
                  .filter(inscripcion=>inscripcion.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || 
                      inscripcion.codigo.indexOf(this.buscar)>-1);
                      fetch(`private/modulos/inscripciones/inscripciones.php`)
                      .then((response) => response.json())
                      .then((data)=> (this.inscripciones = data));
                      
          };
      },
  },
  template : `
  <div class="row">
  <div class="row justify-content-md-center">
      <div class="col-12 col-md-6">
          <div class="card border-primary" >
              <div class="card-header bg-primary text-white">Registro de Inscripcion</div>
              <div class="card-body">
                  <form id="frmInscripcion" @submit.prevent="guardarInscripcion" @reset.prevent="nuevoInscripcion()">
                  <div class="row p-1">
                      <div class="col-3 col-md-2">CODIGO:</div>
                      <div class="col-9 col-md-3">
                      <input class="form-control" type="text" v-model="inscripcion.codigo" name="txtCodigoInscripcion" id="txtCodigoInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col-3 col-md-2">NOMBRE:</div>
                      <div class="col col-md-6">
                      <input class="form-control" v-model="inscripcion.nombre" type="text" name="txtNombreInscripcion" id="txtNombreInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col-3 col-md-2">DIRECCION:</div>
                      <div class="col col-md-6">
                      <input class="form-control" v-model="inscripcion.direccion" type="text" name="txtDireccionInscripcion" id="txtDireccionInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col-3 col-md-2">MUNICIPIO:</div>
                      <div class="col col-md-6">
                      <input class="form-control" v-model="inscripcion.municipio" type="text" name="txtMunicipioInscripcion" id="txtMunicipioInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col-3 col-md-2">DEPARTAMENTO:</div>
                      <div class="col col-md-6">
                      <input class="form-control" v-model="inscripcion.departamento" type="text" name="txtDepartamentoInscripcion" id="txtDepartamentoInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col-3 col-md-2">TELEFONO:</div>
                      <div class="col col-md-6">
                      <input class="form-control" v-model="inscripcion.telefono" type="text" name="txtTelefonoInscripcion" id="txtTelefonoInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col-3 col-md-2">FECHA DE NACIMIENTO:</div>
                      <div class="col col-md-6">
                      <input class="form-control" v-model="inscripcion.nacimiento" type="date" name="txtNacimientoInscripcion" id="txtNacimientoInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col-3 col-md-2">SEXO:</div>
                      <div class="col col-md-6">
                      <input class="form-control" v-model="inscripcion.sexo" type="text" name="txtSexoInscripcion" id="txtSexoInscripcion">
                      </div>
                  </div>
                  <div class="row p-1">
                      <div class="col col md-6">
                      <input class="btn btn-success" type="submit" value="Guardar Datos">
                      </div>
                      <div class="col col md-6">
                      <input class="btn btn-warning" type="reset" value="Nuevo Registro">
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </div>
</div>

<div class="row ">
<div class="col-12 col-md-10">
  <div class="card text-bg-light" >
    <div class="card-header" >CONSULTA DE ALUMNOS</div>
      <div class="card-body">
              <form>
                  <table class="table table-dark table-hover">
                      <thead>
                      <tr>
                          <th>BUSCAR</th>
                          <th colspan="2"><input type="text" @keyup="listar()" class="form-control" 
                          v-model="buscar" placeholder="Buscar por nombre"></th>
                      </tr>
                      <tr>
                          <th>CODIGO</th>
                          <th>NOMBRE</th>
                          <th>DIRECCION</th>
                          <th>MUNICIPIO</th>
                          <th>DEPARTAMENTO</th>
                          <th>TELEFONO</th>
                          <th>FECHA DE NACIMIENTO</th>
                          <th colspan="2">SEXO</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="inscripcion in inscripciones" @click='modificarInscripcion(inscripcion)' :key="inscripcion.idInscripcion" >
                          <td>{{inscripcion.codigo}}</td>
                          <td>{{inscripcion.nombre}}</td>
                          <td>{{inscripcion.direccion}}</td>
                          <td>{{inscripcion.municipio}}</td>
                          <td>{{inscripcion.departamento}}</td>
                          <td>{{inscripcion.telefono}}</td>
                          <td>{{inscripcion.nacimiento}}</td>
                          <td>{{inscripcion.sexo}}</td>
                          <td><button @click.prevent="eliminarInscripcion(inscripcion)" class="btn btn-danger">Eliminar</button></td>
                      </tr>
                      </tbody>
                  </table>
              </form>
          </div>
      </div>
  </div>
</div>  
</div>
      `
});
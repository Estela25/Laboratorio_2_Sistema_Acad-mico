Vue.component('docentes',{
    data(){
        return{
          db:'',
          buscar:'',
          docentes:[],
          accion: 'nuevo',
          docente:{
            idDocente:'',
            codigo:'',
            nombre:'',
            direccion:'',
            municipio:'',
            departamento:'',
            telefono:'',
            nacimiento:'',
            sexo:''
          }
        }
      },
      methods:{
        nuevoDocente(){
          this.accion = 'nuevo';
          this.docente.idDocente = '';
          this.docente.codigo = '';
          this.docente.nombre = '';
          this.docente.direccion = '';
          this.docente.municipio = '';
          this.docente.departamento = '';
          this.docente.telefono = '';
          this.docente.nacimiento = '';
          this.docente.sexo = '';
        },
        modificarDocente(docente){
          this.accion = 'modificar';
          this.docente = docente;
          
        },
        guardarDocente(){
          if(this.docente.nombre=='' || this.docente.codigo==''){
            console.log('Por favor ingrese los datos correspondientes');
            return;
          }
          let store = abrirStore('tbldocentes','readwrite');
          if(this.accion==='nuevo'){
            this.docente.idDocente = new Date().getTime().toString(16); 

          }
          let query = store.put( JSON.parse( JSON.stringify(this.docente)));
          query.onsuccess = resp=>{
            fetch(`private/modulos/docentes/docentes.php?accion=${this.accion}&docente=${JSON.stringify(this.docente)}`)
                .then(resp=>resp.json())
                .then(resp=>{
                    console.log(resp);
                });
            this.nuevoDocente();
            this.listar();
          };
          query.onerror = err=>{
            console.error('ERROR al guardar docente', err);
          };
          
        },
        eliminarDocente(docente){
          if(confirm(`Esta seguro de eliminar el docente ${docente.nombre}?`)){
            let store = abrirStore('tbldocentes','readwrite'),
                req = store.delete(docente.idDocente);
                req.onsuccess = res=>{
                  fetch(`private/modulos/docentes/docentes.php?accion=eliminar&docente=${JSON.stringify(this.docente)}`)
                    .then(resp=>resp.json())
                    .then(resp=>{
                        console.log(resp);
                    });
                this.listar();
                };
                req.onerror = err=>{
                  console.error('ERROR al guardar docente')
                };
          }
        },
        listar(){
          let store = abrirStore('tbldocentes','readonly'),
              data = store.getAll();
            data.onsuccess = resp=>{
            this.docentes = data.result.filter(docente=>docente.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || docente.codigo.indexOf(this.buscar)>-1);
            fetch(`private/modulos/docentes/docentes.php`)
          .then((response) => response.json())
          .then((data)=> (this.docentes = data));
          };
          

          
          
    },
  },
    template : `
    <div class="row">
        <div class="row justify-content-md-center">
            <div class="col-12 col-md-6">
                <div class="card border-primary" >
                    <div class="card-header bg-primary text-white">Registro de Docente</div>
                    <div class="card-body">
                        <form id="frmDocente" @submit.prevent="guardarDocente" @reset.prevent="nuevoDocente()">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">CODIGO:</div>
                            <div class="col-9 col-md-3">
                            <input class="form-control" type="text" v-model="docente.codigo" name="txtCodigoDocente" id="txtCodigoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">NOMBRE:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.nombre" type="text" name="txtNombreDocente" id="txtNombreDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">DIRECCION:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.direccion" type="text" name="txtDireccionDocente" id="txtDireccionDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">MUNICIPIO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.municipio" type="text" name="txtMunicipioDocente" id="txtMunicipioDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">DEPARTAMENTO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.departamento" type="text" name="txtDepartamentoDocente" id="txtDepartamentoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">TELEFONO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.telefono" type="text" name="txtTelefonoDocente" id="txtTelefonoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">FECHA DE NACIMIENTO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.nacimiento" type="date" name="txtNacimientoDocente" id="txtNacimientoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">SEXO:</div>
                            <div class="col col-md-6">
                            <input class="form-control" v-model="docente.sexo" type="text" name="txtSexoDocente" id="txtSexoDocente">
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
                            <tr v-for="docente in docentes" @click='modificarDocente(docente)' :key="docente.idDocente" >
                                <td>{{docente.codigo}}</td>
                                <td>{{docente.nombre}}</td>
                                <td>{{docente.direccion}}</td>
                                <td>{{docente.municipio}}</td>
                                <td>{{docente.departamento}}</td>
                                <td>{{docente.telefono}}</td>
                                <td>{{docente.nacimiento}}</td>
                                <td>{{docente.sexo}}</td>
                                <td><button @click.prevent="eliminarDocente(docente)" class="btn btn-danger">Eliminar</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>  
  </div>
`,
});
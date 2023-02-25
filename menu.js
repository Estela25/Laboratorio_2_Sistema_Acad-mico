// my-component.js
export default {
    template: `
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">::.. SISTEMA ACADEMICO ..::</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link" @click="abrirCerrarFormulario('docente')" href="#">Docentes</a>
                <a class="nav-link" @click="abrirCerrarFormulario('alumno')" href="/R_Alumnos.html">Alumnos</a>
                <a class="nav-link" @click="abrirCerrarFormulario('materia')" href="/Materias_Ins.html">Materia</a>
                <a class="nav-link" @click="abrirCerrarFormulario('matricula')" href="#">Matricula</a>
                <a class="nav-link" @click="abrirCerrarFormulario('inscripcion')" href="/I_Materias.html">Inscripcion</a>
            </div>
        </div>
    </div>
</nav>
<br>
    `
  }
  
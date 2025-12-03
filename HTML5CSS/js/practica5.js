// ======== Clases con herencia ========

// Clase base Persona
class Persona {
  constructor(nombre, edad, rol = "Persona") {
    this.nombre = nombre;
    this.edad = edad;
    this.rol = rol;
  }
}

// Estudiante hereda de Persona
class Estudiante extends Persona {
  constructor(nombre, edad, matricula) {
    super(nombre, edad, "Estudiante");
    this.matricula = matricula;
  }
}

// Docente hereda de Persona (sin matrícula)
class Docente extends Persona {
  constructor(nombre, edad) {
    super(nombre, edad, "Docente");
    this.matricula = ""; // vacío por claridad en la tabla
  }
}

// ======== Estado de la aplicación ========

const personas = []; // aquí se guardan las instancias

// ======== Referencias a elementos del DOM ========

const form = document.getElementById("personaForm");
const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const rolEstudianteRadio = document.getElementById("rolEstudiante");
const rolDocenteRadio = document.getElementById("rolDocente");

//Para manipular los campos de la matrícula, si los muestra o los oculta según el rol.
const matriculaGroup = document.getElementById("matriculaGroup");
const matriculaInput = document.getElementById("matricula");
const erroresDiv = document.getElementById("errores");

//Busca el elemento <tbody> que esté dentro del elemento cuyo id es personasTable
const tablaBody = document.querySelector("#personasTable tbody");
const btnLimpiar = document.getElementById("btnLimpiar");

// ======== Utilidades de validación ========

/**
 * Valida los datos del formulario.
 * @returns {{esValido: boolean, errores: string[]}}
 */
function validarFormulario() {
  const errores = [];

  const nombre = nombreInput.value.trim();
  const edad = parseInt(edadInput.value, 10);
  const rol = obtenerRolSeleccionado();
  const matricula = matriculaInput.value.trim();

  // Nombre
  if (!nombre) {
    errores.push("El nombre es obligatorio.");
  } else if (nombre.length < 2) {
    errores.push("El nombre debe tener al menos 2 caracteres.");
  }

  // Edad
  if (Number.isNaN(edad)) {
    errores.push("La edad es obligatoria.");
  } else if (edad < 1 || edad > 120) {
    errores.push("La edad debe estar entre 1 y 120 años.");
  }

  // Rol
  if (!rol) {
    errores.push("Debe seleccionar si la persona es Estudiante o Docente.");
  }

  // Matrícula (solo cuando es estudiante)
  if (rol === "estudiante") {
    if (!matricula) {
      errores.push("La matrícula es obligatoria para estudiantes.");
    } else {
      const regexMatricula = /^[A-Za-z0-9]{3,10}$/;
      if (!regexMatricula.test(matricula)) {
        errores.push(
          "La matrícula debe ser alfanumérica y tener entre 3 y 10 caracteres."
        );
      }
    }
  }

  return {
    esValido: errores.length === 0,
    errores,
  };
}

/**
 * Devuelve "estudiante", "docente" o null según el radio seleccionado.
 */
function obtenerRolSeleccionado() {
  if (rolEstudianteRadio.checked) return "estudiante";
  if (rolDocenteRadio.checked) return "docente";
  return null;
}

// ======== Mostrar / ocultar matrícula según rol ========

function actualizarVisibilidadMatricula() {
  const rol = obtenerRolSeleccionado();
  if (rol === "estudiante") {
    matriculaGroup.hidden = false;
  } else {
    matriculaGroup.hidden = true;
    matriculaInput.value = "";
  }
}

// Eventos para radios
rolEstudianteRadio.addEventListener("change", actualizarVisibilidadMatricula);
rolDocenteRadio.addEventListener("change", actualizarVisibilidadMatricula);

/* ======== Manejo del formulario ========
*  Le está diciendo a JavaScript: «cuando ocurra un cierto evento en este elemento,
*  ejecuta esta función»
*/
form.addEventListener("submit", function (event) {
  event.preventDefault(); // evitar recarga

  // Limpiar mensajes de error previos
  erroresDiv.innerHTML = "";

  const { esValido, errores } = validarFormulario();

  if (!esValido) {
    mostrarErrores(errores);
    return; // NO se agrega la fila
  }

  // Si todo es válido, creamos la instancia adecuada
  const nombre = nombreInput.value.trim();
  const edad = parseInt(edadInput.value, 10);
  const rol = obtenerRolSeleccionado();
  const matricula = matriculaInput.value.trim();

  let persona;
  if (rol === "estudiante") {
    persona = new Estudiante(nombre, edad, matricula);
  } else {
    persona = new Docente(nombre, edad);
  }

  personas.push(persona);
  renderizarTabla();
  form.reset();
  actualizarVisibilidadMatricula(); // ocultar matrícula después del reset
});

/**
 * Muestra los mensajes de error en el div inferior.
 * @param {string[]} errores
 */
function mostrarErrores(errores) {
  if (!errores.length) return;

  const ul = document.createElement("ul");
  errores.forEach((mensaje) => {
    const li = document.createElement("li");
    li.textContent = mensaje;
    ul.appendChild(li);
  });

  erroresDiv.innerHTML = "";
  erroresDiv.appendChild(ul);
}

// Limpiar errores cuando se pulsa "Limpiar"
btnLimpiar.addEventListener("click", () => {
  erroresDiv.innerHTML = "";
  actualizarVisibilidadMatricula();
});

// ======== Renderizar tabla ========

function renderizarTabla() {
  tablaBody.innerHTML = "";

  personas.forEach((p, index) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = index + 1;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = p.nombre;

    const tdEdad = document.createElement("td");
    tdEdad.textContent = p.edad;

    const tdRol = document.createElement("td");
    tdRol.textContent = p.rol;

    const tdMatricula = document.createElement("td");
    tdMatricula.textContent = p.matricula || "-";

    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdEdad);
    tr.appendChild(tdRol);
    tr.appendChild(tdMatricula);

    tablaBody.appendChild(tr);
  });
}

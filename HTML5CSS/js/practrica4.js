// Actualizar el valor visible del slider de experiencia
document.addEventListener("DOMContentLoaded", () => {
  const experienciaInput = document.getElementById("experiencia");
  const valorExperienciaSpan = document.getElementById("valorExperiencia");

  valorExperienciaSpan.textContent = experienciaInput.value;

  experienciaInput.addEventListener("input", () => {
    valorExperienciaSpan.textContent = experienciaInput.value;
  });

  const btnEvaluar = document.getElementById("btnEvaluar");
  const btnLimpiar = document.getElementById("btnLimpiar");

  btnEvaluar.addEventListener("click", evaluarPerfil);
  btnLimpiar.addEventListener("click", limpiarFormulario);
});

/**
 * Función principal para evaluar el perfil del usuario
 */
function evaluarPerfil() {
  /*
  * Toma todos los elementos del formulario, tanto las entradas como la salida
  * */
  //Entradas
  const nombreInput = document.getElementById("nombre");
  const habJs = document.getElementById("habJs").checked;
  const habDb = document.getElementById("habDb").checked;
  const habUi = document.getElementById("habUi").checked;
  const experiencia =
    parseInt(document.getElementById("experiencia").value, 10 );
  //const experiencia = document.getElementById("experiencia").value;
  const rol = document.getElementById("rol").value;

  // Caja para la salida. Puede ser un textarea como Salida
  const resultadoDiv = document.getElementById("resultado");
  // Limpiamos el área de resultado
  resultadoDiv.innerHTML = "";

  //Quitamos los espacios en blando
  const nombre = nombreInput.value.trim();


  /*
   * Validación de nombre. Si no ha ingresado algo en la caja de texto.
   * Muestra la advertencia
   */
  if (nombre === "") {
    resultadoDiv.innerHTML =
      '<p class="advertencia">Por favor, ingresa tu nombre.</p>';
    return;
  }

  // Condicional: sin habilidades y menos de un año de experiencia
  if (!habJs && !habDb && !habUi && experiencia < 1) {
    resultadoDiv.innerHTML += `
      <p class="advertencia">
        Advertencia: no has seleccionado habilidades y no tienes experiencia.<br />
        Es recomendable adquirir conocimientos básicos antes de postular a un rol específico.
      </p>
    `;
    return; // No sigue evaluando el perfil
  }

  const miRol = document.getElementById("rol").value;
  if (miRol === ""){
    resultadoDiv.innerHTML +=
      '<p class="advertencia">Por favor, Seleccione uno de los objetivos.</p>';
    return;
  }

  // Condicional: Suma de puntaje según habilidades y años de experiencia
  let puntaje = 0;

  // A cada habilidad se le ha dado un puntaje de suma 2 puntos
  if (habJs) puntaje += 2;
  if (habDb) puntaje += 2;
  if (habUi) puntaje += 2;

  /* Experiencia: se convierte a puntaje
   * 0 años  -> 0 puntos
   * 1–2     -> 1 punto
   * 3–4     -> 2 puntos
   * 5–7     -> 3 puntos
   * 8–10    -> 4 puntos
   */

  let puntajeExperiencia = 0;
  if (experiencia === 0) {
    puntajeExperiencia = 0;
  } else if (experiencia <= 2) {
    puntajeExperiencia = 1;
  } else if (experiencia <= 4) {
    puntajeExperiencia = 2;
  } else if (experiencia <= 7) {
    puntajeExperiencia = 3;
  } else {
    puntajeExperiencia = 4;
  }

  puntaje += puntajeExperiencia;

  // 5.3 Cálculo del nivel del perfil
  let nivel = "";
  if (puntaje <= 4) {
    nivel = "Junior";
  } else if (puntaje <= 7) {
    nivel = "Intermedio";
  } else {
    nivel = "Senior-like";
  }

  // Uso de switch para evaluar el rol y emitir las recomendaciones
  let recomendacion = "";

  switch (rol) {
    case "frontend":
      if (habJs && habUi && experiencia >= 2) {
        recomendacion =
          "Su perfil es adecuado para frontend. Refuerza frameworks como React o Vue y buenas prácticas de accesibilidad.";
      } else if (!habUi) {
        recomendacion =
          "Para un rol frontend se recomienda fortalecer el Diseño UI y conceptos de usabilidad además de JavaScript.";
      } else {
        recomendacion =
          "Sigue consolidando tus habilidades en JavaScript moderno (ES6+) y construcción de interfaces responsivas.";
      }
      break;

    case "backend":
      if (habDb && experiencia >= 3) {
        recomendacion =
          "Tienes una buena base para backend. Profundiza en diseño de APIs REST, seguridad y optimización de consultas a bases de datos.";
      } else if (!habDb) {
        recomendacion =
          "Para un rol backend es fundamental dominar bases de datos y modelado de datos, además de un lenguaje del lado del servidor.";
      } else {
        recomendacion =
          "Refuerza patrones de arquitectura backend (MVC, capas, servicios) y manejo de autenticación/autorización.";
      }
      break;

    case "fullstack":
      if (habJs && habDb && experiencia >= 3) {
        recomendacion =
          "Tu perfil apunta bien a fullstack. Continúa equilibrando tus conocimientos en frontend y backend, y practica despliegue en la nube.";
      } else {
        recomendacion =
          "Para llegar a fullstack, fortalece tanto JavaScript (frontend) como bases de datos y lógica de negocio (backend).";
      }
      break;

    case "devops":
      if (experiencia >= 4 && habDb) {
        recomendacion =
          "Puedes orientar tu perfil a DevOps. Enfócate en integración continua, despliegue continuo (CI/CD), contenedores y monitoreo.";
      } else {
        recomendacion =
          "Para un rol DevOps se recomienda ganar más experiencia práctica y aprender sobre automatización, CI/CD, contenedores y orquestación.";
      }
      break;

    default:
      recomendacion = "Rol no reconocido. Revisa la selección realizada.";
      break;
  }

  // 5.4 Mostrar resultados en el DOM
  resultadoDiv.innerHTML = `
    <h2>Resultado de la evaluación</h2>
    <ul>
        <li><strong>Nombre del usuario:</strong> ${nombre}</li>
        <li><strong>Nivel estimado:</strong> ${nivel}</li>
        <li><strong>Puntaje calculado:</strong> ${puntaje}</li>
        <li><strong>Recomendación final:</strong> ${recomendacion}</li>
    </ul>
  `;
}

/**
 * Limpia el formulario y el área de resultados
 */
function limpiarFormulario() {
  const formulario = document.getElementById("formPerfil");
  const resultadoDiv = document.getElementById("resultado");
  const experienciaInput = document.getElementById("experiencia");
  const valorExperienciaSpan = document.getElementById("valorExperiencia");

  formulario.reset();
  resultadoDiv.innerHTML = "";
  //experienciaInput.value = 0;
  valorExperienciaSpan.textContent = experienciaInput.value;
}

function calcularEdadPorAnios(fechaNacimiento) {
  // Método 1: Diferencia de años, ajustando por mes y día
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  const dia = hoy.getDate() - fechaNacimiento.getDate();

  if (mes < 0 || (mes === 0 && dia < 0)) {
    edad--;
  }
  return edad;
}

function calcularEdadPorResta(fechaNacimiento) {
  // Método 2: Restando directamente las fechas
  const hoy = new Date();
  const diferenciaMs = hoy - fechaNacimiento; // milisegundos transcurridos
  const milisegundosPorAnio = 1000 * 60 * 60 * 24 * 365.25; // incluye años bisiestos

  return Math.floor(diferenciaMs / milisegundosPorAnio);

}

function solicitarYCalcularEdad() {
  // Esperar un frame de render para mostrar el contenido antes del prompt
  requestAnimationFrame(() => {
    const entrada = prompt("Ingrese su fecha de nacimiento (formato AAAA-MM-DD):");
    const fechaNacimiento = new Date(entrada);

    if (isNaN(fechaNacimiento.getTime())) {
      alert("Fecha inválida. Use el formato AAAA-MM-DD, por ejemplo 1995-08-23.");
      return;
    }

    const edad1 = calcularEdadPorAnios(fechaNacimiento);
    const edad2 = calcularEdadPorResta(fechaNacimiento);

    alert(
      `Método 1 (por años): ${edad1} años\n` +
      `Método 2 (restando fechas): ${edad2} años`
    );
  });
}

// Esperar a que la página esté completamente cargada antes de ejecutar el prompt
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(solicitarYCalcularEdad, 0);
    });
  });
});

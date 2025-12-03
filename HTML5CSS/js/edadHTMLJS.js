document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("formEdad").addEventListener("submit", function (e) {
    e.preventDefault(); // evita recargar la página

    const fechaNac = document.getElementById("fechaNac").value;

    if (!fechaNac) {
      alert("Seleccione una fecha válida");
      return;
    }

    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    //Resta la fecha de nacimiento de la fecha de hoy (año con año, mes con mes y día con día
    let anios = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();
    let dias = hoy.getDate() - nacimiento.getDate();


    // Ajustar días si el día de nacimiento es mayor al día de la fecha del sistema
    if (dias < 0) {
      // Obtener la cantidad de días del mes anterior para sumarle al resultado de la resta.
      // Lo cotidiano es directamente sumarle 30 (Así me lo han enseñado, pero para más
      // exactitud)
      const ultimoMes = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
      dias = dias + ultimoMes;
      // Como sumo los días del mes anterior, entonces le resta un mes al resultado de la
      // resta de los meses
      meses--;
    }

    // Ajustar meses (Si la resultado de la resta de los meses es menor a cero)
    if (meses < 0) {
      // Le suma los meses de un año (Presta un año)
      meses += 12;
      // Como ya sumó los meses de un año o prestó un año, debe restarle uno a los años
      anios--;
    }

    // La edad es calculada como si la persona nació a las 00:00 de esa fecha.
    document.getElementById("resultado").textContent =
      `Edad exacta: ${anios} años, ${meses} meses y ${dias} días`;
  });

});

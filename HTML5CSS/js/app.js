// Creamos el objeto producto
let producto = {};

// Solicitamos los valores al usuario mediante prompt
producto.nombreProducto = prompt("Ingrese el nombre del producto:");
producto["descripción del Producto"] = prompt("Ingrese la descripción del producto:");
producto.cantidad = parseInt(prompt("Ingrese la cantidad disponible:"), 10);
producto.unidad = prompt("Ingrese la unidad de medida (por ejemplo: kg, unidad, caja):");
producto.precio = parseFloat(prompt("Ingrese el precio por unidad:"));

// Mostramos los valores ingresados utilizando ambas formas de acceso
console.log("=== Datos del producto ===");
console.log("Nombre del producto:", producto["nombreProducto"]);
console.log("Descripción:", producto["descripción del Producto"]);
console.log("Cantidad:", producto.cantidad);
console.log("Unidad:", producto["unidad"]);
console.log("Precio:", producto.precio);

// Mostramos el objeto completo antes de eliminar la propiedad
console.log("\nObjeto completo antes de eliminar 'unidad':");
console.log(producto);

// Eliminamos la propiedad 'unidad'
delete producto.unidad;

// Mostramos el objeto después de eliminar la propiedad
console.log("\nObjeto después de eliminar 'unidad':");
console.log(producto);

// Mostramos los valores también en pantalla
document.write("<h2>Resumen del producto</h2>");

let miH2 = document.createElement("h2");
miH2.innerHTML = "<span style='color:red'>Resumen</span> del producto";
//miH2.textContent = "<span style='color:red'>Resumen</span> del producto";

document.body.appendChild(miH2);

let miTBody = document.getElementById("tbodyProducto");

let miTr = document.createElement("tr");
//Crear las celdas para cada campo
let miTdNombre = document.createElement("td");
let miTdDescripcion = document.createElement("td");
let miTdUnidad = document.createElement("td");
let miTdCantidad = document.createElement("td");
let miTdPrecio = document.createElement("td");

//Asignar el valor del atributo a la celda correspondiente.
miTdNombre.innerHTML = producto.nombreProducto;
miTdDescripcion.innerHTML = producto["descripción del Producto"];
miTdUnidad.innerHTML = producto.unidad;
miTdCantidad.innerHTML = producto.cantidad;
miTdPrecio.innerHTML = producto.precio;

//Agregar las celdas a la fila
miTr.appendChild(miTdNombre);
miTr.appendChild(miTdDescripcion);
miTr.appendChild(miTdUnidad);
miTr.appendChild(miTdCantidad);
miTr.appendChild(miTdPrecio);

miTBody.appendChild(miTr);

document.write(`<p><strong>Nombre:</strong> ${producto.nombreProducto}</p>`);
document.write(`<p><strong>Descripción:</strong> ${producto["descripción del Producto"]}</p>`);
document.write(`<p><strong>Cantidad:</strong> ${producto.cantidad}</p>`);
document.write(`<p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>`);
document.write(`<p><strong>Unidad:</strong> ${producto.unidad}</p>`);
document.write("<p><em>La propiedad 'unidad' fue eliminada.</em></p>");

if ("unidad" in producto) {
  console.log("La propiedad 'unidad' existe en el objeto producto.");
} else {
  console.log("La propiedad 'unidad' no está definida o fue eliminada.");
}



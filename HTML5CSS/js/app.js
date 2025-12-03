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
console.log("Nombre del producto:", producto.nombreProducto);
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
document.write(`<p><strong>Nombre:</strong> ${producto.nombreProducto}</p>`);
document.write(`<p><strong>Descripción:</strong> ${producto["descripción del Producto"]}</p>`);
document.write(`<p><strong>Cantidad:</strong> ${producto.cantidad}</p>`);
document.write(`<p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>`);
document.write("<p><em>La propiedad 'unidad' fue eliminada.</em></p>");
if ("unidad" in producto) {
  console.log("La propiedad 'unidad' existe en el objeto producto.");
} else {
  console.log("La propiedad 'unidad' no está definida o fue eliminada.");
}
document.write(`<p><strong>Unidad:</strong> ${producto.unidad}</p>`);


// ================================
// Datos y referencias del DOM
// ================================

// Arreglo principal de estudiantes (array de objetos)
let students = [];

// Índice del estudiante en edición (null para cuando se esté creando uno nuevo registro)
let editingIndex = null;

// Referencias a elementos del DOM
const studentForm = document.getElementById("student-form");
const studentIdInput = document.getElementById("student-id");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const coursesInput = document.getElementById("courses");
const paymentInput = document.getElementById("payment");

const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");

const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-name");
const searchBtn = document.getElementById("search-btn");
const clearSearchBtn = document.getElementById("clear-search-btn");

const studentsTbody = document.getElementById("students-tbody");
const statsOutput = document.getElementById("stats-output");

// ================================
// Funciones de utilidad
// ================================

/**
 * Limpia el formulario y restablece el estado de edición.
 * Función flecha - función anónima
 */
const resetForm = () => {
  studentForm.reset();
  studentIdInput.value = "";
  editingIndex = null;
  saveBtn.textContent = "Guardar";
};

/**
 * Función flecha o anónima que obtiene los datos del formulario y los convierte
 * a un objeto de estudiante.
 * @returns {{id:number,name:string,age:number,gender:string,courses:number,
 *            payment:number}}
 */
const getFormData = () => {
  return {
    id: studentIdInput.value ? Number(studentIdInput.value) : Date.now(),
    name: nameInput.value.trim(),
    age: Number(ageInput.value),
    gender: genderInput.value,
    courses: Number(coursesInput.value),
    payment: Number(paymentInput.value)
  };
};

/**
 * Carga los datos de un estudiante en el formulario para edición.
 * En este momento el editingIndex guarda el índice del elemento en el arreglo.
 * @param {number} index - Índice del estudiante en el arreglo principal.
 */
const loadStudentToForm = (index) => {
  const student = students[index];
  if (!student) return; //En caso que los datos no correspondan a un estudiante

  editingIndex = index;
  studentIdInput.value = student.id;
  nameInput.value = student.name;
  ageInput.value = student.age;
  genderInput.value = student.gender;
  coursesInput.value = student.courses;
  paymentInput.value = student.payment;
  saveBtn.textContent = "Guardar cambios";
};

/**
 * Pinta la tabla de estudiantes dinámicamente.
 * @param {Array} data - Arreglo de estudiantes a mostrar (por defecto, el arreglo principal).
 */
const renderTable = (data = students) => {
  // Validar que data sea realmente un arreglo
  if (!Array.isArray(data)) return;
  //Limpia el contenido del cuerpo de la tabla
  studentsTbody.innerHTML = "";
  //Recorre cada uno de los elementos del arreglo de estudiantes (data)
  data.forEach((student, index) => {
    //Para cada estudiante en el arreglo, crea una fila que luego se agregará en la tabla.
    const tr = document.createElement("tr");
    //Crea una celda para el campo No. (Repite para cada campo)
    const indexTd = document.createElement("td");
    //Le agrega el contenido a esa celda (El número de estudiante que le corresponda).
    indexTd.textContent = index + 1;
    //Crea una celda para el campo Nombre (Repite para cada campo)
    const nameTd = document.createElement("td");
    //Le agrega el contenindo a la celda nombre (Repite para cada campo)
    nameTd.textContent = student.name;

    const ageTd = document.createElement("td");
    ageTd.textContent = student.age;

    const genderTd = document.createElement("td");
    genderTd.textContent = student.gender;

    const coursesTd = document.createElement("td");
    coursesTd.textContent = student.courses;

    const paymentTd = document.createElement("td");
    paymentTd.textContent = student.payment.toFixed(2);

    const actionsTd = document.createElement("td");
    //Para cada registro además, crea los botones para completar el CR-U-D
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    //Le asigna los selectores de clases a los botones
    editBtn.classList.add("action-btn", "edit-btn");
    //Añade la función flecha que se disparará cuando se dé evento click
    editBtn.addEventListener("click", () => {
      // Buscar índice real en el arreglo principal usando findIndex
      const realIndex = students.findIndex((s) => s.id === student.id);
      if (realIndex !== -1) { //Si encuentra al registro en el arreglo
        //Carga los datos en el formulario para editarlo.
        loadStudentToForm(realIndex);
      }
    });

    //Agrega el botón para eliminar (otra acción CRU-D-)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("action-btn", "delete-btn");
    deleteBtn.addEventListener("click", () => {
      // Eliminar usando splice() en el arreglo principal
      const realIndex = students.findIndex((s) => s.id === student.id);
      if (realIndex !== -1) {
        students.splice(realIndex, 1);
        //Actualiza la tabla con los datos de los estudiantes que quedan en el arreglo
        renderTable(applyCurrentFilterAndSearch());
        //Actualiza la indicación si hay o no registros en el arreglo.
        updateStats();
      }
    });

    //Se va agregando a cada una de las celdas los elementos creados.
    //Al no ser texto simple, sino TAGs HTML se deben agregar con la función appendChild
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    /* Las columnas de los datos ya tienen su contenido,
     * Se las agrega a la fila correspondiente a ese registro.
    */
    tr.appendChild(indexTd);
    tr.appendChild(nameTd);
    tr.appendChild(ageTd);
    tr.appendChild(genderTd);
    tr.appendChild(coursesTd);
    tr.appendChild(paymentTd);
    tr.appendChild(actionsTd);

    //Una vez que, la fila está completa,, ahora se la añade al cuerpo de la tabla.
    studentsTbody.appendChild(tr);
  });
  //Actualiza si hay o no registros en la tabla (arreglo)
  updateStats();
};

/**
 * Aplica el filtro de género y la búsqueda actual y devuelve el arreglo resultante.
 * @returns {Array} Arreglo filtrado.
 */
const applyCurrentFilterAndSearch = () => {
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  // El valor del filtro será el seleccionado si el botón está activo,
  // sino se mostrarán todos. NO hay filtro
  const filterValue = activeFilterBtn ? activeFilterBtn.dataset.filter : "ALL";
  // Para asegurar una búsqueda completa, quita los espacios (trim) y lo convierte a
  // Minúsculas al término de la búsqueda
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Filtrar por género
  let filtered = students.filter((student) => {
    if (filterValue === "ALL") return true;
    return student.gender === filterValue;
  });

  // Búsqueda por nombre con includes + filter (En el arreglo filtrado por género)
  if (searchTerm) {
    filtered = filtered.filter((student) =>
      student.name.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
};

// ================================
// Estadísticas con métodos de arreglos
// ================================

/**
 * Genera estadísticas usando los métodos de arreglos:
 * map, filter, reduce, some, every, find, findIndex, lastIndexOf,
 * slice, splice (para CRUD), fill, at, Array.isArray.
 */
const updateStats = () => {
  //Si students es null no es un arreglo, y si es arreglo pero no tiene elementos
  if (!Array.isArray(students) || students.length === 0) {
    statsOutput.textContent = "No hay estudiantes registrados aún.";
    return;
  }

  /* map(): lista de nombres
   * map recorre el arreglo y crea uno nuevo con el resultado de la función indicada.
   * En este caso extrae solo el nombre de cada estudiante.
   */
  const names = students.map((s) => s.name);

  /* reduce(): suma total de pagos
   * reduce acumula valores; aquí suma el valor de pago de cada estudiante.
   * acc = acumulador, s = estudiante actual. Primer estudiante es índice 0.
   */
  const totalPayment = students.reduce((acc, s) => acc + s.payment, 0);

  // some(): ¿hay algún estudiante menor de edad?
  // some devuelve true si al menos un elemento cumple la condición indicada.
  const hasMinors = students.some((s) => s.age < 18);

  // every(): ¿todos tienen al menos un curso?
  // every devuelve true si TODOS los elementos cumplen la condición.
  const allHaveCourses = students.every((s) => s.courses >= 1);

  // find(): primer estudiante con más de 3 cursos
  // find devuelve el primer elemento que cumple la condición o undefined si no existe.
  const firstManyCourses = students.find((s) => s.courses > 3);

  /* findIndex(): índice del primer estudiante con pago mayor a 100
   * findIndex devuelve el índice del primer elemento que cumple la condición.
   * Si no existe devuelve -1.
   */
  const indexHighPayment = students.findIndex((s) => s.payment > 100);

  /* at(): obtener el último estudiante
   * at permite acceder usando índices positivos o negativos.
   * at(-1) devuelve el último elemento del arreglo.
   */
  const lastStudent = students.at(-1);

  /* slice(): clon superficial del arreglo de estudiantes
   * slice sin parámetros crea una copia del arreglo original.
   * No modifica el original (no es destructivo).
   */
  const clonedStudents = students.slice();

  /* fill(): crear un arreglo de bonos con un valor fijo
   * fill asigna el mismo valor (10) a cada posición del nuevo arreglo.
   * El arreglo tiene la misma longitud que el número de estudiantes.
   */
  const bonusArray = new Array(students.length).fill(10);

  /* lastIndexOf(): usarlo sobre un arreglo de géneros para encontrar la última ocurrencia
   * lastIndexOf busca desde el final hacia el inicio la última coincidencia.
   * genders se crea usando map y contiene solo los géneros del arreglo original.
  */
  const genders = students.map((s) => s.gender);
  const lastFemaleIndex = genders.lastIndexOf("F"); // última posición donde aparece "F"
  const lastMaleIndex = genders.lastIndexOf("M");   // última posición donde aparece "M"

  // filter(): ejemplo adicional para contar estudiantes con pago 0
  const unpaidStudents = students.filter((s) => s.payment === 0);

  // Validación con Array.isArray()
  const isArrayStudents = Array.isArray(students);

  // Construcción del texto de estadísticas
  let statsText = "";

  statsText += "== Estadísticas Generales ==\n";
  statsText += `Total de estudiantes: ${students.length}\n`;
  statsText += `Nombres (map): ${names.join(", ")}\n`;
  statsText += `Pago total acumulado (reduce): ${totalPayment.toFixed(2)}\n\n`;

  statsText += "== Validaciones (some / every) ==\n";
  statsText += `¿Existe algún estudiante menor de 18 años? (some): ${
    hasMinors ? "Sí" : "No"
  }\n`;
  statsText += `¿Todos tienen al menos 1 curso? (every): ${
    allHaveCourses ? "Sí" : "No"
  }\n\n`;

  statsText += "== Búsquedas (find / findIndex / at) ==\n";
  if (firstManyCourses) {
    statsText += `Primer estudiante con más de 3 cursos (find): ${
      firstManyCourses.name
    } (${firstManyCourses.courses} cursos)\n`;
  } else {
    statsText += "No hay estudiantes con más de 3 cursos (find).\n";
  }

  if (indexHighPayment !== -1) {
    statsText += `Índice del primer estudiante con pago > 100 (findIndex): ${indexHighPayment}\n`;
  } else {
    statsText += "No hay estudiantes con pago > 100 (findIndex).\n";
  }

  statsText += `Último estudiante en la lista (at): ${
    lastStudent ? lastStudent.name : "N/A"
  }\n\n`;

  statsText += "== Clonado y transformaciones (slice / fill / lastIndexOf) ==\n";
  statsText += `Longitud del clon de estudiantes (slice): ${clonedStudents.length}\n`;
  statsText += `Arreglo de bonos creado con fill (10 por estudiante): [${bonusArray.join(
    ", "
  )}]\n`;
  statsText += `Última posición de Femenino en géneros (lastIndexOf): ${lastFemaleIndex}\n`;
  statsText += `Última posición de Masculino en géneros (lastIndexOf): ${lastMaleIndex}\n\n`;

  statsText += "== Otros datos (filter / Array.isArray) ==\n";
  statsText += `Estudiantes con pago 0 (filter): ${unpaidStudents
    .map((s) => s.name)
    .join(", ") || "Ninguno"}\n`;
  statsText += `¿'students' es un arreglo válido? (Array.isArray): ${
    isArrayStudents ? "Sí" : "No"
  }\n`;

  statsOutput.textContent = statsText;
};

// ================================
// Manejadores de eventos
// ================================

/**
 * Maneja el envío del formulario:
 * - Si no hay índice de edición, crea un nuevo estudiante (Create).
 * - Si hay índice de edición, actualiza el estudiante existente (Update).
 */
studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const studentData = getFormData();

  // Crear nuevo registro
  if (editingIndex === null) {
    students.push(studentData);
  } else {
    // Actualizar registro existente
    students[editingIndex] = studentData;
  }

  renderTable(applyCurrentFilterAndSearch());
  resetForm();
});

/**
 * Limpia el formulario al hacer clic en "Limpiar".
 */
resetBtn.addEventListener("click", () => {
  resetForm();
});

/**
 * Maneja los filtros por género.
 */
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderTable(applyCurrentFilterAndSearch());
  });
});

/**
 * Maneja la búsqueda por nombre.
 */
searchBtn.addEventListener("click", () => {
  renderTable(applyCurrentFilterAndSearch());
});

/**
 * Limpia la búsqueda y vuelve a mostrar según el filtro actual.
 */
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderTable(applyCurrentFilterAndSearch());
});

/**
 * Permitir búsqueda al presionar Enter en el campo de texto.
 */
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    renderTable(applyCurrentFilterAndSearch());
  }
});

// ================================
// Inicialización
// ================================

// Render inicial (sin datos)
renderTable();

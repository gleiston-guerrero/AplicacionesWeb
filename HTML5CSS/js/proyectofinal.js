// ===============================
// 1. Datos y referencias al DOM
// ===============================

// Declara un arreglo vacío donde se almacenarán los estudiantes como objetos
let students = [];

// Obtiene la referencia al formulario por su id para poder gestionar el envío
const studentForm = document.getElementById("studentForm");

// Obtiene la referencia al campo oculto donde se guarda el índice del estudiante en edición
const editIndexInput = document.getElementById("editIndex");

// Obtiene la referencia al campo de nombre del estudiante
const nameInput = document.getElementById("name");

// Obtiene la referencia al campo de edad del estudiante
const ageInput = document.getElementById("age");

// Obtiene la referencia al selector de género del estudiante
const genderInput = document.getElementById("gender");

// Obtiene la referencia al campo numérico de cantidad de cursos
const coursesInput = document.getElementById("courses");

// Obtiene la referencia al campo numérico de valor de pago
const paymentInput = document.getElementById("payment");

// Obtiene la referencia al botón que limpia el formulario
const clearButton = document.getElementById("clearButton");

// Obtiene la referencia al cuerpo de la tabla donde se insertarán las filas dinámicamente
const studentsTableBody = document.getElementById("studentsTableBody");

// Obtiene la referencia al panel donde se mostrarán las estadísticas
const statsPanel = document.getElementById("statsPanel");

// Obtiene la referencia al campo de búsqueda por nombre
const searchNameInput = document.getElementById("searchName");

// Obtiene la referencia al botón para ejecutar la búsqueda
const searchButton = document.getElementById("searchButton");

// Obtiene la referencia al botón para limpiar el término de búsqueda
const clearSearchButton = document.getElementById("clearSearchButton");

// Obtiene la referencia a los botones de filtro por género
const filterAllButton = document.getElementById("filterAll");
const filterFemaleButton = document.getElementById("filterFemale");
const filterMaleButton = document.getElementById("filterMale");

// Variable que almacenará la lista de estudiantes actualmente visibles (por filtro o búsqueda)
let currentView = [];
// Se usa para poder aplicar estadísticas sobre la vista filtrada en lugar del arreglo completo


// =======================================
// 2. Funciones auxiliares de la aplicación
// =======================================

// Función que limpia todos los campos del formulario y el índice de edición
const clearForm = () => {
  // Establece el valor del campo de nombre a cadena vacía
  nameInput.value = "";
  // Establece la edad como cadena vacía
  ageInput.value = "";
  // Restablece el selector de género a la opción por defecto
  genderInput.value = "";
  // Limpia el campo de número de cursos
  coursesInput.value = "";
  // Limpia el campo de pago
  paymentInput.value = "";
  // Elimina el índice de edición indicando que no se está editando ningún registro
  editIndexInput.value = "";
};

// Función que construye dinámicamente la tabla a partir de un arreglo de estudiantes
const renderTable = (list = students) => {
  // Verifica que el parámetro recibido efectivamente sea un arreglo antes de trabajar con él
  if (!Array.isArray(list)) {
    // Si no es un arreglo, se muestra un mensaje en consola y se detiene la ejecución de la función
    console.error("La lista proporcionada no es un arreglo");
    return;
  }

  // Actualiza la variable currentView con la lista actual que se está renderizando
  currentView = list;

  // Utiliza el método map para transformar cada estudiante en una fila HTML
  const rowsHtml = list
    .map((student, index) => {
      // Dentro del map, para cada estudiante se devuelve una plantilla de fila HTML
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.gender}</td>
          <td>${student.courses}</td>
          <td>${student.payment.toFixed(2)}</td>
          <td>
            <button type="button" class="edit-btn" data-index="${index}">Editar</button>
            <button type="button" class="delete-btn" data-index="${index}">Eliminar</button>
          </td>
        </tr>
      `;
      // Cada fila incluye los datos del estudiante y botones con data-index para identificar su posición
    })
    .join("");
  // join("") concatena todas las filas generadas en una sola cadena, sin separador

  // Inserta el HTML resultante dentro del cuerpo de la tabla
  studentsTableBody.innerHTML = rowsHtml;

  // Después de pintar la tabla, actualiza las estadísticas en función de la vista actual
  updateStats();
};

// Función que crea un objeto estudiante a partir de los valores del formulario
const getStudentFromForm = () => {
  // Construye y devuelve un objeto literal con las propiedades requeridas
  return {
    // Propiedad name (cadena) tomada del campo de texto
    name: nameInput.value.trim(),
    // Propiedad age convertida a número entero
    age: Number(ageInput.value),
    // Propiedad gender tal como aparece en el selector
    gender: genderInput.value,
    // Propiedad courses convertida a número entero
    courses: Number(coursesInput.value),
    // Propiedad payment convertida a número de coma flotante
    payment: Number(paymentInput.value),
  };
};

// Función que valida de forma básica los datos del estudiante
const isStudentValid = (student) => {
  // Comprueba que el nombre no esté vacío
  if (!student.name) return false;
  // Comprueba que la edad sea mayor o igual a cero
  if (student.age < 0) return false;
  // Comprueba que el género no esté vacío
  if (!student.gender) return false;
  // Comprueba que el número de cursos no sea negativo
  if (student.courses < 0) return false;
  // Comprueba que el pago no sea negativo
  if (student.payment < 0) return false;
  // Si pasa todas las validaciones, devuelve true indicando que el estudiante es válido
  return true;
};


// ==================================
// 3. Gestión del formulario (CRUD)
// ==================================

// Maneja el evento submit del formulario para crear o actualizar un estudiante
studentForm.addEventListener("submit", (event) => {
  // Previene el comportamiento por defecto del formulario (recargar la página)
  event.preventDefault();

  // Obtiene el objeto estudiante a partir de los valores actuales del formulario
  const student = getStudentFromForm();

  // Si el estudiante no es válido, muestra una alerta y termina la función
  if (!isStudentValid(student)) {
    alert("Por favor, complete correctamente todos los campos.");
    return;
  }

  // Lee el valor del índice de edición desde el campo oculto
  const editIndexValue = editIndexInput.value;

  // Verifica si existe un índice de edición para decidir entre crear o actualizar
  if (editIndexValue === "") {
    // Si no hay índice, significa que se creará un nuevo estudiante
    students.push(student);
    // push agrega el nuevo objeto al final del arreglo principal
  } else {
    // Si hay índice de edición, se convierte a número
    const index = Number(editIndexValue);
    // Se reemplaza el estudiante en la posición indicada usando el índice
    students[index] = student;
  }

  // Vuelve a pintar la tabla con el arreglo completo de estudiantes
  renderTable(students);

  // Limpia el formulario y el índice de edición después de guardar
  clearForm();
});

// Maneja el clic en el botón "Limpiar" del formulario
clearButton.addEventListener("click", () => {
  // Llama a la función que limpia los campos del formulario
  clearForm();
});


// ====================================
// 4. Delegación de eventos en la tabla
// ====================================

// Agrega un único listener de clic al cuerpo de la tabla para manejar editar y eliminar
studentsTableBody.addEventListener("click", (event) => {
  // Obtiene el elemento específico sobre el que se hizo clic
  const target = event.target;

  // Verifica si el elemento clicado tiene la clase "edit-btn"
  if (target.classList.contains("edit-btn")) {
    // Obtiene el índice del estudiante desde el atributo data-index
    const index = Number(target.dataset.index);
    // Llama a la función que carga los datos del estudiante al formulario
    loadStudentIntoForm(index);
  }

  // Verifica si el elemento clicado tiene la clase "delete-btn"
  if (target.classList.contains("delete-btn")) {
    // Obtiene el índice del estudiante a eliminar desde el atributo data-index
    const index = Number(target.dataset.index);
    // Llama a la función que elimina el estudiante del arreglo
    deleteStudent(index);
  }
});

// Función que carga al formulario los datos de un estudiante para ser editado
const loadStudentIntoForm = (index) => {
  // Obtiene el estudiante desde el arreglo original usando el índice
  const student = students[index];

  // Asigna el nombre del estudiante al campo correspondiente
  nameInput.value = student.name;
  // Asigna la edad del estudiante
  ageInput.value = student.age;
  // Asigna el género del estudiante
  genderInput.value = student.gender;
  // Asigna el número de cursos del estudiante
  coursesInput.value = student.courses;
  // Asigna el valor de pago del estudiante
  paymentInput.value = student.payment;
  // Establece el índice de edición en el campo oculto
  editIndexInput.value = index;
};

// Función que elimina un estudiante del arreglo usando splice
const deleteStudent = (index) => {
  // splice elimina un elemento desde el índice indicado, en este caso un único elemento
  students.splice(index, 1);

  // Después de eliminar, se vuelve a pintar la tabla con el arreglo actualizado
  renderTable(students);
};


// =============================
// 5. Búsqueda y filtros
// =============================

// Maneja el clic del botón de búsqueda por nombre
searchButton.addEventListener("click", () => {
  // Obtiene el término de búsqueda, recortando espacios y pasando a minúsculas
  const term = searchNameInput.value.trim().toLowerCase();

  // Si el término está vacío, simplemente se vuelve a mostrar la tabla completa
  if (!term) {
    renderTable(students);
    return;
  }

  // Aplica filter al arreglo de estudiantes para encontrar coincidencias parciales en el nombre
  const filtered = students.filter((student) =>
    student.name.toLowerCase().includes(term)
  );
  // includes verifica si la cadena del nombre contiene el término buscado

  // Muestra en la tabla únicamente los estudiantes que coinciden con la búsqueda
  renderTable(filtered);
});

// Maneja el clic del botón para limpiar la búsqueda
clearSearchButton.addEventListener("click", () => {
  // Limpia el campo de texto del término de búsqueda
  searchNameInput.value = "";
  // Vuelve a pintar la tabla con todos los estudiantes
  renderTable(students);
});

// Maneja el clic del botón "Mostrar todos" en los filtros de género
filterAllButton.addEventListener("click", () => {
  // Muestra el arreglo completo de estudiantes sin filtrar
  renderTable(students);
});

// Maneja el clic del botón "Solo femeninas"
filterFemaleButton.addEventListener("click", () => {
  // Usa filter para obtener solo estudiantes con género "F"
  const filtered = students.filter((student) => student.gender === "F");
  // Muestra únicamente las estudiantes femeninas
  renderTable(filtered);
});

// Maneja el clic del botón "Solo masculinos"
filterMaleButton.addEventListener("click", () => {
  // Usa filter para obtener solo estudiantes con género "M"
  const filtered = students.filter((student) => student.gender === "M");
  // Muestra únicamente los estudiantes masculinos
  renderTable(filtered);
});


// ===================================
// 6. Estadísticas con métodos de arreglos
// ===================================

// Función que actualiza el panel de estadísticas usando métodos modernos de arreglos
const updateStats = () => {
  // Si la vista actual está vacía, se limpia el panel de estadísticas
  if (currentView.length === 0) {
    statsPanel.textContent = "No hay estudiantes para mostrar estadísticas.";
    return;
  }

  // Usa map para obtener un arreglo de nombres de los estudiantes visibles
  const names = currentView.map((student) => student.name);

  // Usa reduce para calcular el total acumulado de pagos de los estudiantes visibles
  const totalPayments = currentView.reduce(
    (accumulator, student) => accumulator + student.payment,
    0
  );

  // Usa some para verificar si existe al menos un estudiante con más de 3 cursos
  const hasManyCourses = currentView.some((student) => student.courses > 3);

  // Usa every para verificar si todos los estudiantes tienen edad mayor o igual a 18
  const allAdults = currentView.every((student) => student.age >= 18);

  // Usa find para obtener el primer estudiante cuya cuota de pago sea mayor a 100
  const firstHighPayment = currentView.find((student) => student.payment > 100);

  // Usa findIndex para localizar la posición del primer estudiante con más de 5 cursos
  const indexManyCourses = currentView.findIndex(
    (student) => student.courses > 5
  );

  // Usa at para obtener el primer estudiante de la lista
  const firstStudent = currentView.at(0);

  // Usa at con un índice negativo para obtener el último estudiante de la lista
  const lastStudent = currentView.at(-1);

  // Usa slice para crear un clon superficial de la vista actual
  const clonedView = currentView.slice();

  // Usa fill para crear un arreglo de etiquetas descriptivas del mismo tamaño que la vista
  const labels = new Array(currentView.length).fill("Estudiante activo");
  // fill establece el mismo valor en todas las posiciones de un nuevo arreglo

  // Usa lastIndexOf para localizar la última posición de la cadena "Estudiante activo" en el arreglo labels
  const lastLabelIndex = labels.lastIndexOf("Estudiante activo");

  // Construye un texto de estadísticas en varias líneas
  let statsText = "";
  // Inicializa el texto vacío

  // Agrega la lista de nombres obtenidos con map
  statsText += "Nombres (map): " + names.join(", ") + "\n";
  // join une los nombres separados por comas

  // Agrega el total de pagos calculado con reduce
  statsText += "Total de pagos (reduce): " + totalPayments.toFixed(2) + "\n";

  // Agrega el resultado de la validación con some
  statsText +=
    "¿Hay algún estudiante con más de 3 cursos? (some): " +
    (hasManyCourses ? "Sí" : "No") +
    "\n";

  // Agrega el resultado de la validación con every
  statsText +=
    "¿Todos los estudiantes son mayores o iguales a 18 años? (every): " +
    (allAdults ? "Sí" : "No") +
    "\n";

  // Agrega información del primer estudiante con pago alto encontrado con find
  statsText += "Primer estudiante con pago > 100 (find): ";
  // Verifica si existe un estudiante que cumpla la condición
  if (firstHighPayment) {
    // Si existe, muestra su nombre y pago
    statsText +=
      `${firstHighPayment.name} - ${firstHighPayment.payment.toFixed(2)}\n`;
  } else {
    // Si no existe, indica que no se encontró
    statsText += "No encontrado\n";
  }

  // Agrega el índice del primer estudiante con más de 5 cursos
  statsText +=
    "Índice del primer estudiante con más de 5 cursos (findIndex): " +
    indexManyCourses +
    "\n";

  // Agrega información del primer estudiante usando at(0)
  statsText += "Primer estudiante (at(0)): ";
  statsText += firstStudent
    ? `${firstStudent.name}, edad ${firstStudent.age}\n`
    : "No definido\n";

  // Agrega información del último estudiante usando at(-1)
  statsText += "Último estudiante (at(-1)): ";
  statsText += lastStudent
    ? `${lastStudent.name}, edad ${lastStudent.age}\n`
    : "No definido\n";

  // Agrega el tamaño del clon generado con slice
  statsText +=
    "Tamaño de la vista clonada (slice): " + clonedView.length + "\n";

  // Agrega el índice encontrado con lastIndexOf en el arreglo labels
  statsText +=
    'Última posición de "Estudiante activo" (lastIndexOf): ' +
    lastLabelIndex +
    "\n";

  // Finalmente, asigna el texto completo al panel de estadísticas
  statsPanel.textContent = statsText;
};


// =============================
// 7. Inicialización de la app
// =============================

// Llama a renderTable al inicio para mostrar la tabla vacía y las estadísticas iniciales
renderTable(students);

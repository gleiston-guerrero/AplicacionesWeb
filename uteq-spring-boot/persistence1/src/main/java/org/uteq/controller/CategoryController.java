// Paquete al que pertenece esta clase: organización lógica del código fuente
package org.uteq.controller;

// Importación de la clase Category, que representa la entidad a gestionar
import org.uteq.model.Category;

// Importación de la interfaz del servicio que contiene la lógica de negocio asociada a categorías
import org.uteq.service.ICategoryService;

// Anotación de Lombok para generar automáticamente un constructor con los atributos final y @NonNull
import lombok.RequiredArgsConstructor;

// Clases de Spring para construir respuestas HTTP personalizadas
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

// Anotaciones de Spring para definir rutas y controladores REST
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST que gestiona las operaciones CRUD relacionadas con las categorías.
 * Esta clase expone endpoints HTTP que permiten interactuar con la entidad Category.
 *
 * <p>Se utiliza el servicio ICategoryService para delegar la lógica de negocio.</p>
 *
 * <p>Los endpoints disponibles permiten:</p>
 * <ul>
 *     <li>Listar todas las categorías (GET)</li>
 *     <li>Obtener una categoría por ID (GET)</li>
 *     <li>Guardar una nueva categoría (POST)</li>
 *     <li>Actualizar una categoría existente (PUT)</li>
 *     <li>Eliminar una categoría por ID (DELETE)</li>
 * </ul>
 */
@RestController // Anotación que indica que esta clase es un controlador REST de Spring
@RequestMapping("/categories") // Define la ruta base del controlador para todas sus operaciones
@RequiredArgsConstructor // Lombok genera automáticamente un constructor con el atributo 'service' inyectado
public class CategoryController {

    // Declaración del servicio que implementa la lógica de negocio para Category.
    // Está declarado como final para ser inyectado vía constructor (Recomendado sobre @Autowired).
    //@Autowired // Alternativa clásica (comentada). Se prefiere inyección por constructor con @RequiredArgsConstructor
    private final ICategoryService service;

    /**
     * Obtiene la lista de todas las categorías disponibles.
     *
     * @return ResponseEntity con la lista de categorías y el estado HTTP 200 OK.
     * @throws Exception en caso de errores durante la operación.
     */
    @GetMapping // Mapea peticiones HTTP GET a /categories
    public ResponseEntity<List<Category>> findAll() throws Exception {
        // Llama al servicio para obtener todas las categorías
        List<Category> list = service.findAll();

        // Retorna la respuesta HTTP con la lista y código 200 (OK)
        return ResponseEntity.ok().body(list);
    }

    /**
     * Obtiene una categoría por su ID.
     *
     * @param id identificador de la categoría.
     * @return ResponseEntity con la categoría encontrada y estado HTTP 200 OK.
     * @throws Exception si ocurre un error o no se encuentra la categoría.
     */
    @GetMapping("/{id}") // Mapea GET a /categories/{id}
    public ResponseEntity<Category> findById(@PathVariable("id") Integer id) throws Exception {
        // Llama al servicio para buscar la categoría por ID
        Category obj = service.findById(id);

        // Retorna la categoría encontrada
        return ResponseEntity.ok().body(obj);
    }

    /**
     * Guarda una nueva categoría enviada desde el cliente.
     *
     * @param category objeto Category recibido en el cuerpo de la petición.
     * @return ResponseEntity con la categoría guardada y estado HTTP 201 Created.
     * @throws Exception si ocurre un error en la creación.
     */
    @PostMapping // Mapea POST a /categories
    public ResponseEntity<Category> save(@RequestBody Category category) throws Exception {
        // Guarda la categoría a través del servicio
        Category obj = service.save(category);

        // Retorna la respuesta con estado HTTP 201 (CREATED)
        return ResponseEntity.status(HttpStatus.CREATED).body(obj);
    }

    /**
     * Actualiza una categoría existente identificada por su ID.
     *
     * @param id identificador de la categoría.
     * @param category objeto Category con los nuevos datos.
     * @return ResponseEntity con la categoría actualizada y estado HTTP 200 OK.
     * @throws Exception si ocurre un error durante la actualización.
     */
    @PutMapping("/{id}") // Mapea PUT a /categories/{id}
    public ResponseEntity<Category> update(@PathVariable("id") Integer id, @RequestBody Category category) throws Exception {
        // Actualiza la categoría usando el ID y los nuevos datos
        Category obj =  service.update(id, category);

        // Retorna la respuesta con la categoría actualizada
        return ResponseEntity.ok().body(obj);
    }

    /**
     * Elimina una categoría por su ID.
     *
     * @param id identificador de la categoría a eliminar.
     * @return ResponseEntity sin cuerpo y estado HTTP 204 No Content.
     * @throws Exception si ocurre un error durante la eliminación.
     */
    @DeleteMapping("/{id}") // Mapea DELETE a /categories/{id}
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) throws Exception {
        // Llama al servicio para eliminar la categoría
        service.delete(id);

        // Retorna una respuesta vacía con estado 204 (NO CONTENT)
        return ResponseEntity.noContent().build();
    }

    /*
     * Constructor explícito alternativo para inyección de dependencias.
     * Fue comentado porque @RequiredArgsConstructor de Lombok ya genera este constructor automáticamente.
     */
    /*public CategoryController(ICategoryService service) {
        this.service = service;
    }*/

    /*
     * Método de prueba alternativo comentado.
     * Se utilizaba para guardar manualmente una categoría fija, útil durante las pruebas.
     *
     * Esta lógica ahora se encuentra en el método save(), y se espera una categoría desde el cliente vía @RequestBody.
     */
    /*@GetMapping
    public Category save() {
        //service = new CategoryService(); // Instanciación directa (mala práctica en aplicaciones Spring)
        return service.validAndSave(new Category(0, "COMPUTERS", "Some Computers", true));
    }*/
}

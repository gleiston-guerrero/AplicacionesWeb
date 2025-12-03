package org.uteq.controller;

import org.uteq.dto.CategoryDTO;
import org.uteq.model.Category;
import org.uteq.service.ICategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    //@Autowired
    private final ICategoryService service;
    @Qualifier("categoryMapper")
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAll() throws Exception {
        //ModelMapper mapper = new ModelMapper();
        List<CategoryDTO> list = service.findAll()
                .stream()
                .map(this::convertToDto)
                ///.map(e -> modelMapper.map(e, CategoryDTO.class))
                //.map(e -> new CategoryDTO(e.getIdCategory(), e.getName(), e.getDescription(), e.isEnabled()))
                .toList();

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable("id") Integer id) throws Exception {
        CategoryDTO obj = convertToDto(service.findById(id));

        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> save(@Valid @RequestBody CategoryDTO dto) throws Exception {
        Category obj = service.save(convertToEntity(dto));

        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(obj)) ;
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(@Valid @PathVariable("id") Integer id, @RequestBody CategoryDTO dto) throws Exception {
        //dto.setIdCategory(id);
        Category obj =  service.update(id, convertToEntity(dto));

        return ResponseEntity.ok().body(convertToDto(obj)) ;
    }

    @DeleteMapping("/{id}")
    /*public ResponseEntity<Void> delete(@PathVariable("id") Integer id) throws Exception {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }*/
    public ResponseEntity<CategoryDTO> delete(@PathVariable("id") Integer id) throws Exception {
        // 1. Buscar el objeto antes de eliminarlo.
        Category obj = service.findById(id); // 'Entidad' es la clase correspondiente (por ejemplo, Product, Client, etc.)

        if (obj == null) {
            // Si no existe, retornar 404 Not Found.
            return ResponseEntity.notFound().build();
        }

        // 2. Eliminar el objeto por ID.
        service.delete(id);

        // 3. Retornar el objeto eliminado y status 200 OK.
        return ResponseEntity.ok(convertToDto(obj));
    }

    private CategoryDTO convertToDto(Category obj) {
        return modelMapper.map(obj, CategoryDTO.class);
    }

    private Category convertToEntity(CategoryDTO dto) {
        return modelMapper.map(dto, Category.class);
    }


    /*public CategoryController(ICategoryService service) {
        this.service = service;
    }*/

    /*@GetMapping
    public Category save() {
        //service = new CategoryService();
        return service.validAndSave(new Category(0, "COMPUTERS", "Some Computers", true));
    }*/



}

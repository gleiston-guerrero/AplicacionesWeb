package com.mitocode.controller;

import com.mitocode.dto.CategoryDTO;
import com.mitocode.model.Category;
import com.mitocode.service.ICategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) throws Exception {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }

    /// ////////////////queries////////////////
    @GetMapping("/find/name/{name}")
    public ResponseEntity<List<CategoryDTO>> findByName(@PathVariable("name") String name) throws Exception {
        List<CategoryDTO> list = service.findByName(name).stream().map(this::convertToDto).toList();

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/find/name/like/{name}")
    public ResponseEntity<List<CategoryDTO>> findByNameLike(@PathVariable("name") String name) throws Exception {
        List<CategoryDTO> list = service.findByNameLike(name).stream().map(this::convertToDto).toList();

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/find/name/enabled")
    public ResponseEntity<List<CategoryDTO>> findByNameEnabled(@RequestParam("name") String name, @RequestParam("enabled") boolean enabled) throws Exception {
        List<CategoryDTO> list = service.findByNameAndEnabled(name, enabled).stream().map(this::convertToDto).toList();

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/get/name/desc1")
    public ResponseEntity<List<CategoryDTO>> findByNameDesc1(@RequestParam("name") String name, @RequestParam("desc") String desc) throws Exception {
        List<CategoryDTO> list = service.getNameAndDescription1(name, desc).stream().map(this::convertToDto).toList();

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/get/name/desc2")
    public ResponseEntity<List<CategoryDTO>> findByNameDesc2(@RequestParam("name") String name, @RequestParam("desc") String desc) throws Exception {
        List<CategoryDTO> list = service.getNameAndDescription2(name, desc).stream().map(this::convertToDto).toList();

        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/pagination")
    public ResponseEntity<Page<CategoryDTO>> findPage(Pageable pageable) throws Exception {
        Page<CategoryDTO> page = service.findPage(pageable).map(this::convertToDto);

        return ResponseEntity.ok().body(page);
    }

    @GetMapping("/pagination2")
    public ResponseEntity<Page<CategoryDTO>> findPage2(
            @RequestParam(name = "p", defaultValue = "0") int page,
            @RequestParam(name = "s", defaultValue = "2") int size
    ) throws Exception {
        Page<CategoryDTO> pageResult = service.findPage(PageRequest.of(page, size)).map(this::convertToDto);;

        return ResponseEntity.ok().body(pageResult);
    }

    @GetMapping("/order")
    public ResponseEntity<List<CategoryDTO>> findOrder(@RequestParam String param) throws Exception {
        return ResponseEntity.ok(service.findAllOrder(param).stream().map(this::convertToDto).toList());
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

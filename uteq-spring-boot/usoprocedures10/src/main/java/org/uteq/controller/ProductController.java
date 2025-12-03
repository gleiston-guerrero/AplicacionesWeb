package org.uteq.controller;

import org.uteq.dto.GenericResponse;
import org.uteq.dto.ProductDTO;
import org.uteq.model.Product;
import org.uteq.service.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    //@Autowired
    private final IProductService service;
    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<GenericResponse<ProductDTO>> findAll() throws Exception {
        List<ProductDTO> list = service.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();

        return ResponseEntity.ok().body(new GenericResponse<>(200, "success", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<ProductDTO>> findById(@PathVariable("id") Integer id) throws Exception {
        ProductDTO obj = convertToDto(service.findById(id));

        return ResponseEntity.ok().body(new GenericResponse<>(200, "success", List.of(obj)));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> save(@Valid @RequestBody ProductDTO dto) throws Exception {
        Product obj = service.save(convertToEntity(dto));

        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(obj)) ;
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@Valid @PathVariable("id") Integer id, @RequestBody ProductDTO dto) throws Exception {
        //dto.setIdProduct(id);
        Product obj =  service.update(id, convertToEntity(dto));

        return ResponseEntity.ok().body(convertToDto(obj)) ;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) throws Exception {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }

    /// /////////
    @GetMapping("/byCategory")
    public ResponseEntity<List<ProductDTO>> findByCategory(@RequestParam("category") String category) throws Exception {
        List<ProductDTO> list = service.getProductsByCategory(category).stream().map(this::convertToDto).toList();

        return ResponseEntity.ok().body(list);
    }

    private ProductDTO convertToDto(Product obj) {
        return modelMapper.map(obj, ProductDTO.class);
    }

    private Product convertToEntity(ProductDTO dto) {
        return modelMapper.map(dto, Product.class);
    }

}

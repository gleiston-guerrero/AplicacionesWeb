package org.uteq.controller;

import org.uteq.model.MediaFile;
import org.uteq.service.IMediaFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaFileController {

    private final IMediaFileService service;

    @PostMapping
    public ResponseEntity<MediaFile> uploadMediaFile(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        MediaFile mf = new MediaFile();
        mf.setFileName(multipartFile.getOriginalFilename());
        mf.setFileType(multipartFile.getContentType());
        mf.setContent(multipartFile.getBytes());

        MediaFile obj = service.save(mf);

        return ResponseEntity.ok(obj);
    }

    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> viewMediaFile(@PathVariable Integer id) throws Exception {
        byte[] data = service.findById(id).getContent();

        return ResponseEntity.ok().body(data);
    }
}

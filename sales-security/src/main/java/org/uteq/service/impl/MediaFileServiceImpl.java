package org.uteq.service.impl;

import org.uteq.model.MediaFile;
import org.uteq.repository.IGenericRepo;
import org.uteq.repository.IMediaFileRepo;
import org.uteq.service.IMediaFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MediaFileServiceImpl extends CRUDImpl<MediaFile, Integer> implements IMediaFileService {

    private final IMediaFileRepo repo;

    @Override
    protected IGenericRepo<MediaFile, Integer> getRepo() {
        return repo;
    }
}

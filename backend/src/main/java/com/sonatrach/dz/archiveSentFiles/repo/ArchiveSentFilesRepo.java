package com.sonatrach.dz.archiveSentFiles.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.archiveSentFiles.domain.ArchiveSentFiles;
import com.sonatrach.dz.archiveSentFiles.domain.ArchiveSentFilesId;


@Repository
public interface ArchiveSentFilesRepo  extends JpaRepository<ArchiveSentFiles, ArchiveSentFilesId>{
ArrayList<ArchiveSentFiles> findByIdEmail(Integer id);
}

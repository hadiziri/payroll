package com.sonatrach.dz.fileType.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.fileType.domain.FileType;


@Repository
public interface FileTypeRepo extends JpaRepository<FileType,Integer > {
Integer findByPrefixFile(String prefix);
}

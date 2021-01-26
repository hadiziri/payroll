package com.sonatrach.dz.fileTypeToFolder.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.fileTypeToFolder.domain.FileTypeToFolder;
import com.sonatrach.dz.fileTypeToFolder.domain.FileTypeToFolderId;


@Repository
public interface FileTypeToFolderRepo  extends JpaRepository<FileTypeToFolder, FileTypeToFolderId>{

	ArrayList<FileTypeToFolder>findByIdFolder(Integer id);
}

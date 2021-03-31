package com.sonatrach.dz.folderArchive.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.folderArchive.domain.FolderArchive;
import com.sonatrach.dz.folderArchive.domain.FolderArchiveId;


@Repository
public interface FolderArchiveRepo extends JpaRepository<FolderArchive,FolderArchiveId > {
ArrayList<FolderArchive>findByOperation(String op,Integer id,int status);
ArrayList<FolderArchive> findByUser(Integer id,int status);
}

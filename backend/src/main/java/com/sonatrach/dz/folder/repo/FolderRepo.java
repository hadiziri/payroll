package com.sonatrach.dz.folder.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.folder.domain.Folder;


@Repository
public interface FolderRepo  extends JpaRepository<Folder, Integer> {

}

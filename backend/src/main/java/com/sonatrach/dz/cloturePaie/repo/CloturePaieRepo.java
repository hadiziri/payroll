package com.sonatrach.dz.cloturePaie.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.cloturePaie.domain.CloturePaie;
import com.sonatrach.dz.fileTypeToFolder.domain.FileTypeToFolderId;

@Repository
public interface CloturePaieRepo extends JpaRepository<CloturePaie, FileTypeToFolderId>{
	List<CloturePaie> findByDesc(String desc);
	List<CloturePaie> findByCategory(String FOLDERNAME);
	List<CloturePaie> findByFileCat(Integer idCat);
}

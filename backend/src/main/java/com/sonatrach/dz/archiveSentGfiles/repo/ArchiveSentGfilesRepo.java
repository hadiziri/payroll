package com.sonatrach.dz.archiveSentGfiles.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.sonatrach.dz.archiveSentGfiles.domain.ArchiveSentGfiles;
import com.sonatrach.dz.archiveSentGfiles.domain.ArchiveSentGfilesId;


@Repository
public interface ArchiveSentGfilesRepo extends JpaRepository<ArchiveSentGfiles, ArchiveSentGfilesId>{
	ArrayList<ArchiveSentGfiles> findGfilesByIdEmail(Integer id);
}

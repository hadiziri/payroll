package com.sonatrach.dz.archiveStructure.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.archiveStructure.domain.ArchiveStructure;
import com.sonatrach.dz.archiveStructure.domain.ArchiveStructureId;


@Repository
public interface ArchiveStructureRepo extends JpaRepository<ArchiveStructure,ArchiveStructureId > {

}

package com.sonatrach.dz.fileToPrint.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.fileToPrint.domain.FileToPrint;
import com.sonatrach.dz.fileToPrint.domain.FileToPrintId;



@Repository
public interface FileToPrintRepo extends JpaRepository<FileToPrint ,FileToPrintId > {

}

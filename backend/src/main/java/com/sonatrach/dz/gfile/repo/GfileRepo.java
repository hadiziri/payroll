package com.sonatrach.dz.gfile.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.gfile.domain.Gfile;
@Repository
public interface GfileRepo extends JpaRepository<Gfile, Integer>{
	Gfile findByIdFilePaymonth(Integer idF,Integer IdP);
	List<Gfile> findByFolderName(String foldername);
}

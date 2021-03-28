package com.sonatrach.dz.rubAlph.repo;

import java.awt.Cursor;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.rubAlph.domain.RubAlph;
import com.sonatrach.dz.rubAlph.domain.RubId;


@Repository
public interface RubAlphRepo extends JpaRepository<RubAlph ,RubId >{
	/*@Procedure(name = "FINDRUB",outputParameterName = "xresult")
	List<RubAlph> findRub(@Param("frub") Integer frub,@Param("conditionlike") String conditionlike,@Param("conditionnotlike") String conditionnotlike);*/
}

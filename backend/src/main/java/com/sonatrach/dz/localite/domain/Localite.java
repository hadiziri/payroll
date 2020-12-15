package com.sonatrach.dz.localite.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_LOCALITES")
public class Localite {
	@Id
	@Column(name="LOC_CLOC")
	private String code;
	@Column(name="LOC_DESIGNATION")
	private String designation;
	
	public Localite() {
		
	}

	
	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}
	
	
}

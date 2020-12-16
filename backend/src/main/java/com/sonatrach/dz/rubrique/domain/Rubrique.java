package com.sonatrach.dz.rubrique.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_RUBRIQUES")
public class Rubrique {
	@Id
	@Column(name="RUB_CRUB")
	private String code;

	@Column(name="RUB_DESIGNATION")
	private String designation;

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

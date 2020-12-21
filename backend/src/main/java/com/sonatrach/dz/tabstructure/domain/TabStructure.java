package com.sonatrach.dz.tabstructure.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_STRUCTURES")
public class TabStructure {
	@Id
	@Column(name="STR_CSTR")
	private String code;

	@Column(name="STR_DESIGNATION")
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

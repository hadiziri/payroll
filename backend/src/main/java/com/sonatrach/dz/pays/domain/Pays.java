package com.sonatrach.dz.pays.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_PAYS")
public class Pays {

	@Id
	@Column(name="PAY_CPYS")
	private Integer code;
	@Column(name="PAY_DESIGNATION")
	private String lib;
	@Column(name="PAY_NATIONNALITE")
	private String nationnalite;
	
	public Pays() {
		
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getLib() {
		return lib;
	}

	public void setLib(String lib) {
		this.lib = lib;
	}

	public String getNationnalite() {
		return nationnalite;
	}

	public void setNationnalite(String nationnalite) {
		this.nationnalite = nationnalite;
	}
	
	
}

package com.sonatrach.dz.diplome.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_DIPLOMES")
public class Diplome {
	@Id
	@Column(name="DIP_CDIP")
    private String code;
	@Column(name="DIP_DESIGNATION")
	private String designation;
	@Column(name="DIP_NBPN")
	private int nbpnt;
	
	public Diplome() {
		
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

	public int getNbpnt() {
		return nbpnt;
	}

	public void setNbpnt(int nbpnt) {
		this.nbpnt = nbpnt;
	}


	
}

package com.sonatrach.dz.banque.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;



@Entity
@Table(name ="TABLEBANQUES")
@IdClass(BanqueId.class)
public class Banque implements Serializable {
	@Id
    private String ban_cban;
	@Id
	@Column(name="AGE_CAGC")
	private String agence;
	@Column(name="AGE_DESIGNATION")
	private String designation;
	
	public Banque() {
		
	}

	public String getBan_cban() {
		return ban_cban;
	}

	public void setBan_cban(String ban_cban) {
		this.ban_cban = ban_cban;
	}

	public String getAgence() {
		return agence;
	}

	public void setAgence(String agence) {
		this.agence = agence;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}




	
}

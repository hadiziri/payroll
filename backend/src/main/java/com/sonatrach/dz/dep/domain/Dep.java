package com.sonatrach.dz.dep.domain;





import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_SYS_DEPART_MOIS")
public class Dep {
	@Id
	@Column(name="STR")
    private String str;
	@Column(name="MATRICULE")
	private String mat;
	@Column(name="NOM_PRENOM")
	private String nom_prenom;
	@Column(name="ECHELLE")
	private String echelle;
	@Column(name="FONCTION")
	private String fonction;
	@Column(name="DATE_NAISS")
	private Date dateNaiss;
	@Column(name="WILAYA_TRAV")
	private String wilaya;
	@Column(name="DATE_DEPART")
	private String dateDep;
	
	public Dep() {
		
	}

	public String getStr() {
		return str;
	}

	public void setStr(String str) {
		this.str = str;
	}

	public String getMat() {
		return mat;
	}

	public void setMat(String mat) {
		this.mat = mat;
	}

	public String getNom_prenom() {
		return nom_prenom;
	}

	public void setNom_prenom(String nom_prenom) {
		this.nom_prenom = nom_prenom;
	}

	public String getEchelle() {
		return echelle;
	}

	public void setEchelle(String echelle) {
		this.echelle = echelle;
	}

	public String getFonction() {
		return fonction;
	}

	public void setFonction(String fonction) {
		this.fonction = fonction;
	}



	public Date getDateNaiss() {
		return dateNaiss;
	}

	public void setDateNaiss(Date dateNaiss) {
		this.dateNaiss = dateNaiss;
	}

	public String getWilaya() {
		return wilaya;
	}

	public void setWilaya(String wilaya) {
		this.wilaya = wilaya;
	}

	public String getDateDep() {
		return dateDep;
	}

	public void setDateDep(String dateDep) {
		this.dateDep = dateDep;
	}
	
}

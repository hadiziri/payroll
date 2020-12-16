package com.sonatrach.dz.fonction.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_FONCTIONS")
public class Fonction{
	@Id
   
	
	
	@Column(name="FON_CFCT")
	private String fon_CFCT;
	@Column(name="FON_DESIGNATION")
	private String fon_DESIGNATION;
	@Column(name="FON_CATEGORIE")
	private String fon_CATEGORIE;	
	@Column(name="FON_CAT_SGT")
	private Integer fon_CAT_SGT;
	@Column(name="FON_SECT_SGT")
	private Integer fon_SECT_SGT;
	@Column(name="FON_FIND")
	private Integer fon_FIND;
	@Column(name="FON_CORPS")
	private Integer fon_CORPS;
	@Column(name="FON_NUIS")
	private Integer fon_NUIS;
	
	
	 /*private String FON_CFCT; 
		private String FON_DESIGNATION;
		private String FON_CATEGORIE;
	private Integer FON_CAT_SGT;
	private Integer FON_SECT_SGT;
	private Integer FON_FIND;
	private Integer FON_CORPS;
	private Integer FON_NUIS;*/
	
	
	
	
	public Fonction() {
		
	}


	public String getFon_CFCT() {
		return fon_CFCT;
	}


	public void setFon_CFCT(String fon_CFCT) {
		this.fon_CFCT = fon_CFCT;
	}


	public String getFon_DESIGNATION() {
		return fon_DESIGNATION;
	}


	public void setFon_DESIGNATION(String fon_DESIGNATION) {
		this.fon_DESIGNATION = fon_DESIGNATION;
	}


	public String getFon_CATEGORIE() {
		return fon_CATEGORIE;
	}


	public void setFon_CATEGORIE(String fon_CATEGORIE) {
		this.fon_CATEGORIE = fon_CATEGORIE;
	}


	public Integer getFon_CAT_SGT() {
		return fon_CAT_SGT;
	}


	public void setFon_CAT_SGT(Integer fon_CAT_SGT) {
		this.fon_CAT_SGT = fon_CAT_SGT;
	}


	public Integer getFon_SECT_SGT() {
		return fon_SECT_SGT;
	}


	public void setFon_SECT_SGT(Integer fon_SECT_SGT) {
		this.fon_SECT_SGT = fon_SECT_SGT;
	}


	public Integer getFon_FIND() {
		return fon_FIND;
	}


	public void setFon_FIND(Integer fon_FIND) {
		this.fon_FIND = fon_FIND;
	}


	public Integer getFon_CORPS() {
		return fon_CORPS;
	}


	public void setFon_CORPS(Integer fon_CORPS) {
		this.fon_CORPS = fon_CORPS;
	}


	public Integer getFon_NUIS() {
		return fon_NUIS;
	}


	public void setFon_NUIS(Integer fon_NUIS) {
		this.fon_NUIS = fon_NUIS;
	}


	

	
	
}

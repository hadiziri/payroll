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
    private String FON_CFCT; 
	private String FON_DESIGNATION;
	private int FON_ACTFCT;
	private int FON_CAT_SGT;
	private int FON_SECT_SGT;
	private int FON_FIND;
	private int FON_CORPS;
	private int FON_NUIS;
	
	public Fonction() {
		
	}

	public String getFON_CFCT() {
		return FON_CFCT;
	}

	public void setFON_CFCT(String fON_CFCT) {
		FON_CFCT = fON_CFCT;
	}

	public String getFON_DESIGNATION() {
		return FON_DESIGNATION;
	}

	public void setFON_DESIGNATION(String fON_DESIGNATION) {
		FON_DESIGNATION = fON_DESIGNATION;
	}

	public int getFON_ACTFCT() {
		return FON_ACTFCT;
	}

	public void setFON_ACTFCT(int fON_ACTFCT) {
		FON_ACTFCT = fON_ACTFCT;
	}

	public int getFON_CAT_SGT() {
		return FON_CAT_SGT;
	}

	public void setFON_CAT_SGT(int fON_CAT_SGT) {
		FON_CAT_SGT = fON_CAT_SGT;
	}

	public int getFON_SECT_SGT() {
		return FON_SECT_SGT;
	}

	public void setFON_SECT_SGT(int fON_SECT_SGT) {
		FON_SECT_SGT = fON_SECT_SGT;
	}

	public int getFON_FIND() {
		return FON_FIND;
	}

	public void setFON_FIND(int fON_FIND) {
		FON_FIND = fON_FIND;
	}

	public int getFON_CORPS() {
		return FON_CORPS;
	}

	public void setFON_CORPS(int fON_CORPS) {
		FON_CORPS = fON_CORPS;
	}

	public int getFON_NUIS() {
		return FON_NUIS;
	}

	public void setFON_NUIS(int fON_NUIS) {
		FON_NUIS = fON_NUIS;
	}
	
}

package com.sonatrach.dz.etatRecap.domain;

import java.io.Serializable;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Table(name ="PAIE_ETAT_RECAP")
@IdClass(EtatRecapId.class)
@NamedQuery(name = "EtatRecap.findByPayMonth", query = "SELECT p FROM EtatRecap  p WHERE bulmoispaie=?1 order by div")
public class EtatRecap implements Serializable {

	@Column(name="DIV")
	String div;
	@Id
	@Column(name="DIR")
	String dir;
	@Column(name="DBUL_MOIS_PAIE")
	Date bulmoispaie;
	
	@Column(name="AGT_CPTANAL")
	String agtcptanal;
	@Id
	@Column(name="DBUL_CRUB")
	String dbulcrub;
	@Column(name="DBUL_DESIGN_RUB")
	String dbuldesignrub;
	@Column(name="DBUL_NATURE")
	String dbulnature;
	@Column(name="DBUL_IMP")
	Float dbulimp;
	@Column(name="DBUL_RAPPEL")
	Float dbulrappel;
	@Column(name="MT_BASE")
	Float mtbase;
	@Column(name="MT_RUB")
	Float mtrub;
	
	public EtatRecap() {
		
	}

	public String getDiv() {
		return div;
	}

	public void setDiv(String div) {
		this.div = div;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public Date getBulmoispaie() {
		return bulmoispaie;
	}

	public void setBulmoispaie(Date bulmoispaie) {
		this.bulmoispaie = bulmoispaie;
	}

	public String getAgtcptanal() {
		return agtcptanal;
	}

	public void setAgtcptanal(String agtcptanal) {
		this.agtcptanal = agtcptanal;
	}

	public String getDbulcrub() {
		return dbulcrub;
	}

	public void setDbulcrub(String dbulcrub) {
		this.dbulcrub = dbulcrub;
	}

	public String getDbuldesignrub() {
		return dbuldesignrub;
	}

	public void setDbuldesignrub(String dbuldesignrub) {
		this.dbuldesignrub = dbuldesignrub;
	}

	public String getDbulnature() {
		return dbulnature;
	}

	public void setDbulnature(String dbulnature) {
		this.dbulnature = dbulnature;
	}

	public Float getDbulimp() {
		return dbulimp;
	}

	public void setDbulimp(Float dbulimp) {
		this.dbulimp = dbulimp;
	}

	public Float getDbulrappel() {
		return dbulrappel;
	}

	public void setDbulrappel(Float dbulrappel) {
		this.dbulrappel = dbulrappel;
	}

	public Float getMtbase() {
		return mtbase;
	}

	public void setMtbase(Float mtbase) {
		this.mtbase = mtbase;
	}

	public Float getMtrub() {
		return mtrub;
	}

	public void setMtrub(Float mtrub) {
		this.mtrub = mtrub;
	}


	
	
}

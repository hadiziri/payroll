package com.sonatrach.dz.etatRecap.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Table(name ="PAIE_ETAT_RECAP")
@IdClass(EtatRecapId.class)
@NamedQueries({@NamedQuery(name = "EtatRecap.findByPayMonth", query = "SELECT  p FROM EtatRecap  p "),
	@NamedQuery(name = "EtatRecap.findByReport", query = "SELECT  p FROM EtatRecap  p where report=?1  ")
})

public class EtatRecap implements Serializable {
	
	@Column(name="DIV")
	String div;
	@Id
	@Column(name="DIR")
	String dir;
	@Id
	@Column(name="DBUL_MOIS_PAIE")
	Date bulmoispaie;
	@Id
	@Column(name="AGT_CPTANAL")
	String agtcptanal;
	@Id
	@Column(name="DBUL_CRUB")
	String dbulcrub;
	@Id
	@Column(name="DBUL_RAPPEL")
	Integer dbulrappel;
	
	
	@Column(name="DBUL_DESIGN_RUB")
	String dbuldesignrub;
	@Column(name="DBUL_NATURE")
	String dbulnature;
	@Column(name="DBUL_IMP")
	Integer dbulimp;

	@Column(name="MT_BASE")
	BigDecimal mtbase;
	@Column(name="MT_RUB")
	BigDecimal mtrub;
	@Column(name="DIV_DESIGNATION")
	String divdes;
	@Column(name="DIR_DESIGNATION")
	String dirdes;
	@Id
	@Column(name="CSS")
	String css;
	@Id
	@Column(name="REPORT")
	String report;
	public EtatRecap() {
		
	}

	public EtatRecap(String div, String dir, Date bulmoispaie, String agtcptanal, String dbulcrub, Integer dbulrappel,
			String dbuldesignrub, String dbulnature, Integer dbulimp, BigDecimal mtbase, BigDecimal mtrub,
			String divdes, String dirdes, String css, String report) {
		super();
		this.div = div;
		this.dir = dir;
		this.bulmoispaie = bulmoispaie;
		this.agtcptanal = agtcptanal;
		this.dbulcrub = dbulcrub;
		this.dbulrappel = dbulrappel;
		this.dbuldesignrub = dbuldesignrub;
		this.dbulnature = dbulnature;
		this.dbulimp = dbulimp;
		this.mtbase = mtbase;
		this.mtrub = mtrub;
		this.divdes = divdes;
		this.dirdes = dirdes;
		this.css = css;
		this.report = report;
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



	public Integer getDbulimp() {
		return dbulimp;
	}

	public void setDbulimp(Integer dbulimp) {
		this.dbulimp = dbulimp;
	}

	public Integer getDbulrappel() {
		return dbulrappel;
	}

	public void setDbulrappel(Integer dbulrappel) {
		this.dbulrappel = dbulrappel;
	}

	public BigDecimal getMtbase() {
		return mtbase;
	}

	public void setMtbase(BigDecimal mtbase) {
		this.mtbase = mtbase;
	}

	public BigDecimal getMtrub() {
		return mtrub;
	}

	public void setMtrub(BigDecimal mtrub) {
		this.mtrub = mtrub;
	}

	public String getDivdes() {
		return divdes;
	}

	public void setDivdes(String divdes) {
		this.divdes = divdes;
	}

	public String getDirdes() {
		return dirdes;
	}

	public void setDirdes(String dirdes) {
		this.dirdes = dirdes;
	}

	public String getCss() {
		return css;
	}

	public void setCss(String css) {
		this.css = css;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}




	
	
}

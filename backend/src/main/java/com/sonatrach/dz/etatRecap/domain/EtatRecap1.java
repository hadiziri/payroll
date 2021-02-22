package com.sonatrach.dz.etatRecap.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;

public class EtatRecap1 {
	
	String div;
	


	Date bulmoispaie;
	
	String agtcptanal;
	
	String dbulcrub;
	
	Integer dbulrappel;
	
	String dbuldesignrub;
	
	String dbulnature;

	Integer dbulimp;

	BigDecimal mtbase;

	BigDecimal mtrub;

	String divdes;
	
	//String dirdes1;
	
	
	String css;

	String report;

	public EtatRecap1() {}

	public String getDiv() {
		return div;
	}

	public void setDiv(String div) {
		this.div = div;
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

	public Integer getDbulrappel() {
		return dbulrappel;
	}

	public void setDbulrappel(Integer dbulrappel) {
		this.dbulrappel = dbulrappel;
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

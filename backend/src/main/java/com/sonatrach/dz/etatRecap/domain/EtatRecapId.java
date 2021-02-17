package com.sonatrach.dz.etatRecap.domain;

import java.io.Serializable;
import java.util.Date;

public class EtatRecapId implements Serializable{

 private String dir;
 private Date bulmoispaie;
 private String agtcptanal;
private String dbulcrub;
private Integer dbulrappel;
private String report;
private String css;



public String getDir() {
	return dir;
}
public void setDir(String dir) {
	this.dir = dir;
}
public String getDbulcrub() {
	return dbulcrub;
}
public void setDbulcrub(String dbulcrub) {
	this.dbulcrub = dbulcrub;
}

public String getAgtcptanal() {
	return agtcptanal;
}
public void setAgtcptanal(String agtcptanal) {
	this.agtcptanal = agtcptanal;
}
public Date getBulmoispaie() {
	return bulmoispaie;
}
public void setBulmoispaie(Date bulmoispaie) {
	this.bulmoispaie = bulmoispaie;
}
public Integer getDbulrappel() {
	return dbulrappel;
}
public void setDbulrappel(Integer dbulrappel) {
	this.dbulrappel = dbulrappel;
}
public String getReport() {
	return report;
}
public void setReport(String report) {
	this.report = report;
}
public String getCss() {
	return css;
}
public void setCss(String css) {
	this.css = css;
}


}

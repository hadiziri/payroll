package com.sonatrach.dz.rubNum.domain;

import java.io.Serializable;

import javax.persistence.Column;

public class RubId implements Serializable{
	private String MAT;
	private String MOISEFFET;
	private String ANNEFFET;
	private String NORUB;
	private Integer CODENATUR;
	public String getMAT() {
		return MAT;
	}
	public void setMAT(String mAT) {
		MAT = mAT;
	}
	public String getMOISEFFET() {
		return MOISEFFET;
	}
	public void setMOISEFFET(String mOISEFFET) {
		MOISEFFET = mOISEFFET;
	}
	public String getANNEFFET() {
		return ANNEFFET;
	}
	public void setANNEFFET(String aNNEFFET) {
		ANNEFFET = aNNEFFET;
	}
	public String getNORUB() {
		return NORUB;
	}
	public void setNORUB(String nORUB) {
		NORUB = nORUB;
	}
	public Integer getCODENATUR() {
		return CODENATUR;
	}
	public void setCODENATUR(Integer cODENATUR) {
		CODENATUR = cODENATUR;
	}
	
	
}

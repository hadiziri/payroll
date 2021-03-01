package com.sonatrach.dz.etatRet.domain;

import java.io.Serializable;

public class EtatRetId implements Serializable{
private String agtmatricule;
private String rubimp;
String anneeexp;
String moisexp;
Integer dbulrappel;
public String getAgtmatricule() {
	return agtmatricule;
}
public void setAgtmatricule(String agtmatricule) {
	this.agtmatricule = agtmatricule;
}
public String getRubimp() {
	return rubimp;
}
public void setRubimp(String rubimp) {
	this.rubimp = rubimp;
}

}

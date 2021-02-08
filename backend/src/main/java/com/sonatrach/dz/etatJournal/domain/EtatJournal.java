package com.sonatrach.dz.etatJournal.domain;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_ETAT_JOURNAL")
@NamedQuery(name = "EtatJournal.findByPayMonth", query = "SELECT p FROM EtatJournal  p WHERE moisexp=?1 AND anneeexp=?2 order by divdes,dirdes,strdes")
public class EtatJournal {
	
	@Column(name="MOIS_EXP")
	String moisexp;
	@Column(name="ANNEE_EXP")
	String anneeexp;
	@Column(name="MAT")
	String mat;
	@Column(name="BUL_NOM")
	String bulnom;
	@Column(name="BUL_DATERECRUT")
	Date buldaterecrut;
	@Column(name="BUL_ECHELLE")
	String bulechelle;
	@Column(name="BUL_ECHELON")
	String bulechelon;
	@Column(name="BUL_SF")
	String bulsf;
	@Column(name="BUL_TOTALENFANT")
	Integer bultotalenfant;
	@Column(name="BUL_ENFANTMOIN10")
	Integer bulenfantmoin10;
	@Column(name="MOIS_PAIE")
	String moispaie;
	@Column(name="BUL_GAINSIMP")
	BigDecimal bulgainsimp;
	@Column(name="BUL_GAINSNIMP")
	BigDecimal bulgainsnimp;
	@Column(name="BUL_RETIMP")
	BigDecimal bulretimp;
	@Column(name="BUL_RETNIMP")
	BigDecimal bulretnimp;
	@Column(name="BUL_NET")
	BigDecimal bulnet;
	@Column(name="DIV")
	String div;
	@Column(name="DIR")
	String dir;
	@Column(name="C_STR")
	String cstr;
	@Id
	@Column(name="BUL_MATRICULE")
	String bulmatricule;
	@Column(name="STR_DESIGNATION")
	String strdes;
	@Column(name="DIV_DESIGNATION")
	String divdes;
	@Column(name="DIR_DESIGNATION")
	String dirdes;
	
	public EtatJournal() {
		
	}

	public String getMoisexp() {
		return moisexp;
	}

	public void setMoisexp(String moisexp) {
		this.moisexp = moisexp;
	}

	public String getAnneeexp() {
		return anneeexp;
	}

	public void setAnneeexp(String anneeexp) {
		this.anneeexp = anneeexp;
	}

	public String getMat() {
		return mat;
	}

	public void setMat(String mat) {
		this.mat = mat;
	}

	public String getBulnom() {
		return bulnom;
	}

	public void setBulnom(String bulnom) {
		this.bulnom = bulnom;
	}

	public Date getBuldaterecrut() {
		return buldaterecrut;
	}

	public void setBuldaterecrut(Date buldaterecrut) {
		this.buldaterecrut = buldaterecrut;
	}

	public String getBulechelle() {
		return bulechelle;
	}

	public void setBulechelle(String bulechelle) {
		this.bulechelle = bulechelle;
	}

	public String getBulechelon() {
		return bulechelon;
	}

	public void setBulechelon(String bulechelon) {
		this.bulechelon = bulechelon;
	}

	public String getBulsf() {
		return bulsf;
	}

	public void setBulsf(String bulsf) {
		this.bulsf = bulsf;
	}

	public Integer getBultotalenfant() {
		return bultotalenfant;
	}

	public void setBultotalenfant(Integer bultotalenfant) {
		this.bultotalenfant = bultotalenfant;
	}

	public Integer getBulenfantmoin10() {
		return bulenfantmoin10;
	}

	public void setBulenfantmoin10(Integer bulenfantmoin10) {
		this.bulenfantmoin10 = bulenfantmoin10;
	}

	public String getMoispaie() {
		return moispaie;
	}

	public void setMoispaie(String moispaie) {
		this.moispaie = moispaie;
	}




	public BigDecimal getBulgainsimp() {
		return bulgainsimp;
	}

	public void setBulgainsimp(BigDecimal bulgainsimp) {
		this.bulgainsimp = bulgainsimp;
	}

	public BigDecimal getBulgainsnimp() {
		return bulgainsnimp;
	}

	public void setBulgainsnimp(BigDecimal bulgainsnimp) {
		this.bulgainsnimp = bulgainsnimp;
	}

	public BigDecimal getBulretimp() {
		return bulretimp;
	}

	public void setBulretimp(BigDecimal bulretimp) {
		this.bulretimp = bulretimp;
	}

	public BigDecimal getBulretnimp() {
		return bulretnimp;
	}

	public void setBulretnimp(BigDecimal bulretnimp) {
		this.bulretnimp = bulretnimp;
	}

	public BigDecimal getBulnet() {
		return bulnet;
	}

	public void setBulnet(BigDecimal bulnet) {
		this.bulnet = bulnet;
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

	public String getCstr() {
		return cstr;
	}

	public void setCstr(String cstr) {
		this.cstr = cstr;
	}

	public String getBulmatricule() {
		return bulmatricule;
	}

	public void setBulmatricule(String bulmatricule) {
		this.bulmatricule = bulmatricule;
	}

	public String getStrdes() {
		return strdes;
	}

	public void setStrdes(String strdes) {
		this.strdes = strdes;
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
	
	
}

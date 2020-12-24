package com.sonatrach.dz.newpaie.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_NEWPAIE")
public class NewPaie {
	
	@Id
	@Column(name="MAT")
	private String mat;
	@Column(name= "REF_DATE")
	private String ref;
	@Column(name="STR")
	private String str;
	@Column(name="NOM")
	private String nom;
	@Column(name="CODE_FCT")
	private String codefct;
	@Column(name="ECHELLE")
	private String echelle;
	@Column(name="ECHELON")
	private String echelon;
	@Column(name="MT_SB")
	private String mtsb;
	@Column(name="MT_ECHLON")
	private String mtechelon;
	@Column(name="MT_PRS")
	private String mtpers;
	@Column(name="MT_AI07")
	private String mtai07;
	@Column(name="MT_AI08")
	private String mtai08;
	@Column(name="MT_AI09")
	private String mtai09;
	@Column(name="MT_AI10")
	private String mtai10;
	@Column(name="MT_AI11")
	private String mtai11;
	@Column(name="MT_AI12")
	private String mtai12;
	@Column(name="MT_AI13")
	private String mtai13;
	@Column(name="MT_AI14")
	private String mtai14;
	@Column(name="MT_AI15")
	private String mtai15;
	@Column(name="MT_AI16")
	private String mtai16;
	@Column(name="MT_AI17")
	private String mtai17;
	@Column(name="MT_AI18")
	private String mtai18;
	@Column(name="TX_REVAL")
	private String txreval;
	@Column(name="MT_REVAL")
	private String mtreval;
	@Column(name="TX_PRI")
	private String txpri;
	@Column(name="TX_PRC")
	private String txprc;
	@Column(name="MT_PRI")
	private String mtpri;
	@Column(name="MT_PRC")
	private String mtprc;
	@Column(name="MT_IAG")
	private String mtiag;
	@Column(name="NOUV_SAL")
	private String nouvsal;
	
	public NewPaie() {
		
	}

	public String getMat() {
		return mat;
	}

	public void setMat(String mat) {
		this.mat = mat;
	}

	public String getRef() {
		return ref;
	}

	public void setRef(String ref) {
		this.ref = ref;
	}

	public String getStr() {
		return str;
	}

	public void setStr(String str) {
		this.str = str;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getCodefct() {
		return codefct;
	}

	public void setCodefct(String codefct) {
		this.codefct = codefct;
	}

	public String getEchelle() {
		return echelle;
	}

	public void setEchelle(String echelle) {
		this.echelle = echelle;
	}

	public String getEchelon() {
		return echelon;
	}

	public void setEchelon(String echelon) {
		this.echelon = echelon;
	}

	public String getMtsb() {
		return mtsb;
	}

	public void setMtsb(String mtsb) {
		this.mtsb = mtsb;
	}

	public String getMtechelon() {
		return mtechelon;
	}

	public void setMtechelon(String mtechelon) {
		this.mtechelon = mtechelon;
	}

	
	public String getMtai07() {
		return mtai07;
	}

	public void setMtai07(String mtai07) {
		this.mtai07 = mtai07;
	}

	public String getMtai08() {
		return mtai08;
	}

	public void setMtai08(String mtai08) {
		this.mtai08 = mtai08;
	}

	public String getMtai09() {
		return mtai09;
	}

	public void setMtai09(String mtai09) {
		this.mtai09 = mtai09;
	}

	public String getMtai10() {
		return mtai10;
	}

	public void setMtai10(String mtai10) {
		this.mtai10 = mtai10;
	}

	public String getMtai11() {
		return mtai11;
	}

	public void setMtai11(String mtai11) {
		this.mtai11 = mtai11;
	}

	public String getMtai12() {
		return mtai12;
	}

	public void setMtai12(String mtai12) {
		this.mtai12 = mtai12;
	}

	public String getMtai13() {
		return mtai13;
	}

	public void setMtai13(String mtai13) {
		this.mtai13 = mtai13;
	}

	public String getMtai14() {
		return mtai14;
	}

	public void setMtai14(String mtai14) {
		this.mtai14 = mtai14;
	}

	public String getMtai15() {
		return mtai15;
	}

	public void setMtai15(String mtai15) {
		this.mtai15 = mtai15;
	}

	public String getMtai16() {
		return mtai16;
	}

	public void setMtai16(String mtai16) {
		this.mtai16 = mtai16;
	}

	public String getMtai17() {
		return mtai17;
	}

	public void setMtai17(String mtai17) {
		this.mtai17 = mtai17;
	}

	public String getMtai18() {
		return mtai18;
	}

	public void setMtai18(String mtai18) {
		this.mtai18 = mtai18;
	}

	public String getTxreval() {
		return txreval;
	}

	public void setTxreval(String txreval) {
		this.txreval = txreval;
	}

	public String getMtreval() {
		return mtreval;
	}

	public void setMtreval(String mtreval) {
		this.mtreval = mtreval;
	}

	public String getTxpri() {
		return txpri;
	}

	public void setTxpri(String txpri) {
		this.txpri = txpri;
	}

	public String getTxprc() {
		return txprc;
	}

	public void setTxprc(String txprc) {
		this.txprc = txprc;
	}

	public String getMtpri() {
		return mtpri;
	}

	public void setMtpri(String mtpri) {
		this.mtpri = mtpri;
	}

	public String getMtprc() {
		return mtprc;
	}

	public void setMtprc(String mtprc) {
		this.mtprc = mtprc;
	}

	public String getMtiag() {
		return mtiag;
	}

	public void setMtiag(String mtiag) {
		this.mtiag = mtiag;
	}

	public String getNouvsal() {
		return nouvsal;
	}

	public void setNouvsal(String nouvsal) {
		this.nouvsal = nouvsal;
	}

	public String getMtpers() {
		return mtpers;
	}

	public void setMtpers(String mtpers) {
		this.mtpers = mtpers;
	}
	
	

	
	



}

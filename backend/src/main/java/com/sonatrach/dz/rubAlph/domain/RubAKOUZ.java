package com.sonatrach.dz.rubAlph.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_FRUB_AK_O_UZ")
//PAIE_FRUB_A_TABLE 
public class RubAKOUZ {
	@Id
	@Column(name="DATE_EXPL")
	private String DATEEXPL;
	@Column(name= "MAT")
	private String MAT;
	@Column(name="NOM_PRENOM")
	private String NOMPRENOM;
	@Column(name="DIREC")
	private String DIREC;
	@Column(name="CPT_ANA")
	private String CPTANA;
	@Column(name="ECHELLE")
	private String ECHELLE;
	@Column(name="ECHELON")
	private String ECHELON;
	@Column(name="COD_FONCT")
	private String CODFONCT;
	@Column(name="N_RIP_RIB")
	private String NRIPRIB;
	@Column(name="CAISSE")
	private String CAISSE;
	@Column(name="NUM_SS")
	private String NUMSS;
	@Column(name="NUM_ADHER")
	private String NUMADHER;
	@Column(name="DATE_NAISS")
	private String DATENAISS;
	@Column(name="MOIS_EFFET")
	private String MOISEFFET;
	@Column(name="ANN_EFFET")
	private String ANNEFFET;
	@Column(name="CODE_PAIE")
	private String CODEPAIE;
	@Column(name="NO_RUB")
	private String NORUB;
	@Column(name="LIB_RUB")
	private String LIBRUB;
	@Column(name="CODE_NATUR")
	private Integer CODENATUR;
	@Column(name="DT_DEB")
	private String DTDEB;
	@Column(name="DT_FIN")
	private String DEFIN;
	@Column(name="MT_MOIS")
	private BigDecimal MTMOIS;
	@Column(name="MT_RAPP")
	private BigDecimal MTRAPPEL;
	@Column(name="TAUX")
	private BigDecimal TAUX;
	@Column(name="ELEM_STAT")
	private BigDecimal ELEMSTAT;
	@Column(name="GROUPE")
	private String GROUPE;
	@Column(name="NB_ENF_TOT")
	private String NBENFTOT;
	@Column(name="ADRESSE")
	private String ADRESSE;
	
	public RubAKOUZ() {
		
	}
	public String getDATEEXPL() {
		return DATEEXPL;
	}
	public void setDATEEXPL(String dATEEXPL) {
		DATEEXPL = dATEEXPL;
	}
	public String getMAT() {
		return MAT;
	}
	public void setMAT(String mAT) {
		MAT = mAT;
	}
	public String getNOMPRENOM() {
		return NOMPRENOM;
	}
	public void setNOMPRENOM(String nOMPRENOM) {
		NOMPRENOM = nOMPRENOM;
	}
	public String getDIREC() {
		return DIREC;
	}
	public void setDIREC(String dIREC) {
		DIREC = dIREC;
	}
	public String getCPTANA() {
		return CPTANA;
	}
	public void setCPTANA(String cPTANA) {
		CPTANA = cPTANA;
	}
	public String getECHELLE() {
		return ECHELLE;
	}
	public void setECHELLE(String eCHELLE) {
		ECHELLE = eCHELLE;
	}
	public String getECHELON() {
		return ECHELON;
	}
	public void setECHELON(String eCHELON) {
		ECHELON = eCHELON;
	}
	public String getCODFONCT() {
		return CODFONCT;
	}
	public void setCODFONCT(String cODFONCT) {
		CODFONCT = cODFONCT;
	}
	public String getNRIPRIB() {
		return NRIPRIB;
	}
	public void setNRIPRIB(String nRIPRIB) {
		NRIPRIB = nRIPRIB;
	}
	public String getCAISSE() {
		return CAISSE;
	}
	public void setCAISSE(String cAISSE) {
		CAISSE = cAISSE;
	}
	public String getNUMSS() {
		return NUMSS;
	}
	public void setNUMSS(String nUMSS) {
		NUMSS = nUMSS;
	}
	public String getNUMADHER() {
		return NUMADHER;
	}
	public void setNUMADHER(String nUMADHER) {
		NUMADHER = nUMADHER;
	}
	public String getDATENAISS() {
		return DATENAISS;
	}
	public void setDATENAISS(String dATENAISS) {
		DATENAISS = dATENAISS;
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
	public String getCODEPAIE() {
		return CODEPAIE;
	}
	public void setCODEPAIE(String cODEPAIE) {
		CODEPAIE = cODEPAIE;
	}
	public String getNORUB() {
		return NORUB;
	}
	public void setNORUB(String nORUB) {
		NORUB = nORUB;
	}
	public String getLIBRUB() {
		return LIBRUB;
	}
	public void setLIBRUB(String lIBRUB) {
		LIBRUB = lIBRUB;
	}

	public Integer getCODENATUR() {
		return CODENATUR;
	}
	public void setCODENATUR(Integer cODENATUR) {
		CODENATUR = cODENATUR;
	}
	public String getDTDEB() {
		return DTDEB;
	}
	public void setDTDEB(String dTDEB) {
		DTDEB = dTDEB;
	}
	public String getDEFIN() {
		return DEFIN;
	}
	public void setDEFIN(String dEFIN) {
		DEFIN = dEFIN;
	}

	public BigDecimal getMTMOIS() {
		return MTMOIS;
	}
	public void setMTMOIS(BigDecimal mTMOIS) {
		MTMOIS = mTMOIS;
	}
	public BigDecimal getMTRAPPEL() {
		return MTRAPPEL;
	}
	public void setMTRAPPEL(BigDecimal mTRAPPEL) {
		MTRAPPEL = mTRAPPEL;
	}
	public BigDecimal getTAUX() {
		return TAUX;
	}
	public void setTAUX(BigDecimal tAUX) {
		TAUX = tAUX;
	}
	public BigDecimal getELEMSTAT() {
		return ELEMSTAT;
	}
	public void setELEMSTAT(BigDecimal eLEMSTAT) {
		ELEMSTAT = eLEMSTAT;
	}
	public String getGROUPE() {
		return GROUPE;
	}
	public void setGROUPE(String gROUPE) {
		GROUPE = gROUPE;
	}
	public String getNBENFTOT() {
		return NBENFTOT;
	}
	public void setNBENFTOT(String nBENFTOT) {
		NBENFTOT = nBENFTOT;
	}
	public String getADRESSE() {
		return ADRESSE;
	}
	public void setADRESSE(String aDRESSE) {
		ADRESSE = aDRESSE;
	}
	
}

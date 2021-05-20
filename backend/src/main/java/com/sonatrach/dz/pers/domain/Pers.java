package com.sonatrach.dz.pers.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_PERS")
public class Pers {

	@Id
	@Column(name="MAT")
	private String MAT;
	@Column(name="CSOC")
	private String CSOC;
	@Column(name="DIV")
	private String DIV; 
	@Column(name="SUITORG")
	private String SUITORG;
	@Column(name="LOCTRAV")
	private String LOCTRAV;
	/*@Column(name="SLOCTRAV")//pas trouver ?????
	private String */
	@Column(name="NOM")
	private String NOM;
	@Column(name="ANAL")
	private String ANAL;
	@Column(name="DATNAIS")
	private String DATNAIS;
	@Column(name="LIEUNAIS")
	private String LIEUNAIS;
	@Column(name="SEXE")
	private String SEXE;
	@Column(name="ALGETR")
	private String ALGETR;
	@Column(name="DATREC")
	private String DATREC;
	@Column(name="PC")
	private String PC;
	@Column(name="DATSOR")
	private String DATSOR;
	@Column(name="MOTIF")
	private String MOTIF;
	@Column(name="SF")
	private String SF;
	@Column(name="SCJT")
	private String SCJT;
	@Column(name="QF")
	private String QF;
	@Column(name="ENFS10")
	private String ENFS10;
	@Column(name="ENFI10")
	private String ENFI10;
	@Column(name="GSANG")
	private String GSANG;
	@Column(name="LANG")
	private String LANG;
	@Column(name="FIL1")
	private String FIL1;
	@Column(name="CORPS")
	private String CORPS;
	@Column(name="CATIEP")
	private String CATIEP;
	@Column(name="SECIEP")
	private String SECIEP;
	@Column(name="CODIP")
	private String CODIP;
	@Column(name="NBPTS")
	private String NBPTS;
	@Column(name="DISP")
	private String DISP;
	@Column(name="EXPHS")
	private String EXPHS;
	@Column(name="EXPSECT")
	private String EXPSECT;
	@Column(name="ANCSH")
	private String ANCSH;
	@Column(name="GRPE")
	private String GRPE;
	@Column(name="ECHL")
	private String ECHL;
	@Column(name="ECHN")
	private String ECHN;
	@Column(name="DATEFF")
	private String DATEFF;
	@Column(name="FIL2")
	private String FIL2;
	@Column(name="PROM")
	private String PROM;
	@Column(name="SANCT")
	private String SANCT;
	@Column(name="CSAL")
	private String CSAL;
	@Column(name="SALBASE")
	private String SALBASE;
	@Column(name="SCLASS")
	private String SCLASS;
	@Column(name="CFONCT")
	private String CFONCT;
	@Column(name="LIBFONC")
	private String LIBFONC;
	@Column(name="ITPISP")
	private String ITPISP;
	@Column(name="NUIS")
	private String NUIS;
	@Column(name="CPV")
	private String CPV;
	@Column(name="CTRANS")
	private String CTRANS;
	@Column(name="CPAIEM")
	private String CPAIEM;
	@Column(name="NUMCPT")
	private String NUMCPT;
	@Column(name="CAFFECT")
	private String CAFFECT;
	@Column(name="CMUT")
	private String CMUT;
	@Column(name="CSS")
	private String CSS;
	@Column(name="CAF")
	private String CAF;
	@Column(name="CRET")
	private String CRET;
	@Column(name="CMOUDJ")
	private String CMOUDJ;
	@Column(name="NBMOUDJ")
	private String NBMOUDJ;
	@Column(name="NSSAGT")
	private String NSSAGT;
	@Column(name="NSSEMP")
	private String NSSEMP;
	@Column(name="FIL4")
	private String FIL4;
	@Column(name="MTPVOIT")
	private String MTPVOIT;
	@Column(name="NBMPVT")
	private String NBMPVT;
	@Column(name="DATDBVT")
	private String DATDBVT;
	@Column(name="CPRSOC")
	private String CPRSOC;
	@Column(name="FIL5")
	private String FIL5;
	@Column(name="MTSOC")
	private String MTSOC;
	@Column(name="NBMSSOC")
	private String NBMSSOC;
	@Column(name="DTDBPSOC")
	private String DTDBPSOC;
	@Column(name="CAUTPRT")
	private String CAUTPRT;
	@Column(name="MTAUTPRT")
	private String MTAUTPRT;
	@Column(name="TOTMSAUP")
	private String TOTMSAUP;
	@Column(name="DTDBAUP")
	private String DTDBAUP;
	@Column(name="ADRESSE")
	private String ADRESSE;
	@Column(name="LOCADR")
	private String LOCADR;
	@Column(name="SLOCADR")
	private String SLOCADR;
	@Column(name="DISTADR")
	private String DISTADR;
	@Column(name="CLOGT")
	private String CLOGT;
	@Column(name="PAYNAIS")
	private String PAYNAIS;
	@Column(name="FIL6")
	private String FIL6;
	@Column(name="CPOS")
	private String CPOS;
	@Column(name="FILX")
	private String FILX;
	@Column(name="NO_RIB")
	private String NO_RIB;
	@Column(name="FIL7")
	private String FIL7;
	@Column(name="RUB1")
	private String RUB1;
	@Column(name="SENS1")
	private String SENS1;
	@Column(name="MONT1")
	private String MONT1;
	@Column(name="RUB2")
	private String RUB2;
	@Column(name="SENS2")
	private String SENS2;
	@Column(name="MONT2")
	private String MONT2;
	@Column(name="RUB3")
	private String RUB3;
	@Column(name="SENS3")
	private String SENS3;
	@Column(name="MONT3")
	private String MONT3;
	@Column(name="RUB4")
	private String RUB4;
	@Column(name="SENS4")
	private String SENS4;
	@Column(name="MONT4")
	private String MONT4;
	@Column(name="RUB5")
	private String RUB5;
	@Column(name="SENS5")
	private String SENS5;
	@Column(name="MONT5")
	private String MONT5;
	@Column(name="RUB6")
	private String RUB6; 
	@Column(name="SENS6")
	private String SENS6;
	@Column(name="MONT6")
	private String MONT6;
	@Column(name="RUB7")
	private String RUB7;
	@Column(name="SENS7")
	private String SENS7;
	@Column(name="MONT7")
	private String MONT7;
	@Column(name="RUB8")
	private String RUB8;
	@Column(name="SENS8")
	private String SENS8;
	@Column(name="MONT8")
	private String MONT8;
	@Column(name="RUB9")
	private String RUB9;
	@Column(name="SENS9")
	private String SENS9;
	@Column(name="MONT9")
	private String MONT9;
	@Column(name="RUB10")
	private String RUB10;
	@Column(name="SENS10")
	private String SENS10;
	@Column(name="MONT10")
	private String MONT10;
	@Column(name="RUB11")
	private String RUB11;
	@Column(name="SENS11")
	private String SENS11;
	@Column(name="MONT11")
	private String MONT11;
	@Column(name="RUB12")
	private String RUB12;
	@Column(name="SENS12")
	private String SENS12;
	@Column(name="MONT12")
	private String MONT12;
	@Column(name="DATE_MAJ")
	private String DATE_MAJ;
	@Column(name="JOURNEE")
	private String JOURNEE;
	
	
	public Pers() {
		
	}


	public String getMAT() {
		return MAT;
	}


	public void setMAT(String mAT) {
		MAT = mAT;
	}


	public String getCSOC() {
		return CSOC;
	}


	public void setCSOC(String cSOC) {
		CSOC = cSOC;
	}


	public String getDIV() {
		return DIV;
	}


	public void setDIV(String dIV) {
		DIV = dIV;
	}


	public String getSUITORG() {
		return SUITORG;
	}


	public void setSUITORG(String sUITORG) {
		SUITORG = sUITORG;
	}


	public String getLOCTRAV() {
		return LOCTRAV;
	}


	public void setLOCTRAV(String lOCTRAV) {
		LOCTRAV = lOCTRAV;
	}


	public String getNOM() {
		return NOM;
	}


	public void setNOM(String nOM) {
		NOM = nOM;
	}


	public String getANAL() {
		return ANAL;
	}


	public void setANAL(String aNAL) {
		ANAL = aNAL;
	}


	public String getDATNAIS() {
		return DATNAIS;
	}


	public void setDATNAIS(String dATNAIS) {
		DATNAIS = dATNAIS;
	}


	public String getLIEUNAIS() {
		return LIEUNAIS;
	}


	public void setLIEUNAIS(String lIEUNAIS) {
		LIEUNAIS = lIEUNAIS;
	}


	public String getSEXE() {
		return SEXE;
	}


	public void setSEXE(String sEXE) {
		SEXE = sEXE;
	}


	public String getALGETR() {
		return ALGETR;
	}


	public void setALGETR(String aLGETR) {
		ALGETR = aLGETR;
	}


	public String getDATREC() {
		return DATREC;
	}


	public void setDATREC(String dATREC) {
		DATREC = dATREC;
	}


	public String getPC() {
		return PC;
	}


	public void setPC(String pC) {
		PC = pC;
	}


	public String getDATSOR() {
		return DATSOR;
	}


	public void setDATSOR(String dATSOR) {
		DATSOR = dATSOR;
	}


	public String getMOTIF() {
		return MOTIF;
	}


	public void setMOTIF(String mOTIF) {
		MOTIF = mOTIF;
	}


	public String getSF() {
		return SF;
	}


	public void setSF(String sF) {
		SF = sF;
	}


	public String getSCJT() {
		return SCJT;
	}


	public void setSCJT(String sCJT) {
		SCJT = sCJT;
	}


	public String getQF() {
		return QF;
	}


	public void setQF(String qF) {
		QF = qF;
	}


	public String getENFS10() {
		return ENFS10;
	}


	public void setENFS10(String eNFS10) {
		ENFS10 = eNFS10;
	}


	public String getENFI10() {
		return ENFI10;
	}


	public void setENFI10(String eNFI10) {
		ENFI10 = eNFI10;
	}


	public String getGSANG() {
		return GSANG;
	}


	public void setGSANG(String gSANG) {
		GSANG = gSANG;
	}


	public String getLANG() {
		return LANG;
	}


	public void setLANG(String lANG) {
		LANG = lANG;
	}


	public String getFIL1() {
		return FIL1;
	}


	public void setFIL1(String fIL1) {
		FIL1 = fIL1;
	}


	public String getCORPS() {
		return CORPS;
	}


	public void setCORPS(String cORPS) {
		CORPS = cORPS;
	}


	public String getCATIEP() {
		return CATIEP;
	}


	public void setCATIEP(String cATIEP) {
		CATIEP = cATIEP;
	}


	public String getSECIEP() {
		return SECIEP;
	}


	public void setSECIEP(String sECIEP) {
		SECIEP = sECIEP;
	}


	public String getCODIP() {
		return CODIP;
	}


	public void setCODIP(String cODIP) {
		CODIP = cODIP;
	}


	public String getNBPTS() {
		return NBPTS;
	}


	public void setNBPTS(String nBPTS) {
		NBPTS = nBPTS;
	}


	public String getDISP() {
		return DISP;
	}


	public void setDISP(String dISP) {
		DISP = dISP;
	}


	public String getEXPHS() {
		return EXPHS;
	}


	public void setEXPHS(String eXPHS) {
		EXPHS = eXPHS;
	}


	public String getEXPSECT() {
		return EXPSECT;
	}


	public void setEXPSECT(String eXPSECT) {
		EXPSECT = eXPSECT;
	}


	public String getANCSH() {
		return ANCSH;
	}


	public void setANCSH(String aNCSH) {
		ANCSH = aNCSH;
	}


	public String getGRPE() {
		return GRPE;
	}


	public void setGRPE(String gRPE) {
		GRPE = gRPE;
	}


	public String getECHL() {
		return ECHL;
	}


	public void setECHL(String eCHL) {
		ECHL = eCHL;
	}


	public String getECHN() {
		return ECHN;
	}


	public void setECHN(String eCHN) {
		ECHN = eCHN;
	}


	public String getDATEFF() {
		return DATEFF;
	}


	public void setDATEFF(String dATEFF) {
		DATEFF = dATEFF;
	}


	public String getFIL2() {
		return FIL2;
	}


	public void setFIL2(String fIL2) {
		FIL2 = fIL2;
	}


	public String getPROM() {
		return PROM;
	}


	public void setPROM(String pROM) {
		PROM = pROM;
	}


	public String getSANCT() {
		return SANCT;
	}


	public void setSANCT(String sANCT) {
		SANCT = sANCT;
	}


	public String getCSAL() {
		return CSAL;
	}


	public void setCSAL(String cSAL) {
		CSAL = cSAL;
	}







	public String getSALBASE() {
		return SALBASE;
	}


	public void setSALBASE(String sALBASE) {
		SALBASE = sALBASE;
	}


	public String getSCLASS() {
		return SCLASS;
	}


	public void setSCLASS(String sCLASS) {
		SCLASS = sCLASS;
	}


	public String getCFONCT() {
		return CFONCT;
	}


	public void setCFONCT(String cFONCT) {
		CFONCT = cFONCT;
	}


	public String getLIBFONC() {
		return LIBFONC;
	}


	public void setLIBFONC(String lIBFONC) {
		LIBFONC = lIBFONC;
	}


	public String getITPISP() {
		return ITPISP;
	}


	public void setITPISP(String iTPISP) {
		ITPISP = iTPISP;
	}


	public String getNUIS() {
		return NUIS;
	}


	public void setNUIS(String nUIS) {
		NUIS = nUIS;
	}


	public String getCPV() {
		return CPV;
	}


	public void setCPV(String cPV) {
		CPV = cPV;
	}


	public String getCTRANS() {
		return CTRANS;
	}


	public void setCTRANS(String cTRANS) {
		CTRANS = cTRANS;
	}


	public String getCPAIEM() {
		return CPAIEM;
	}


	public void setCPAIEM(String cPAIEM) {
		CPAIEM = cPAIEM;
	}


	public String getNUMCPT() {
		return NUMCPT;
	}


	public void setNUMCPT(String nUMCPT) {
		NUMCPT = nUMCPT;
	}


	public String getCAFFECT() {
		return CAFFECT;
	}


	public void setCAFFECT(String cAFFECT) {
		CAFFECT = cAFFECT;
	}


	public String getCMUT() {
		return CMUT;
	}


	public void setCMUT(String cMUT) {
		CMUT = cMUT;
	}


	public String getCSS() {
		return CSS;
	}


	public void setCSS(String cSS) {
		CSS = cSS;
	}


	public String getCAF() {
		return CAF;
	}


	public void setCAF(String cAF) {
		CAF = cAF;
	}


	public String getCRET() {
		return CRET;
	}


	public void setCRET(String cRET) {
		CRET = cRET;
	}


	public String getCMOUDJ() {
		return CMOUDJ;
	}


	public void setCMOUDJ(String cMOUDJ) {
		CMOUDJ = cMOUDJ;
	}


	public String getNBMOUDJ() {
		return NBMOUDJ;
	}


	public void setNBMOUDJ(String nBMOUDJ) {
		NBMOUDJ = nBMOUDJ;
	}


	public String getNSSAGT() {
		return NSSAGT;
	}


	public void setNSSAGT(String nSSAGT) {
		NSSAGT = nSSAGT;
	}


	public String getNSSEMP() {
		return NSSEMP;
	}


	public void setNSSEMP(String nSSEMP) {
		NSSEMP = nSSEMP;
	}


	public String getFIL4() {
		return FIL4;
	}


	public void setFIL4(String fIL4) {
		FIL4 = fIL4;
	}


	public String getMTPVOIT() {
		return MTPVOIT;
	}


	public void setMTPVOIT(String mTPVOIT) {
		MTPVOIT = mTPVOIT;
	}


	public String getNBMPVT() {
		return NBMPVT;
	}


	public void setNBMPVT(String nBMPVT) {
		NBMPVT = nBMPVT;
	}


	public String getDATDBVT() {
		return DATDBVT;
	}


	public void setDATDBVT(String dATDBVT) {
		DATDBVT = dATDBVT;
	}


	public String getCPRSOC() {
		return CPRSOC;
	}


	public void setCPRSOC(String cPRSOC) {
		CPRSOC = cPRSOC;
	}


	public String getFIL5() {
		return FIL5;
	}


	public void setFIL5(String fIL5) {
		FIL5 = fIL5;
	}


	public String getMTSOC() {
		return MTSOC;
	}


	public void setMTSOC(String mTSOC) {
		MTSOC = mTSOC;
	}


	public String getNBMSSOC() {
		return NBMSSOC;
	}


	public void setNBMSSOC(String nBMSSOC) {
		NBMSSOC = nBMSSOC;
	}


	public String getDTDBPSOC() {
		return DTDBPSOC;
	}


	public void setDTDBPSOC(String dTDBPSOC) {
		DTDBPSOC = dTDBPSOC;
	}


	public String getCAUTPRT() {
		return CAUTPRT;
	}


	public void setCAUTPRT(String cAUTPRT) {
		CAUTPRT = cAUTPRT;
	}


	public String getMTAUTPRT() {
		return MTAUTPRT;
	}


	public void setMTAUTPRT(String mTAUTPRT) {
		MTAUTPRT = mTAUTPRT;
	}


	public String getTOTMSAUP() {
		return TOTMSAUP;
	}


	public void setTOTMSAUP(String tOTMSAUP) {
		TOTMSAUP = tOTMSAUP;
	}


	public String getDTDBAUP() {
		return DTDBAUP;
	}


	public void setDTDBAUP(String dTDBAUP) {
		DTDBAUP = dTDBAUP;
	}


	public String getADRESSE() {
		return ADRESSE;
	}


	public void setADRESSE(String aDRESSE) {
		ADRESSE = aDRESSE;
	}


	public String getLOCADR() {
		return LOCADR;
	}


	public void setLOCADR(String lOCADR) {
		LOCADR = lOCADR;
	}


	public String getSLOCADR() {
		return SLOCADR;
	}


	public void setSLOCADR(String sLOCADR) {
		SLOCADR = sLOCADR;
	}


	public String getDISTADR() {
		return DISTADR;
	}


	public void setDISTADR(String dISTADR) {
		DISTADR = dISTADR;
	}


	public String getCLOGT() {
		return CLOGT;
	}


	public void setCLOGT(String cLOGT) {
		CLOGT = cLOGT;
	}


	public String getPAYNAIS() {
		return PAYNAIS;
	}


	public void setPAYNAIS(String pAYNAIS) {
		PAYNAIS = pAYNAIS;
	}


	public String getFIL6() {
		return FIL6;
	}


	public void setFIL6(String fIL6) {
		FIL6 = fIL6;
	}


	public String getCPOS() {
		return CPOS;
	}


	public void setCPOS(String cPOS) {
		CPOS = cPOS;
	}


	public String getFILX() {
		return FILX;
	}


	public void setFILX(String fILX) {
		FILX = fILX;
	}





	public String getNORIB() {
		return NO_RIB;
	}


	public void setNORIB(String nORIB) {
		NO_RIB = nORIB;
	}


	public String getFIL7() {
		return FIL7;
	}


	public void setFIL7(String fIL7) {
		FIL7 = fIL7;
	}


	public String getRUB1() {
		return RUB1;
	}


	public void setRUB1(String rUB1) {
		RUB1 = rUB1;
	}


	public String getSENS1() {
		return SENS1;
	}


	public void setSENS1(String sENS1) {
		SENS1 = sENS1;
	}


	public String getMONT1() {
		return MONT1;
	}


	public void setMONT1(String mONT1) {
		MONT1 = mONT1;
	}


	public String getRUB2() {
		return RUB2;
	}


	public void setRUB2(String rUB2) {
		RUB2 = rUB2;
	}


	public String getSENS2() {
		return SENS2;
	}


	public void setSENS2(String sENS2) {
		SENS2 = sENS2;
	}


	public String getMONT2() {
		return MONT2;
	}


	public void setMONT2(String mONT2) {
		MONT2 = mONT2;
	}


	public String getRUB3() {
		return RUB3;
	}


	public void setRUB3(String rUB3) {
		RUB3 = rUB3;
	}


	public String getSENS3() {
		return SENS3;
	}


	public void setSENS3(String sENS3) {
		SENS3 = sENS3;
	}


	public String getMONT3() {
		return MONT3;
	}


	public void setMONT3(String mONT3) {
		MONT3 = mONT3;
	}


	public String getRUB4() {
		return RUB4;
	}


	public void setRUB4(String rUB4) {
		RUB4 = rUB4;
	}


	public String getSENS4() {
		return SENS4;
	}


	public void setSENS4(String sENS4) {
		SENS4 = sENS4;
	}


	public String getMONT4() {
		return MONT4;
	}


	public void setMONT4(String mONT4) {
		MONT4 = mONT4;
	}


	public String getRUB5() {
		return RUB5;
	}


	public void setRUB5(String rUB5) {
		RUB5 = rUB5;
	}


	public String getSENS5() {
		return SENS5;
	}


	public void setSENS5(String sENS5) {
		SENS5 = sENS5;
	}


	public String getMONT5() {
		return MONT5;
	}


	public void setMONT5(String mONT5) {
		MONT5 = mONT5;
	}


	public String getRUB6() {
		return RUB6;
	}


	public void setRUB6(String rUB6) {
		RUB6 = rUB6;
	}


	public String getSENS6() {
		return SENS6;
	}


	public void setSENS6(String sENS6) {
		SENS6 = sENS6;
	}


	public String getMONT6() {
		return MONT6;
	}


	public void setMONT6(String mONT6) {
		MONT6 = mONT6;
	}


	public String getRUB7() {
		return RUB7;
	}


	public void setRUB7(String rUB7) {
		RUB7 = rUB7;
	}


	public String getSENS7() {
		return SENS7;
	}


	public void setSENS7(String sENS7) {
		SENS7 = sENS7;
	}


	public String getMONT7() {
		return MONT7;
	}


	public void setMONT7(String mONT7) {
		MONT7 = mONT7;
	}


	public String getRUB8() {
		return RUB8;
	}


	public void setRUB8(String rUB8) {
		RUB8 = rUB8;
	}


	public String getSENS8() {
		return SENS8;
	}


	public void setSENS8(String sENS8) {
		SENS8 = sENS8;
	}


	public String getMONT8() {
		return MONT8;
	}


	public void setMONT8(String mONT8) {
		MONT8 = mONT8;
	}


	public String getRUB9() {
		return RUB9;
	}


	public void setRUB9(String rUB9) {
		RUB9 = rUB9;
	}


	public String getSENS9() {
		return SENS9;
	}


	public void setSENS9(String sENS9) {
		SENS9 = sENS9;
	}


	public String getMONT9() {
		return MONT9;
	}


	public void setMONT9(String mONT9) {
		MONT9 = mONT9;
	}


	public String getRUB10() {
		return RUB10;
	}


	public void setRUB10(String rUB10) {
		RUB10 = rUB10;
	}


	public String getSENS10() {
		return SENS10;
	}


	public void setSENS10(String sENS10) {
		SENS10 = sENS10;
	}


	public String getMONT10() {
		return MONT10;
	}


	public void setMONT10(String mONT10) {
		MONT10 = mONT10;
	}


	public String getRUB11() {
		return RUB11;
	}


	public void setRUB11(String rUB11) {
		RUB11 = rUB11;
	}


	public String getSENS11() {
		return SENS11;
	}


	public void setSENS11(String sENS11) {
		SENS11 = sENS11;
	}


	public String getMONT11() {
		return MONT11;
	}


	public void setMONT11(String mONT11) {
		MONT11 = mONT11;
	}


	public String getRUB12() {
		return RUB12;
	}


	public void setRUB12(String rUB12) {
		RUB12 = rUB12;
	}


	public String getSENS12() {
		return SENS12;
	}


	public void setSENS12(String sENS12) {
		SENS12 = sENS12;
	}


	public String getMONT12() {
		return MONT12;
	}


	public void setMONT12(String mONT12) {
		MONT12 = mONT12;
	}


	public String getDATEMAJ() {
		return DATE_MAJ;
	}


	public void setDATEMAJ(String dATEMAJ) {
		DATE_MAJ = dATEMAJ;
	}


	public String getJOURNEE() {
		return JOURNEE;
	}


	public void setJOURNEE(String jOURNEE) {
		JOURNEE = jOURNEE;
	}
	
	

	 
}

package com.sonatrach.dz.cloturePaie.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name ="CLOTURE_PAIE")
@NamedQuery(name = "CloturePaie.findByDesc", query = "SELECT p FROM CloturePaie p WHERE DESCFILETYPE=?1")
public class CloturePaie {
	@Id
	private Integer IDFILETYPE;
	private Integer IDFOLDER;
	private Integer IDFILECATEGORY;
	private String PREFIXFILETYPE;
	private String DESCFILETYPE;
	private String FOLDERPATH;
	private String FOLDERNAME;

	public CloturePaie() {
		
	}

	public Integer getIDFILETYPE() {
		return IDFILETYPE;
	}

	public void setIDFILETYPE(Integer iDFILETYPE) {
		IDFILETYPE = iDFILETYPE;
	}

	public Integer getIDFOLDER() {
		return IDFOLDER;
	}

	public void setIDFOLDER(Integer iDFOLDER) {
		IDFOLDER = iDFOLDER;
	}

	public Integer getIDFILECATEGORY() {
		return IDFILECATEGORY;
	}

	public void setIDFILECATEGORY(Integer iDFILECATEGORY) {
		IDFILECATEGORY = iDFILECATEGORY;
	}

	public String getPREFIXFILETYPE() {
		return PREFIXFILETYPE;
	}

	public void setPREFIXFILETYPE(String pREFIXFILETYPE) {
		PREFIXFILETYPE = pREFIXFILETYPE;
	}

	public String getDESCFILETYPE() {
		return DESCFILETYPE;
	}

	public void setDESCFILETYPE(String dESCFILETYPE) {
		DESCFILETYPE = dESCFILETYPE;
	}

	public String getFOLDERPATH() {
		return FOLDERPATH;
	}

	public void setFOLDERPATH(String fOLDERPATH) {
		FOLDERPATH = fOLDERPATH;
	}

	public String getFOLDERNAME() {
		return FOLDERNAME;
	}

	public void setFOLDERNAME(String fOLDERNAME) {
		FOLDERNAME = fOLDERNAME;
	}
	
	
}

package com.sonatrach.dz.cloturePaie.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.sonatrach.dz.fileTypeToFolder.domain.FileTypeToFolderId;

@Entity
@Table(name ="CLOTURE_PAIE")
@IdClass(FileTypeToFolderId.class)
@NamedQueries({@NamedQuery(name = "CloturePaie.findByDesc", query = "SELECT p FROM CloturePaie p WHERE DESCFILETYPE=?1"),
		@NamedQuery(name = "CloturePaie.findByCategory", query = "SELECT p FROM CloturePaie p WHERE FOLDERNAME=?1")})
		
public class CloturePaie {
	@Id
	private Integer idfiletype;
	@Id
	private Integer idfolder;
	private Integer IDFILECATEGORY;
	private String PREFIXFILETYPE;
	private String DESCFILETYPE;
	private String FOLDERPATH;
	private String FOLDERNAME;
	private String DISPLAYEDFOLDERPATH;

	public CloturePaie() {
		
	}



	public Integer getIdfiletype() {
		return idfiletype;
	}



	public void setIdfiletype(Integer idfiletype) {
		this.idfiletype = idfiletype;
	}



	public Integer getIdfolder() {
		return idfolder;
	}



	public void setIdfolder(Integer idfolder) {
		this.idfolder = idfolder;
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

	public String getDISPLAYEDFOLDERPATH() {
		return DISPLAYEDFOLDERPATH;
	}

	public void setDISPLAYEDFOLDERPATH(String dISPLAYEDFOLDERPATH) {
		DISPLAYEDFOLDERPATH = dISPLAYEDFOLDERPATH;
	}
	
	
	
}

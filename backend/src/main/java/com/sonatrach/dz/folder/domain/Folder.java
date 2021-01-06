package com.sonatrach.dz.folder.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name ="FOLDER")
public class Folder {
	@Id
	private Integer IDFOLDER;
	private String FOLDERPATH;
	private String FOLDERNAME;
	private int STATUSFOLDER;
	
	public Folder() {
		
	}

	public Integer getIDFOLDER() {
		return IDFOLDER;
	}

	public void setIDFOLDER(Integer iDFOLDER) {
		IDFOLDER = iDFOLDER;
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

	public int getSTATUSFOLDER() {
		return STATUSFOLDER;
	}

	public void setSTATUSFOLDER(int sTATUSFOLDER) {
		STATUSFOLDER = sTATUSFOLDER;
	}
	
}

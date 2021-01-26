package com.sonatrach.dz.folder.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name ="FOLDER")
@NamedQueries({@NamedQuery(name = "Folder.findByFolderName", query = "SELECT p FROM Folder p WHERE FOLDERNAME=?1"),
	@NamedQuery(name = "Folder.findByStatus", query = "SELECT p FROM Folder p WHERE STATUSFOLDER!=?1")})
@SequenceGenerator(name="FOLDER_ID_SEQ",initialValue=7, allocationSize=1)
public class Folder {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FOLDER_ID_SEQ")
	private Integer IDFOLDER;
	private String FOLDERPATH;
	private String FOLDERNAME;
	private int STATUSFOLDER;
	private String DISPLAYEDFOLDERPATH;
	
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

	public String getDISPLAYEDFOLDERPATH() {
		return DISPLAYEDFOLDERPATH;
	}

	public void setDISPLAYEDFOLDERPATH(String dISPLAYEDFOLDERPATH) {
		DISPLAYEDFOLDERPATH = dISPLAYEDFOLDERPATH;
	}
	
	
}

package com.sonatrach.dz.folderArchive.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Table(name ="FOLDERARCHIVE")
@IdClass(FolderArchiveId.class)
@NamedQuery(name = "FolderArchive.findByOperation", query = "SELECT p FROM FolderArchive  p WHERE folderoperation=?1")
public class FolderArchive {
	@Id
	 Integer iduser ;
	@Id
	 Integer idfolder ; 
	@Id
	 Date folderarchiveddate ;
	 String archfoldername ;   
	 String archfolderpath;    
	 int archstatusfolder; 
	 String folderoperation;
	 
	 public FolderArchive() {
		 
	 }

	public Integer getIduser() {
		return iduser;
	}

	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}

	public Integer getIdfolder() {
		return idfolder;
	}

	public void setIdfolder(Integer idfolder) {
		this.idfolder = idfolder;
	}

	public Date getFolderarchiveddate() {
		return folderarchiveddate;
	}

	public void setFolderarchiveddate(Date folderarchiveddate) {
		this.folderarchiveddate = folderarchiveddate;
	}

	public String getArchfoldername() {
		return archfoldername;
	}

	public void setArchfoldername(String archfoldername) {
		this.archfoldername = archfoldername;
	}

	public String getArchfolderpath() {
		return archfolderpath;
	}

	public void setArchfolderpath(String archfolderpath) {
		this.archfolderpath = archfolderpath;
	}

	public int getArchstatusfolder() {
		return archstatusfolder;
	}

	public void setArchstatusfolder(int archstatusfolder) {
		this.archstatusfolder = archstatusfolder;
	}

	public String getFolderoperation() {
		return folderoperation;
	}

	public void setFolderoperation(String folderoperation) {
		this.folderoperation = folderoperation;
	}
	 
	
}

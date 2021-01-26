package com.sonatrach.dz.folderArchive.domain;

import java.io.Serializable;
import java.util.Date;

public class FolderArchiveId implements Serializable {
	 Integer iduser ;           
	 Integer idfolder ;          
	 Date folderarchiveddate ;
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
	 
}

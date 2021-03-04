package com.sonatrach.dz.archiveSentGfiles.domain;

import java.io.Serializable;

import javax.persistence.Id;

public class ArchiveSentGfilesId implements Serializable{
	Integer idgfile  ;
	 Integer idemail;
	public Integer getIdgfile() {
		return idgfile;
	}
	public void setIdgfile(Integer idgfile) {
		this.idgfile = idgfile;
	}
	public Integer getIdemail() {
		return idemail;
	}
	public void setIdemail(Integer idemail) {
		this.idemail = idemail;
	}
	 
}

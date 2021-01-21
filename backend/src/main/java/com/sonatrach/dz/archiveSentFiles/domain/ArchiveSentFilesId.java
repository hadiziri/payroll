package com.sonatrach.dz.archiveSentFiles.domain;

import java.io.Serializable;

public class ArchiveSentFilesId implements Serializable{
	Integer idfile  ;
	 Integer idemail;
	public Integer getIdfile() {
		return idfile;
	}
	public void setIdfile(Integer idfile) {
		this.idfile = idfile;
	}
	public Integer getIdemail() {
		return idemail;
	}
	public void setIdemail(Integer idemail) {
		this.idemail = idemail;
	} 
	 
}

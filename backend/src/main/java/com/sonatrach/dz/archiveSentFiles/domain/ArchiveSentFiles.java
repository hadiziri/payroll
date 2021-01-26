package com.sonatrach.dz.archiveSentFiles.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Table(name ="ARCHIVESENTFILES")
@IdClass(ArchiveSentFilesId.class)
@NamedQuery(name = "ArchiveSentFiles.findByIdEmail", query = "SELECT p FROM ArchiveSentFiles p WHERE idemail=?1")
public class ArchiveSentFiles implements Serializable  {
	@Id
	Integer idfile  ;
	@Id
	 Integer idemail;
	
	public ArchiveSentFiles() {
		
	}
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

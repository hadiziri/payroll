package com.sonatrach.dz.archiveSentGfiles.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.sonatrach.dz.archiveSentFiles.domain.ArchiveSentFilesId;

@Entity
@Table(name ="ARCHIVESENTGFILES")
@IdClass(ArchiveSentGfilesId.class)
@NamedQuery(name = "ArchiveSentGfiles.findGfilesByIdEmail", query = "SELECT p FROM ArchiveSentGfiles p WHERE idemail=?1")
public class ArchiveSentGfiles implements Serializable{
	@Id
	Integer idgfile  ;
	@Id
	 Integer idemail;
	
	public ArchiveSentGfiles() {
		
	}

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


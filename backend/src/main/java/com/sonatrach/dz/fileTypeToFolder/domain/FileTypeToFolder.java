package com.sonatrach.dz.fileTypeToFolder.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Table(name ="FILETYPETOFOLDER")
@IdClass(FileTypeToFolderId.class)
@NamedQuery(name = "FileTypeToFolder.findByIdFolder", query = "SELECT p FROM FileTypeToFolder  p WHERE idfolder=?1")
public class FileTypeToFolder implements Serializable{
	@Id
	private Integer idfiletype;
	@Id
	private Integer idfolder;
	
	public FileTypeToFolder() {
		
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
	
}

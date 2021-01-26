package com.sonatrach.dz.fileTypeToFolder.domain;

import java.io.Serializable;

public class FileTypeToFolderId implements Serializable{
private Integer idfiletype;
private Integer idfolder;
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

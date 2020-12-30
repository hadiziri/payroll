package com.sonatrach.dz.fileToPrint.domain;

import java.io.Serializable;

public class FileToPrintId implements Serializable {
private Integer idFileType;
private Integer idStructure;
public Integer getIdFileType() {
	return idFileType;
}
public void setIdFileType(Integer idFileType) {
	this.idFileType = idFileType;
}
public Integer getIdStructure() {
	return idStructure;
}
public void setIdStructure(Integer idStructue) {
	this.idStructure = idStructue;
}

}

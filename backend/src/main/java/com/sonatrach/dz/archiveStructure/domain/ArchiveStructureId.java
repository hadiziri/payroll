package com.sonatrach.dz.archiveStructure.domain;

import java.io.Serializable;
import java.util.Date;

public class ArchiveStructureId implements Serializable{
	 Integer  idstructure ;
	 Integer iduser ;
	 Date structurearchiveddate ;
	public Integer getIdstructure() {
		return idstructure;
	}
	public void setIdstructure(Integer idstructure) {
		this.idstructure = idstructure;
	}
	public Integer getIduser() {
		return iduser;
	}
	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}
	public Date getStructurearchiveddate() {
		return structurearchiveddate;
	}
	public void setStructurearchiveddate(Date structurearchiveddate) {
		this.structurearchiveddate = structurearchiveddate;
	}
	 
	 
}

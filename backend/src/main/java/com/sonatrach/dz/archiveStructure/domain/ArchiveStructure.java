package com.sonatrach.dz.archiveStructure.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.sonatrach.dz.fileToPrint.domain.FileToPrintId;

@Entity
@Table(name ="PAYROLLSTRUCTUREARCHIVE")
@IdClass(ArchiveStructureId.class)
public class ArchiveStructure implements Serializable{
	@Id
	 Integer  idstructure ;
	@Id
	 Integer iduser ;
	@Id
	 Date structurearchiveddate ;
	Integer idactivity;
	 String  archstructurename ;
	 String  archstructurecodelike;
	 String  archstructurecodenotlike;
	 int  archstatusstructure ;
	 String archemailgroupemanagers;
	 
	 public ArchiveStructure() {
		 
	 }

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

	public String getArchstructurename() {
		return archstructurename;
	}

	public void setArchstructurename(String archstructurename) {
		this.archstructurename = archstructurename;
	}

	
	public int getArchstatusstructure() {
		return archstatusstructure;
	}

	public void setArchstatusstructure(int archstatusstructure) {
		this.archstatusstructure = archstatusstructure;
	}

	public String getArchemailgroupemanagers() {
		return archemailgroupemanagers;
	}

	public void setArchemailgroupemanagers(String archemailgroupemanagers) {
		this.archemailgroupemanagers = archemailgroupemanagers;
	}

	public Integer getIdactivity() {
		return idactivity;
	}

	public void setIdactivity(Integer idactivity) {
		this.idactivity = idactivity;
	}

	public String getArchstructurecodelike() {
		return archstructurecodelike;
	}

	public void setArchstructurecodelike(String archstructurecodelike) {
		this.archstructurecodelike = archstructurecodelike;
	}

	public String getArchstructurecodenotlike() {
		return archstructurecodenotlike;
	}

	public void setArchstructurecodenotlike(String archstructurecodenotlike) {
		this.archstructurecodenotlike = archstructurecodenotlike;
	}
	 
	 
}

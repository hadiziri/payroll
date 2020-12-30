package com.sonatrach.dz.fileToPrint.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;



@Entity
@Table(name ="FILETOPRINT")
@IdClass(FileToPrintId.class)
public class FileToPrint implements Serializable{
	@Id
	@Column(name="IDFILETYPE")
	private Integer idFileType;
	
	@Id 
	@Column(name="IDSTRUCTURE")
	private Integer  idStructure;
	@Column(name="ADDEDDATE")
	private Date addedDate;
	
	public FileToPrint() {
		
	}



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



	public Date getAddedDate() {
		return addedDate;
	}



	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}



	
	
}

package com.sonatrach.dz.efile.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name ="EFILE")
@SequenceGenerator(name="EFILE_ID_SEQ",initialValue=3, allocationSize=1)
@NamedQuery(name = "Efile.findByIdStructure", query = "SELECT p FROM Efile  p WHERE idstructure=?1")
public class Efile {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="EFILE_ID_SEQ")
	Integer idfile  ;
	Integer  idfiletype;
	Integer  idstructure ;
	Integer  idpaymonth ;
	Integer  iduser ;
	String filename  ;
	int  validatedflag ;
	Date filegenerationdate;
	
	public Efile() {
		
	}

	public Integer getIdfile() {
		return idfile;
	}

	public void setIdfile(Integer idfile) {
		this.idfile = idfile;
	}

	public Integer getIdfiletype() {
		return idfiletype;
	}

	public void setIdfiletype(Integer idfiletype) {
		this.idfiletype = idfiletype;
	}

	public Integer getIdstructure() {
		return idstructure;
	}

	public void setIdstructure(Integer idstructure) {
		this.idstructure = idstructure;
	}

	public Integer getIdpaymonth() {
		return idpaymonth;
	}

	public void setIdpaymonth(Integer idpaymonth) {
		this.idpaymonth = idpaymonth;
	}

	public Integer getIduser() {
		return iduser;
	}

	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public int getValidatedflag() {
		return validatedflag;
	}

	public void setValidatedflag(int validatedflag) {
		this.validatedflag = validatedflag;
	}

	public Date getFilegenerationdate() {
		return filegenerationdate;
	}

	public void setFilegenerationdate(Date filegenerationdate) {
		this.filegenerationdate = filegenerationdate;
	}
	
	
}

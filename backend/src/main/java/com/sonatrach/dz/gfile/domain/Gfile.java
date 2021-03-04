package com.sonatrach.dz.gfile.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name ="GFILE")
@SequenceGenerator(name="GFILE_ID_SEQ",initialValue=1, allocationSize=1)
@NamedQueries({@NamedQuery(name = "Gfile.findByIdFilePaymonth", query = "SELECT p FROM Gfile  p WHERE idfiletype=?1 and idpaymonth=?2"),
	@NamedQuery(name = "Gfile.findByFolderName", query = "SELECT p FROM Gfile  p WHERE gfoldername=?1 ")
})

public class Gfile {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="GFILE_ID_SEQ")
	Integer idgfile  ;
	Integer  idfiletype;
	Integer  idpaymonth ;
	Integer  iduser ;
	String gfilename  ;
	Date gfilegenerationdate;
	String gfoldername;
	
	public Gfile() {
		
	}

	public Integer getIdfiletype() {
		return idfiletype;
	}
	public void setIdfiletype(Integer idfiletype) {
		this.idfiletype = idfiletype;
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

	public Integer getIdgfile() {
		return idgfile;
	}

	public void setIdgfile(Integer idgfile) {
		this.idgfile = idgfile;
	}

	public String getGfilename() {
		return gfilename;
	}

	public void setGfilename(String gfilename) {
		this.gfilename = gfilename;
	}

	public Date getGfilegenerationdate() {
		return gfilegenerationdate;
	}

	public void setGfilegenerationdate(Date gfilegenerationdate) {
		this.gfilegenerationdate = gfilegenerationdate;
	}

	public String getGfoldername() {
		return gfoldername;
	}

	public void setGfoldername(String gfoldername) {
		this.gfoldername = gfoldername;
	}

	
}

package com.sonatrach.dz.emailDB.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name ="EMAIL")
@SequenceGenerator(name="EMAIL_ID_SEQ",initialValue=1, allocationSize=1)
@NamedQuery(name = "EmailDB.findByIdUser", query = "SELECT p FROM EmailDB p WHERE iduser=?1 and emailstatus=?2 ")
public class EmailDB {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="EMAIL_ID_SEQ")
	 Integer idemail ;
	 Integer iduser ;
	 String receiver ;
	 String sender ;
	 String emailobject;
	 String msg  ;
	 Date emailgenerationdate;
	 Integer emailstatus;
	 
	 public EmailDB() {
		 
	 }

	public Integer getIdemail() {
		return idemail;
	}

	public void setIdemail(Integer idemail) {
		this.idemail = idemail;
	}

	public Integer getIduser() {
		return iduser;
	}

	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getEmailobject() {
		return emailobject;
	}

	public void setEmailobject(String emailobject) {
		this.emailobject = emailobject;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Date getEmailgenerationdate() {
		return emailgenerationdate;
	}

	public void setEmailgenerationdate(Date emailgenerationdate) {
		this.emailgenerationdate = emailgenerationdate;
	}

	public Integer getEmailstatus() {
		return emailstatus;
	}

	public void setEmailstatus(Integer emailstatus) {
		this.emailstatus = emailstatus;
	}
	 
	 
}

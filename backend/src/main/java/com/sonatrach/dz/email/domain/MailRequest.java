package com.sonatrach.dz.email.domain;


import lombok.Data;

@Data
public class MailRequest {
	
	private String msg;
	private String [] to;
	private String from;
	private String subject;
	private String sturcturename;
	private String [] filesName;
	

	public String[] getTo() {
		return to;
	}
	public void setTo(String[] to) {
		this.to = to;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getSturcturename() {
		return sturcturename;
	}
	public void setSturcturename(String sturcturename) {
		this.sturcturename = sturcturename;
	}
	public String[] getFilesName() {
		return filesName;
	}
	public void setFilesName(String[] filesName) {
		this.filesName = filesName;
	}
	
	

}
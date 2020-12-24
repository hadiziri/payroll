package com.sonatrach.dz.paymonth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name ="PAYMONTH")
@NamedQuery(name = "PayMonth.findByState", query = "SELECT p FROM PayMonth p WHERE state=1")
public class PayMonth {

	@Id
	@Column(name="IDPAYMONTH")
	private Integer id;
	@Column(name="PAYMONTH")
	private String paymonth;
	@Column(name="ACTIVEMONTHFLAG")
	private Integer state;	
	
	public PayMonth() {
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPaymonth() {
		return paymonth;
	}

	public void setPaymonth(String paymonth) {
		this.paymonth = paymonth;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}
	
}

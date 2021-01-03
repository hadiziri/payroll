package com.sonatrach.dz.shactivity.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="SHACTIVITY")
public class ShActivity {
	@Id
	@Column(name="IDACTIVITY")
	private Integer idactivity;
	@Column(name="DESCACTIVITY")
	private String descactivity;
	@Column(name="STATUSACTIVITY")
	private String statusactivity;
	
	public ShActivity() {
		
	}

	public Integer getIdactivity() {
		return idactivity;
	}

	public void setIdactivity(Integer idactivity) {
		this.idactivity = idactivity;
	}

	public String getDescactivity() {
		return descactivity;
	}

	public void setDescactivity(String descactivity) {
		this.descactivity = descactivity;
	}

	public String getStatusactivity() {
		return statusactivity;
	}

	public void setStatusactivity(String statusactivity) {
		this.statusactivity = statusactivity;
	}
	
}

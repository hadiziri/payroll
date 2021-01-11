package com.sonatrach.dz.structure.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name ="payrollstructure")
@NamedQueries({@NamedQuery(name = "Structure.findByActivity", query = "SELECT p FROM Structure p WHERE IDACTIVITY=?1"),
	@NamedQuery(name = "Structure.findByStatus", query = "SELECT p FROM Structure p WHERE STATUSSTRUCTURE!=?1"),
	@NamedQuery(name = "Structure.findByName", query = "SELECT p FROM Structure p WHERE STRUCTURENAME=?1")
	})
@SequenceGenerator(name="PAYROLLSTRUCTURE_ID_SEQ",initialValue=31, allocationSize=1)
public class Structure {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PAYROLLSTRUCTURE_ID_SEQ")
    private Integer IDSTRUCTURE;
	private Integer IDACTIVITY;
	private String STRUCTURENAME;
	private String STRUCTURECODELIKE;
	private String STRUCTURECODENOTLIKE;
	private int STATUSSTRUCTURE;
	private String EMAILGROUPMANAGERS;
	
	public Structure() {
		
	}



	

	
	public Integer getIDSTRUCTURE() {
		return IDSTRUCTURE;
	}






	public void setIDSTRUCTURE(Integer iDSTRUCTURE) {
		IDSTRUCTURE = iDSTRUCTURE;
	}






	public Integer getIDACTIVITY() {
		return IDACTIVITY;
	}

	public void setIDACTIVITY(Integer iDACTIVITY) {
		IDACTIVITY = iDACTIVITY;
	}

	public String getSTRUCTURENAME() {
		return STRUCTURENAME;
	}

	public void setSTRUCTURENAME(String sTRUCTURENAME) {
		STRUCTURENAME = sTRUCTURENAME;
	}



	public int getSTATUSSTRUCTURE() {
		return STATUSSTRUCTURE;
	}

	public void setSTATUSSTRUCTURE(int sTATUSSTRUCTURE) {
		STATUSSTRUCTURE = sTATUSSTRUCTURE;
	}

	public String getEMAILGROUPMANAGERS() {
		return EMAILGROUPMANAGERS;
	}

	public void setEMAILGROUPMANAGERS(String eMAILGROUPMANAGERS) {
		EMAILGROUPMANAGERS = eMAILGROUPMANAGERS;
	}

	public String getSTRUCTURECODELIKE() {
		return STRUCTURECODELIKE;
	}

	public void setSTRUCTURECODELIKE(String sTRUCTURECODELIKE) {
		STRUCTURECODELIKE = sTRUCTURECODELIKE;
	}






	public String getSTRUCTURECODENOTLIKE() {
		return STRUCTURECODENOTLIKE;
	}






	public void setSTRUCTURECODENOTLIKE(String sTRUCTURECODENOTLIKE) {
		STRUCTURECODENOTLIKE = sTRUCTURECODENOTLIKE;
	}



	

	
}

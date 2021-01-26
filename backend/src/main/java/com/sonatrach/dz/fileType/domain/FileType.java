package com.sonatrach.dz.fileType.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="FILETYPE")
public class FileType {
@Id
Integer idfiletype;
Integer idfilecategory;
String descfiletype;
String generationfrequency;
String prefixfiletype;

public FileType() {
	
}

public Integer getIdfiletype() {
	return idfiletype;
}

public void setIdfiletype(Integer idfiletype) {
	this.idfiletype = idfiletype;
}

public Integer getIdfilecategory() {
	return idfilecategory;
}

public void setIdfilecategory(Integer idfilecategory) {
	this.idfilecategory = idfilecategory;
}

public String getDescfiletype() {
	return descfiletype;
}

public void setDescfiletype(String descfiletype) {
	this.descfiletype = descfiletype;
}

public String getGenerationfrequency() {
	return generationfrequency;
}

public void setGenerationfrequency(String generationfrequency) {
	this.generationfrequency = generationfrequency;
}

public String getPrefixfiletype() {
	return prefixfiletype;
}

public void setPrefixfiletype(String prefixfiletype) {
	this.prefixfiletype = prefixfiletype;
}

}

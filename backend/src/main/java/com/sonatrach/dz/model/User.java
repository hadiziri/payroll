package com.sonatrach.dz.model;

import java.util.HashSet;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;


import org.hibernate.annotations.NaturalId;

@Entity
@Table(name = "APPUSERS")
@SequenceGenerator(name="APPUSERS_ID_SEQ",initialValue=6, allocationSize=1)
public class User{
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="APPUSERS_ID_SEQ")
	@Column(name="IDUSER")
    private Integer iduser;
	@Column(name="NAME")
    private String name;
	@Column(name="USERNAME", unique = true)
    private String username;
	@Column(name="EMAIL")
    private String email;
	@Column(name="PASSWORD")
    private String password;
	@Column(name="ACCOUNTSTATE")
	private int state;
  
    public User() {}

    public User(String name, String username, String email, String password,int state) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.state=state;
    }

 

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	

	public Integer getIduser() {
		return iduser;
	}

	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

 
}
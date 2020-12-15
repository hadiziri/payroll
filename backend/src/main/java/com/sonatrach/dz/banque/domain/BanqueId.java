package com.sonatrach.dz.banque.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;

public class BanqueId implements Serializable{
	 private String ban_cban;
		private String agence;
		public String getBan_cban() {
			return ban_cban;
		}
		public void setBan_cban(String ban_cban) {
			this.ban_cban = ban_cban;
		}
		public String getAgence() {
			return agence;
		}
		public void setAgence(String agence) {
			this.agence = agence;
		}
		
		
}

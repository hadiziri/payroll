package com.sonatrach.dz.etatRecap.domain;

import java.util.Comparator;

public class DbulcrubSorter implements Comparator<EtatRecap> {
	@Override
	public int compare(EtatRecap o1, EtatRecap o2) {
	return o1.getDbulcrub().compareTo(o2.getDbulcrub());
		/*if(o1.getDiv().compareTo(o2.getDiv())==0 ) {
			if(compareRub( o1, o2)==0) {
				return 0;
			}else {
				if(compareRub( o1,  o2)==-1) {
					return -1;
				}else {
					return 1;
				}
			}
		}else {
			if(o1.getDiv().compareTo(o2.getDiv())<0 ) {
				return -1;
			
			}else {
				return 1;
			}
		}*/
	}
	
	public int compareRub(EtatRecap o1, EtatRecap o2) {
		return o1.getDbulcrub().compareTo(o2.getDbulcrub());
	}
	

}

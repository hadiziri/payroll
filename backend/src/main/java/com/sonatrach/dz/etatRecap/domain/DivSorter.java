package com.sonatrach.dz.etatRecap.domain;

import java.util.Comparator;

public class DivSorter implements Comparator<EtatRecap>{
	@Override
	public int compare(EtatRecap o1, EtatRecap o2) {
	return o1.getDiv().compareTo(o2.getDiv());
	}

}

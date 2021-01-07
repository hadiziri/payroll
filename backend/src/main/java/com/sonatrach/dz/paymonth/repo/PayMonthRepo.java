package com.sonatrach.dz.paymonth.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.paymonth.domain.PayMonth;


@Repository
public interface PayMonthRepo extends JpaRepository<PayMonth ,Integer > {
public PayMonth findByState();
public PayMonth findByPaymonth(String paymonth);
}

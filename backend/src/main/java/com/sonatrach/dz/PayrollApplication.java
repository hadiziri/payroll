package com.sonatrach.dz;

import javax.persistence.EntityManagerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootApplication
public class PayrollApplication extends SpringBootServletInitializer  {

	public static void main(String[] args) {
		SpringApplication.run(PayrollApplication.class, args);
	
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(PayrollApplication.class);
    }

}

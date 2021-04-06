package com.sonatrach.dz.email.service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.sonatrach.dz.email.domain.MailRequest;
import com.sonatrach.dz.email.domain.MailResponse;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender sender;
	
	@Autowired
	private Configuration config;
	
	public MailResponse sendEmailZip(MailRequest request,String path,String zipName, Map<String, Object> model) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		MailResponse response = new MailResponse();
		MimeMessage message = sender.createMimeMessage();
		try {
			// set mediaType
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			// add attachment
			   FileSystemResource file 
			      = new FileSystemResource(new File(path));
			    helper.addAttachment(zipName, file);
			    Template t = config.getTemplate("email-template.ftl");
				String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			

			helper.setTo(request.getTo());
			helper.setText(html, true);
			helper.setSubject(request.getSubject());
			helper.setFrom(request.getFrom());
			sender.send(message);

			response.setMessage("mail send to : " + request.getTo());
			
			response.setStatus(Boolean.TRUE);

		} catch (MessagingException e) {
			response.setMessage("Mail Sending failure : "+e.getMessage());
			response.setStatus(Boolean.FALSE);
			
		}

		return response;
	}
	
	
	public MailResponse sendEmailFiles(MailRequest request,String path,String[] fileNames, Map<String, Object> model) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		MailResponse response = new MailResponse();
		MimeMessage message = sender.createMimeMessage();
		try {
			// set mediaType
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			// add attachment
			for(int i=0;i<fileNames.length;i++) {
				String pathFile=path+fileNames[i];
				  FileSystemResource file 
			      = new FileSystemResource(new File(pathFile));
			    helper.addAttachment(fileNames[i], file);
			}
			 
			    Template t = config.getTemplate("email-template.ftl");
				String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			

			helper.setTo(request.getTo());
			helper.setText(html, true);
			helper.setSubject(request.getSubject());
			helper.setFrom(request.getFrom());
			sender.send(message);

			response.setMessage("mail send to : " + request.getTo());
			response.setStatus(Boolean.TRUE);

		} catch (MessagingException e) {
			response.setMessage("Mail Sending failure : "+e.getMessage());
			response.setStatus(Boolean.FALSE);
		}

		return response;
	}
	

}
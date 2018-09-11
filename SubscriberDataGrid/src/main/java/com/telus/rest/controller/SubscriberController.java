package com.telus.rest.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.MongoClient;
import com.telus.mongodb.dao.MongoDBSubscriberDAO;
import com.telus.mongodb.model.SubscriberInfo;
import com.telus.ws.client.SubscriberDataGridClient;
import com.telus.ws.dto.SubscriberIdentifierResponseDTO;
import com.telus.ws.dto.SubscriberResponseDTO;

@RestController
@CrossOrigin
public class SubscriberController {
	
	@Autowired
	ServletContext servletContext; 

	@Autowired
	private Environment env;
	
    @RequestMapping(method=RequestMethod.GET, value="/loadSubscriberDataGrid")
    public List<SubscriberInfo> getSubscriberIdentifierListByAccountNumber(@RequestParam(value="ban", defaultValue="70776917") String ban) {
    	
    	
    	String host = env.getProperty("spring.data.mongodb.host");
    	String port = env.getProperty("spring.data.mongodb.port");
    	
			List<SubscriberIdentifierResponseDTO> subscriberInfoList = SubscriberDataGridClient.getSubscriberIdentifierListByAccountNumber(Integer.valueOf(ban), servletContext);
			List<SubscriberResponseDTO> listSubscriberResponseDTO = new ArrayList<SubscriberResponseDTO>();
			
			for (SubscriberIdentifierResponseDTO subscriberIdentifierResponseDTO : subscriberInfoList) {
				if (null != subscriberIdentifierResponseDTO.getSubscriptionId()) {
					listSubscriberResponseDTO.add(SubscriberDataGridClient.getSubscriberBySubscriptionId(Long.parseLong(subscriberIdentifierResponseDTO.getSubscriptionId()), servletContext));
				}
			}
			
			MongoClient mongoClient = new MongoClient();
			
			MongoDBSubscriberDAO subscriberDAO = new MongoDBSubscriberDAO(mongoClient);
			
			subscriberDAO.createSubscribers(listSubscriberResponseDTO);
			
			List<SubscriberInfo> subscribers = subscriberDAO.readAllSubscriberInfos();
			
			return subscribers;
    }
	
	
}

package com.telus.kafka.poc;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.mongodb.MongoClient;
import com.telus.mongodb.dao.MongoDBSubscriberDAO;
import com.telus.rest.RequestPayloadVO;

@Component
public class KafkaReceiver {

    @KafkaListener(topics = "topic1")
    public void receiveTopic1(ConsumerRecord<String, SubscriberDetailsVO> consumerRecord) {
    	
    	boolean isRatePlanChanged = true;
    	SubscriberDetailsVO subDetails = consumerRecord.value();
    	
    	MongoClient mongoClient = new MongoClient();
		
		MongoDBSubscriberDAO subscriberDAO = new MongoDBSubscriberDAO(mongoClient);
		
		subscriberDAO.updateSubscriberRatePlan(subDetails);
    	
        System.out.println("Receiver on topic1: " + consumerRecord.toString());
        
        mongoClient.close();
        
        String ban = subDetails.getBan();
        String subId = subDetails.getSubscriberId();
        String ratePlan = subDetails.getRatePlan();
    	String equipmentTypeCd = "U";
    	String role = "client";
    	String language = "en";
    	
		RestTemplate restTemplate = new RestTemplate();
		
		String uri = "https://soa-mp-rmsk-it02.tsl.telus.com/v2/cmo/selfmgmt/priceplaninfo/account/{ban}/sub/{sub}/service-agreement/plan";
    	Map<String, String> params = new HashMap<String, String>();
        params.put("ban", ban);
        params.put("sub", subId);
        
        RequestPayloadVO requestPayloadVO = new RequestPayloadVO(ban, subId, ratePlan, equipmentTypeCd, role, language);
		
        HttpHeaders requestHeaders = new HttpHeaders();
        List <MediaType> mediaTypeList = new ArrayList<MediaType>();
        mediaTypeList.add(MediaType.APPLICATION_JSON);
        requestHeaders.setAccept(mediaTypeList);
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<RequestPayloadVO> entity = new HttpEntity<RequestPayloadVO>(requestPayloadVO, (createHeaders("APP_SELFSERVEUSGBIZSVC", "soaorgid"))); 
        
        try {
        	ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.PUT, entity, Object.class, params);
        	if (response.getStatusCodeValue() != 200) {
        		isRatePlanChanged = false;
        	}
        } catch (Exception e) {
        	isRatePlanChanged = false;
        }
        
        if (isRatePlanChanged) {
        	System.out.println("Rate Plan " + ratePlan + " has been changed for this Subscriber# " + subId);
        } else {
        	System.out.println("Rate Plan " + ratePlan + " has not been changed for this Subscriber# " + subId);
        }

    }
    
    @SuppressWarnings("serial")
	public static HttpHeaders createHeaders(String username, String password){
    	List <MediaType> mediaTypeList = new ArrayList<MediaType>();
        mediaTypeList.add(MediaType.APPLICATION_JSON);
    	   return new HttpHeaders() {{
    	         String auth = username + ":" + password;
    	         byte[] encodedAuth = Base64.encodeBase64( 
    	            auth.getBytes(Charset.forName("US-ASCII")) );
    	         String authHeader = "Basic " + new String( encodedAuth );
    	         set( "Authorization", authHeader );
    	         setAccept(mediaTypeList);
    	         setContentType(MediaType.APPLICATION_JSON);
    	      }};
    	}

    @KafkaListener(topics = "topic2")
    public void receiveTopic2(ConsumerRecord<?, ?> consumerRecord) {
        System.out.println("Receiver on topic2: "+consumerRecord.toString());
    }

}

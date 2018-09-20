package com.telus.kafka.poc;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaSender {

    @Autowired
    private KafkaTemplate<String, RequestDTO> kafkaTemplate;

    public void send(String topic, RequestDTO requestDTO) {
    	
    	RequestDTO sendDTO = new RequestDTO();
    	sendDTO.setRatePlan(requestDTO.getRatePlan());
    	
    	List<String> ids = new ArrayList<String>();
    	
    	for (String subDBId : requestDTO.getSubIds()) {
    		ids.add(subDBId);
    		sendDTO.setSubIds(ids);
    		kafkaTemplate.send(topic, sendDTO);
    		ids.clear();
    	}
        
        System.out.println("Message: "+requestDTO.toString()+" sent to topic: "+topic);
    }


}

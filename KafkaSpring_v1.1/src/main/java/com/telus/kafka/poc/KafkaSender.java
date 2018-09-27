package com.telus.kafka.poc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaSender {

    @Autowired
    private KafkaTemplate<String, SubscriberDetailsVO> kafkaTemplate;

    public void send(String topic, RequestDTO requestDTO) {
    	
    	for (SubscriberDetailsVO subDetails : requestDTO.getSubscriberDetails()) {
    		kafkaTemplate.send(topic, subDetails);
    	}
        
        System.out.println("Message: "+requestDTO.toString()+" sent to topic: "+topic);
    }


}

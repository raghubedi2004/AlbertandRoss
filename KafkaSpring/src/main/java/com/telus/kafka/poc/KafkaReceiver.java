package com.telus.kafka.poc;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.mongodb.MongoClient;
import com.telus.mongodb.dao.MongoDBSubscriberDAO;

@Component
public class KafkaReceiver {

    @KafkaListener(topics = "topic1")
    public void receiveTopic1(ConsumerRecord<String, RequestDTO> consumerRecord) {
    	
    	
    	MongoClient mongoClient = new MongoClient();
		
		MongoDBSubscriberDAO subscriberDAO = new MongoDBSubscriberDAO(mongoClient);
		
		subscriberDAO.updateSubscriberRatePlan(consumerRecord.value());
    	
        System.out.println("Receiver on topic1: " + consumerRecord.toString());
        
    }

    @KafkaListener(topics = "topic2")
    public void receiveTopic2(ConsumerRecord<?, ?> consumerRecord) {
        System.out.println("Receiver on topic2: "+consumerRecord.toString());
    }

}

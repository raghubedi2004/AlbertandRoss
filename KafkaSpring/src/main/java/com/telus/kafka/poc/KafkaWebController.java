package com.telus.kafka.poc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mongodb.MongoClient;
import com.telus.mongodb.dao.MongoDBSubscriberDAO;
import com.telus.mongodb.model.SubscriberInfo;

@Controller
@CrossOrigin
public class KafkaWebController {

    @Autowired
    KafkaSender kafkaSender;

    @PostMapping("/kafka/{topicName}")
    @ResponseBody
    public List<SubscriberInfo> sendToTopic(@PathVariable String topicName, @RequestBody RequestDTO requestDTO) {
        kafkaSender.send(topicName, requestDTO);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus("Message sent");
        
        MongoClient mongoClient = new MongoClient();

        MongoDBSubscriberDAO subscriberDAO = new MongoDBSubscriberDAO(mongoClient);
		
		List<SubscriberInfo> subscribers = subscriberDAO.readAllSubscriberInfos();
		
		mongoClient.close();
		
        return subscribers;
    }

}

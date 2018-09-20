package com.telus.kafka.poc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin
public class KafkaWebController {

    @Autowired
    KafkaSender kafkaSender;

    @PostMapping("/kafka/{topicName}")
    @ResponseBody
    public ResponseDTO sendToTopic(@PathVariable String topicName, @RequestBody RequestDTO requestDTO) {
        kafkaSender.send(topicName, requestDTO);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus("Message sent");
        return responseDTO;
    }

}

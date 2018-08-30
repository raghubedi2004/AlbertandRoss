package com.telus.react.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.telus.react.models.SubscriberInfo;
import com.telus.react.repositories.SubscriberRepository;

@RestController
@CrossOrigin
public class SubscriberController {

	@Autowired
	SubscriberRepository subscriberRepository;
	
	@RequestMapping(method=RequestMethod.GET, value="/subscribers")
    public Iterable<SubscriberInfo> subscriber() {
        return subscriberRepository.findAll();
    }
	
	@RequestMapping(method=RequestMethod.POST, value="/subscribers")
    public SubscriberInfo save(@RequestBody SubscriberInfo subscriberInfo) {
		subscriberRepository.save(subscriberInfo);

        return subscriberInfo;
    }
	
	@RequestMapping(method=RequestMethod.GET, value="/subscribers/{id}")
    public Optional<SubscriberInfo> show(@PathVariable String id) {
        return subscriberRepository.findById(id);
    }
	
	@RequestMapping(method=RequestMethod.PUT, value="/subscribers/{id}")
    public SubscriberInfo update(@PathVariable String id, @RequestBody SubscriberInfo subscriberInfo) {
        Optional<SubscriberInfo> optSubscriber = subscriberRepository.findById(id);
        SubscriberInfo s = optSubscriber.get();
        if(subscriberInfo.getInitialdate() != null)
            s.setInitialdate(subscriberInfo.getInitialdate());
        if(subscriberInfo.getDatazipfile() != null)
            s.setDatazipfile(subscriberInfo.getDatazipfile());
        if(subscriberInfo.getBillingaccountno() != null)
            s.setBillingaccountno(subscriberInfo.getBillingaccountno());
        subscriberRepository.save(s);
        return s;
    }
	
	@RequestMapping(method=RequestMethod.DELETE, value="/subscribers/{id}")
    public String delete(@PathVariable String id) {
        Optional<SubscriberInfo> optSubscriber = subscriberRepository.findById(id);
        SubscriberInfo subscriberInfo = optSubscriber.get();
        subscriberRepository.delete(subscriberInfo);

        return "";
    }
	
}

package com.telus.kafka.poc;

import java.io.Serializable;
import java.util.List;

public class RequestDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private List<SubscriberDetailsVO> subscriberDetails;

	public List<SubscriberDetailsVO> getSubscriberDetails() {
		return subscriberDetails;
	}

	public void setSubscriberDetails(List<SubscriberDetailsVO> subscriberDetails) {
		this.subscriberDetails = subscriberDetails;
	}

}

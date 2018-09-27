package com.telus.kafka.poc;

import java.io.Serializable;

public class SubscriberDetailsVO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String subscriberId;
	private String ban;
	private String ratePlan;
	
	public String getSubscriberId() {
		return subscriberId;
	}
	public void setSubscriberId(String subscriberId) {
		this.subscriberId = subscriberId;
	}
	public String getBan() {
		return ban;
	}
	public void setBan(String ban) {
		this.ban = ban;
	}
	public String getRatePlan() {
		return ratePlan;
	}
	public void setRatePlan(String ratePlan) {
		this.ratePlan = ratePlan;
	}
	
}

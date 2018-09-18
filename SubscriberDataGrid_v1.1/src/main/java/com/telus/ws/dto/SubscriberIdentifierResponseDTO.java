package com.telus.ws.dto;

import java.io.Serializable;

public class SubscriberIdentifierResponseDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
	private int billingAccountNum;
    private String subscriberId;
    private String subscriptionId;
    private String seatTypeCd;
    private String seatGroupId;
    
	public int getBillingAccountNum() {
		return billingAccountNum;
	}
	public void setBillingAccountNum(int billingAccountNum) {
		this.billingAccountNum = billingAccountNum;
	}
	public String getSubscriberId() {
		return subscriberId;
	}
	public void setSubscriberId(String subscriberId) {
		this.subscriberId = subscriberId;
	}
	public String getSubscriptionId() {
		return subscriptionId;
	}
	public void setSubscriptionId(String subscriptionId) {
		this.subscriptionId = subscriptionId;
	}
	public String getSeatTypeCd() {
		return seatTypeCd;
	}
	public void setSeatTypeCd(String seatTypeCd) {
		this.seatTypeCd = seatTypeCd;
	}
	public String getSeatGroupId() {
		return seatGroupId;
	}
	public void setSeatGroupId(String seatGroupId) {
		this.seatGroupId = seatGroupId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

}

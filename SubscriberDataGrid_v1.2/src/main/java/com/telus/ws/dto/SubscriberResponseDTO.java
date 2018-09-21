package com.telus.ws.dto;

import java.io.Serializable;

public class SubscriberResponseDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	
	private String subscriberId;
	private ConsumerNameDTO consumerName;
    private String phoneNum;
    private String pricePlanCd;
    private MultilingualDescriptionListDTO pricePlanDesc;
    private String statusCd;
    private Integer billingAccountNum;
    private String equipmentSerialNum;
    private CommitmentDTO commitment;
    private String deviceBalance;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ConsumerNameDTO getConsumerName() {
		return consumerName;
	}
	public void setConsumerName(ConsumerNameDTO consumerName) {
		this.consumerName = consumerName;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public String getPricePlanCd() {
		return pricePlanCd;
	}
	public void setPricePlanCd(String pricePlanCd) {
		this.pricePlanCd = pricePlanCd;
	}
	public MultilingualDescriptionListDTO getPricePlanDesc() {
		return pricePlanDesc;
	}
	public void setPricePlanDesc(MultilingualDescriptionListDTO pricePlanDesc) {
		this.pricePlanDesc = pricePlanDesc;
	}
	public String getStatusCd() {
		return statusCd;
	}
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	public Integer getBillingAccountNum() {
		return billingAccountNum;
	}
	public void setBillingAccountNum(Integer billingAccountNum) {
		this.billingAccountNum = billingAccountNum;
	}
	public String getEquipmentSerialNum() {
		return equipmentSerialNum;
	}
	public void setEquipmentSerialNum(String equipmentSerialNum) {
		this.equipmentSerialNum = equipmentSerialNum;
	}
	public CommitmentDTO getCommitment() {
		return commitment;
	}
	public void setCommitment(CommitmentDTO commitment) {
		this.commitment = commitment;
	}
	public String getDeviceBalance() {
		return deviceBalance;
	}
	public void setDeviceBalance(String deviceBalance) {
		this.deviceBalance = deviceBalance;
	}
	public String getSubscriberId() {
		return subscriberId;
	}
	public void setSubscriberId(String subscriberId) {
		this.subscriberId = subscriberId;
	}
	
}

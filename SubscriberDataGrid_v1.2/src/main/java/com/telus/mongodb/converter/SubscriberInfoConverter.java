package com.telus.mongodb.converter;

import java.text.SimpleDateFormat;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;
import com.telus.mongodb.model.SubscriberInfo;
import com.telus.ws.dto.SubscriberResponseDTO;

public class SubscriberInfoConverter {

	public static DBObject toDBObject(SubscriberResponseDTO subscriberInfo) {

		String contractStartDate = "";
		String contractEndDate = "";
		
		if (null != subscriberInfo.getCommitment() && null != subscriberInfo.getCommitment().getTimePeriod() && null != subscriberInfo.getCommitment().getTimePeriod().getEffectiveDt()) {
			XMLGregorianCalendar gregFmt;
			try {
				gregFmt = DatatypeFactory.newInstance().newXMLGregorianCalendar(new SimpleDateFormat("yyyy-MM-dd").format(subscriberInfo.getCommitment().getTimePeriod().getEffectiveDt().toGregorianCalendar().getTime()));
				contractStartDate = gregFmt.toString();
			} catch (DatatypeConfigurationException e) {
				e.printStackTrace();
			}
			
		}
		if (null != subscriberInfo.getCommitment() && null != subscriberInfo.getCommitment().getTimePeriod() && null != subscriberInfo.getCommitment().getTimePeriod().getExpiryDt()) {
			
			XMLGregorianCalendar gregFmt;
			try {
				gregFmt = DatatypeFactory.newInstance().newXMLGregorianCalendar(new SimpleDateFormat("yyyy-MM-dd").format(subscriberInfo.getCommitment().getTimePeriod().getExpiryDt().toGregorianCalendar().getTime()));
				contractEndDate = gregFmt.toString();
			} catch (DatatypeConfigurationException e) {
				e.printStackTrace();
			}
			
		}
		
		BasicDBObjectBuilder builder = BasicDBObjectBuilder.start()
				.append("subscriberName", subscriberInfo.getConsumerName().getFirstName()+" "+subscriberInfo.getConsumerName().getLastName())
				.append("subscriberId", subscriberInfo.getSubscriberId())
				.append("phoneNumber", subscriberInfo.getPhoneNum())
				.append("ratePlan", subscriberInfo.getPricePlanCd())
				.append("subscriptionStatus", subscriberInfo.getStatusCd())
				.append("ban", subscriberInfo.getBillingAccountNum())
				.append("sim", subscriberInfo.getEquipmentSerialNum())
				.append("contractStartDate", contractStartDate)
				.append("contractEndDate", contractEndDate)
				.append("deviceBalance", "");
		
		return builder.get();
		
	}

	public static SubscriberInfo toSubscribers(DBObject doc) {
		
		SubscriberInfo subscriberInfo = new SubscriberInfo();
		ObjectId id = (ObjectId) doc.get("_id");
		subscriberInfo.setId(id.toString());
		
		subscriberInfo.setBan((Integer) doc.get("ban"));
		subscriberInfo.setSubscriberId((String) doc.get("subscriberId"));
		subscriberInfo.setContractEndDate((String) doc.get("contractEndDate"));
		subscriberInfo.setContractStartDate((String) doc.get("contractStartDate"));
		subscriberInfo.setDeviceBalance((String) doc.get("deviceBalance"));
		subscriberInfo.setPhoneNumber((String) doc.get("phoneNumber"));
		subscriberInfo.setRatePlan((String) doc.get("ratePlan"));
		subscriberInfo.setSim((String) doc.get("sim"));
		subscriberInfo.setSubscriberName((String) doc.get("subscriberName"));
		subscriberInfo.setSubscriptionStatus((String) doc.get("subscriptionStatus"));
		
		return subscriberInfo;

	}
	
}

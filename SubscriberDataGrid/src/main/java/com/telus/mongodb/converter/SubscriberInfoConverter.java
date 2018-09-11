package com.telus.mongodb.converter;

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
			contractStartDate = subscriberInfo.getCommitment().getTimePeriod().getEffectiveDt().toString();
		}
		if (null != subscriberInfo.getCommitment() && null != subscriberInfo.getCommitment().getTimePeriod() && null != subscriberInfo.getCommitment().getTimePeriod().getExpiryDt()) {
			contractEndDate = subscriberInfo.getCommitment().getTimePeriod().getExpiryDt().toString();
		}
		
		BasicDBObjectBuilder builder = BasicDBObjectBuilder.start()
				.append("subscriberName", subscriberInfo.getConsumerName().getFirstName()+" "+subscriberInfo.getConsumerName().getLastName())
				.append("phoneNumber", subscriberInfo.getPhoneNum())
				.append("ratePlan", subscriberInfo.getPricePlanCd())
				.append("subscriptionStatus", subscriberInfo.getStatusCd())
				.append("ban", subscriberInfo.getBillingAccountNum())
				.append("sim", subscriberInfo.getEquipmentSerialNum())
				.append("contractStartDate", contractStartDate)
				.append("contractEndDate", contractEndDate)
				.append("deviceBalance", "");
		
		if (subscriberInfo.getId() != null)
			builder = builder.append("_id", new ObjectId(subscriberInfo.getId()));
		
		return builder.get();
		
	}

	public static SubscriberInfo toSubscribers(DBObject doc) {
		
		SubscriberInfo subscriberInfo = new SubscriberInfo();
		ObjectId id = (ObjectId) doc.get("_id");
		subscriberInfo.setId(id.toString());
		
		subscriberInfo.setBan((Integer) doc.get("ban"));
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

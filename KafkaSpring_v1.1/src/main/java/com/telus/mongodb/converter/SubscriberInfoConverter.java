package com.telus.mongodb.converter;

import org.bson.types.ObjectId;

import com.mongodb.DBObject;
import com.telus.mongodb.model.SubscriberInfo;

public class SubscriberInfoConverter {

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

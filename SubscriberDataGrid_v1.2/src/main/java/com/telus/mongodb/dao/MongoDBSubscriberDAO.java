package com.telus.mongodb.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.telus.mongodb.converter.SubscriberInfoConverter;
import com.telus.mongodb.model.SubscriberInfo;
import com.telus.ws.dto.SubscriberResponseDTO;

public class MongoDBSubscriberDAO {

	private DBCollection col;

	@SuppressWarnings("deprecation")
	public MongoDBSubscriberDAO(MongoClient mongo) {
		this.col = mongo.getDB("subscriberDataGrid").getCollection("subscriberDataGridDetails");
	}

	public void createSubscribers(List<SubscriberResponseDTO> subscriberInfoList) {
		
		for (SubscriberResponseDTO subscriberInfo : subscriberInfoList) {
			
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
			
			BasicDBObject newDocument = new BasicDBObject();
			String name = "";
			
			if (null != subscriberInfo.getConsumerName() && null != subscriberInfo.getConsumerName().getFirstName()) {
				name += subscriberInfo.getConsumerName().getFirstName();
			}
			if (null != subscriberInfo.getConsumerName() && null != subscriberInfo.getConsumerName().getLastName()) {
				name += " " + subscriberInfo.getConsumerName().getLastName();
			}
			
			newDocument.append("subscriberName", name)
			.append("subscriberId", subscriberInfo.getSubscriberId())
			.append("phoneNumber", subscriberInfo.getPhoneNum())
			.append("ratePlan", subscriberInfo.getPricePlanCd())
			.append("subscriptionStatus", subscriberInfo.getStatusCd())
			.append("ban", subscriberInfo.getBillingAccountNum())
			.append("sim", subscriberInfo.getEquipmentSerialNum())
			.append("contractStartDate", contractStartDate)
			.append("contractEndDate", contractEndDate)
			.append("deviceBalance", "");
			
			DBObject upd = new BasicDBObject("$set", newDocument);
			
			BasicDBObject searchQuery = new BasicDBObject().append("subscriberId", subscriberInfo.getSubscriberId());
	
			col.update(searchQuery, upd, true, false);
			
		}
			
		return;
		
	}
	
	public List<SubscriberInfo> readAllSubscriberInfos() {
		List<SubscriberInfo> data = new ArrayList<SubscriberInfo>();
		DBCursor cursor = col.find();
		while (cursor.hasNext()) {
			DBObject doc = cursor.next();
			SubscriberInfo p = SubscriberInfoConverter.toSubscribers(doc);
			data.add(p);
		}
		return data;
	}
	
	public List<SubscriberInfo> readBANSubscriberInfos(int ban) {
		List<SubscriberInfo> data = new ArrayList<SubscriberInfo>();
		DBCursor cursor = col.find();
		while (cursor.hasNext()) {
			DBObject doc = cursor.next();
			int accountNumber = (Integer) doc.get("ban");
			if (accountNumber == ban) {
				SubscriberInfo p = SubscriberInfoConverter.toSubscribers(doc);
				data.add(p);
			}
		}
		return data;
	}
	
}

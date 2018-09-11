package com.telus.mongodb.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

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
			DBObject doc = SubscriberInfoConverter.toDBObject(subscriberInfo);
			this.col.insert(doc);
			ObjectId id = (ObjectId) doc.get("_id");
			subscriberInfo.setId(id.toString());
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
	
}

package com.telus.mongodb.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.telus.kafka.poc.RequestDTO;
import com.telus.mongodb.converter.SubscriberInfoConverter;
import com.telus.mongodb.model.SubscriberInfo;

public class MongoDBSubscriberDAO {

	private DBCollection col;

	@SuppressWarnings("deprecation")
	public MongoDBSubscriberDAO(MongoClient mongo) {
		this.col = mongo.getDB("subscriberDataGrid").getCollection("subscriberDataGridDetails");
	}
	
	public void updateSubscriberRatePlan(RequestDTO requestDTO) {
		
		for (String subDBId : requestDTO.getSubIds()) {
			
			BasicDBObject newDocument = new BasicDBObject();
			newDocument.append("$set", new BasicDBObject().append("ratePlan", requestDTO.getRatePlan()));
					
			BasicDBObject searchQuery = new BasicDBObject().append("_id", new ObjectId(subDBId));
	
			col.update(searchQuery, newDocument);
			
			col.save(newDocument);
		
		}
		
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

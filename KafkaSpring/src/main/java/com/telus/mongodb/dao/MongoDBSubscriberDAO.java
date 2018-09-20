package com.telus.mongodb.dao;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.telus.kafka.poc.RequestDTO;

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
		
		}
		
	}

}

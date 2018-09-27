package com.telus.mongodb.dao;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.telus.kafka.poc.SubscriberDetailsVO;

public class MongoDBSubscriberDAO {

	private DBCollection col;

	@SuppressWarnings("deprecation")
	public MongoDBSubscriberDAO(MongoClient mongo) {
		this.col = mongo.getDB("subscriberDataGrid").getCollection("subscriberDataGridDetails");
	}
	
	public void updateSubscriberRatePlan(SubscriberDetailsVO subDetails) {
		
		BasicDBObject newDocument = new BasicDBObject();
		newDocument.append("$set", new BasicDBObject().append("ratePlan", subDetails.getRatePlan()));
				
		BasicDBObject searchQuery = new BasicDBObject().append("subscriberId", subDetails.getSubscriberId());

		col.update(searchQuery, newDocument);
		
	}

}

package com.telus.mongodb.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import com.telus.mongodb.converter.SubscriberInfoConverter;
import com.telus.mongodb.model.SubscriberInfo;

//DAO class for different MongoDB CRUD operations
//take special note of "id" String to ObjectId conversion and vice versa
//also take note of "_id" key for primary key
public class MongoDBSubscriberDAO {

	private DBCollection col;

	@SuppressWarnings("deprecation")
	public MongoDBSubscriberDAO(MongoClient mongo) {
		this.col = mongo.getDB("subscriberdev").getCollection("Subscribers");
	}

	public void createSubscribers(List<SubscriberInfo> subscriberInfoList) {
		
		for (SubscriberInfo subscriberInfo : subscriberInfoList) {
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

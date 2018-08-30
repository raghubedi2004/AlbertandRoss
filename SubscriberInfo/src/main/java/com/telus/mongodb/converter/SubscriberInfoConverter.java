package com.telus.mongodb.converter;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

import com.telus.mongodb.model.SubscriberInfo;

public class SubscriberInfoConverter {

	// convert Subscriber Object to MongoDB DBObject
	// take special note of converting id String to ObjectId
	public static DBObject toDBObject(SubscriberInfo subscriberInfo) {

		BasicDBObjectBuilder builder = BasicDBObjectBuilder.start()
				.append("initialdate", subscriberInfo.getInitialDate())
				.append("datazipfile", subscriberInfo.getDataZipFile())
				.append("billingaccountno", subscriberInfo.getBillingAccountNo())
				.append("subscriber", subscriberInfo.getSubscriber())
				.append("externalid", subscriberInfo.getExternalID())
				.append("billcycle", subscriberInfo.getBillCycle())
				.append("billmonthnum", subscriberInfo.getBillMonthNum())
				.append("billyearnum", subscriberInfo.getBillYearNum())
				.append("intervalstartdate", subscriberInfo.getIntervalStartDate())
				.append("intervalenddate", subscriberInfo.getIntervalEndDate())
				.append("imei", subscriberInfo.getImei())
				.append("billcycledaysremaining", subscriberInfo.getBillCycleDaysRemaining())
				.append("mtdusagedomesticindividual", subscriberInfo.getMtdUsageDomesticIndividual())
				.append("domesticindividualbucket", subscriberInfo.getDomesticIndividualBucket())
				.append("domesticindividualusage", subscriberInfo.getDomesticIndividualUsage())
				.append("mtdusagedomesticsharedsinglesub", subscriberInfo.getMtdUsageDomesticSharedSingleSub())
				.append("mtdusageroamingindividual", subscriberInfo.getMtdUsageRoamingIndividual())
				.append("roamingindividualbucket", subscriberInfo.getRoamingIndividualBucket())
				.append("roamingindividualusage", subscriberInfo.getRoamingIndividualUsage())
				.append("mtdusageroamingsharedindividualsub", subscriberInfo.getMtdUsageRoamingSharedIndividualSub())
				.append("overageusagedomestic", subscriberInfo.getOverageUsageDomestic())
				.append("overageusageroaming", subscriberInfo.getOverageUsageRoaming())
				.append("totalmtddomesticdatausage", subscriberInfo.getTotalMTDDomesticDataUsage())
				.append("totalincludeddomesticdata", subscriberInfo.getTotalIncludedDomesticData())
				.append("domesticoveragechargedamount", subscriberInfo.getDomesticOverageChargedAmount())
				.append("roamingoveragechargedamount", subscriberInfo.getRoamingOverageChargedAmount());
		
		if (subscriberInfo.getId() != null)
			builder = builder.append("_id", new ObjectId(subscriberInfo.getId()));
		
		return builder.get();
		
	}

	// convert DBObject Object to Subscriber
	// take special note of converting ObjectId to String
	public static SubscriberInfo toSubscribers(DBObject doc) {
		SubscriberInfo subscriberInfo = new SubscriberInfo();
		ObjectId id = (ObjectId) doc.get("_id");
		subscriberInfo.setId(id.toString());
		subscriberInfo.setInitialDate((String) doc.get("initialdate"));
		subscriberInfo.setDataZipFile((String) doc.get("datazipfile"));
		subscriberInfo.setBillingAccountNo((String) doc.get("billingaccountno"));
		
		subscriberInfo.setSubscriber((String) doc.get("subscriber"));
		subscriberInfo.setExternalID((String) doc.get("externalid"));
		subscriberInfo.setBillCycle((String) doc.get("billcycle"));
		subscriberInfo.setBillMonthNum((String) doc.get("billmonthnum"));
		subscriberInfo.setBillYearNum((String) doc.get("billyearnum"));
		subscriberInfo.setIntervalStartDate((String) doc.get("intervalstartdate"));
		subscriberInfo.setIntervalEndDate((String) doc.get("intervalenddate"));
		subscriberInfo.setImei((String) doc.get("imei"));
		subscriberInfo.setBillCycleDaysRemaining((String) doc.get("billcycledaysremaining"));
		subscriberInfo.setMtdUsageDomesticIndividual((String) doc.get("mtdusagedomesticindividual"));
		subscriberInfo.setDomesticIndividualBucket((String) doc.get("domesticindividualbucket"));
		subscriberInfo.setDomesticIndividualUsage((String) doc.get("domesticindividualusage"));
		subscriberInfo.setMtdUsageDomesticSharedSingleSub((String) doc.get("mtdusagedomesticsharedsinglesub"));
		subscriberInfo.setMtdUsageRoamingIndividual((String) doc.get("mtdusageroamingindividual"));
		subscriberInfo.setRoamingIndividualBucket((String) doc.get("roamingindividualbucket"));
		subscriberInfo.setRoamingIndividualUsage((String) doc.get("roamingindividualusage"));
		subscriberInfo.setMtdUsageRoamingSharedIndividualSub((String) doc.get("mtdusageroamingsharedindividualsub"));
		subscriberInfo.setOverageUsageDomestic((String) doc.get("overageusagedomestic"));
		subscriberInfo.setOverageUsageRoaming((String) doc.get("overageusageroaming"));
		subscriberInfo.setTotalMTDDomesticDataUsage((String) doc.get("totalmtddomesticdatausage"));
		subscriberInfo.setTotalIncludedDomesticData((String) doc.get("totalincludeddomesticdata"));
		subscriberInfo.setDomesticOverageChargedAmount((String) doc.get("domesticoveragechargedamount"));
		subscriberInfo.setRoamingOverageChargedAmount((String) doc.get("roamingoveragechargedamount"));
		
		return subscriberInfo;

	}
	
}

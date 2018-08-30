package com.telus.mongodb.model;

/**
 * @author x139609
 *
 */
public class SubscriberInfo {

	private String id;
	private String initialDate;
	private String dataZipFile;
	private String billingAccountNo;
	private String subscriber;
	private String externalID; 
	private String billCycle;
	private String billMonthNum;
	private String billYearNum;
	private String intervalStartDate;
	private String intervalEndDate;
	private String imei;
	private String billCycleDaysRemaining;
	private String mtdUsageDomesticIndividual;
	private String domesticIndividualBucket;
	private String domesticIndividualUsage;
	private String mtdUsageDomesticSharedSingleSub;
	private String mtdUsageRoamingIndividual;
	private String roamingIndividualBucket;
	private String roamingIndividualUsage;
	private String mtdUsageRoamingSharedIndividualSub;
	private String overageUsageDomestic;
	private String overageUsageRoaming;
	private String totalMTDDomesticDataUsage;
	private String totalIncludedDomesticData;
	private String domesticOverageChargedAmount;
	private String roamingOverageChargedAmount;
	
	public void setId(String id) {
		this.id = id;
	}
	public String getInitialDate() {
		return initialDate;
	}
	public void setInitialDate(String initialDate) {
		this.initialDate = initialDate;
	}
	public String getDataZipFile() {
		return dataZipFile;
	}
	public void setDataZipFile(String dataZipFile) {
		this.dataZipFile = dataZipFile;
	}
	public String getBillingAccountNo() {
		return billingAccountNo;
	}
	public void setBillingAccountNo(String billingAccountNo) {
		this.billingAccountNo = billingAccountNo;
	}
	public String getSubscriber() {
		return subscriber;
	}
	public void setSubscriber(String subscriber) {
		this.subscriber = subscriber;
	}
	public String getExternalID() {
		return externalID;
	}
	public void setExternalID(String externalID) {
		this.externalID = externalID;
	}
	public String getBillCycle() {
		return billCycle;
	}
	public void setBillCycle(String billCycle) {
		this.billCycle = billCycle;
	}
	public String getBillMonthNum() {
		return billMonthNum;
	}
	public void setBillMonthNum(String billMonthNum) {
		this.billMonthNum = billMonthNum;
	}
	public String getBillYearNum() {
		return billYearNum;
	}
	public void setBillYearNum(String billYearNum) {
		this.billYearNum = billYearNum;
	}
	public String getIntervalStartDate() {
		return intervalStartDate;
	}
	public void setIntervalStartDate(String intervalStartDate) {
		this.intervalStartDate = intervalStartDate;
	}
	public String getIntervalEndDate() {
		return intervalEndDate;
	}
	public void setIntervalEndDate(String intervalEndDate) {
		this.intervalEndDate = intervalEndDate;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getBillCycleDaysRemaining() {
		return billCycleDaysRemaining;
	}
	public void setBillCycleDaysRemaining(String billCycleDaysRemaining) {
		this.billCycleDaysRemaining = billCycleDaysRemaining;
	}
	public String getMtdUsageDomesticIndividual() {
		return mtdUsageDomesticIndividual;
	}
	public void setMtdUsageDomesticIndividual(String mtdUsageDomesticIndividual) {
		this.mtdUsageDomesticIndividual = mtdUsageDomesticIndividual;
	}
	public String getDomesticIndividualBucket() {
		return domesticIndividualBucket;
	}
	public void setDomesticIndividualBucket(String domesticIndividualBucket) {
		this.domesticIndividualBucket = domesticIndividualBucket;
	}
	public String getDomesticIndividualUsage() {
		return domesticIndividualUsage;
	}
	public void setDomesticIndividualUsage(String domesticIndividualUsage) {
		this.domesticIndividualUsage = domesticIndividualUsage;
	}
	public String getMtdUsageDomesticSharedSingleSub() {
		return mtdUsageDomesticSharedSingleSub;
	}
	public void setMtdUsageDomesticSharedSingleSub(String mtdUsageDomesticSharedSingleSub) {
		this.mtdUsageDomesticSharedSingleSub = mtdUsageDomesticSharedSingleSub;
	}
	public String getMtdUsageRoamingIndividual() {
		return mtdUsageRoamingIndividual;
	}
	public void setMtdUsageRoamingIndividual(String mtdUsageRoamingIndividual) {
		this.mtdUsageRoamingIndividual = mtdUsageRoamingIndividual;
	}
	public String getRoamingIndividualBucket() {
		return roamingIndividualBucket;
	}
	public void setRoamingIndividualBucket(String roamingIndividualBucket) {
		this.roamingIndividualBucket = roamingIndividualBucket;
	}
	public String getRoamingIndividualUsage() {
		return roamingIndividualUsage;
	}
	public void setRoamingIndividualUsage(String roamingIndividualUsage) {
		this.roamingIndividualUsage = roamingIndividualUsage;
	}
	public String getMtdUsageRoamingSharedIndividualSub() {
		return mtdUsageRoamingSharedIndividualSub;
	}
	public void setMtdUsageRoamingSharedIndividualSub(String mtdUsageRoamingSharedIndividualSub) {
		this.mtdUsageRoamingSharedIndividualSub = mtdUsageRoamingSharedIndividualSub;
	}
	public String getOverageUsageDomestic() {
		return overageUsageDomestic;
	}
	public void setOverageUsageDomestic(String overageUsageDomestic) {
		this.overageUsageDomestic = overageUsageDomestic;
	}
	public String getOverageUsageRoaming() {
		return overageUsageRoaming;
	}
	public void setOverageUsageRoaming(String overageUsageRoaming) {
		this.overageUsageRoaming = overageUsageRoaming;
	}
	public String getTotalMTDDomesticDataUsage() {
		return totalMTDDomesticDataUsage;
	}
	public void setTotalMTDDomesticDataUsage(String totalMTDDomesticDataUsage) {
		this.totalMTDDomesticDataUsage = totalMTDDomesticDataUsage;
	}
	public String getTotalIncludedDomesticData() {
		return totalIncludedDomesticData;
	}
	public void setTotalIncludedDomesticData(String totalIncludedDomesticData) {
		this.totalIncludedDomesticData = totalIncludedDomesticData;
	}
	public String getDomesticOverageChargedAmount() {
		return domesticOverageChargedAmount;
	}
	public void setDomesticOverageChargedAmount(String domesticOverageChargedAmount) {
		this.domesticOverageChargedAmount = domesticOverageChargedAmount;
	}
	public String getRoamingOverageChargedAmount() {
		return roamingOverageChargedAmount;
	}
	public void setRoamingOverageChargedAmount(String roamingOverageChargedAmount) {
		this.roamingOverageChargedAmount = roamingOverageChargedAmount;
	}
	public String getId() {
		return id;
	}
	
}

package com.telus.react.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Subscribers")
public class SubscriberInfo {

	@Id
	private String id;
	private String initialdate;
	private String datazipfile;
	private String billingaccountno;
	private String subscriber;
	private String externalid;
	private String billcycle;
	private String billmonthnum;
	private String billyearnum;
	private String intervalstartdate;
	private String intervalenddate;
	private String imei;
	private String billcycledaysremaining;
	private String mtdusagedomesticindividual;
	private String domesticindividualbucket;
	private String domesticindividualusage;
	private String mtdusagedomesticsharedsinglesub;
	private String mtdusageroamingindividual;
	private String roamingindividualbucket;
	private String roamingindividualusage;
	private String mtdusageroamingsharedindividualsub;
	private String overageusagedomestic;
	private String overageusageroaming;
	private String totalmtddomesticdatausage;
	private String totalincludeddomesticdata;
	private String domesticoveragechargedamount;
	private String roamingoveragechargedamount;
	
	
	public SubscriberInfo() {
		
    }
	
	public SubscriberInfo(String id,
			String initialdate,
			String datazipfile,
			String billingaccountno,
			String subscriber,
			String externalid,
			String billcycle,
			String billmonthnum,
			String billyearnum,
			String intervalstartdate,
			String intervalenddate,
			String imei,
			String billcycledaysremaining,
			String mtdusagedomesticindividual,
			String domesticindividualbucket,
			String domesticindividualusage,
			String mtdusagedomesticsharedsinglesub,
			String mtdusageroamingindividual,
			String roamingindividualbucket,
			String roamingindividualusage,
			String mtdusageroamingsharedindividualsub,
			String overageusagedomestic,
			String overageusageroaming,
			String totalmtddomesticdatausage,
			String totalincludeddomesticdata,
			String domesticoveragechargedamount,
			String roamingoveragechargedamount) {
		
		this.initialdate = initialdate;
		this.datazipfile =  datazipfile;
		this.billingaccountno =  billingaccountno;
		this.subscriber = subscriber;
		this.externalid = externalid;
		this.billcycle = billcycle;
		this.billmonthnum = billmonthnum;
		this.billyearnum = billyearnum;
		this.intervalstartdate = intervalstartdate;
		this.intervalenddate = intervalenddate;
		this.imei = imei;
		this.billcycledaysremaining = billcycledaysremaining;
		this.mtdusagedomesticindividual = mtdusagedomesticindividual;
		this.domesticindividualbucket = domesticindividualbucket;
		this.domesticindividualusage = domesticindividualusage;
		this.mtdusagedomesticsharedsinglesub = mtdusagedomesticsharedsinglesub;
		this.mtdusageroamingindividual = mtdusageroamingindividual;
		this.roamingindividualbucket = roamingindividualbucket;
		this.roamingindividualusage = roamingindividualusage;
		this.mtdusageroamingsharedindividualsub = mtdusageroamingsharedindividualsub;
		this.overageusagedomestic = overageusagedomestic;
		this.overageusageroaming = overageusageroaming;
		this.totalmtddomesticdatausage = totalmtddomesticdatausage;
		this.totalincludeddomesticdata = totalincludeddomesticdata;
		this.domesticoveragechargedamount = domesticoveragechargedamount;
		this.roamingoveragechargedamount = roamingoveragechargedamount;
		
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getInitialdate() {
		return initialdate;
	}

	public void setInitialdate(String initialdate) {
		this.initialdate = initialdate;
	}

	public String getDatazipfile() {
		return datazipfile;
	}

	public void setDatazipfile(String datazipfile) {
		this.datazipfile = datazipfile;
	}

	public String getBillingaccountno() {
		return billingaccountno;
	}

	public void setBillingaccountno(String billingaccountno) {
		this.billingaccountno = billingaccountno;
	}

	public String getSubscriber() {
		return subscriber;
	}

	public void setSubscriber(String subscriber) {
		this.subscriber = subscriber;
	}

	public String getExternalid() {
		return externalid;
	}

	public void setExternalid(String externalid) {
		this.externalid = externalid;
	}

	public String getBillcycle() {
		return billcycle;
	}

	public void setBillcycle(String billcycle) {
		this.billcycle = billcycle;
	}

	public String getBillmonthnum() {
		return billmonthnum;
	}

	public void setBillmonthnum(String billmonthnum) {
		this.billmonthnum = billmonthnum;
	}

	public String getBillyearnum() {
		return billyearnum;
	}

	public void setBillyearnum(String billyearnum) {
		this.billyearnum = billyearnum;
	}

	public String getIntervalstartdate() {
		return intervalstartdate;
	}

	public void setIntervalstartdate(String intervalstartdate) {
		this.intervalstartdate = intervalstartdate;
	}

	public String getIntervalenddate() {
		return intervalenddate;
	}

	public void setIntervalenddate(String intervalenddate) {
		this.intervalenddate = intervalenddate;
	}

	public String getImei() {
		return imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public String getBillcycledaysremaining() {
		return billcycledaysremaining;
	}

	public void setBillcycledaysremaining(String billcycledaysremaining) {
		this.billcycledaysremaining = billcycledaysremaining;
	}

	public String getMtdusagedomesticindividual() {
		return mtdusagedomesticindividual;
	}

	public void setMtdusagedomesticindividual(String mtdusagedomesticindividual) {
		this.mtdusagedomesticindividual = mtdusagedomesticindividual;
	}

	public String getDomesticindividualbucket() {
		return domesticindividualbucket;
	}

	public void setDomesticindividualbucket(String domesticindividualbucket) {
		this.domesticindividualbucket = domesticindividualbucket;
	}

	public String getDomesticindividualusage() {
		return domesticindividualusage;
	}

	public void setDomesticindividualusage(String domesticindividualusage) {
		this.domesticindividualusage = domesticindividualusage;
	}

	public String getMtdusagedomesticsharedsinglesub() {
		return mtdusagedomesticsharedsinglesub;
	}

	public void setMtdusagedomesticsharedsinglesub(String mtdusagedomesticsharedsinglesub) {
		this.mtdusagedomesticsharedsinglesub = mtdusagedomesticsharedsinglesub;
	}

	public String getMtdusageroamingindividual() {
		return mtdusageroamingindividual;
	}

	public void setMtdusageroamingindividual(String mtdusageroamingindividual) {
		this.mtdusageroamingindividual = mtdusageroamingindividual;
	}

	public String getRoamingindividualbucket() {
		return roamingindividualbucket;
	}

	public void setRoamingindividualbucket(String roamingindividualbucket) {
		this.roamingindividualbucket = roamingindividualbucket;
	}

	public String getRoamingindividualusage() {
		return roamingindividualusage;
	}

	public void setRoamingindividualusage(String roamingindividualusage) {
		this.roamingindividualusage = roamingindividualusage;
	}

	public String getMtdusageroamingsharedindividualsub() {
		return mtdusageroamingsharedindividualsub;
	}

	public void setMtdusageroamingsharedindividualsub(String mtdusageroamingsharedindividualsub) {
		this.mtdusageroamingsharedindividualsub = mtdusageroamingsharedindividualsub;
	}

	public String getOverageusagedomestic() {
		return overageusagedomestic;
	}

	public void setOverageusagedomestic(String overageusagedomestic) {
		this.overageusagedomestic = overageusagedomestic;
	}

	public String getOverageusageroaming() {
		return overageusageroaming;
	}

	public void setOverageusageroaming(String overageusageroaming) {
		this.overageusageroaming = overageusageroaming;
	}

	public String getTotalmtddomesticdatausage() {
		return totalmtddomesticdatausage;
	}

	public void setTotalmtddomesticdatausage(String totalmtddomesticdatausage) {
		this.totalmtddomesticdatausage = totalmtddomesticdatausage;
	}

	public String getTotalincludeddomesticdata() {
		return totalincludeddomesticdata;
	}

	public void setTotalincludeddomesticdata(String totalincludeddomesticdata) {
		this.totalincludeddomesticdata = totalincludeddomesticdata;
	}

	public String getDomesticoveragechargedamount() {
		return domesticoveragechargedamount;
	}

	public void setDomesticoveragechargedamount(String domesticoveragechargedamount) {
		this.domesticoveragechargedamount = domesticoveragechargedamount;
	}

	public String getRoamingoveragechargedamount() {
		return roamingoveragechargedamount;
	}

	public void setRoamingoveragechargedamount(String roamingoveragechargedamount) {
		this.roamingoveragechargedamount = roamingoveragechargedamount;
	}
	
}

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
	
	public SubscriberInfo() {
		
    }
	
	public SubscriberInfo(String initialDate, String dataZipFile, String billingAccountNo) {
        this.initialdate = initialDate;
        this.datazipfile = dataZipFile;
        this.billingaccountno = billingAccountNo;
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
	
}

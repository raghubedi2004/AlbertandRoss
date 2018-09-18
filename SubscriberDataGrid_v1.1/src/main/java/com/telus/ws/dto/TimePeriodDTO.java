package com.telus.ws.dto;

import java.io.Serializable;

import javax.xml.datatype.XMLGregorianCalendar;

public class TimePeriodDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	private XMLGregorianCalendar effectiveDt;
	private XMLGregorianCalendar expiryDt;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public XMLGregorianCalendar getEffectiveDt() {
		return effectiveDt;
	}
	public void setEffectiveDt(XMLGregorianCalendar effectiveDt) {
		this.effectiveDt = effectiveDt;
	}
	public XMLGregorianCalendar getExpiryDt() {
		return expiryDt;
	}
	public void setExpiryDt(XMLGregorianCalendar expiryDt) {
		this.expiryDt = expiryDt;
	}
	
}

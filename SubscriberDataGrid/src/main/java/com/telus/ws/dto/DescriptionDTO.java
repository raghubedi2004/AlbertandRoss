package com.telus.ws.dto;

import java.io.Serializable;

public class DescriptionDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	
	private String locale;
	private String descriptionText;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLocale() {
		return locale;
	}
	public void setLocale(String locale) {
		this.locale = locale;
	}
	public String getDescriptionText() {
		return descriptionText;
	}
	public void setDescriptionText(String descriptionText) {
		this.descriptionText = descriptionText;
	}
	
}

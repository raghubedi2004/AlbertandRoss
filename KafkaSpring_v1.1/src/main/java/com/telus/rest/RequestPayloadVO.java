package com.telus.rest;

import java.io.Serializable;

public class RequestPayloadVO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String ban;
	private String sub;
	private String plan;
	private String equipmentTypeCd;
	private String role;
	private String language;
	
	public RequestPayloadVO(String ban, String sub, String plan, String equipmentTypeCd, String role, String language) {
		super();
		this.ban = ban;
		this.sub = sub;
		this.plan = plan;
		this.equipmentTypeCd = equipmentTypeCd;
		this.role = role;
		this.language = language;
	}
	
	public String getBan() {
		return ban;
	}
	public void setBan(String ban) {
		this.ban = ban;
	}
	public String getSub() {
		return sub;
	}
	public void setSub(String sub) {
		this.sub = sub;
	}
	public String getPlan() {
		return plan;
	}
	public void setPlan(String plan) {
		this.plan = plan;
	}
	public String getEquipmentTypeCd() {
		return equipmentTypeCd;
	}
	public void setEquipmentTypeCd(String equipmentTypeCd) {
		this.equipmentTypeCd = equipmentTypeCd;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}

}

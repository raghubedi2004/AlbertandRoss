package com.telus.kafka.poc;

import java.io.Serializable;
import java.util.List;

public class RequestDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private List<String> subIds;

	private String ratePlan;

	public List<String> getSubIds() {
		return subIds;
	}

	public void setSubIds(List<String> subIds) {
		this.subIds = subIds;
	}

	public String getRatePlan() {
		return ratePlan;
	}

	public void setRatePlan(String ratePlan) {
		this.ratePlan = ratePlan;
	}

}

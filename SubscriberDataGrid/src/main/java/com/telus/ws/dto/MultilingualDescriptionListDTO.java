package com.telus.ws.dto;

import java.io.Serializable;
import java.util.List;

public class MultilingualDescriptionListDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	
	protected List<DescriptionDTO> description;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<DescriptionDTO> getDescription() {
		return description;
	}

	public void setDescription(List<DescriptionDTO> description) {
		this.description = description;
	}
	
}

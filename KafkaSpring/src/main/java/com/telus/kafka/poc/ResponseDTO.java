package com.telus.kafka.poc;

import java.io.Serializable;

public class ResponseDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String status;

	public ResponseDTO() {
		
	}
	
	public ResponseDTO(String status) {
		this.status = status;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}

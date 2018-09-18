package com.telus.ws.client;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("ws.subscriberdatagrid")
public class AppProperties {

	private String endpoint;
	private String soauser;
	private String soapassword;
	
	public String getEndpoint() {
		return endpoint;
	}
	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}
	public String getSoauser() {
		return soauser;
	}
	public void setSoauser(String soauser) {
		this.soauser = soauser;
	}
	public String getSoapassword() {
		return soapassword;
	}
	public void setSoapassword(String soapassword) {
		this.soapassword = soapassword;
	}
	 
}

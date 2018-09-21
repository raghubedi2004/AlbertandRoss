package com.telus.ws.client;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import com.telus.ws.SubscriberInformationDataGridSvc.GetSubscriberBySubscriptionId;
import com.telus.ws.SubscriberInformationDataGridSvc.GetSubscriberBySubscriptionIdResponse;
import com.telus.ws.SubscriberInformationDataGridSvc.GetSubscriberIdentifierListByAccountNumber;
import com.telus.ws.SubscriberInformationDataGridSvc.GetSubscriberIdentifierListByAccountNumberResponse;
import com.telus.ws.SubscriberInformationDataGridSvc.SubscriberIdentifierResponse;
import com.telus.ws.SubscriberInformationDataGridSvc.SubscriberResponse;
import com.telus.ws.dto.SubscriberIdentifierResponseDTO;
import com.telus.ws.dto.SubscriberResponseDTO;
import com.telus.ws.mapper.WSResponseMapper;
import com.telus.ws.subscriber.SubscriberInformationDataGridSvcPortType;

public class SubscriberDataGridClient {

	public static List<SubscriberIdentifierResponseDTO> getSubscriberIdentifierListByAccountNumber(int ban, ServletContext servletContext) {
		
		SubscriberInformationDataGridSvcPortType port = null;
		List<SubscriberIdentifierResponse> lstSubscriberIdentifierResponse = new ArrayList<SubscriberIdentifierResponse>();
    	
		try {
			
			GetSubscriberIdentifierListByAccountNumber getSubscriberIdentifierListByAccountNumber = new GetSubscriberIdentifierListByAccountNumber();
			getSubscriberIdentifierListByAccountNumber.setBillingAccountNum(ban);
		
			GetSubscriberIdentifierListByAccountNumberResponse response;
		
			port = WSConnection.getSubscriberInformationDataGridSvcPortType(port, servletContext);
			response = port.getSubscriberIdentifierListByAccountNumber(getSubscriberIdentifierListByAccountNumber);
		
			lstSubscriberIdentifierResponse = response.getSubscriberIdentifierListByAccountNumberResponse();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return WSResponseMapper.convertSubscriberIdentifierResponseDTO(lstSubscriberIdentifierResponse);
		
	}
	
	public static SubscriberResponseDTO getSubscriberBySubscriptionId(long subscriptionId, ServletContext servletContext) {
		
		SubscriberInformationDataGridSvcPortType port = null;
		SubscriberResponse subscriberResponse = new SubscriberResponse();
		
		try {
			
			port = WSConnection.getSubscriberInformationDataGridSvcPortType(port, servletContext);
			GetSubscriberBySubscriptionId getSubscriberBySubscriptionId = new GetSubscriberBySubscriptionId();
			getSubscriberBySubscriptionId.setSubscriptionId(subscriptionId);
			GetSubscriberBySubscriptionIdResponse response = port.getSubscriberBySubscriptionId(getSubscriberBySubscriptionId);
		
			subscriberResponse = response.getSubscriberBySubscriptionIdResponse();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if (null != subscriberResponse) {
			return WSResponseMapper.convertSubscriberResponseDTO(subscriberResponse);
		} else {
			return new SubscriberResponseDTO();
		}
		
	}
	
}

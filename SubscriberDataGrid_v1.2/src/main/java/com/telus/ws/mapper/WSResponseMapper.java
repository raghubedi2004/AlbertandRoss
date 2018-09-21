package com.telus.ws.mapper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.telus.tmi.xmlschema.xsd.enterprise.basetypes.enterprisecommontypes_v9.Description;
import com.telus.ws.SubscriberInformationDataGridSvc.SubscriberIdentifierResponse;
import com.telus.ws.SubscriberInformationDataGridSvc.SubscriberResponse;
import com.telus.ws.dto.CommitmentDTO;
import com.telus.ws.dto.ConsumerNameDTO;
import com.telus.ws.dto.DescriptionDTO;
import com.telus.ws.dto.MultilingualDescriptionListDTO;
import com.telus.ws.dto.SubscriberIdentifierResponseDTO;
import com.telus.ws.dto.SubscriberResponseDTO;
import com.telus.ws.dto.TimePeriodDTO;

public class WSResponseMapper {

	
	public static List<SubscriberIdentifierResponseDTO> convertSubscriberIdentifierResponseDTO(List<SubscriberIdentifierResponse> wsResponse) {
		
		List<SubscriberIdentifierResponseDTO> dtoResponse = new ArrayList<SubscriberIdentifierResponseDTO>();
		
		for (Iterator<SubscriberIdentifierResponse> iterator = wsResponse.iterator(); iterator.hasNext();) {
			SubscriberIdentifierResponseDTO responseDTO = new SubscriberIdentifierResponseDTO();
			SubscriberIdentifierResponse subscriberIdentifierResponse = (SubscriberIdentifierResponse) iterator.next();
			if (null != subscriberIdentifierResponse.getBillingAccountNum()) {
				responseDTO.setBillingAccountNum(subscriberIdentifierResponse.getBillingAccountNum());
			}
			if (null != subscriberIdentifierResponse.getSubscriberId()) {
				responseDTO.setSubscriberId(subscriberIdentifierResponse.getSubscriberId());
			}
			if (null != subscriberIdentifierResponse.getSeatGroupId()) {
				responseDTO.setSeatGroupId(subscriberIdentifierResponse.getSeatGroupId());
			}
			if (null != subscriberIdentifierResponse.getSeatTypeCd()) {
				responseDTO.setSeatTypeCd(subscriberIdentifierResponse.getSeatTypeCd());
			}
			if (null != subscriberIdentifierResponse.getSubscriberId()) {
				responseDTO.setSubscriberId(subscriberIdentifierResponse.getSubscriberId());
			}
			if (null != subscriberIdentifierResponse.getSubscriptionId()) {
				responseDTO.setSubscriptionId(subscriberIdentifierResponse.getSubscriptionId());
			}
			
			dtoResponse.add(responseDTO);
		}
		
		return dtoResponse;
		
	}
	
	public static SubscriberResponseDTO convertSubscriberResponseDTO(SubscriberResponse wsResponse) {
		
		SubscriberResponseDTO subscriberResponseDTO = new SubscriberResponseDTO();
		CommitmentDTO commitmentDTO = new CommitmentDTO();
		TimePeriodDTO timePeriodDTO = new TimePeriodDTO();
		ConsumerNameDTO consumerNameDTO = new ConsumerNameDTO();
		MultilingualDescriptionListDTO multilingualDescriptionListDTO = new MultilingualDescriptionListDTO();
		List<DescriptionDTO> listDescriptionDTO = new ArrayList<DescriptionDTO>();
		
		if (null != wsResponse.getBillingAccountNum()) {
			subscriberResponseDTO.setBillingAccountNum(wsResponse.getBillingAccountNum());
		}
		
		if (null != wsResponse.getCommitment().getTimePeriod()) {
			timePeriodDTO.setEffectiveDt(wsResponse.getCommitment().getTimePeriod().getEffectiveDt());
			timePeriodDTO.setExpiryDt(wsResponse.getCommitment().getTimePeriod().getExpiryDt());
			commitmentDTO.setTimePeriod(timePeriodDTO);
			subscriberResponseDTO.setCommitment(commitmentDTO);
		}
		
		if (null != wsResponse.getConsumerName()) {
			consumerNameDTO.setFirstName(wsResponse.getConsumerName().getFirstName());
			consumerNameDTO.setLastName(wsResponse.getConsumerName().getLastName());
			subscriberResponseDTO.setConsumerName(consumerNameDTO);
		}
		
		subscriberResponseDTO.setDeviceBalance(""); // TODO
		
		if (null != wsResponse.getEquipmentSerialNum()) {
			subscriberResponseDTO.setEquipmentSerialNum(wsResponse.getEquipmentSerialNum());
		}
		
		if (null != wsResponse.getPhoneNum()) {
			subscriberResponseDTO.setPhoneNum(wsResponse.getPhoneNum());
		}
		
		if (null != wsResponse.getPricePlanCd()) {
			subscriberResponseDTO.setPricePlanCd(wsResponse.getPricePlanCd());
		}
		
		if (null != wsResponse.getPricePlanDesc() && null != wsResponse.getPricePlanDesc().getDescription()) {
			for (DescriptionDTO descriptionDTO : listDescriptionDTO) {
				List<Description> listDescription = wsResponse.getPricePlanDesc().getDescription();
				for (Description description : listDescription) {
					descriptionDTO.setDescriptionText(description.getDescriptionText());
					descriptionDTO.setLocale(description.getLocale());
				}
				listDescriptionDTO.add(descriptionDTO);
			}
			multilingualDescriptionListDTO.setDescription(listDescriptionDTO);
			subscriberResponseDTO.setPricePlanDesc(multilingualDescriptionListDTO);
		}
		
		if (null != wsResponse.getStatusCd()) {
			subscriberResponseDTO.setStatusCd(wsResponse.getStatusCd());
		}
		
		if (null != wsResponse.getSubscriberId()) {
			subscriberResponseDTO.setSubscriberId(wsResponse.getSubscriberId());
		}
		
		return subscriberResponseDTO;
		
	}
	
}

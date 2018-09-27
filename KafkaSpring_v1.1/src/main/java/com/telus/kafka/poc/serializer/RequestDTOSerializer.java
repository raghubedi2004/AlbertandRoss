package com.telus.kafka.poc.serializer;

import java.util.Map;

import org.apache.kafka.common.serialization.Serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telus.kafka.poc.RequestDTO;

public class RequestDTOSerializer implements Serializer<RequestDTO> {

	@Override
	public void configure(Map<String, ?> configs, boolean isKey) {

	}

	@Override
	public byte[] serialize(String topic, RequestDTO data) {
		byte[] retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			retVal = objectMapper.writeValueAsString(data).getBytes();
		} catch (Exception exception) {
			System.out.println("Error in serializing object" + data);
		}
		return retVal;
	}

	@Override
	public void close() {

	}

}
package com.telus.kafka.poc.deserializer;

import java.util.Map;

import org.apache.kafka.common.serialization.Deserializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telus.kafka.poc.RequestDTO;

public class RequestDTODeserializer implements Deserializer<RequestDTO> {
	@Override
	public void configure(Map<String, ?> configs, boolean isKey) {
	}

	@Override
	public RequestDTO deserialize(String topic, byte[] data) {
		ObjectMapper mapper = new ObjectMapper();
		RequestDTO object = null;
		try {
			object = mapper.readValue(data, RequestDTO.class);
		} catch (Exception exception) {
			System.out.println("Error in deserializing bytes " + exception);
		}
		return object;
	}

	@Override
	public void close() {
	}
}
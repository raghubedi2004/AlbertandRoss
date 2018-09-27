package com.telus.kafka.poc.serializer;

import java.util.Map;

import org.apache.kafka.common.serialization.Serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telus.kafka.poc.SubscriberDetailsVO;

public class SubscriberDetailsVOSerializer implements Serializer<SubscriberDetailsVO> {

	@Override
	public void configure(Map<String, ?> configs, boolean isKey) {

	}

	@Override
	public byte[] serialize(String topic, SubscriberDetailsVO data) {
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
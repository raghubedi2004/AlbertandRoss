package com.telus.kafka.poc.deserializer;

import java.util.Map;

import org.apache.kafka.common.serialization.Deserializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telus.kafka.poc.SubscriberDetailsVO;

public class SubscriberDetailsVODeserializer implements Deserializer<SubscriberDetailsVO> {
	@Override
	public void configure(Map<String, ?> configs, boolean isKey) {
	}

	@Override
	public SubscriberDetailsVO deserialize(String topic, byte[] data) {
		ObjectMapper mapper = new ObjectMapper();
		SubscriberDetailsVO object = null;
		try {
			object = mapper.readValue(data, SubscriberDetailsVO.class);
		} catch (Exception exception) {
			System.out.println("Error in deserializing bytes " + exception);
		}
		return object;
	}

	@Override
	public void close() {
	}
}
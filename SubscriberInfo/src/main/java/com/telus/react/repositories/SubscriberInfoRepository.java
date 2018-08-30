package com.telus.react.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.telus.react.models.SubscriberInfo;

public interface SubscriberInfoRepository extends MongoRepository<SubscriberInfo, String> {

	/*SubscriberInfo findByTitle(String title);

	Optional<SubscriberInfo> findById(String id);

	void deleteByTitle(String title);*/

}

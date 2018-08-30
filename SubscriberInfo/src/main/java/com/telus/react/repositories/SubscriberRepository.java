package com.telus.react.repositories;

import com.telus.react.models.SubscriberInfo;
import org.springframework.data.repository.CrudRepository;

public interface SubscriberRepository extends CrudRepository<SubscriberInfo, String> {
    @Override
    void delete(SubscriberInfo deleted);
}

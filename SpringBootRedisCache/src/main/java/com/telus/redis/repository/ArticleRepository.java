package com.telus.redis.repository;

import org.springframework.data.repository.CrudRepository;

import com.telus.redis.entity.Article;

public interface ArticleRepository extends CrudRepository<Article, Long>  {
}

package com.telus.redis;

import java.net.URI;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.telus.redis.entity.Article;

public class RestClientUtil {
    public void getArticleByIdDemo(long id) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate = new RestTemplate();
	    String url = "http://localhost:8080/user/article/{id}";
        HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
        ResponseEntity<Article> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Article.class, id);
        Article article = responseEntity.getBody();
        System.out.println("Id:"+article.getId()+", Initialdate:"+article.getInitialdate()
                 +", Datazipfile:"+article.getDatazipfile());      
    }
	public void getAllArticlesDemo() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate = new RestTemplate();
	    String url = "http://localhost:8080/user/articles";
        HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
        ResponseEntity<Article[]> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Article[].class);
        Article[] articles = responseEntity.getBody();
        for(Article article : articles) {
			System.out.println("Id:" + article.getId() + ", Initialdate:" + article.getInitialdate() + ", Datazipfile:"
					+ article.getDatazipfile());   
        }
    }
    public void addArticleDemo(Article objArticle) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate = new RestTemplate();
	    String url = "http://localhost:8080/user/article";
        HttpEntity<Article> requestEntity = new HttpEntity<Article>(objArticle, headers);
        URI uri = restTemplate.postForLocation(url, requestEntity);
        System.out.println(uri.getPath());    	
    }
    public void updateArticleDemo(Article objArticle) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate = new RestTemplate();
	    String url = "http://localhost:8080/user/article";
        HttpEntity<Article> requestEntity = new HttpEntity<Article>(objArticle, headers);
        restTemplate.put(url, requestEntity);
    }
    public void deleteArticleDemo(long id) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate = new RestTemplate();
	    String url = "http://localhost:8080/user/article/{id}";
        HttpEntity<Article> requestEntity = new HttpEntity<Article>(headers);
        restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, Void.class, id);        
    }
    public static void main(String args[]) {
    	RestClientUtil util = new RestClientUtil();
    	//Add article
	    Article objArticle = new Article();
	    objArticle.setInitialdate("Initial Date");
	    objArticle.setDatazipfile("Data Zip File");
     	//util.addArticleDemo(objArticle);
        
    	//Update article
	    objArticle.setId("1");
	    objArticle.setInitialdate("Initial Date Update");
	    objArticle.setDatazipfile("Data Zip File Update");    
    	//util.updateArticleDemo(objArticle);
	    
    	//util.deleteArticleDemo(2);
        //util.getArticleByIdDemo(1);	    
        System.out.println("---- All articles ----");
    	util.getAllArticlesDemo();    	
    }    
}

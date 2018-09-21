package com.telus.ws.dto;

import java.io.Serializable;

public class ConsumerNameDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	
	private String title;
	private String firstName;
	private String middleInitial;
	private String lastName;
	private String generationTxt;
	private String additionalLineTxt;
	private String nameFormatTxt;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleInitial() {
		return middleInitial;
	}
	public void setMiddleInitial(String middleInitial) {
		this.middleInitial = middleInitial;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getGenerationTxt() {
		return generationTxt;
	}
	public void setGenerationTxt(String generationTxt) {
		this.generationTxt = generationTxt;
	}
	public String getAdditionalLineTxt() {
		return additionalLineTxt;
	}
	public void setAdditionalLineTxt(String additionalLineTxt) {
		this.additionalLineTxt = additionalLineTxt;
	}
	public String getNameFormatTxt() {
		return nameFormatTxt;
	}
	public void setNameFormatTxt(String nameFormatTxt) {
		this.nameFormatTxt = nameFormatTxt;
	}
    
	
}

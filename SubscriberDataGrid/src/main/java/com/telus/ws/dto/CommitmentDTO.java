package com.telus.ws.dto;

import java.io.Serializable;

public class CommitmentDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	
	private TimePeriodDTO timePeriod;
	private String contractTerm;
	private String reasonCd;
	private String transactionTypeCd;
	private Boolean activationInd;
	private Boolean migrationInd;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public TimePeriodDTO getTimePeriod() {
		return timePeriod;
	}
	public void setTimePeriod(TimePeriodDTO timePeriod) {
		this.timePeriod = timePeriod;
	}
	public String getContractTerm() {
		return contractTerm;
	}
	public void setContractTerm(String contractTerm) {
		this.contractTerm = contractTerm;
	}
	public String getReasonCd() {
		return reasonCd;
	}
	public void setReasonCd(String reasonCd) {
		this.reasonCd = reasonCd;
	}
	public String getTransactionTypeCd() {
		return transactionTypeCd;
	}
	public void setTransactionTypeCd(String transactionTypeCd) {
		this.transactionTypeCd = transactionTypeCd;
	}
	public Boolean getActivationInd() {
		return activationInd;
	}
	public void setActivationInd(Boolean activationInd) {
		this.activationInd = activationInd;
	}
	public Boolean getMigrationInd() {
		return migrationInd;
	}
	public void setMigrationInd(Boolean migrationInd) {
		this.migrationInd = migrationInd;
	}
	
}

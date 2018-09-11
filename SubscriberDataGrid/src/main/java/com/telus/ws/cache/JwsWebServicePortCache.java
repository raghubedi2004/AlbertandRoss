package com.telus.ws.cache;

import javax.xml.ws.BindingProvider;;

/**
 * @author x139609
 *
 */
public class JwsWebServicePortCache {
	private BindingProvider port;
	private Class<?> portClass;

	public BindingProvider getPort() {
		return port;
	}
	public void setPort(BindingProvider port) {
		this.port = port;
	}
	public Class<?> getPortClass() {
		return portClass;
	}
	public void setPortClass(Class<?> portClass) {
		this.portClass = portClass;
	}

}

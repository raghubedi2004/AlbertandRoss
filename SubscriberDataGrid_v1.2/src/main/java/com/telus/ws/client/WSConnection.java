package com.telus.ws.client;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;
import java.net.URL;

import javax.servlet.ServletContext;
import javax.xml.namespace.QName;
import javax.xml.rpc.Stub;
import javax.xml.ws.BindingProvider;

import com.telus.ws.cache.JwsWebServicePortCache;
import com.telus.ws.cache.LoggingProxy;
import com.telus.ws.subscriber.SubscriberInformationDataGridSvcPortType;

public class WSConnection {

	private static final QName SERVICE_NAME = new QName("http://telus.com/wsdl/CMO/SelfMgmt/SubscriberInformationDataGridService_1", "SubscriberInformationDataGridService_v1_7_vs0");
	
	private static final String Endpoint = "https://soa-mp-laird-pt140.tsl.telus.com/v1-7/cmo/selfmgmt/subscriberinformationdatagrid/SubscriberInformationDataGridService_v1_7_vs0";
	private static final String Soauser = "ClientAPI_EJB";
	private static final String Soapassword = "soaorgid";
	
	public static SubscriberInformationDataGridSvcPortType getSubscriberInformationDataGridSvcPortType(SubscriberInformationDataGridSvcPortType port, ServletContext servletContext) {
	   
		if (servletContext != null) {
			
			JwsWebServicePortCache cachedObj = (JwsWebServicePortCache) servletContext.getAttribute(Endpoint);
			
			if (cachedObj != null) {
				
				Stub proxy = null;
				
				InvocationHandler handler = new LoggingProxy(cachedObj.getPort(), cachedObj.getPortClass());
				
				proxy = (Stub) Proxy.newProxyInstance(cachedObj.getPortClass()
						.getClassLoader(), new Class[] { cachedObj.getPortClass(),
						Stub.class }, handler);
				
				port = (SubscriberInformationDataGridSvcPortType) proxy;
			} else {
				try {
					URL wsdlLocation = new URL(Endpoint);
					javax.xml.ws.Service service = javax.xml.ws.Service.create(wsdlLocation, SERVICE_NAME);
					port = service.getPort(SubscriberInformationDataGridSvcPortType.class);
					
					((BindingProvider)port).getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, Endpoint);
					((BindingProvider)port).getRequestContext().put(BindingProvider.USERNAME_PROPERTY, Soauser);
					((BindingProvider)port).getRequestContext().put(BindingProvider.PASSWORD_PROPERTY, Soapassword);
					
					cacheJwsService(Endpoint, (BindingProvider) port, SubscriberInformationDataGridSvcPortType.class, servletContext);
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		
		
	return port;
	
   }
	
	protected static void cacheJwsService(String serviceBindingKeyorURL, BindingProvider port, Class<?> portType, ServletContext cache)
	{
		JwsWebServicePortCache cachedObj = new JwsWebServicePortCache();
		cachedObj.setPort(port);
		cachedObj.setPortClass(portType);
		
		cache.setAttribute(serviceBindingKeyorURL, cachedObj);
	}

} 
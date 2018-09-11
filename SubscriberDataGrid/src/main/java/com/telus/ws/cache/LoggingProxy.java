package com.telus.ws.cache;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author x139609
 *
 */
public class LoggingProxy implements InvocationHandler {
    private Object delegate;
    private Class<?> loggingClass;
    
    public LoggingProxy(Object obj, Class<?> loggingClass) {
        this.delegate = obj;
        
        this.loggingClass = loggingClass;
        if (null == loggingClass) {
            this.loggingClass = this.delegate.getClass();
        }
    }
    
    
    protected Object getDelegate()
    {
        return this.delegate;
    }
    
    
    protected Class<?> getLoggingClass()
    {
        return this.loggingClass;
    }
    
    
    public Object invoke(Object proxy, Method method, Object[] args)
    throws Throwable
    {
        StringBuffer sb = null;
        
        Object result = null;
        try {
            Object objDelegate = getDelegate();
            result = method.invoke(objDelegate, args);
            
        } catch (InvocationTargetException e) {
            Throwable cause = e.getCause();
            sb = new StringBuffer();
            sb.append(method.getName())
              .append(" args: ")
              .append(printArgs(args));
            throw cause;
        } 
        
        return result;
    }
    
    
    protected String printArgs(Object[] args)
    {
        StringBuffer sb = new StringBuffer();
        
        if (args != null) {
            for (Object arg : args) {
                if (sb.length() > 0) {
                    sb.append(",");
                }
                
                sb.append(arg);
            }
        }
        
        return sb.toString();
    }

}

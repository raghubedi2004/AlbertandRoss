package com.telus.mongodb.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.MongoClient;

import com.telus.mongodb.dao.MongoDBSubscriberDAO;
import com.telus.mongodb.model.SubscriberInfo;
import com.telus.mongodb.utils.ExcelReader;

@WebServlet("/loadSubscribers")
public class LoadSubscriberInfoServlet extends HttpServlet {

	private static final long serialVersionUID = -7060758261496829905L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
			
			long startTime = System.currentTimeMillis();
			List<SubscriberInfo> subscriberInfoList = ExcelReader.getIndividualSubscriberInfo("src/4162206606.xlsx");
			long stopTime = System.currentTimeMillis();
			long timeToReadDataFromExcel = stopTime - startTime;
			
			MongoClient mongo = (MongoClient) request.getServletContext().getAttribute("MONGO_CLIENT");
			
			MongoDBSubscriberDAO subscriberDAO = new MongoDBSubscriberDAO(mongo);
			
			startTime = System.currentTimeMillis();
			subscriberDAO.createSubscribers(subscriberInfoList);
			stopTime = System.currentTimeMillis();
			long timeToStoreDataInDB = stopTime - startTime;
			
			System.out.println("Subscribers Loaded Successfully");
			request.setAttribute("success", "Subscribers Loaded Successfully");
			
			startTime = System.currentTimeMillis();
			List<SubscriberInfo> subscribers = subscriberDAO.readAllSubscriberInfos();
			stopTime = System.currentTimeMillis();
			long timeToReadDataFromDB = stopTime - startTime;
			
			request.setAttribute("subscribers", subscribers);
			
			request.setAttribute("timeToReadDataFromExcel", timeToReadDataFromExcel);
			request.setAttribute("timeToStoreDataInDB", timeToStoreDataInDB);
			request.setAttribute("timeToReadDataFromDB", timeToReadDataFromDB);

			RequestDispatcher rd = getServletContext().getRequestDispatcher(
					"/subscribers.jsp");
			rd.forward(request, response);

	}

}

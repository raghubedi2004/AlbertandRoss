package com.telus.mongodb.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.telus.mongodb.model.SubscriberInfo;

/**
 * @author x139609
 *
 */
public class ExcelReader {
	
	@SuppressWarnings("deprecation")
	public static List<SubscriberInfo> getIndividualSubscriberInfo(String fileName) {
		
		List<SubscriberInfo> subscriberInfoList = new ArrayList<SubscriberInfo>();
        FileInputStream fis = null;
        try {
        	fis = new FileInputStream(fileName);

        	// Using XSSF for xlsx format, for xls use HSSF
            @SuppressWarnings("resource")
			Workbook workbook = new XSSFWorkbook(fis);

            int numberOfSheets = workbook.getNumberOfSheets();

            //looping over each workbook sheet
            for (int i = 0; i < numberOfSheets; i++) {
                Sheet sheet = workbook.getSheetAt(i);
                Iterator<Row> rowIterator = sheet.iterator();

                //iterating over each row
                while (rowIterator.hasNext()) {

                	SubscriberInfo subscriberInfo = new SubscriberInfo();
                    Row row = (Row) rowIterator.next();
                    Iterator<Cell> cellIterator = row.cellIterator();

                    //Iterating over each cell (column wise)  in a particular row.
                    while (cellIterator.hasNext()) {

                        Cell cell = (Cell) cellIterator.next();
                        
                        if (Cell.CELL_TYPE_STRING == cell.getCellType()) {
                        	
                        	String[] partsOfSubscriberDetails = cell.getStringCellValue().split(",");
                        	String subscriberDetails = partsOfSubscriberDetails[0];
                        	
                        	String[] subDetails = subscriberDetails.split("/");
                        	String[] subDetailsSectionTwo = subDetails[1].split(":");
                        	
                        	subscriberInfo.setInitialDate(subDetails[0]);
                        	subscriberInfo.setDataZipFile(subDetailsSectionTwo[0]);
                        	subscriberInfo.setBillingAccountNo(subDetailsSectionTwo[1]);
                        	
                        	subscriberInfo.setSubscriber(partsOfSubscriberDetails[1]);
                        	subscriberInfo.setExternalID(partsOfSubscriberDetails[2]);
                        	subscriberInfo.setBillCycle(partsOfSubscriberDetails[3]);
                        	subscriberInfo.setBillMonthNum(partsOfSubscriberDetails[4]);
                        	subscriberInfo.setBillYearNum(partsOfSubscriberDetails[5]);
                        	subscriberInfo.setIntervalStartDate(partsOfSubscriberDetails[6]);
                        	subscriberInfo.setIntervalEndDate(partsOfSubscriberDetails[7]);
                        	subscriberInfo.setImei(partsOfSubscriberDetails[8]);
                        	subscriberInfo.setBillCycleDaysRemaining(partsOfSubscriberDetails[9]);
                        	subscriberInfo.setMtdUsageDomesticIndividual(partsOfSubscriberDetails[10]);
                        	subscriberInfo.setDomesticIndividualBucket(partsOfSubscriberDetails[11]);
                        	subscriberInfo.setDomesticIndividualUsage(partsOfSubscriberDetails[12]);
                        	subscriberInfo.setMtdUsageDomesticSharedSingleSub(partsOfSubscriberDetails[13]);
                        	subscriberInfo.setMtdUsageRoamingIndividual(partsOfSubscriberDetails[14]);
                        	subscriberInfo.setRoamingIndividualBucket(partsOfSubscriberDetails[15]);
                        	subscriberInfo.setRoamingIndividualUsage(partsOfSubscriberDetails[16]);
                        	subscriberInfo.setMtdUsageRoamingSharedIndividualSub(partsOfSubscriberDetails[17]);
                        	subscriberInfo.setOverageUsageDomestic(partsOfSubscriberDetails[18]);
                        	subscriberInfo.setOverageUsageRoaming(partsOfSubscriberDetails[19]);
                        	subscriberInfo.setTotalMTDDomesticDataUsage(partsOfSubscriberDetails[20]);
                        	subscriberInfo.setTotalIncludedDomesticData(partsOfSubscriberDetails[21]);
                        	subscriberInfo.setDomesticOverageChargedAmount(partsOfSubscriberDetails[22]);
                        	subscriberInfo.setRoamingOverageChargedAmount(partsOfSubscriberDetails[23]);

                        } 
                    }
                    //end iterating a row, add all the elements of a row in list
                    subscriberInfoList.add(subscriberInfo);
                }
            }

            fis.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return subscriberInfoList;
        
	}

}	    

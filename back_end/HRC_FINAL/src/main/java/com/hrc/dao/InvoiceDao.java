package com.hrc.dao;

import java.util.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hrc.pojo.Invoice;

public class InvoiceDao 
{
	public Connection getConnection()
	{
		try
		{  
			Class.forName("com.mysql.cj.jdbc.Driver");  
			String URL = "jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
			String username = "kiit736";
			String password = "anand736";
			return DriverManager.getConnection(URL, username, password);     
		}
		
		catch(Exception e)
		{ 
			System.out.println(e);
		}
		return null;  
	}
	
	public String getInvoices(int start, int limit,String cust_number) throws SQLException 
	{
		ArrayList<Invoice> invoices_list = new ArrayList<Invoice>();
		Connection con = getConnection();
		Statement stmt=con.createStatement();
		String query="";		
									
		query = "SELECT c.name_customer,w.* FROM winter_internship AS w "
		+"JOIN customer AS c ON c.cust_number=w.cust_number " 
		+"WHERE w.is_deleted=0 AND w.cust_number LIKE '"+cust_number+"%' LIMIT "+start+","+limit;
		
		System.out.println("Query : "+query);
		
		ResultSet rs=stmt.executeQuery(query);
		while(rs.next()) 
		{			 
			try {
				Invoice inv = new Invoice();
				
				inv.setId(rs.getInt("sl_no"));
				inv.setBusiness_code(rs.getString("business_code"));
				inv.setCust_number(rs.getInt("cust_number"));
				inv.setName_customer(rs.getString("name_customer"));
				inv.setClear_date(rs.getDate("clear_date"));			
				inv.setBuisness_year(rs.getInt("buisness_year"));
				inv.setDoc_id(rs.getString("doc_id"));
				inv.setPosting_date(rs.getDate("posting_date"));
				inv.setDocument_create_date(rs.getDate("document_create_date"));			
				inv.setDue_in_date(rs.getDate("due_in_date"));
				inv.setInvoice_currency(rs.getString("invoice_currency"));
				inv.setDocument_type(rs.getString("document_type"));
				inv.setPosting_id(rs.getInt("posting_id"));			
				inv.setTotal_open_amount(rs.getDouble("total_open_amount"));
				inv.setBaseline_create_date(rs.getDate("baseline_create_date"));
				inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
				inv.setInvoice_id(rs.getInt("invoice_id"));			
				inv.setAging_bucket(rs.getString("aging_bucket"));//remove			
				
				invoices_list.add(inv);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}								
		}			
		
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();//new Gson();
		
		
		// converting list to json string
		String jsonInvoiceList = gson.toJson(invoices_list);
		
		System.out.println("JSON response : "+jsonInvoiceList);
		
		stmt.close();
		con.close();
		return jsonInvoiceList;
	}
	
	public void addInvoice(Invoice inv) throws SQLException 
	{
		Connection con = getConnection();
		Statement stmt=con.createStatement();
				
		String business_code=inv.getBusiness_code();
		int cust_number=inv.getCust_number();
		Date clear_date=inv.getClear_date();
		int buisness_year=inv.getBuisness_year();
		String doc_id=inv.getDoc_id() ;
		Date posting_date=inv.getPosting_date() ;
		Date document_create_date=inv.getDocument_create_date() ;		
		Date due_in_date=inv.getDue_in_date() ;
		String invoice_currency=inv.getInvoice_currency() ;
		String document_type=inv.getDocument_type() ;
		int posting_id=inv.getPosting_id() ;		
		double total_open_amount=inv.getTotal_open_amount() ;
		Date baseline_create_date=inv.getBaseline_create_date() ;
		String cust_payment_terms=inv.getCust_payment_terms() ;
		int invoice_id=inv.getInvoice_id() ;						
			
		String values = "VALUES('"+business_code+"', "+cust_number+", '"+clear_date+"', "+buisness_year+", '"+doc_id+"', '"+posting_date+"', '"
				+document_create_date+"', '"+due_in_date+"', '"+invoice_currency+"', '"+document_type+"', "+posting_id+", "
				+total_open_amount+", '"+baseline_create_date+"', '"+cust_payment_terms+"', "+invoice_id+")";
		String query = "INSERT INTO winter_internship(business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, "
				+ "document_create_date, due_in_date, invoice_currency, document_type, posting_id, "
				+ "total_open_amount, baseline_create_date, cust_payment_terms, invoice_id"+") " + values;
		System.out.println("Query : "+query);
		
		stmt.executeUpdate(query);		
		stmt.close();
		con.close();
	}
	
	public void editInvoice(int sl_no, String invoice_currency,String cust_payment_terms) throws SQLException {		
		Connection con = getConnection();
		Statement stmt=con.createStatement();
		String query = "UPDATE winter_internship SET invoice_currency = '"+ invoice_currency +"',cust_payment_terms = '"+ cust_payment_terms +"' WHERE sl_no = "+sl_no;
		
		System.out.println("Query : "+query);
		
		stmt.executeUpdate(query);
	}
	
	public void deleteInvoice(ArrayList<Integer> idx) throws SQLException {
		Connection con = getConnection();
		Statement stmt=con.createStatement();
		
		for(int sl_no:idx)
		{
			String query = "UPDATE winter_internship SET is_deleted = 1 WHERE sl_no = "+sl_no;		
			System.out.println("Query : "+query);
			stmt.executeUpdate(query);
		}					
	}
	
	public void predict(ArrayList<Integer> idx,ArrayList<String> aging_bucket) throws SQLException {
		Connection con = getConnection();
		Statement stmt=con.createStatement();
		int i=0,n=idx.size();
		
		for(i=0;i<n;i++)
		{
			String query = "UPDATE winter_internship SET aging_bucket = '"+aging_bucket.get(i)+"' WHERE sl_no = "+idx.get(i);		
			System.out.println("Query : "+query);
			stmt.executeUpdate(query);
		}					
	}
	
	public String AdvSearch(String cust_number,String buisness_year,String doc_id,String invoice_id) throws SQLException 
	{
		ArrayList<Invoice> invoices_list = new ArrayList<Invoice>();
		Connection con = getConnection();
		Statement stmt=con.createStatement();											
					
		String query = "SELECT * FROM winter_internship WHERE cust_number LIKE '%"+cust_number+"' AND "+"buisness_year LIKE '%"+buisness_year+"' AND "+"doc_id LIKE '%"+doc_id+"' AND invoice_id LIKE '%"+invoice_id+"'";
		System.out.println("Query : "+query);
		ResultSet rs=stmt.executeQuery(query);
		
		while(rs.next()) 
		{			
			try {
				Invoice inv = new Invoice();
				
				inv.setId(rs.getInt("sl_no"));
				inv.setBusiness_code(rs.getString("business_code"));
				inv.setCust_number(rs.getInt("cust_number"));
				inv.setClear_date(rs.getDate("clear_date"));			
				inv.setBuisness_year(rs.getInt("buisness_year"));
				inv.setDoc_id(rs.getString("doc_id"));
				inv.setPosting_date(rs.getDate("posting_date"));
				inv.setDocument_create_date(rs.getDate("document_create_date"));			
				inv.setDue_in_date(rs.getDate("due_in_date"));
				inv.setInvoice_currency(rs.getString("invoice_currency"));
				inv.setDocument_type(rs.getString("document_type"));
				inv.setPosting_id(rs.getInt("posting_id"));			
				inv.setTotal_open_amount(rs.getDouble("total_open_amount"));
				inv.setBaseline_create_date(rs.getDate("baseline_create_date"));
				inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
				inv.setInvoice_id(rs.getInt("invoice_id"));			
				inv.setAging_bucket(rs.getString("aging_bucket"));//remove			
				
				invoices_list.add(inv);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
									
		}		
		
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();//new Gson();
		
		// converting list to json string
		String jsonInvoiceList = gson.toJson(invoices_list);
		
		System.out.println("JSON response : "+jsonInvoiceList);
		
		stmt.close();
		con.close();
		return jsonInvoiceList;
	}
	
	public String AnalyticView(java.sql.Date clear_date_begin,java.sql.Date clear_date_end,java.sql.Date due_in_date_begin,java.sql.Date due_in_date_end,String invoice_currency,java.sql.Date baseline_create_date_begin,java.sql.Date baseline_create_date_end) throws SQLException 
	{		
		Connection con = getConnection();
		Statement stmt=con.createStatement();
		ArrayList<HashMap<String, String>> invoices_list = new ArrayList<HashMap<String, String>>();		
					
		String query = "SELECT b.business_name,COUNT(w.cust_number) AS cnt_cust,SUM(w.total_open_amount) AS cnt_amt "
				+"FROM winter_internship AS w "
				+"JOIN business AS b ON b.business_code=w.business_code "
				+"WHERE (w.clear_date >='"+clear_date_begin+"' AND w.clear_date <='"+clear_date_end+"') "
				+"AND (w.due_in_date >='"+due_in_date_begin+"' AND w.due_in_date <='"+due_in_date_end+"') "
				+"AND (w.baseline_create_date >='"+baseline_create_date_begin+"' AND w.baseline_create_date <='"+baseline_create_date_end+"') "
				+"AND (w.invoice_currency ='"+invoice_currency+"') "
				+"GROUP BY b.business_name ";				 
		System.out.println("Query : "+query);
		ResultSet rs=stmt.executeQuery(query);
		int i=0;
		while(rs.next()) 
		{		
			HashMap<String, String> map = new HashMap<>();
			map.put("business_name", rs.getString("business_name"));
			map.put("cnt_cust", rs.getString("cnt_cust"));
			map.put("cnt_amt", rs.getString("cnt_amt"));
			invoices_list.add(map);			
		}
		
		query = "SELECT w.invoice_currency,COUNT(w.invoice_currency) AS cnt_curr "
				+"FROM winter_internship AS w "
				+"JOIN business AS b ON b.business_code=w.business_code "
				+"WHERE (w.clear_date >='"+clear_date_begin+"' AND w.clear_date <='"+clear_date_end+"') "
				+"AND (w.due_in_date >='"+due_in_date_begin+"' AND w.due_in_date <='"+due_in_date_end+"') "
				+"AND (w.baseline_create_date >='"+baseline_create_date_begin+"' AND w.baseline_create_date <='"+baseline_create_date_end+"') "
				+"AND (w.invoice_currency ='"+invoice_currency+"') "
				+"GROUP BY w.invoice_currency ";				 
		System.out.println("Query : "+query);
		rs=stmt.executeQuery(query);
		
		while(rs.next()) 
		{		
			HashMap<String, String> map = new HashMap<>();
			map.put("business_name", "");
			map.put("cnt_cust", "");
			map.put("cnt_amt", "");
			map.put("invoice_currency", rs.getString("invoice_currency"));
			map.put("cnt_curr", rs.getString("cnt_curr"));

			invoices_list.add(map);			
		}
				
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();//new Gson();
		
		// converting list to json string
		String jsonInvoiceList = gson.toJson(invoices_list);
		
		System.out.println("JSON response : "+jsonInvoiceList);
		
		stmt.close();
		con.close();
		return jsonInvoiceList;		
	}
}

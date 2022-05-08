package com.hrc.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import com.hrc.dao.InvoiceDao;
import com.hrc.pojo.Invoice;

/**
 * Servlet implementation class AddInvoice
 */
@SuppressWarnings("deprecation")
@WebServlet("/AddInvoice")
public class AddInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//Total rows 48579(initially)
		
		/*NOTE : All dates are first converted to java.util.Date from string and then
		 * further converted to java.sql.Date
		 * */
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateInString=null;
		java.util.Date date=null;
		java.sql.Date sqlDate=null;		
		
		InvoiceDao dao = new InvoiceDao();
		
		try {
			Invoice inv = new Invoice();
			
			inv.setBusiness_code(request.getParameter("business_code"));
			inv.setCust_number(Integer.parseInt(request.getParameter("cust_number")));
			//inv.setClear_date(request.getParameter("clear_date"));
			
			dateInString = request.getParameter("clear_date");
			try {
				date = formatter.parse(dateInString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			sqlDate = new java.sql.Date(date.getTime());
			inv.setClear_date(sqlDate);		
			
			inv.setBuisness_year(Integer.parseInt(request.getParameter("buisness_year")));			
			inv.setDoc_id(request.getParameter("doc_id")) ;
			//inv.setPosting_date(request.getParameter("posting_date")) ;
			
			dateInString = request.getParameter("posting_date");
			try {
				date = formatter.parse(dateInString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			sqlDate = new java.sql.Date(date.getTime());
			inv.setPosting_date(sqlDate);
			
			//inv.setDocument_create_date(request.getParameter("document_create_date")) ;		
			
			dateInString = request.getParameter("document_create_date");
			try {
				date = formatter.parse(dateInString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			sqlDate = new java.sql.Date(date.getTime());
			inv.setDocument_create_date(sqlDate);
			
			//inv.setDue_in_date(request.getParameter("due_in_date")) ;
			
			dateInString = request.getParameter("due_in_date");
			try {
				date = formatter.parse(dateInString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			sqlDate = new java.sql.Date(date.getTime());		
			inv.setDue_in_date(sqlDate);
			
			inv.setInvoice_currency(request.getParameter("invoice_currency")) ;
			inv.setDocument_type(request.getParameter("document_type")) ;
			inv.setPosting_id(Integer.parseInt(request.getParameter("posting_id"))) ;		
			inv.setTotal_open_amount(Double.parseDouble(request.getParameter("total_open_amount"))) ;
			//inv.setBaseline_create_date(request.getParameter("baseline_create_date")) ;
			
			dateInString = request.getParameter("baseline_create_date");
			try {
				date = formatter.parse(dateInString);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			sqlDate = new java.sql.Date(date.getTime());
			inv.setBaseline_create_date(sqlDate);
			
			inv.setCust_payment_terms(request.getParameter("cust_payment_terms")) ;
			inv.setInvoice_id(Integer.parseInt(request.getParameter("invoice_id")));
				
			dao.addInvoice(inv);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}												
		
		response.getWriter().append("\n\nServed at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub	
		
	}

}

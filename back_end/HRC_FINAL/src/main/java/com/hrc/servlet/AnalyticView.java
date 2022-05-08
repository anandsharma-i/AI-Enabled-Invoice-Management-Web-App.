package com.hrc.servlet;

import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hrc.dao.InvoiceDao;
import com.hrc.pojo.Invoice;

/**
 * Servlet implementation class AnalyticView
 */
@WebServlet("/AnalyticView")
public class AnalyticView extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AnalyticView() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");		
		java.util.Date date=null;	
		java.sql.Date sqlDate=null;
		
		java.sql.Date clear_date_begin,clear_date_end,due_in_date_begin,due_in_date_end,baseline_create_date_begin,baseline_create_date_end;;
		String invoice_currency= request.getParameter("invoice_currency");       
		
		InvoiceDao dao = new InvoiceDao();				
				
		try {
			date = formatter.parse(request.getParameter("clear_date_begin"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		sqlDate = new java.sql.Date(date.getTime());
		clear_date_begin=sqlDate;
		
		try {
			date = formatter.parse(request.getParameter("clear_date_end"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		sqlDate = new java.sql.Date(date.getTime());
		clear_date_end=sqlDate;
		
		try {
			date = formatter.parse(request.getParameter("due_in_date_begin"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		sqlDate = new java.sql.Date(date.getTime());
		due_in_date_begin=sqlDate;
		
		try {
			date = formatter.parse(request.getParameter("due_in_date_end"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		sqlDate = new java.sql.Date(date.getTime());
		due_in_date_end=sqlDate;												
		
		try {
			date = formatter.parse(request.getParameter("baseline_create_date_begin"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		sqlDate = new java.sql.Date(date.getTime());
		baseline_create_date_begin=sqlDate;
		
		try {
			date = formatter.parse( request.getParameter("baseline_create_date_end"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		sqlDate = new java.sql.Date(date.getTime());
		baseline_create_date_end=sqlDate;
				
		try {
			response.setContentType("application/json");
			response.getWriter().write(dao.AnalyticView(clear_date_begin,clear_date_end,due_in_date_begin,due_in_date_end,invoice_currency,baseline_create_date_begin,baseline_create_date_end));			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//response.getWriter().append("\n\nServed at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

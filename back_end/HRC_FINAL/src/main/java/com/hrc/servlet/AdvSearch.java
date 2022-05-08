package com.hrc.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hrc.dao.InvoiceDao;
import com.hrc.pojo.Invoice;

/**
 * Servlet implementation class AdvSearch
 */
@WebServlet("/AdvSearch")
public class AdvSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdvSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		InvoiceDao dao = new InvoiceDao();
		Invoice inv = new Invoice();
				
		String cust_number=request.getParameter("cust_number");		
		String buisness_year=request.getParameter("buisness_year");
		String doc_id=request.getParameter("doc_id") ;		
		String invoice_id=request.getParameter("invoice_id") ;						
		
		try {
			response.setContentType("application/json");
			response.getWriter().write(dao.AdvSearch(cust_number,buisness_year,doc_id,invoice_id));			
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

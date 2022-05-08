package com.hrc.servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hrc.dao.InvoiceDao;

/**
 * Servlet implementation class GetInvoice
 */
@WebServlet("/GetInvoice")
public class GetInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int pageSize=Integer.parseInt(request.getParameter("pageSize"));
		int page=Integer.parseInt(request.getParameter("page"));
		int start = page*pageSize;//Integer.parseInt(request.getParameter("start"));
		int limit = pageSize;//Integer.parseInt(request.getParameter("limit"));
		String cust_number=request.getParameter("cust_number");
		try {
			InvoiceDao invoice_list = new InvoiceDao();
			response.setContentType("application/json");
			response.getWriter().write(invoice_list.getInvoices(start, limit ,cust_number));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//response.getWriter().append("\n\nServed at: ").append(request.getContextPath());
	}	
}

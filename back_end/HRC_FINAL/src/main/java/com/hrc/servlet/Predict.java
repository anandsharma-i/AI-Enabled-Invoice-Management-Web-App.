package com.hrc.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.hrc.dao.InvoiceDao;

/**
 * Servlet implementation class Predict
 */
@WebServlet("/Predict")
public class Predict extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Predict() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		InvoiceDao dao = new InvoiceDao();
		
		JSONObject jsonobj1 = null;
		JSONObject jsonobj2 = null;
		ArrayList<Integer> idx = new ArrayList<Integer>();
		ArrayList<String> aging_bucket = new ArrayList<String>();
		
		try {
			jsonobj1 = new JSONObject(request.getParameter("rows"));
			jsonobj2 = new JSONObject(request.getParameter("aging_bucket"));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//{"0":"1","1":"2","2":"3"}     [1,2,3]
		Iterator<String> keys1=jsonobj1.keys();
		Iterator<String> keys2=jsonobj2.keys();
		
		while(keys1.hasNext())
		{
			String key1=keys1.next();
			String key2=keys2.next();
			try {
				idx.add(Integer.parseInt(jsonobj1.get(key1).toString()));
				aging_bucket.add(jsonobj2.get(key2).toString());
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		try {
			dao.predict(idx,aging_bucket);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		 			
		
		response.getWriter().append("\n\nServed at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<div align="center">
  <h1>Sample Operations</h1>
  <form action="<%= request.getContextPath() %>/GetInvoice" method="get">
   <table style="with: 80%">
    <tr>
     <td>Start</td>
     <td><input type="text" name="start" /></td>
    </tr>
    <tr>
     <td>Limit</td>
     <td><input type="text" name="limit" /></td>
    </tr>   
   </table>
   <input type="submit" value="Submit" />
  </form>
 </div>
</body>
</html>
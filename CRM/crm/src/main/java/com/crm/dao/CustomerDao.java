package com.crm.dao;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.crm.Utility;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@Component
public class CustomerDao {

	public String getAllCustomers(@RequestParam Map<String, String> hmap) throws SQLException {
		Utility.connect();
		String query = "SELECT * FROM customers WHERE company_id = ? ";
		
		if(hmap.containsKey("is_customer"))
			query += " AND is_customer = " + hmap.get("is_customer");
		
		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		
		ps.setString(1, hmap.get("company_id"));
		
		ResultSet rs = ps.executeQuery();
		JsonArray out = new JsonArray();

		while (rs.next()) {

			JsonObject temp = new JsonObject();

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("company_name", rs.getString("company_name"));
			temp.addProperty("company_id", rs.getString("company_id"));
			temp.addProperty("address", rs.getString("address"));
			temp.addProperty("fixed_phone", rs.getString("fixed_phone"));
			temp.addProperty("mobile_phone", rs.getString("mobile_phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("manager_name", rs.getString("manager_name"));
			temp.addProperty("turnover", rs.getString("turnover"));
			temp.addProperty("workforce", rs.getString("workforce"));
			temp.addProperty("creation_date", rs.getString("creation_date"));
			temp.addProperty("register_number", rs.getString("register_number"));
			temp.addProperty("website", rs.getString("website"));
			temp.addProperty("is_customer", rs.getString("is_customer"));

			out.add(temp);
		}
		Utility.disconnect();
		return out.toString();
	}

	public String addCustomer(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		String query1 = "INSERT INTO customers (company_name, company_id, address, fixed_phone, mobile_phone, email, manager_name, turnover, workforce, creation_date, register_number, website, is_customer) "
				+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?,'%d-%m-%Y'), ?, ?, ?)";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("company_name"));
		ps1.setString(2, hmap.get("company_id"));
		ps1.setString(3, hmap.get("address"));
		ps1.setString(4, hmap.get("fixed_phone"));
		ps1.setString(5, hmap.get("mobile_phone"));
		ps1.setString(6, hmap.get("email"));
		ps1.setString(7, hmap.get("manager_name"));
		ps1.setString(8, hmap.get("turnover"));
		ps1.setString(9, hmap.get("workforce"));
		ps1.setString(10, hmap.get("creation_date"));
		ps1.setString(11, hmap.get("register_number"));
		ps1.setString(12, hmap.get("website"));
		ps1.setString(13, hmap.get("is_customer"));

		ps1.executeUpdate();

		String getId = "SELECT * FROM customers WHERE id = (SELECT MAX(id) FROM customers)";
		PreparedStatement ps = Utility.getConn().prepareStatement(getId);
		ResultSet rs = ps.executeQuery();
		JsonObject temp = new JsonObject();
		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("company_name", rs.getString("company_name"));
			temp.addProperty("company_id", rs.getString("company_id"));
			temp.addProperty("address", rs.getString("address"));
			temp.addProperty("fixed_phone", rs.getString("fixed_phone"));
			temp.addProperty("mobile_phone", rs.getString("mobile_phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("manager_name", rs.getString("manager_name"));
			temp.addProperty("turnover", rs.getString("turnover"));
			temp.addProperty("workforce", rs.getString("workforce"));
			temp.addProperty("creation_date", rs.getString("creation_date"));
			temp.addProperty("register_number", rs.getString("register_number"));
			temp.addProperty("website", rs.getString("website"));
			temp.addProperty("is_customer", rs.getString("is_customer"));
		}

		return temp.toString();

	}

	public String updateCustomer(Map<String, String> hmap) throws SQLException {
		Utility.connect();

		String query = "UPDATE customers SET "
				+ "company_name = ?, company_id = ?, address = ?, fixed_phone = ?, mobile_phone = ?, email = ?, manager_name = ?, "
				+ "turnover = ?, workforce = ?, creation_date = STR_TO_DATE(?,'%d-%m-%Y'), register_number = ?, website = ?, is_customer = ? "
				+ "WHERE id = ?";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query);
		
		ps1.setString(1, hmap.get("company_name"));
		ps1.setString(2, hmap.get("company_id"));
		ps1.setString(3, hmap.get("address"));
		ps1.setString(4, hmap.get("fixed_phone"));
		ps1.setString(5, hmap.get("mobile_phone"));
		ps1.setString(6, hmap.get("email"));
		ps1.setString(7, hmap.get("manager_name"));
		ps1.setString(8, hmap.get("turnover"));
		ps1.setString(9, hmap.get("workforce"));
		ps1.setString(10, hmap.get("creation_date"));
		ps1.setString(11, hmap.get("register_number"));
		ps1.setString(12, hmap.get("website"));
		ps1.setString(13, hmap.get("is_customer"));
		ps1.setString(14, hmap.get("id"));

		ps1.executeUpdate();

		String getId = "SELECT * FROM customers WHERE id = ?";
		PreparedStatement ps2 = Utility.getConn().prepareStatement(getId);
		ps2.setString(1, hmap.get("id"));
		ResultSet rs = ps2.executeQuery();
		JsonObject temp = new JsonObject();
		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("company_name", rs.getString("company_name"));
			temp.addProperty("company_id", rs.getString("company_id"));
			temp.addProperty("address", rs.getString("address"));
			temp.addProperty("fixed_phone", rs.getString("fixed_phone"));
			temp.addProperty("mobile_phone", rs.getString("mobile_phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("manager_name", rs.getString("manager_name"));
			temp.addProperty("turnover", rs.getString("turnover"));
			temp.addProperty("workforce", rs.getString("workforce"));
			temp.addProperty("creation_date", rs.getString("creation_date"));
			temp.addProperty("register_number", rs.getString("register_number"));
			temp.addProperty("website", rs.getString("website"));
			temp.addProperty("is_customer", rs.getString("is_customer"));
		}

		return temp.toString();

	}

	public String deleteCustomer(Map<String, String> hmap) throws SQLException {

		Utility.connect();

		String query1 = "SELECT * FROM customers WHERE id = ?";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("company_name", rs.getString("company_name"));
			temp.addProperty("company_id", rs.getString("company_id"));
			temp.addProperty("address", rs.getString("address"));
			temp.addProperty("fixed_phone", rs.getString("fixed_phone"));
			temp.addProperty("mobile_phone", rs.getString("mobile_phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("manager_name", rs.getString("manager_name"));
			temp.addProperty("turnover", rs.getString("turnover"));
			temp.addProperty("workforce", rs.getString("workforce"));
			temp.addProperty("creation_date", rs.getString("creation_date"));
			temp.addProperty("register_number", rs.getString("register_number"));
			temp.addProperty("website", rs.getString("website"));
			temp.addProperty("is_customer", rs.getString("is_customer"));
		}

		String query = "DELETE FROM customers WHERE id=?";
		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		ps.setString(1, hmap.get("id"));

		int i = ps.executeUpdate();

		Utility.disconnect();

		if (i < 1)
			throw new SQLException();

		return temp.toString();
	}

}

package com.crm.dao;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.crm.Utility;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@Component
public class ProductDao {

	public String getAllProducts(Map<String, String> hmap) throws SQLException {
		Utility.connect();
		String query = "SELECT * FROM products WHERE company_id = ? ";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		
		ps.setString(1, hmap.get("company_id"));
		
		ResultSet rs = ps.executeQuery();
		JsonArray out = new JsonArray();

		while (rs.next()) {

			JsonObject temp = new JsonObject();

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("name", rs.getString("name"));
			temp.addProperty("price", rs.getString("price") + " SYP");

			out.add(temp);
		}
		Utility.disconnect();
		return out.toString();
	}

	public String addproduct(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		String query1 = "INSERT INTO products (name, price, company_id) VALUES(?, ?, ?)";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("name"));
		ps1.setString(2, hmap.get("price"));
		ps1.setString(3, hmap.get("company_id"));

		ps1.executeUpdate();

		String getId = "SELECT * FROM products WHERE id = (SELECT MAX(id) FROM products)";
		PreparedStatement ps = Utility.getConn().prepareStatement(getId);
		ResultSet rs = ps.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("name", rs.getString("name"));
			temp.addProperty("price", rs.getString("price") + " SYP");
		}
		return temp.toString();

	}

	public String updateproduct(Map<String, String> hmap) throws SQLException {
		Utility.connect();

		String query = "";
		StringBuilder builder = new StringBuilder("UPDATE products SET ");
		for (Map.Entry<String, String> entry : hmap.entrySet()) {
			if (entry.getKey().equals("id"))
				continue;
			builder.append(entry.getKey() + "= '" + entry.getValue() + "',");
		}

		builder.deleteCharAt(builder.length() - 1);

		builder.append(" WHERE id= '" + hmap.get("id") + "'");

		query = builder.toString();

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ps.executeUpdate();

		String getId = "SELECT * FROM products WHERE id = ?";
		PreparedStatement ps1 = Utility.getConn().prepareStatement(getId);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("name", rs.getString("name"));
			temp.addProperty("price", rs.getString("price") + " SYP");
		}
		return temp.toString();

	}

	public String deleteproduct(Map<String, String> hmap) throws SQLException {

		Utility.connect();

		String query1 = "SELECT * FROM products WHERE id = ?";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("name", rs.getString("name"));
			temp.addProperty("price", rs.getString("price") + " SYP");
		}

		String query = "DELETE FROM products WHERE id=?";
		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		ps.setString(1, hmap.get("id"));

		int i = ps.executeUpdate();

		Utility.disconnect();

		if (i < 1)
			throw new SQLException();

		return temp.toString();
	}

}

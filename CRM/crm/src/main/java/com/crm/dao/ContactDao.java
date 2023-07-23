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
public class ContactDao {

	public String getAllContacts(@RequestParam Map<String, String> hmap) throws SQLException {
		Utility.connect();
		String query = "SELECT * FROM contacts ";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ResultSet rs = ps.executeQuery();
		JsonArray out = new JsonArray();

		while (rs.next()) {

			JsonObject temp = new JsonObject();

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("first_name", rs.getString("first_name"));
			temp.addProperty("last_name", rs.getString("last_name"));
			temp.addProperty("account_id", rs.getString("account_id"));
			temp.addProperty("birth_date", rs.getString("birth_date"));
			temp.addProperty("employment_date", rs.getString("employment_date"));
			temp.addProperty("role", rs.getString("role"));
			temp.addProperty("phone", rs.getString("phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("adress", rs.getString("adress"));
			temp.addProperty("city", rs.getString("city"));
			temp.addProperty("country", rs.getString("country"));

			out.add(temp);
		}
		Utility.disconnect();
		return out.toString();
	}

	public String addContact(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		String query1 = "INSERT INTO contacts (first_name, last_name, account_id, birth_date, employment_date, role, phone, email, adress, city, country) "
				+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("first_name"));
		ps1.setString(2, hmap.get("last_name"));
		ps1.setString(3, hmap.get("account_id"));
		ps1.setString(4, hmap.get("birth_date"));
		ps1.setString(5, hmap.get("employment_date"));
		ps1.setString(6, hmap.get("role"));
		ps1.setString(7, hmap.get("phone"));
		ps1.setString(8, hmap.get("email"));
		ps1.setString(9, hmap.get("adress"));
		ps1.setString(10, hmap.get("city"));
		ps1.setString(11, hmap.get("country"));

		ps1.executeUpdate();

		String getId = "SELECT * FROM contacts WHERE id = (SELECT MAX(id) FROM contacts)";
		PreparedStatement ps = Utility.getConn().prepareStatement(getId);
		ResultSet rs = ps.executeQuery();
		JsonObject temp = new JsonObject();
		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("first_name", rs.getString("first_name"));
			temp.addProperty("last_name", rs.getString("last_name"));
			temp.addProperty("account_id", rs.getString("account_id"));
			temp.addProperty("birth_date", rs.getString("birth_date"));
			temp.addProperty("employment_date", rs.getString("employment_date"));
			temp.addProperty("role", rs.getString("role"));
			temp.addProperty("phone", rs.getString("phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("adress", rs.getString("adress"));
			temp.addProperty("city", rs.getString("city"));
			temp.addProperty("country", rs.getString("country"));
		}

		return temp.toString();

	}

	public String updateContact(Map<String, String> hmap) throws SQLException {
		Utility.connect();

		String query = "";
		StringBuilder builder = new StringBuilder("UPDATE contacts SET ");
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

		String getId = "SELECT * FROM contacts WHERE id = ?";
		PreparedStatement ps1 = Utility.getConn().prepareStatement(getId);
		ps1.setString(1, hmap.get("id"));
		ResultSet rs = ps1.executeQuery();
		JsonObject temp = new JsonObject();
		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("first_name", rs.getString("first_name"));
			temp.addProperty("last_name", rs.getString("last_name"));
			temp.addProperty("account_id", rs.getString("account_id"));
			temp.addProperty("birth_date", rs.getString("birth_date"));
			temp.addProperty("employment_date", rs.getString("employment_date"));
			temp.addProperty("role", rs.getString("role"));
			temp.addProperty("phone", rs.getString("phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("adress", rs.getString("adress"));
			temp.addProperty("city", rs.getString("city"));
			temp.addProperty("country", rs.getString("country"));
		}

		return temp.toString();

	}

	public String deleteContact(Map<String, String> hmap) throws SQLException {

		Utility.connect();

		String query1 = "SELECT * FROM contacts WHERE id = ?";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("first_name", rs.getString("first_name"));
			temp.addProperty("last_name", rs.getString("last_name"));
			temp.addProperty("account_id", rs.getString("account_id"));
			temp.addProperty("birth_date", rs.getString("birth_date"));
			temp.addProperty("employment_date", rs.getString("employment_date"));
			temp.addProperty("role", rs.getString("role"));
			temp.addProperty("phone", rs.getString("phone"));
			temp.addProperty("email", rs.getString("email"));
			temp.addProperty("adress", rs.getString("adress"));
			temp.addProperty("city", rs.getString("city"));
			temp.addProperty("country", rs.getString("country"));
		}

		String query = "DELETE FROM contacts WHERE id=?";
		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		ps.setString(1, hmap.get("id"));

		int i = ps.executeUpdate();

		Utility.disconnect();

		if (i < 1)
			throw new SQLException();

		return temp.toString();
	}

}

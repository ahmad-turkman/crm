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
public class CAPDao {

	public JsonArray getAll() throws SQLException {
		Utility.connect();
		String query = "SELECT * FROM cap order by start_date";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		ResultSet rs = ps.executeQuery();
		JsonArray out = new JsonArray();
		
		while (rs.next()) {

			JsonObject temp = new JsonObject();

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));
			temp.addProperty("start_date", rs.getString("start_date"));
			temp.addProperty("end_date", rs.getString("end_date"));

			out.add(temp);
		}
		Utility.disconnect();
		return out;
	}

	public String add(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		String query1 = "INSERT INTO cap (description, start_date, end_date, account_id) VALUES(?, STR_TO_DATE(?,'%d-%m-%Y'), STR_TO_DATE(?,'%d-%m-%Y'), ?)";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("description"));
		ps1.setString(2, hmap.get("start_date"));
		ps1.setString(3, hmap.get("end_date"));
		ps1.setString(4, hmap.get("account_id"));

		ps1.executeUpdate();

		String getId = "SELECT * FROM cap WHERE id = (SELECT MAX(id) FROM cap)";
		PreparedStatement ps = Utility.getConn().prepareStatement(getId);
		ResultSet rs = ps.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));
			temp.addProperty("start_date", rs.getString("start_date"));
			temp.addProperty("end_date", rs.getString("end_date"));
		}
		return temp.toString();

	}

	public String update(Map<String, String> hmap) throws SQLException {
		Utility.connect();

		String query = "UPDATE cap SET description = ?, start_date= STR_TO_DATE(?,'%d-%m-%Y'), end_date = STR_TO_DATE(?,'%d-%m-%Y') WHERE id = ?";
		

		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		
		ps.setString(1, hmap.get("description"));
		ps.setString(2, hmap.get("start_date"));
		ps.setString(3, hmap.get("end_date"));
		ps.setString(4, hmap.get("id"));

		ps.executeUpdate();

		String getId = "SELECT * FROM cap WHERE id = ?";
		PreparedStatement ps1 = Utility.getConn().prepareStatement(getId);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));
			temp.addProperty("start_date", rs.getString("start_date"));
			temp.addProperty("end_date", rs.getString("end_date"));
		}
		return temp.toString();

	}

	public String delete(Map<String, String> hmap) throws SQLException {

		Utility.connect();

		String query1 = "SELECT * FROM cap WHERE id = ?";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));
			temp.addProperty("start_date", rs.getString("start_date"));
			temp.addProperty("end_date", rs.getString("end_date"));
		}

		String query = "DELETE FROM cap WHERE id=?";
		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		ps.setString(1, hmap.get("id"));

		int i = ps.executeUpdate();

		Utility.disconnect();

		if (i < 1)
			throw new SQLException();

		return temp.toString();
	}

}

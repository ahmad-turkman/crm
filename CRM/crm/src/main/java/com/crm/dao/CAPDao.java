package com.crm.dao;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.crm.Utility;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@Component
public class CAPDao {

	public JsonArray getAll(Map<String, String> hmap) throws SQLException {
		Utility.connect();
		String query = "SELECT * FROM cap WHERE company_id = ? order by start_date";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ps.setString(1, hmap.get("company_id"));

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

		String query1 = "INSERT INTO cap (description, start_date, end_date, company_id) VALUES(?, STR_TO_DATE(?,'%d-%m-%Y'), STR_TO_DATE(?,'%d-%m-%Y'), ?)";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("description"));
		ps1.setString(2, hmap.get("start_date"));
		ps1.setString(3, hmap.get("end_date"));
		ps1.setString(4, hmap.get("company_id"));

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

	public JsonObject getVision(Map<String, String> hmap) throws SQLException {
		Utility.connect();
		String query = "SELECT * FROM vision WHERE cap_id = ?";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ps.setString(1, hmap.get("cap_id"));

		ResultSet rs = ps.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));

		}

		Utility.disconnect();

		return temp;
	}

	public String saveVision(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		String query1 = "INSERT INTO vision (description, cap_id) VALUES(?, ?)";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("description"));
		ps1.setString(2, hmap.get("cap_id"));

		ps1.executeUpdate();

		String getId = "SELECT * FROM vision WHERE id = (SELECT MAX(id) FROM vision)";
		PreparedStatement ps = Utility.getConn().prepareStatement(getId);
		ResultSet rs = ps.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));

		}
		return temp.toString();

	}

	public String updateVision(Map<String, String> hmap) throws SQLException {
		Utility.connect();

		String query = "UPDATE vision SET description = ? WHERE id = ?";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ps.setString(1, hmap.get("description"));
		ps.setString(2, hmap.get("id"));

		ps.executeUpdate();

		String getId = "SELECT * FROM vision WHERE id = ?";
		PreparedStatement ps1 = Utility.getConn().prepareStatement(getId);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));

		}
		return temp.toString();

	}

	public JsonArray getSWOT(Map<String, String> hmap) throws SQLException {
		Utility.connect();
		String query = "SELECT * FROM swot WHERE cap_id = ? AND type = ?";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ps.setString(1, hmap.get("cap_id"));
		ps.setString(2, hmap.get("type"));

		ResultSet rs = ps.executeQuery();
		JsonArray out = new JsonArray();

		while (rs.next()) {

			JsonObject temp = new JsonObject();

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));

			out.add(temp);
		}
		Utility.disconnect();
		return out;
	}

	public String saveSWOT(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		String query1 = "INSERT INTO swot (description, type, cap_id) VALUES(?, ?, ?)";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("description"));
		ps1.setString(2, hmap.get("type"));
		ps1.setString(3, hmap.get("cap_id"));

		ps1.executeUpdate();

		String getId = "SELECT * FROM swot WHERE id = (SELECT MAX(id) FROM swot)";
		PreparedStatement ps = Utility.getConn().prepareStatement(getId);
		ResultSet rs = ps.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));
		}
		return temp.toString();

	}

	public String updateSWOT(Map<String, String> hmap) throws SQLException {
		Utility.connect();

		String query = "UPDATE swot SET description = ? WHERE id = ?";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ps.setString(1, hmap.get("description"));
		ps.setString(2, hmap.get("id"));

		ps.executeUpdate();

		String getId = "SELECT * FROM swot WHERE id = ?";
		PreparedStatement ps1 = Utility.getConn().prepareStatement(getId);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));
		}
		return temp.toString();

	}

	public String deleteSWOT(Map<String, String> hmap) throws SQLException {

		Utility.connect();

		String query1 = "SELECT * FROM swot WHERE id = ?";

		PreparedStatement ps1 = Utility.getConn().prepareStatement(query1);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("description", rs.getString("description"));
		}

		String query = "DELETE FROM swot WHERE id=?";
		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		ps.setString(1, hmap.get("id"));

		int i = ps.executeUpdate();

		Utility.disconnect();

		if (i < 1)
			throw new SQLException();

		return temp.toString();
	}

	public String pareto(Map<String, String> hmap) throws SQLException, ParseException {
		
		Utility.connect();

		JsonArray out = new JsonArray();

		double Potentialcumulative = 0;
		double PotentialcumulativePercentage = 0.0;

		String query = "SELECT C.company_name, SUM(p.value) AS SUM FROM payment p LEFT JOIN customers C ON C.id = p.customer_id WHERE p.company_id = ? GROUP BY company_name ORDER BY SUM desc";

		PreparedStatement ps = Utility.getConn().prepareStatement(query);

		ps.setString(1, hmap.get("company_id"));

		ResultSet rs = ps.executeQuery();

		double allSum = 0;
		int size = 0;
		while (rs.next()) {
			size++;
			allSum += rs.getDouble("SUM");
		}
		rs = ps.executeQuery();

		int PotentialnumberOfCustomers = size;
		while (rs.next()) {
			JsonObject obj = new JsonObject();

			double sum = rs.getDouble("SUM");
			Potentialcumulative += sum;
			double Pcumul = Math.round(Potentialcumulative * 100) / 100.0;

			PotentialcumulativePercentage += (1.0 / PotentialnumberOfCustomers) * 100;
			double PcumulPercentage = Math.round(PotentialcumulativePercentage * 100) / 100.0;

			obj.addProperty("potential", sum);
			obj.addProperty("potential_cumulative", Pcumul);
			obj.addProperty("potential_customer_percentage", PcumulPercentage);
			obj.addProperty("company_name", rs.getString("company_name"));

			String type = "A";
			String color = "#b9f6ca";

			double percentage = (Potentialcumulative / allSum) * 100;
			percentage = Math.round(percentage * 100) / 100.0;
			obj.addProperty("potential_percentage", percentage);
			if (percentage > 80.0 && size > 5) {
				type = "B";
				color = "#ffe57f";
			}
			if (percentage > 95.0 && size > 5) {
				type = "C";
				color = "#f48fb1";
			}
			obj.addProperty("potential_type", type);
			obj.addProperty("potential_color", color);

			out.add(obj);
		}

		return out.toString();
	}

}

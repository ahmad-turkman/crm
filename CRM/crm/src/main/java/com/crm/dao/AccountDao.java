package com.crm.dao;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.crm.Utility;
import com.google.gson.JsonObject;

@Component
public class AccountDao {

	public String createAccount(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		if (hmap.containsKey("customer_id")) {

			String q = "INSERT INTO company(customer_id) VALUES(?)";

			PreparedStatement prs = Utility.getConn().prepareStatement(q);

			prs.setString(1, hmap.get("customer_id"));

			prs.executeUpdate();

			String q1 = "SELECT MAX(id) FROM company";

			PreparedStatement ps1 = Utility.getConn().prepareStatement(q1);

			ResultSet res = ps1.executeQuery();

			String companyId = "";

			if (res.next()) {
				companyId = res.getString(1);
			}

			String q2 = "INSERT INTO account(username, password, creation_date, expire_date, company_id) VALUES(?, ?, STR_TO_DATE(?,'%d-%m-%Y'), STR_TO_DATE(?,'%d-%m-%Y'), ?)";

			PreparedStatement prs1 = Utility.getConn().prepareStatement(q2);

			prs1.setString(1, hmap.get("username"));
			prs1.setString(2, hmap.get("password"));
			prs1.setString(3, hmap.get("creation_date"));
			prs1.setString(4, hmap.get("expire_date"));
			prs1.setString(5, companyId);

			prs1.executeUpdate();

			String getRow = "SELECT * FROM account WHERE id = (SELECT MAX(id) FROM account)";
			PreparedStatement ps = Utility.getConn().prepareStatement(getRow);
			ResultSet rs = ps.executeQuery();

			JsonObject temp = new JsonObject();

			if (rs.next()) {

				temp.addProperty("id", rs.getString("id"));
				temp.addProperty("username", rs.getString("username"));
				temp.addProperty("creation_date", rs.getString("creation_date"));
				temp.addProperty("expire_date", rs.getString("expire_date"));
				temp.addProperty("company_id", rs.getString("company_id"));

			}

			return temp.toString();

		} else {

			String q2 = "INSERT INTO account(username, password, creation_date, expire_date, contact_id, company_id) VALUES(?, ?, STR_TO_DATE(?,'%d-%m-%Y'), STR_TO_DATE(?,'%d-%m-%Y'), ?, ?)";

			PreparedStatement prs1 = Utility.getConn().prepareStatement(q2);

			prs1.setString(1, hmap.get("username"));
			prs1.setString(2, hmap.get("password"));
			prs1.setString(3, hmap.get("creation_date"));
			prs1.setString(4, hmap.get("expire_date"));
			prs1.setString(5, hmap.get("contactId"));
			prs1.setString(5, hmap.get("company_id"));

			prs1.executeUpdate();

			String getRow = "SELECT * FROM account WHERE id = (SELECT MAX(id) FROM account)";
			PreparedStatement ps = Utility.getConn().prepareStatement(getRow);
			ResultSet rs = ps.executeQuery();

			JsonObject temp = new JsonObject();

			if (rs.next()) {

				temp.addProperty("id", rs.getString("id"));
				temp.addProperty("username", rs.getString("username"));
				temp.addProperty("creation_date", rs.getString("creation_date"));
				temp.addProperty("expire_date", rs.getString("expire_date"));
				temp.addProperty("contact_id", rs.getString("contact_id"));

			}

			return temp.toString();

		}

	}

	public String login(Map<String, String> hmap) throws SQLException, IOException {
		Utility.connect();

		String q = "SELECT COUNT(*), password, is_admin, contact_id, company_id FROM account WHERE username=?";

		PreparedStatement prs = Utility.getConn().prepareStatement(q);

		prs.setString(1, hmap.get("username"));

		ResultSet res = prs.executeQuery();

		res.next();

		if (res.getInt(1) > 0) {

			// BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			// encoder.matches(hmap.get("password"), res.getString(2))

			if (hmap.get("password").equals(res.getString(2))) {

				boolean isAdmin = res.getBoolean(3);
				String contactId = res.getString(4);
				String companyId = res.getString(5);

				return getAccountDetails(hmap.get("username"), isAdmin, contactId, companyId).toString();

			} else {
				throw new SQLException("Unauthorized");
			}
		} else {
			throw new SQLException("No account found!");
		}
	}

	private JsonObject getAccountDetails(String username, boolean isAdmin, String contactId, String companyId)
			throws SQLException {

		Utility.connect();

		if (contactId == null) {

			String query = "SELECT * FROM company LEFT JOIN customers ON company.customer_id = customers.id WHERE company.id = ?";

			PreparedStatement ps = Utility.getConn().prepareStatement(query);

			ps.setString(1, companyId);

			ResultSet rs = ps.executeQuery();

			JsonObject temp = new JsonObject();

			if (rs.next()) {

				temp.addProperty("company_name", rs.getString("company_name"));
				temp.addProperty("company_id", companyId);
				temp.addProperty("is_admin", isAdmin);
			}

			return temp;
		} else {

			String query = "SELECT contacts.*, customers.company_name FROM contacts "
					+ "LEFT JOIN company ON company.id = contacts.company_id "
					+ "LEFT JOIN customers ON customers.id = company.customer_id " + "WHERE contacts.id = ?";

			PreparedStatement ps = Utility.getConn().prepareStatement(query);

			ps.setString(1, contactId);

			ResultSet rs = ps.executeQuery();

			JsonObject temp = new JsonObject();

			if (rs.next()) {

				temp.addProperty("company_id", companyId);
				temp.addProperty("company_name", rs.getString("company_name"));
				temp.addProperty("contact_id", contactId);
				temp.addProperty("first_name", rs.getString("first_name"));
				temp.addProperty("last_name", rs.getString("last_name"));
			}

			return temp;

		}

	}

	public JsonObject getAccount(Map<String, String> hmap) throws SQLException {

		Utility.connect();

		if (hmap.containsKey("contact_id")) {
			String query = "SELECT * FROM account WHERE contact_id = ?";

			PreparedStatement ps = Utility.getConn().prepareStatement(query);

			ps.setString(1, hmap.get("contact_id"));

			ResultSet rs = ps.executeQuery();
			JsonObject temp = new JsonObject();

			while (rs.next()) {

				

				temp.addProperty("id", rs.getString("id"));
				temp.addProperty("username", rs.getString("username"));
				temp.addProperty("password", "####");
				temp.addProperty("creation_date", rs.getString("creation_date"));
				temp.addProperty("expire_date", rs.getString("expire_date"));
				temp.addProperty("company_id", rs.getString("company_id"));
			}
			Utility.disconnect();
			return temp;
		} else {

			String q1 = "SELECT id FROM company WHERE customer_id = ?";

			PreparedStatement ps1 = Utility.getConn().prepareStatement(q1);
			
			ps1.setString(1, hmap.get("customer_id"));

			ResultSet res = ps1.executeQuery();
			
			String companyId = "";

			if (res.next()) {
				companyId = res.getString(1);
			}

			String query = "SELECT * FROM account WHERE company_id = ? AND contact_id IS NULL";

			PreparedStatement ps = Utility.getConn().prepareStatement(query);

			ps.setString(1, companyId);

			ResultSet rs = ps.executeQuery();
			
			JsonObject temp = new JsonObject();

			while (rs.next()) {

				

				temp.addProperty("id", rs.getString("id"));
				temp.addProperty("username", rs.getString("username"));
				temp.addProperty("password", "####");
				temp.addProperty("creation_date", rs.getString("creation_date"));
				temp.addProperty("expire_date", rs.getString("expire_date"));
				temp.addProperty("company_id", rs.getString("company_id"));

			}
			Utility.disconnect();
			return temp;
		}

	}
	
	public String updateAccount(Map<String, String> hmap) throws SQLException {
		Utility.connect();

		String query = "UPDATE account SET username = ?, password = ?, creation_date = STR_TO_DATE(?,'%d-%m-%Y'), expire_date = STR_TO_DATE(?,'%d-%m-%Y') WHERE id = ?";
		

		PreparedStatement ps = Utility.getConn().prepareStatement(query);
		
		ps.setString(1, hmap.get("username"));
		ps.setString(2, hmap.get("password"));
		ps.setString(3, hmap.get("creation_date"));
		ps.setString(4, hmap.get("expire_date"));
		ps.setString(5, hmap.get("id"));

		ps.executeUpdate();

		String getId = "SELECT * FROM account WHERE id = ?";
		PreparedStatement ps1 = Utility.getConn().prepareStatement(getId);

		ps1.setString(1, hmap.get("id"));

		ResultSet rs = ps1.executeQuery();

		JsonObject temp = new JsonObject();

		if (rs.next()) {

			temp.addProperty("id", rs.getString("id"));
			temp.addProperty("username", rs.getString("username"));
			temp.addProperty("creation_date", rs.getString("creation_date"));
			temp.addProperty("expire_date", rs.getString("expire_date"));
			temp.addProperty("company_id", rs.getString("company_id"));
		}
		return temp.toString();

	}

}

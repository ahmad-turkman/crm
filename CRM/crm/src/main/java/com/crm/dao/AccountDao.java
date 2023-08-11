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

		if (companyId != null) {

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
					+ "LEFT JOIN customers ON customers.id = company.customer_id "
					+ "WHERE contacts.id = ?";

			PreparedStatement ps = Utility.getConn().prepareStatement(query);

			ps.setString(1, contactId);

			ResultSet rs = ps.executeQuery();

			JsonObject temp = new JsonObject();

			if (rs.next()) {

				temp.addProperty("company_id", rs.getString("company_id"));
				temp.addProperty("company_name", rs.getString("company_name"));
				temp.addProperty("contact_id", contactId);
				temp.addProperty("first_name", rs.getString("first_name"));
				temp.addProperty("last_name", rs.getString("last_name"));
			}

			return temp;

		}

	}

}

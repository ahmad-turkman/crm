package com.crm;

import java.sql.Connection;
import java.sql.DriverManager;

public class Utility {
	static Connection conn;
	static String URL = "jdbc:mysql://localhost:3306/crm";
	static String USERNAME = "root";
	static String PASSWORD = "zeropp";

	public static void connect() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			System.out.println("Connect Failed !");
		}
	}

	public static void disconnect() {
		try {
			if (conn != null)
				conn.close();
		} catch (Exception e) {
			System.out.println("Disconnect Failed !");
		}
	}

	public static Connection getConn() {
		return conn;
	}

	public static void setConn(Connection conn) {
		Utility.conn = conn;
	}

}
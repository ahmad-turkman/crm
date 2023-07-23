package com.crm.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crm.dao.CustomerDao;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/customers")
public class CustomerController {
	@Autowired
	CustomerDao dao;

	@GetMapping("")
	public ResponseEntity<String> get_all_customers(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getAllCustomers(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public ResponseEntity<String> add_customer(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.addCustomer(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("")
	public ResponseEntity<String> update_customer(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.updateCustomer(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("")
	public ResponseEntity<String> delete_customer(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.deleteCustomer(hmap), HttpStatus.OK);

		} catch (Exception e) {

			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}

	}

}

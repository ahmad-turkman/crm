package com.crm.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crm.dao.AccountDao;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	AccountDao dao;

	@PostMapping("login")
	public ResponseEntity<String> login(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.login(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Bad Request");
			response.addProperty("statusCode", 400);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("create")
	public ResponseEntity<String> createAccount(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.createAccount(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Bad Request");
			response.addProperty("statusCode", 400);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("")
	public ResponseEntity<String> getAccount(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getAccount(hmap).toString(), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<String> updateAccount(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.updateAccount(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
}

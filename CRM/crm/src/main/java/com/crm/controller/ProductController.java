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

import com.crm.dao.ProductDao;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	ProductDao dao;

	@GetMapping("")
	public ResponseEntity<String> get_all_products(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getAllProducts(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public ResponseEntity<String> add_product(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.addproduct(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("")
	public ResponseEntity<String> update_product(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.updateproduct(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("")
	public ResponseEntity<String> delete_product(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.deleteproduct(hmap), HttpStatus.OK);

		} catch (Exception e) {

			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}

	}

}

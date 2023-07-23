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

import com.crm.dao.OppDao;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/opps")
public class OppController {
	@Autowired
	OppDao dao;

	@GetMapping("")
	public ResponseEntity<String> get_all() {
		try {
			return new ResponseEntity<String>(dao.getAll(), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public ResponseEntity<String> add(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.add(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("")
	public ResponseEntity<String> update(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.update(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("")
	public ResponseEntity<String> delete(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.delete(hmap), HttpStatus.OK);

		} catch (Exception e) {

			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}

	}
	
	@GetMapping("/probabilities")
	public ResponseEntity<String> get_probas(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getProbas(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

}

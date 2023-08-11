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

import com.crm.dao.StepsDao;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/steps")
public class StepsController {
	@Autowired
	StepsDao dao;

	@GetMapping("")
	public ResponseEntity<String> get_all_steps(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getAllSteps(hmap).toString(), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public ResponseEntity<String> add_step(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.addStep(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("")
	public ResponseEntity<String> update_step(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.updateStep(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("")
	public ResponseEntity<String> delete_step(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.deleteStep(hmap), HttpStatus.OK);

		} catch (Exception e) {

			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}

	}

}

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

import com.crm.dao.CAPDao;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/cap")
public class CAPController {
	@Autowired
	CAPDao dao;

	@GetMapping("")
	public ResponseEntity<String> get_all_steps(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getAll(hmap).toString(), HttpStatus.OK);
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
	public ResponseEntity<String> update_step(@RequestParam Map<String, String> hmap) {
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
	public ResponseEntity<String> delete_step(@RequestParam Map<String, String> hmap) {
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
	
	@GetMapping("vision")
	public ResponseEntity<String> getVision(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getVision(hmap).toString(), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("vision")
	public ResponseEntity<String> saveVision(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.saveVision(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("vision")
	public ResponseEntity<String> updateVision(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.updateVision(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("swot")
	public ResponseEntity<String> getSWOT(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.getSWOT(hmap).toString(), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("swot")
	public ResponseEntity<String> saveSWOT(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.saveSWOT(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("swot")
	public ResponseEntity<String> updateSWOT(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.updateSWOT(hmap), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("swot")
	public ResponseEntity<String> deleteSWOT(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.deleteSWOT(hmap), HttpStatus.OK);

		} catch (Exception e) {

			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}

	}
	
	@GetMapping("pareto")
	public ResponseEntity<String> pareto(@RequestParam Map<String, String> hmap) {
		try {
			return new ResponseEntity<String>(dao.pareto(hmap).toString(), HttpStatus.OK);
		} catch (Exception e) {
			JsonObject response = new JsonObject();
			
			e.printStackTrace();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}

}

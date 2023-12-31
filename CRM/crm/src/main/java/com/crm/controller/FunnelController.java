package com.crm.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crm.dao.FunnelDao;
import com.google.gson.JsonObject;

@RestController
@RequestMapping("/funnel")
public class FunnelController {

	@GetMapping("")
	public ResponseEntity<String> get_all_steps(@RequestParam Map<String, String> hmap) {
		try {
			FunnelDao dao = new FunnelDao();
			
			return new ResponseEntity<String>(dao.getFunnelValues(hmap), HttpStatus.OK);
			
		} catch (Exception e) {
			e.printStackTrace();
			
			JsonObject response = new JsonObject();

			response.addProperty("status", "Not Found");
			response.addProperty("statusCode", 404);
			response.addProperty("message", e.getMessage());

			return new ResponseEntity<String>(response.toString(), HttpStatus.NOT_FOUND);
		}
	}
}

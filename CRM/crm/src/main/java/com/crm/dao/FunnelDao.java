package com.crm.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import com.crm.Utility;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class FunnelDao {
	private String query;

	public String getFunnelValues(Map<String, String> hmap) throws SQLException, ParseException {
		StepsDao bla = new StepsDao();
		JsonArray items = bla.getAllSteps(hmap);
		Map<Integer, Map<String, Integer>> stepsCount = new HashMap<>();

		for (int i = 0; i < items.size(); ++i) {

			JsonObject item = items.get(i).getAsJsonObject();

			String step = item.get("description").getAsString();

			int pourcent = Integer.parseInt(item.get("percentage").getAsString());

			Map<String, Integer> count = new HashMap<>();
			count.put(step, 0);
			stepsCount.put(pourcent, count);

		}

		query = "SELECT group_concat(DISTINCT C.percentage order by percentage separator '@') AS PROBABILITIES "
				+ " FROM opportunities B " + " LEFT JOIN probabilities A ON A.opp_id = B.id "
				+ " LEFT JOIN sales_steps C ON C.id = A.step_id " + "WHERE year(B.creation_date) = " + hmap.get("year")
				+ " group by B.id";

		Map<String, JsonObject> resultMap = new HashMap<>();

		JsonObject all = new JsonObject();
		all.add("probabilities", new JsonArray());

		resultMap.put("ALL", all);

		JsonArray probabs = null;

		Utility.connect();

		try (PreparedStatement ps = Utility.getConn().prepareStatement(query)) {
			try (ResultSet rs = ps.executeQuery()) {
				while (rs.next()) {
					probabs = all.get("probabilities").getAsJsonArray();

					if (rs.getString("PROBABILITIES") != null)
						probabs.add(rs.getString("PROBABILITIES"));
				}
			}
		}

		Set<String> keySet = resultMap.keySet();

		Iterator<String> iterator = keySet.iterator();

		String resKey = iterator.next();

		int firstStepPourcent = 200;
		String firstStep = "";
		JsonArray asJsonArray = resultMap.get(resKey).getAsJsonObject().get("probabilities").getAsJsonArray();
		ArrayList<String> probs = new ArrayList<>();

		for (JsonElement el : asJsonArray)
			probs.add(el.getAsString());

		for (String prob : probs) {

			String[] probabilities = prob.split("@");

			for (String probability : probabilities) {

				int proba = Integer.parseInt(probability);

				if (!stepsCount.containsKey(proba)) {
					Map<String, Integer> m = new HashMap<>();
					m.put(probability, 0);
					stepsCount.put(proba, m);
				}

				Map<String, Integer> stepCount = stepsCount.get(proba);

				String step = (String) (stepCount.keySet().toArray())[0];

				if (proba < firstStepPourcent) {
					firstStep = step;
					firstStepPourcent = proba;
				}

				stepsCount.get(proba).put(step, stepsCount.get(proba).get(step) + 1);
			}
		}

		if (firstStep.isEmpty())
			return new JsonArray().toString();

		JsonArray funnelData = new JsonArray();

		JsonObject o = new JsonObject();
		int stepNumber = 1;

		o.addProperty("step", stepNumber);

		o.addProperty("category", firstStep);

		o.addProperty("percentage", firstStepPourcent + "%");

		int firstCount = stepsCount.get(firstStepPourcent).get(firstStep);

		o.addProperty("value", firstCount);
		o.addProperty("conversion", 100 + "%");
		o.addProperty("loss", "0%");

		funnelData.add(o);

		float prevConversion = 100;

		SortedSet<Integer> keys = new TreeSet<>(stepsCount.keySet());

		for (int key : keys) {

			if (key == firstStepPourcent)
				continue;

			JsonObject obj = new JsonObject();

			int pourcent = key;

			Map<String, Integer> stepCountMap = stepsCount.get(key);

			String step = (String) (stepCountMap.keySet().toArray())[0];

			float count = stepCountMap.get(step);

				if (count == 0)
					continue;

			obj.addProperty("step", ++stepNumber);
			obj.addProperty("category", step);
			obj.addProperty("percentage", pourcent + "%");
			obj.addProperty("value", (int) count);

			float conversion = (count / firstCount) * 100;

			if (conversion < 0)
				conversion = 0;

			else if (conversion > 100)
				conversion = 100;

			obj.addProperty("conversion", (int) (Math.round(conversion)) + "%");

			int loss = Math.round(prevConversion - conversion);

			if (loss < 0)
				loss = 0;
			else if (loss > 100)
				loss = 100;

			obj.addProperty("loss", loss + "%");

			prevConversion = conversion;

			if (count > firstCount)
				firstCount = (int) count;

			funnelData.add(obj);
		}

		for (Entry<Integer, Map<String, Integer>> entry : stepsCount.entrySet()) {
			int proba = entry.getKey();
			Map<String, Integer> stepCount = stepsCount.get(proba);
			String step = (String) (stepCount.keySet().toArray())[0];
			stepsCount.get(proba).put(step, 0);
		}

		return funnelData.toString();
	}
}

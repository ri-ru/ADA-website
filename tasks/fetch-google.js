import fs from "fs";
import archieml from "archieml";
import docs from "../google.config.js";

const CWD = process.cwd();

// Convert CSV with key,value columns to JSON object
const csvToJson = (csv) => {
	const lines = csv.split('\n');
	const result = {};
	
	// Skip header row (key,value)
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;
		
		// Find the first comma to split key from value
		const firstComma = line.indexOf(',');
		if (firstComma === -1) continue;
		
		const key = line.substring(0, firstComma).trim();
		let value = line.substring(firstComma + 1).trim();
		
		// Remove surrounding quotes if present
		if (value.startsWith('"') && value.endsWith('"')) {
			value = value.slice(1, -1).replace(/""/g, '"');
		}
		
		// Remove trailing comma if present (common CSV issue)
		if (value.endsWith(',')) {
			value = value.slice(0, -1);
		}
		
		result[key] = value;
	}
	
	return result;
};

const fetchGoogle = async ({ id, gid }) => {
	console.log(`fetching...${id}`);

	const base = "https://docs.google.com";
	const post = gid
		? `spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
		: `document/d/${id}/export?format=txt`;
	const url = `${base}/${post}`;

	try {
		const response = await fetch(url);
		const text = await response.text();

		if (gid) return { csv: text, isSheet: true };

		const parsed = archieml.load(text);
		const str = JSON.stringify(parsed);
		return { content: str, isSheet: false };
	} catch (err) {
		throw new Error(err);
	}
};

(async () => {
	for (let d of docs) {
		try {
			const result = await fetchGoogle(d);
			const file = `${CWD}/${d.filepath}`;
			
			if (result.isSheet) {
				// Save CSV
				fs.writeFileSync(file, result.csv);
				
				// Also save as JSON if filepath ends with .csv
				if (d.filepath.endsWith('.csv')) {
					const jsonPath = file.replace('.csv', '.json');
					const jsonData = csvToJson(result.csv);
					fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
					console.log(`Created JSON: ${jsonPath}`);
				}
			} else {
				fs.writeFileSync(file, result.content);
			}
		} catch (err) {
			console.log(err);
		}
	}
})();

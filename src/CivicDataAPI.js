class CivicDataAPI {
    constructor(apiKey){
    	this.apiKey = apiKey
	}
    
    getSenatorsForZipcode(zip){
    	return new Promise((resolve, reject) => {
    		const zipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/

	      	if(!zipcodeRegex.test(zip)){
	      		reject("Please enter a valid, 5 digit zip code");
	      		return
	      	}

			const URL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + this.apiKey + 
				"&address=" + zip +
				"&includeOffices=true&levels=country&roles=legislatorUpperBody";

			const xhr = new XMLHttpRequest();
    		xhr.open("GET", URL);
    		xhr.onload = () => {
    			if(xhr.status !== 200){
    				reject("Could not fetch senators for this zipcode.  Please check that you entered it correctly and try again.")
    			} else {
    				resolve(this._formatReponse(xhr.responseText));
    			}
    		}
    		xhr.onerror = () => reject(xhr.statusText);
    		xhr.send();
    	})	
	}

	_formatReponse(responseText){
    	const json = JSON.parse(responseText)

		const senators = json["officials"].map((senator) => { 
			return {
				nameText: senator["name"], 
				value: "@" + senator["channels"].filter((c) => c["type"] === "Twitter")[0]["id"],
				displayValue: true
			}
		})
	
		return { 
			addressState: json["normalizedInput"]["state"],
	 		senators: senators
	 	}
	}
}

export default CivicDataAPI;
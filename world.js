// Global DOM elements
const lookupBtn = document.querySelector("#lookup");
const lookupResult = document.querySelector("#country");
const resultDiv = document.querySelector("#result");

// Onload
 window.addEventListener("load", () => {
	// Initial Retrieval of All Results
	ajaxCall("");
	// Adding evenlistener to lookup button
	lookupBtn.addEventListener("click", () => ajaxCall(lookupResult.value));
 });

function ajaxCall(getRequest){
	fetch(`world.php?countryName=${getRequest}`)	
		.then(response => response.json())
		.then(data => {
			if(data.length > 0){
				displayResults(data);
			}else{
				noResultsMsg();	
			}
		})
		.catch(err => console.log(err));
}

// Parses results from worlds.php 
// Places results in results div 
function displayResults(data){
	// Creation of results Table
	const resultsTable = createEmptyTable(["Name", "Continent", "Independence", "Head of State"]); 	
	const resultsTableBody = document.createElement("tbody");

	for(let i = 0; i < data.length; i++){
		currentRow = createNewRow([
			data[i]['name'],
			data[i]['continent'],
			data[i]['independence_year'],
			data[i]['head_of_state'],
		]);

		resultsTableBody.appendChild(currentRow);		
	}

	// Adding table body and 
	resultsTable.appendChild(resultsTableBody);
	resultDiv.innerHTML = "";
	resultDiv.appendChild(resultsTable);
}

function createNewRow(rowValues){
	const row = document.createElement("tr");
	
	for(let i = 0; i < rowValues.length; i++){
		const columnVal = document.createElement("td");
		columnVal.appendChild(document.createTextNode(rowValues[i]));
		row.appendChild(columnVal);
	}

	// Row with column values
	return row
}

// Creates an empty table element
// Parameter: array of headerValues
function createEmptyTable(headerValues){
	const newTable = document.createElement("table");
	const header = document.createElement("thead");

	// Adding header fields to 'header'
	for(let i = 0; i < headerValues.length; i++){
		headerField = document.createElement("th");
		headerField.appendChild(document.createTextNode(headerValues[i]));
		header.appendChild(headerField);
	}

	newTable.appendChild(header);

	// Empty table with header fields
	return newTable;
}

function noResultsMsg(){
	resultDiv.innerHTML = "No Results";}
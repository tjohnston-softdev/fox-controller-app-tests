const clear = require("clear");
const readline = require("readline");
const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPart = require("../test-parts/part-a-common_data/common-main");
const externalPart = require("../test-parts/part-b-external_modules/external-main");
const internalPart = require("../test-parts/part-c-internal_scripts/internal-main");
const onlinePart = require("../test-parts/part-d-online_checks/online-main");
const settingsPart = require("../test-parts/part-e-rio_settings/rio-settings-main");
const modelsPart = require("../test-parts/part-f-controller_models/models-main");
const controllerPart = require("../test-parts/part-g-controller_files/controller-main");
const deviceApiPart = require("../test-parts/part-h-api_requests/api-main");
const frontendPart = require("../test-parts/part-i-api_frontend/front-main");
const processPart = require("../test-parts/part-j-restart_controller/restart-main");

chai.use(chaiThings);

var readConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

clear();

readConsole.question("Enter test mode: ", function(inputLine)
{
	console.log(typeof inputLine);
	readConsole.close();
});

/*
var chosenMode = getTestModeInput();

function getTestModeInput()
{
	var inputLine = null;
	var textLower = null;
	
	try
	{
		inputLine = promptMode("Enter test mode: ");
		textLower = inputLine.toLowerCase();
	}
	catch(e)
	{
		inputLine = null;
		textLower = null;
		console.log("Test mode input not successful.");
	}
	
	return textLower;
}


describe("FOX Controller Test Script", function()
{
	var userInputType = typeof chosenMode;
	
	if (chosenMode === 'common')
	{
		commonPart();
	}
	else if (chosenMode === 'local')
	{
		externalPart();
		internalPart();
	}
	else if (chosenMode === 'online')
	{
		onlinePart.callOnline();
	}
	else if (chosenMode === 'offline')
	{
		onlinePart.callOffline();
	}
	else if (chosenMode === 'cont')
	{
		onlinePart.callOffline();
		settingsPart();
		modelsPart();
		controllerPart();
	}
	else if (chosenMode === 'request')
	{
		onlinePart.callOnline();
		deviceApiPart();
	}
	else if (chosenMode === 'r-process')
	{
		onlinePart.callOnline();
		processPart.callRestart();
	}
	else if (chosenMode === 'r-fox')
	{
		onlinePart.callOnline();
		processPart.callReboot();
	}
	else if (chosenMode === 'r-factory')
	{
		onlinePart.callOnline();
		processPart.callFactoryReset();
	}
	else if (chosenMode === 'front')
	{
		onlinePart.callOnline();
		frontendPart();
	}
	else if (chosenMode === 'all-cont')
	{
		commonPart();
		externalPart();
		internalPart();
		onlinePart.callOffline();
		settingsPart();
		modelsPart();
		controllerPart();
	}
	else if (chosenMode === 'all-api')
	{
		commonPart();
		externalPart();
		internalPart();
		onlinePart.callOnline();
		deviceApiPart();
	}
	else if (chosenMode === 'debug')
	{
		commonPart();
	}
	else if (chosenMode === '')
	{
		console.log("No text entered");
	}
	else if (userInputType === 'string')
	{
		console.log("Unknown test mode");
	}
	else
	{
		console.log("");
	}
	
});
*/
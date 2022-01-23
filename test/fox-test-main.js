const mocha = require("mocha");
const clear = require("clear");

const commonPart = require("../test-parts/01-common_data/main");
const externalPart = require("../test-parts/02-external_modules/main");
const internalPart = require("../test-parts/03-internal_scripts/main");
const onlinePart = require("../test-parts/04-online_checks/main");
const settingsPart = require("../test-parts/05-rio_settings/main");
const modelsPart = require("../test-parts/06-controller_models/main");
const controllerPart = require("../test-parts/07-controller_files/main");
const deviceApiPart = require("../test-parts/08-api_requests/main");
const frontendPart = require("../test-parts/09-api_frontend/main");
const processPart = require("../test-parts/10-restart_controller/main");

const chosenMode = process.env["npm_config_mode"]


describe("FOX Controller Test Script", function()
{
	var userInputType = typeof chosenMode;
	clear();
	
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
		internalPart();
	}
	else if (userInputType === 'string' && chosenMode.length > 0)
	{
		console.log("");
		console.log("Unknown test mode");
	}
	else
	{
		displayMissingCodeError();
	}
	
});


function displayMissingCodeError()
{
	var cmdLine = "Valid command: `npm run tests --mode=example`";
	
	console.log("");
	console.log("Unit testing mode is missing.");
	console.log(cmdLine);
}
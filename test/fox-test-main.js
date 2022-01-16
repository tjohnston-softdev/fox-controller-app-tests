const mocha = require("mocha");
const clear = require("clear");

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

const chosenMode = process.env["npm_config_mode"]

clear();


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
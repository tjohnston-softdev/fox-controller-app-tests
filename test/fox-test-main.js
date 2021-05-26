const clear = require("clear");
const promptMode = require('prompt-sync')();
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
		clear();
		commonPart();
	}
	else if (chosenMode === 'local')
	{
		clear();
		externalPart();
		internalPart();
	}
	else if (chosenMode === 'online')
	{
		clear();
		onlinePart.callOnline();
	}
	else if (chosenMode === 'offline')
	{
		clear();
		onlinePart.callOffline();
	}
	else if (chosenMode === 'cont')
	{
		clear();
		onlinePart.callOffline();
		settingsPart.callSettings();
		modelsPart.callModels();
		controllerPart.callController();
	}
	else if (chosenMode === 'request')
	{
		clear();
		onlinePart.callOnline();
		deviceApiPart.callCoordinateApiRequests();
	}
	else if (chosenMode === 'r-process')
	{
		clear();
		onlinePart.callOnline();
		processPart.callCoordinateRestart();
	}
	else if (chosenMode === 'r-fox')
	{
		clear();
		onlinePart.callOnline();
		processPart.callCoordinateReboot();
	}
	else if (chosenMode === 'r-factory')
	{
		clear();
		onlinePart.callOnline();
		processPart.callCoordinateFactoryReset();
	}
	else if (chosenMode === 'front')
	{
		clear();
		onlinePart.callOnline();
		frontendPart.callCoordinateFrontendTesting();
	}
	else if (chosenMode === 'all-cont')
	{
		clear();
		commonPart();
		externalPart();
		internalPart();
		onlinePart.callOffline();
		settingsPart.callSettings();
		modelsPart.callModels();
		controllerPart.callController();
	}
	else if (chosenMode === 'all-api')
	{
		clear();
		commonPart();
		externalPart();
		internalPart();
		onlinePart.callOnline();
		deviceApiPart.callCoordinateApiRequests();
	}
	else if (chosenMode === 'debug')
	{
		clear();
		commonPart();
		externalPart();
		internalPart();
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


/*
	commonPart.callCommon();
	externalPart.callExternal();
	internalPart.callInternal();
	onlinePart.callOnline();
	onlinePart.callOffline();
	settingsPart.callSettings();
	modelsPart.callModels();
	controllerPart.callController();
	deviceApiPart.callCoordinateApiRequests();
	frontendPart.callCoordinateFrontendTesting();
	processPart.callCoordinateRestart();
	processPart.callCoordinateReboot();
	processPart.callCoordinateFactoryReset();
*/
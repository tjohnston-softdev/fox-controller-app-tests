const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const mainRestartDescription = "J - Restart API Requests";

function coordinateRestart()
{
	var cRestartFile = require("./modes/mode-restart");
	
	describe(mainRestartDescription, function()
	{
		cRestartFile.callTestProcessRestart();
	});
}


function coordinateReboot()
{
	var cRebootFile = require("./modes/mode-reboot");
	
	describe(mainRestartDescription, function()
	{
		cRebootFile.callTestFoxRestart();
	});
}


function coordinateFactoryReset()
{
	var cFactoryResetFile = require("./modes/mode-factory_reset");
	
	describe(mainRestartDescription, function()
	{
		cFactoryResetFile.callTestFactoryReset();
	});
}



exports.callCoordinateRestart = coordinateRestart;
exports.callCoordinateReboot = coordinateReboot;
exports.callCoordinateFactoryReset = coordinateFactoryReset;
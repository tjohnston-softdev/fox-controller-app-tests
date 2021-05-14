const cRestartFile = require("./modes/mode-restart");
const cRebootFile = require("./modes/mode-reboot");
const cFactoryResetFile = require("./modes/mode-factory_reset");

const mainRestartDescription = "J - Restart API Requests";


function coordinateRestart()
{
	describe(mainRestartDescription, function()
	{
		cRestartFile.callTestProcessRestart();
	});
}


function coordinateReboot()
{
	describe(mainRestartDescription, function()
	{
		cRebootFile.callTestFoxRestart();
	});
}


function coordinateFactoryReset()
{
	describe(mainRestartDescription, function()
	{
		cFactoryResetFile.callTestFactoryReset();
	});
}



module.exports =
{
	callCoordinateRestart: coordinateRestart,
	callCoordinateReboot: coordinateReboot,
	callCoordinateFactoryReset: coordinateFactoryReset
};
const restartMode = require("./modes/mode-restart");
const rebootMode = require("./modes/mode-reboot");
const factoryResetMode = require("./modes/mode-factory_reset");

const mainRestartDescription = "J - Restart API Requests";


function coordinateRestart()
{
	describe(mainRestartDescription, function()
	{
		restartMode();
	});
}


function coordinateReboot()
{
	describe(mainRestartDescription, function()
	{
		rebootMode();
	});
}


function coordinateFactoryReset()
{
	describe(mainRestartDescription, function()
	{
		factoryResetMode();
	});
}



module.exports =
{
	callRestart: coordinateRestart,
	callReboot: coordinateReboot,
	callFactoryReset: coordinateFactoryReset
};
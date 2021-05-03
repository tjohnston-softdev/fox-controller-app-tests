const mainPartDescription = "D - Online Checks";
const chkOnlineFile = require("./checks/chk-online")

function coordinateOnline()
{
	describe(mainPartDescription, function()
	{
		chkOnlineFile.callTestOnline();
	});
}

function coordinateOffline()
{
	describe(mainPartDescription, function()
	{
		chkOnlineFile.callTestOffline();
	});
}


module.exports =
{
	callOnline: coordinateOnline,
	callOffline: coordinateOffline
};
const commonPaths = require("../../../app/paths/files/app-paths");
const requestFile = require(commonPaths.requestApi);
const request = require('request');

function testOnline()
{
	describe("Online Check", function()
	{
		coordinateOnlineCheck(true);
	});
}

function testOffline()
{
	describe("Offline Check", function()
	{
		coordinateOnlineCheck(false);
	});
}



function coordinateOnlineCheck(onlineFlag)
{
	var reqError = null;
	var reqReturn = null;
	var checkReturn = null;
	var resultDesc = writeCheckDescription(onlineFlag);
	
	it("Application Request", function(done)
	{
		request(requestFile.hostUrl, function(rError, rReturn)
		{
			reqError = rError;
			reqReturn = rReturn;
			done();
		});
	});
	
	it("Status Check", function(done)
	{
		checkReturn = requestFile.getApplicationOnlineResult(reqReturn);
		done();
	});
	
	it(resultDesc, function(done)
	{
		validateOverallResult(onlineFlag, checkReturn);
		done();
	});
	
}

function writeCheckDescription(oFlag)
{
	var cDesc = "";
	
	if (oFlag === true)
	{
		cDesc = "Currently Online";
	}
	else
	{
		cDesc = "Currently Offline";
	}
	
	return cDesc;
}

function validateOverallResult(expectedOnlineFlag, resultingOnlineFlag)
{
	var resultSuccessful = false;
	
	if (expectedOnlineFlag === true)
	{
		resultSuccessful = runOnlineCheck(resultingOnlineFlag);
	}
	else
	{
		resultSuccessful = runOfflineCheck(resultingOnlineFlag);
	}
	
}

function runOnlineCheck(foxOnline)
{
	var res = false;
	
	if (foxOnline === true)
	{
		res = true;
	}
	else
	{
		throw new Error("FOX Application is currently offline.");
	}
	
	return res;
}

function runOfflineCheck(foxOnline)
{
	var res = false;
	
	if (foxOnline === true)
	{
		throw new Error("FOX Application is currently online.");
	}
	else
	{
		res = true;
	}
	
	return res;
}


module.exports =
{
	callTestOnline: testOnline,
	callTestOffline: testOffline
};
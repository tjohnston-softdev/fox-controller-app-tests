const commonPaths = require("../../../app/paths/files/app-paths");
const requestFile = require(commonPaths.requestApi);
const needle = require("needle");

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
		needle.get(requestFile.hostUrl, {timeout: 1750}, function(rError, rReturn)
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

function writeCheckDescription(desiredStatus)
{
	var descRes = "";
	
	if (desiredStatus === true)
	{
		descRes = "Currently Online";
	}
	else
	{
		descRes = "Currently Offline";
	}
	
	return descRes;
}

function validateOverallResult(expectStatus, resultStatus)
{
	var resultSuccessful = false;
	
	if (expectStatus === true)
	{
		resultSuccessful = runOnlineCheck(resultStatus);
	}
	else
	{
		resultSuccessful = runOfflineCheck(resultStatus);
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
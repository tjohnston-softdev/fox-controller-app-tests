const commonPaths = require("../../../app/paths/files/app-paths");
const requestFile = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequestsFile);

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
	var retrievedStatus = null;
	var resultDesc = writeCheckDescription(onlineFlag);
	
	it("Application Request", function(done)
	{
		reqReturn = httpRequests.defineOutput();
		httpRequests.ping(reqReturn, done);
	});
	
	it("Status Check", function(done)
	{
		retrievedStatus = requestFile.getApplicationOnlineResult(reqReturn);
		done();
	});
	
	it(resultDesc, function(done)
	{
		validateOverallResult(onlineFlag, retrievedStatus);
		done();
	});
	
}

function writeCheckDescription(onReq)
{
	var descRes = "";
	
	if (onReq === true)
	{
		descRes = "Currently Online";
	}
	else
	{
		descRes = "Currently Offline";
	}
	
	return descRes;
}

function validateOverallResult(expectStatus, actualStatus)
{
	var resultSuccessful = false;
	
	if (expectStatus === true)
	{
		resultSuccessful = runOnlineCheck(actualStatus);
	}
	else
	{
		resultSuccessful = runOfflineCheck(actualStatus);
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
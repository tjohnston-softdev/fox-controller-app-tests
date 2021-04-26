const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const requestFile = require(commonPaths.requestApi);
const requestModule = require('request');

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
		requestModule(requestFile.hostUrl, function(rError, rReturn)
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

function runOnlineCheck(r)
{
	var res = false;
	
	if (r === true)
	{
		res = true;
	}
	else
	{
		offlineError();
	}
	
	return res;
}

function runOfflineCheck(r)
{
	var res = false;
	
	if (r === true)
	{
		onlineError();
	}
	else
	{
		res = true;
	}
	
	return res;
}

function offlineError()
{
	throw new Error("FOX Application is currently offline.");
}

function onlineError()
{
	throw new Error("FOX Application is currently online.");
}

exports.callTestOnline = testOnline;
exports.callTestOffline = testOffline;
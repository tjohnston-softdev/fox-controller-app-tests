const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const requestPathFile = require(commonPaths.requestApiPaths);


function testRequestPaths()
{
	describe("API Request Paths", function()
	{
		checkPathProperties();
	});
}


function checkPathProperties()
{
	describe("API Path Properties", function()
	{
		handleIndividualPath('adminApi', "Admin");
		handleIndividualPath('alarmApi', "Alarm");
		handleIndividualPath('nodesApi', "Nodes");
		handleIndividualPath('storageApi', "Storage");
		handleIndividualPath('devicesApi', "Devices");
		handleIndividualPath('rioApiSub', "Remote IO");
		
	});
}


function handleIndividualPath(propertyName, descriptionName)
{
	it(descriptionName, function()
	{
		var propVal = requestPathFile[propertyName];
		commonFunctions.testString(propVal);
	});
}


module.exports = testRequestPaths;
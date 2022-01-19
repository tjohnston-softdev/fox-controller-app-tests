const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const loadFoxFile = require(commonPaths.loadFox);
const indexFile = loadFoxFile(foxPath.rioIndexFile);
const rioSubCommonFile = require(commonPaths.rioCommon);

var nodeListSpy = null;


function testRemoteIoIndexNodeList()
{
	describe("Remote IO Index Node List", function()
	{
		handleNodeListPrepare();
		handleNodeListFull();
		handleNodeListManufacturers();
		handleNodeListDispose();
	});
}

function handleNodeListPrepare()
{
	describe("Node List Preperation", function()
	{	
		it("Spy Object Assigned", function(done)
		{
			nodeListSpy = sinon.spy(indexFile, 'listRiosForNode');
			done();
		});
		
	});
}



function handleNodeListFull()
{
	var retrievedNodeList = null;
	var retrievedError = null;
	
	describe("Full Node List (listRiosForNode)", function()
	{
		it("Function Called", function(done)
		{
			indexFile.listRiosForNode(null, function(allDevicesErr, allDevicesList)
			{
				retrievedNodeList = allDevicesList;
				retrievedError = allDevicesErr;
				done();
			});
		});
		
		it("Call Successful", function()
		{
			verifyNodeListCalled(null);
			expect(nodeListSpy.lastCall.exception).to.be.undefined;
			expect(retrievedError).to.be.null;
		});
		
		it("Node Array Returned", function()
		{
			arrayFunctions.testNeutral(retrievedNodeList);
		});
		
		it("Array Structure Valid", function()
		{
			rioSubCommonFile.testPropertyArray(retrievedNodeList);
		});
		
	});
}

function handleNodeListManufacturers()
{
	var advantechName = "advantech";
	var moxaName = "moxa";
	var sonoffName = "sonoff";
	
	describe("Manufacturer Node Lists (listRiosForNode)", function()
	{
		
		it("Advantech", function(done)
		{
			indexFile.listRiosForNode(advantechName, (advErr, advDevices) =>
			{
				verifyNodeListManufacturer(advantechName, advErr, advDevices);
				done();
			});
		});
		
		it("Moxa", function(done)
		{
			indexFile.listRiosForNode(moxaName, (mxaErr, mxaDevices) =>
			{
				verifyNodeListManufacturer(moxaName, mxaErr, mxaDevices);
				done();
			});
		});
		
		it("Sonoff", function(done)
		{
			indexFile.listRiosForNode(sonoffName, (sonErr, sonDevices) =>
			{
				verifyNodeListManufacturer(sonoffName, sonErr, sonDevices);
				done();
			});
		});
		
	});
}




function handleNodeListDispose()
{
	describe("Node List Dispose", function()
	{
		it("Spy Object", function(done)
		{
			nodeListSpy.restore();
			done();
		});
	});
}


function verifyNodeListCalled(nArg)
{
	var firstArg = null;
	var secondArg = null;
	
	expect(nodeListSpy.called).to.be.true;
	expect(nodeListSpy.lastCall).to.exist;
	
	arrayFunctions.testPopulated(nodeListSpy.lastCall.args);
	firstArg = nodeListSpy.lastCall.args[0];
	secondArg = nodeListSpy.lastCall.args[1];
	
	expect(firstArg).to.equal(nArg);
	commonFunctions.testFunction(secondArg);
	commonFunctions.testFunction(nodeListSpy.lastCall.callback);
}


function verifyNodeListManufacturer(mName, mError, mDevices)
{
	verifyNodeListCalled(mName);
	expect(nodeListSpy.lastCall.exception).to.be.undefined;
	expect(mError).to.be.null;
	
	arrayFunctions.testNeutral(mDevices);
	rioSubCommonFile.testPropertyArray(mDevices);
}

module.exports = testRemoteIoIndexNodeList;
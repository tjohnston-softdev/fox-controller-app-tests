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
			commonFunctions.testPresent(retrievedNodeList);
			expect(retrievedNodeList).to.be.an("array");
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
	expect(nodeListSpy.called).to.be.true;
	commonFunctions.testPresent(nodeListSpy.lastCall);
	
	commonFunctions.testPresent(nodeListSpy.lastCall.args);
	arrayFunctions.testPopulated(nodeListSpy.lastCall.args);
	
	expect(nodeListSpy.lastCall.args[0]).to.equal(nArg);
	
	commonFunctions.testPresent(nodeListSpy.lastCall.args[1]);
	expect(nodeListSpy.lastCall.args[1]).to.be.a("function");
	
	commonFunctions.testPresent(nodeListSpy.lastCall.callback);
	expect(nodeListSpy.lastCall.callback).to.be.a("function");
}


function verifyNodeListManufacturer(mName, mError, mDevices)
{
	verifyNodeListCalled(mName);
	expect(nodeListSpy.lastCall.exception).to.be.undefined;
	expect(mError).to.be.null;
	
	commonFunctions.testPresent(mDevices);
	expect(mDevices).to.be.an("array");
	rioSubCommonFile.testPropertyArray(mDevices);
}

module.exports = testRemoteIoIndexNodeList;
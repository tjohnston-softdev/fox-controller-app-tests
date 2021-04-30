const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const indexFile = getIndexFileRequirement(foxPath.rioIndexFile);
const rioSubCommonFile = getIndexFileRequirement(subCommonPath.rioCommonFile);

var nListSpy = null;


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
		it("Remote IO Index", function()
		{
			commonFunctionsFile.testPresent(indexFile);
			expect(indexFile).to.be.an("object");
		});
		
		it("Remote IO Sub-File", function()
		{
			commonFunctionsFile.testPresent(rioSubCommonFile);
			expect(rioSubCommonFile).to.be.an("object");
		});
		
		
		it("Spy Object Assigned", function()
		{
			nListSpy = sinon.spy(indexFile, 'listRiosForNode');
		});
		
	});
}



function handleNodeListFull()
{
	var nListReturn = null;
	var nErrorReturn = null;
	
	describe("Full Node List (listRiosForNode)", function()
	{
		it("Function Called", function(done)
		{
			indexFile.listRiosForNode(null, (allErr, allDevices) =>
			{
				nListReturn = allDevices;
				nErrorReturn = allErr;
				done();
			});
		});
		
		it("Call Successful", function()
		{
			verifyNodeListCalled(null);
			expect(nListSpy.lastCall.exception).to.be.undefined;
			expect(nErrorReturn).to.be.null;
		});
		
		it("Node Array Returned", function()
		{
			commonFunctionsFile.testPresent(nListReturn);
			expect(nListReturn).to.be.an("array");
		});
		
		it("Array Structure Valid", function()
		{
			rioSubCommonFile.callTestPropertyArrayStructure(nListReturn);
		});
		
	});
}

function handleNodeListManufacturers()
{
	var nAdvantech = "advantech";
	var nMoxa = "moxa";
	var nSonoff = "sonoff";
	
	describe("Manufacturer Node Lists (listRiosForNode)", function()
	{
		
		it("Advantech", function(done)
		{
			indexFile.listRiosForNode(nAdvantech, (advErr, advDevices) =>
			{
				verifyNodeListManufacturer(nAdvantech, advErr, advDevices);
				done();
			});
		});
		
		it("Moxa", function(done)
		{
			indexFile.listRiosForNode(nMoxa, (mxaErr, mxaDevices) =>
			{
				verifyNodeListManufacturer(nMoxa, mxaErr, mxaDevices);
				done();
			});
		});
		
		it("Sonoff", function(done)
		{
			indexFile.listRiosForNode(nSonoff, (sonErr, sonDevices) =>
			{
				verifyNodeListManufacturer(nSonoff, sonErr, sonDevices);
				done();
			});
		});
		
	});
}




function handleNodeListDispose()
{
	describe("Node List Dispose", function()
	{
		it("Spy Object", function()
		{
			nListSpy.restore();
		});
	});
}





function verifyNodeListCalled(nArg)
{
	expect(nListSpy.called).to.be.true;
	commonFunctionsFile.testPresent(nListSpy.lastCall);
	
	commonFunctionsFile.testPresent(nListSpy.lastCall.args);
	commonFunctionsFile.testArrayPopulated(nListSpy.lastCall.args);
	
	expect(nListSpy.lastCall.args[0]).to.not.be.undefined;
	expect(nListSpy.lastCall.args[0]).to.equal(nArg);
	
	commonFunctionsFile.testPresent(nListSpy.lastCall.args[1]);
	expect(nListSpy.lastCall.args[1]).to.be.a("function");
	
	commonFunctionsFile.testPresent(nListSpy.lastCall.callback);
	expect(nListSpy.lastCall.callback).to.be.a("function");
}

function verifyNodeListManufacturer(mName, mError, mDevices)
{
	verifyNodeListCalled(mName);
	expect(nListSpy.lastCall.exception).to.be.undefined;
	expect(mError).to.be.null;
	
	commonFunctionsFile.testPresent(mDevices);
	expect(mDevices).to.be.an("array");
	rioSubCommonFile.callTestPropertyArrayStructure(mDevices);
}

function getIndexFileRequirement(frPath)
{
	var res = null;
	
	try
	{
		res = require(frPath);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestRemoteIoIndexNodeList = testRemoteIoIndexNodeList;
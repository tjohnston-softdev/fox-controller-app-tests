const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const loadFoxFile = require(commonPaths.loadFox);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const indexFile = loadFoxFile(foxPath.rioIndexFile);


function testRemoteIoIndexMain()
{
	describe("Remote IO Index Main", function()
	{
		checkFile();
		checkIndexFunctionsExist();
		handleInitializationFunction();
		handleInitializationCompleteFunction();
	});
}


function checkFile()
{
	describe("File", function()
	{
		it("Loaded", function()
		{
			commonFunctions.testPresent(indexFile);
		});
	});
}


function checkIndexFunctionsExist()
{
	describe("Index Function Definitions", function()
	{
		it("Initialization", function()
		{
			var intlArr = ['initRemoteIoFactory', 'whenInitCompleted'];
			checkFunctionDefinitionLoop(intlArr);
		});
		
		it("CRUD", function()
		{
			var crudArr = getCrudFunctions();
			checkFunctionDefinitionLoop(crudArr);
		});
		
		it("Node", function()
		{
			var nodeArr = ['listRiosForNode', 'isNodeExists', 'registerNode', 'setDeviceOutput', 'getIoProperties'];
			checkFunctionDefinitionLoop(nodeArr);
		});
		
	});
}

function handleInitializationFunction()
{
	var initSpy = null;
	
	describe("Function - Initialize Remote IO Factory (initRemoteIoFactory)", function()
	{
		it("Initialization Function Called", function(done)
		{
			initSpy = sinon.spy(indexFile, 'initRemoteIoFactory');
			indexFile.initRemoteIoFactory();
			done();
		});
		
		it("Initialization Event Successful", function(done)
		{
			expect(initSpy.calledOnce).to.be.true;
			commonFunctions.testPresent(initSpy.firstCall);
			expect(initSpy.firstCall.args).to.deep.equal([]);
			expect(initSpy.firstCall.returnValue).to.be.undefined;
			expect(initSpy.firstCall.exception).to.be.undefined;
			
			done();
		});
		
		it("Initialization Disposed", function(done)
		{
			initSpy.restore();
			done();
		});
		
	});
}

function handleInitializationCompleteFunction()
{
	var compSpy = null;
	var triggerFlag = false;
	
	describe("Function - When Initialization Complete (whenInitCompleted)", function()
	{
		it("Event Called", function(done)
		{
			compSpy = sinon.spy(indexFile, 'whenInitCompleted');
			
			indexFile.whenInitCompleted(function()
			{
				triggerFlag = true;
				done();
			});
		});
		
		it("Event Successful", function(done)
		{
			expect(compSpy.calledOnce).to.be.true;
			commonFunctions.testPresent(compSpy.firstCall);
			
			commonFunctions.testPresent(compSpy.firstCall.args);
			arrayFunctions.testPopulated(compSpy.firstCall.args);
			
			commonFunctions.testPresent(compSpy.firstCall.args[0]);
			expect(compSpy.firstCall.args[0]).to.be.a("function");
			
			commonFunctions.testPresent(compSpy.firstCall.callback);
			expect(compSpy.firstCall.callback).to.be.a("function");
			
			expect(compSpy.firstCall.exception).to.be.undefined;
			expect(triggerFlag).to.be.true;
			
			done();
		});
		
		
		it("Event Disposed", function(done)
		{
			compSpy.restore();
			done();
		});
		
		
	});
}




function checkFunctionDefinitionLoop(nameArray)
{
	var loopIndex = 0;
	var currentName = "";
	var currentFunction = null;
	
	for (loopIndex = 0; loopIndex < nameArray.length; loopIndex = loopIndex + 1)
	{
		currentName = nameArray[loopIndex];
		currentFunction = indexFile[currentName];
		
		commonFunctions.testPresent(currentFunction);
		expect(currentFunction).to.be.a("function");
	}
}


function getCrudFunctions()
{
	var namesList = [];
	
	namesList.push('listRemoteIoDevices');
	namesList.push('addRemoteIoDevice', 'getRemoteIoDevice', 'modRemoteIoDevice', 'delRemoteIoDevice');
	namesList.push('getRioDeviceStatus');
	
	return namesList;
}

module.exports = testRemoteIoIndexMain;
const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const indexFile = getFileRequirement(foxPath.rioIndexFile);

function testRemoteIoIndexMain()
{
	describe("Remote IO Index Main", function()
	{
		checkFileObjects();
		checkIndexFunctionsExist();
		handleInitializationFunction();
		handleInitializationCompleteFunction();
	});
}

function checkFileObjects()
{
	describe("File Objects", function()
	{
		
		it("Remote IO Index File (remote-io.index)", function()
		{
			commonFunctionsFile.testPresent(indexFile);
			commonFunctionsFile.testType(indexFile, 'object');
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
		
		it("Initialization Event Successful", function()
		{
			commonFunctionsFile.testTrue(initSpy.calledOnce);
			commonFunctionsFile.testPresent(initSpy.firstCall);
			expect(initSpy.firstCall.args).to.deep.equal([]);
			expect(initSpy.firstCall.returnValue).to.be.undefined;
			expect(initSpy.firstCall.exception).to.be.undefined;
		});
		
		it("Initialization Disposed", function()
		{
			initSpy.restore();
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
		
		it("Event Successful", function()
		{
			commonFunctionsFile.testTrue(compSpy.called);
			commonFunctionsFile.testTrue(compSpy.calledOnce);
			commonFunctionsFile.testPresent(compSpy.firstCall);
			
			commonFunctionsFile.testPresent(compSpy.firstCall.args);
			commonFunctionsFile.testArray(compSpy.firstCall.args);
			
			commonFunctionsFile.testPresent(compSpy.firstCall.args[0]);
			commonFunctionsFile.testType(compSpy.firstCall.args[0], 'function');
			
			commonFunctionsFile.testPresent(compSpy.firstCall.callback);
			commonFunctionsFile.testType(compSpy.firstCall.callback, 'function');
			
			expect(compSpy.firstCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(triggerFlag);
			commonFunctionsFile.testTrue(triggerFlag);
		});
		
		it("Event Disposed", function()
		{
			compSpy.restore();
		});
		
		
	});
}




function checkFunctionDefinitionLoop(functionNameArray)
{
	var fi = 0;
	var currentName = "";
	var currentQuote = "";
	var currentExport = "";
	var currentExists = false;
	var allValid = true;
	
	while (fi >= 0 && fi < functionNameArray.length && allValid === true)
	{
		currentName = functionNameArray[fi];
		currentQuote = "'" + currentName + "'";
		currentExport = typeof indexFile[currentName];
		currentExists = false;
		
		if (indexFile[currentName] !== null && currentExport !== 'undefined' && currentExport === 'function')
		{
			currentExists = true;
		}
		else
		{
			currentExists = false;
			throw new Error(currentQuote + " is not a valid function");
		}
		
		if (currentExists !== true)
		{
			allValid = false;
		}
		
		fi = fi + 1;
	}
	
	commonFunctionsFile.testTrue(allValid);
}


function getCrudFunctions()
{
	var cRes = [];
	
	cRes.push('listRemoteIoDevices');
	cRes.push('addRemoteIoDevice', 'getRemoteIoDevice', 'modRemoteIoDevice', 'delRemoteIoDevice');
	cRes.push('getRioDeviceStatus');
	
	return cRes;
}



function getFileRequirement(frPath)
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

exports.callTestRemoteIoIndexMain = testRemoteIoIndexMain;
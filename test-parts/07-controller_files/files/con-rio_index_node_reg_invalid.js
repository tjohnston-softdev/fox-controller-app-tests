const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const loadFoxFile = require(commonPaths.loadFox);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const rioFile = loadFoxFile(foxPath.rioIndexFile);
const commonFile = require(commonPaths.rioCommon);
const spyFile = require("../sub-files/rio-spy_functions");
const registerArgumentObject = require("../sub-files/rio-node_args");

var listSpy = null;
var registerSpy = null;

var originalDeviceList = null;
var testID = null;
var registerConfigObject = null;

function testRemoteIoIndexRegisterInvalid()
{
	describe("Remote IO Index Register Invalid", function()
	{
		handleNodeInvalidPrepare();
		handleOriginalList();
		handleTestDevice();
		handleTestConfig();
		
		handleIoType();
		handleConfigObject();
		handleDeviceID();
		handleNodeID();
		handlePrefix();
		handleIndex();
		handleIndexOverflow();
		handleIoSetObject();
		
		handleTestDelete();
		handleTestIntact();
		handleNodeInvalidDispose();
	});
}


function handleNodeInvalidPrepare()
{
	describe("Preperation", function()
	{	
		it("Global Spy Objects Assigned", function(done)
		{
			listSpy = sinon.spy(rioFile, 'listRemoteIoDevices');
			registerSpy = sinon.spy(rioFile, 'registerNode');
			
			done();
		});
		
	});
}

function handleOriginalList()
{
	var origErr = null;
	
	describe("Original Device List", function()
	{
		it("List Function Called", function(done)
		{
			rioFile.listRemoteIoDevices(function(listError, listDevices)
			{
				originalDeviceList = listDevices;
				origErr = listError;
				
				done();
			});
		});
		
		it("List Successful", function(done)
		{
			spyFile.verifyRemoteIoListCalled(origErr, listSpy.called, listSpy.lastCall);
			done();
		});
		
		it("Return Valid", function(done)
		{
			commonFile.testDeviceListDynamic(originalDeviceList);
			done();
		});
		
		
	});
	
	
}


function handleTestDevice()
{
	var addObject = null;
	var addSpy = null;
	var addID = null;
	var addError = null;
	
	describe("Test Device", function()
	{
		
		it("Add Function Called", function(done)
		{
			addSpy = sinon.spy(rioFile, 'addRemoteIoDevice');
			addObject = commonFunctions.cloneObject(commonJsonObjectsFile.crudDevice);
			
			rioFile.addRemoteIoDevice(addObject, function(addRioErr, addedID)
			{
				addID = addedID;
				addError = addRioErr;
				done();
			});
		});
		
		it("Add Successful", function(done)
		{
			spyFile.verifyDeviceCalled(addObject, addSpy.called, addSpy.lastCall);
			
			expect(addSpy.lastCall.exception).to.be.undefined;
			expect(addError).to.be.null;
			
			commonFunctions.testPresent(addID);
			commonFunctions.testString(addID);
					
			testID = addID;
			done();
		});
		
		it("Test ID Retained", function(done)
		{
			commonFunctions.testPresent(testID);
			commonFunctions.testString(testID);
			expect(testID).to.equal(addID);
			done();
		});
		
		it("Add Spy Disposed", function(done)
		{
			addSpy.restore();
			done();
		});
	});
}


function handleTestConfig()
{
	describe("Test Config", function()
	{
		it("Retrieved", function(done)
		{
			registerConfigObject = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, registerArgumentObject.correctSet);
			done();
		});
		
		it("Correct Return Structure", function()
		{
			commonFunctions.testPresent(registerConfigObject);
			expect(registerConfigObject).to.be.an("object");
			commonFile.testNodeConfigObject(registerConfigObject);
		});
		
	});
}




function handleIoType()
{
	describe("Invalid IO Type (ioType)", function()
	{
		it("Unknown Value", function(done)
		{
			coordinateRegisterNodeInvalidNeutral("XYZ", registerConfigObject);
			done();
		});
		
		it("Invalid Type", function(done)
		{
			coordinateRegisterNodeInvalidNeutral(-1, registerConfigObject);
			done();
		});
		
		it("Null", function(done)
		{
			coordinateRegisterNodeInvalidNeutral(null, registerConfigObject);
			done();
		});
		
	});
}

function handleConfigObject()
{
	describe("Invalid Config Object (nodeConfig)", function()
	{
		it("Invalid Type", function(done)
		{
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, -1, commonErrorStringsFile.missingModule);
			done();
		});
		
		it("Null", function(done)
		{
			coordinateRegisterNodeInvalidThrow(registerArgumentObject.regMode, null, "Cannot read property 'deviceId' of null");
			done();
		});
		
	});
}

function handleDeviceID()
{
	describe("Invalid Device ID (nodeConfig.deviceId)", function()
	{
		it("Unknown ID", function(done)
		{
			var unknownIdObject = commonJsonObjectsFile.getRegisterNode(commonJsonObjectsFile.unknownID, registerArgumentObject.correctID, registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, unknownIdObject, commonErrorStringsFile.missingModule);
			done();
		});
		
		it("Invalid ID Type", function(done)
		{
			var iTypeObject = commonJsonObjectsFile.getRegisterNode("-1", registerArgumentObject.correctID, registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, iTypeObject, commonErrorStringsFile.missingModule);
			done();
		});
		
		it("Null", function(done)
		{
			var iPropObject = commonJsonObjectsFile.getRegisterNode(null, registerArgumentObject.correctID, registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, iPropObject, commonErrorStringsFile.missingModule);
			done();
		});
		
	});
}

function handleNodeID()
{
	describe("Invalid Node ID (nodeConfig.id)", function()
	{
		it("Unknown ID", function(done)
		{
			var formatObject = commonJsonObjectsFile.getRegisterNode(testID, "???", registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, formatObject);
			done();
		});
		
		it("Invalid ID Type", function(done)
		{
			var typeObject = commonJsonObjectsFile.getRegisterNode(testID, -1, registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, typeObject);
			done();
		});
		
		it("Null", function(done)
		{
			var propObject = commonJsonObjectsFile.getRegisterNode(testID, null, registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, propObject);
			done();
		});
		
	});
}

function handlePrefix()
{
	describe("Invalid Node Prefix (nodeConfig.ioSetId)", function()
	{
		it("Invalid Prefix - Valid Index", function(done)
		{
			var validIndexObject = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, "XY-0");
			var validIndexError = commonErrorStringsFile.writeRegisterPrefixIndex("XY-0");
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, validIndexObject, validIndexError);
			
			done();
		});
		
		it("Invalid Prefix - Invalid Index", function(done)
		{
			var invalidIndexObject = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, registerArgumentObject.invalidSet);
			var invalidIndexError = commonErrorStringsFile.writeRegisterPrefixIndex(registerArgumentObject.invalidSet);
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, invalidIndexObject, invalidIndexError);
			
			done();
		});
		
	});
}


function handleIndex()
{
	describe("Invalid Node Index (nodeConfig.ioSetId)", function()
	{
		it("Valid Prefix - Invalid Index", function(done)
		{
			var validPrefixObject = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, "RO-X");
			var validPrefixError = commonErrorStringsFile.writeRegisterPrefixIndex("RO-X");
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, validPrefixObject, validPrefixError);
			
			done();
		});
		
		it("Invalid Prefix - Invalid Index", function(done)
		{
			var invalidPrefixObject = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, registerArgumentObject.invalidSet);
			var invalidPrefixError = commonErrorStringsFile.writeRegisterPrefixIndex(registerArgumentObject.invalidSet);
			coordinateRegisterNodeInvalidCallback(registerArgumentObject.regMode, invalidPrefixObject, invalidPrefixError);
			
			done();
		});
		
	});
}


function handleIndexOverflow()
{
	describe("Overflow Node Index (nodeConfig.ioSetId)", function(done)
	{
		it("Overflow", function(done)
		{
			var overflowObject = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, "RO-10000");
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, overflowObject);
			
			done();
		});
	});
}

function handleIoSetObject()
{
	describe("Invalid IO Set (nodeConfig.ioSetId)", function()
	{	
		it("Invalid Object Type", function(done)
		{
			var typeSet = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, -1);
			coordinateRegisterNodeInvalidThrow(registerArgumentObject.regMode, typeSet, "ioSetId.split is not a function");
			
			done();
		});
		
		it("Null", function(done)
		{
			var nullSet = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, null);
			coordinateRegisterNodeInvalidThrow(registerArgumentObject.regMode, nullSet, "Cannot read property 'split' of null");
			
			done();
		});
	});
}




function coordinateRegisterNodeInvalidNeutral(neutralMode, neutralObject)
{
	var neutralComplete = false;
	
	rioFile.registerNode(neutralMode, neutralObject, function(nError, nObject)
	{
		neutralComplete = true;
	});
}


function coordinateRegisterNodeInvalidCallback(reMode, reObject, expectedReturnError)
{
	rioFile.registerNode(reMode, reObject, function(callbackError, callbackObject)
	{
		var callbackParse = getCallbackErrorMessage(callbackError);
		spyFile.verifyRegisterNodeCalled(registerSpy.called, registerSpy.lastCall, reMode, reObject);
		
		expect(registerSpy.lastCall.exception).to.be.undefined;
		expect(callbackObject).to.be.undefined;
		expect(callbackParse).to.equal(expectedReturnError);
	});
}

function coordinateRegisterNodeInvalidThrow(tMode, tObject, expectedThrownError)
{
	var regComplete = false;
	var regMessage = "";
	
	try
	{
		rioFile.registerNode(tMode, tObject, function(regErr, regObj)
		{
			regComplete = true;
		});
	}
	catch(e)
	{
		regComplete = false;
		regMessage = e.message;
	}
	
	var regRes = commonFunctions.prepareInvalidResult(regComplete, regMessage);
	commonFunctions.testInvalidResult(regRes, expectedThrownError);
}

function getCallbackErrorMessage(eObject)
{
	var eType = typeof eObject;
	var messageRes = null;
	
	if (eType === "string")
	{
		messageRes = eObject;
	}
	else if (eObject !== undefined && eObject !== null && eType === "object")
	{
		messageRes = eObject.message;
	}
	else
	{
		messageRes = null;
	}
	
	return messageRes;
}



function handleTestDelete()
{
	var deleteSpy = null;
	var deleteConfirmed = false;
	
	describe("Delete Test Device", function()
	{
		it("Spy Assigned", function(done)
		{
			deleteSpy = sinon.spy(rioFile, 'delRemoteIoDevice');
			done();
		});
		
		it("Function Called", function(done)
		{
			rioFile.delRemoteIoDevice(testID, true, function()
			{
				deleteConfirmed = true;
				done();
			});
		});
		
		it("Delete Successful", function(done)
		{
			spyFile.verifyDeleteDeviceCalled(testID, true, deleteSpy.called, deleteSpy.firstCall);
			expect(deleteSpy.firstCall.exception).to.be.undefined;
			expect(deleteConfirmed).to.be.true;
			done();
		});
		
		it("Spy Disposed", function(done)
		{
			deleteSpy.restore();
			done();
		});
		
		
	});
}


function handleTestIntact()
{
	var postList = null;
	var postError = null;
	
	describe("Device List Intact", function()
	{
		it("List Function Called", function(done)
		{
			rioFile.listRemoteIoDevices(function(listError, listResult)
			{
				postList = listResult;
				postError = listError;
				done();
			});
		});
		
		it("List Successful", function(done)
		{
			spyFile.verifyRemoteIoListCalled(postError, listSpy.called, listSpy.lastCall);
			done();
		});
		
		it("Return Valid", function(done)
		{
			commonFile.testDeviceListDynamic(postList);
			done();
		});
		
		it("Test Device Deleted", function(done)
		{
			expect(postList).to.deep.equal(originalDeviceList);
			done();
		});
		
	});
}






function handleNodeInvalidDispose()
{
	describe("Disposal", function()
	{
		it("Global Spy Objects Disposed", function(done)
		{
			listSpy.restore();
			registerSpy.restore();
			done();
		});
		
		it("Test Device ID", function()
		{
			testID = null;
		});
		
		it("Original Device List", function()
		{
			originalDeviceList = null;
		});
		
		
		it("Config Object", function()
		{
			registerConfigObject = null;
		});
	});
}

module.exports = testRemoteIoIndexRegisterInvalid;
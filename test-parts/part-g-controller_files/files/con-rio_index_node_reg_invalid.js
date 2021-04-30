const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const rioFile = getRequiredRegisterFile(foxPath.rioIndexFile);
const commonFile = getRequiredRegisterFile(subCommonPath.rioCommonFile);
const spyFile = getRequiredRegisterFile("../sub-files/rio-spy_functions");
const rioArgFile = getRequiredRegisterFile("../sub-files/rio-node_args");

var listSpy = null;
var registerSpy = null;

var registerArgumentObject = null;
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
		it("Remote IO Index", function(done)
		{
			commonFunctionsFile.testPresent(rioFile);
			expect(rioFile).to.be.an("object");
			
			done();
		});
		
		it("Sub-Files", function(done)
		{
			commonFunctionsFile.testPresent(commonFile);
			expect(commonFile).to.be.an("object");
			
			commonFunctionsFile.testPresent(spyFile);
			expect(spyFile).to.be.an("object");
			
			commonFunctionsFile.testPresent(rioArgFile);
			expect(rioArgFile).to.be.an("object");
			
			done();
		});
		
		
		it("Spy Objects Assigned", function(done)
		{
			listSpy = sinon.spy(rioFile, 'listRemoteIoDevices');
			registerSpy = sinon.spy(rioFile, 'registerNode');
			
			done();
		});
		
		
		it("Arguments Retrieved", function(done)
		{
			registerArgumentObject = rioArgFile.getRegisterArguments();
			done();
		});	
		
	});
}

function handleOriginalList()
{
	var oError = null;
	
	describe("Original Device List", function()
	{
		it("List Function Called", function(done)
		{
			rioFile.listRemoteIoDevices(function(listError, listDevices)
			{
				originalDeviceList = listDevices;
				oError = listError;
				
				done();
			});
		});
		
		it("List Successful", function(done)
		{
			spyFile.verifyRemoteIoListCalled(oError, listSpy.called, listSpy.lastCall);
			done();
		});
		
		it("Return Valid", function(done)
		{
			commonFile.callTestDeviceListValidReturnDynamic(originalDeviceList);
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
			addObject = commonFunctionsFile.cloneObject(commonJsonObjectsFile.crudDevice);
			
			rioFile.addRemoteIoDevice(addObject, function(aError, aID)
			{
				addID = aID;
				addError = aError;
				done();
			});
		});
		
		it("Add Successful", function(done)
		{
			spyFile.verifyAddDeviceCalled(addObject, addSpy.called, addSpy.lastCall);
			
			expect(addSpy.lastCall.exception).to.be.undefined;
			expect(addError).to.be.null;
			
			commonFunctionsFile.testPresent(addID);
			commonFunctionsFile.testString(addID);
					
			testID = addID;
			
			addSpy.restore();
			done();
		});
		
		it("Test ID Retained", function(done)
		{
			commonFunctionsFile.testPresent(testID);
			commonFunctionsFile.testString(testID);
			expect(testID).to.equal(addID);
			done();
		});
	});
}


function handleTestConfig()
{
	var conSpy = null;
	
	describe("Test Config", function()
	{
		it("Node Config Function Called", function(done)
		{
			conSpy = sinon.spy(commonJsonObjectsFile, 'getRegisterNode');
			registerConfigObject = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, registerArgumentObject.correctSet);
			done();
		});
		
		it("Function Successful", function(done)
		{
			spyFile.verifyGetNodeConfigCalled(testID, conSpy.called, conSpy.lastCall);
			
			conSpy.restore();
			done();
		});
		
		it("Correct Return Structure", function(done)
		{
			commonFunctionsFile.testPresent(registerConfigObject);
			expect(registerConfigObject).to.be.an("object");
			commonFile.callTestNodeConfigObjectStructure(registerConfigObject);
			
			done();
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
			var iFormatObject = commonJsonObjectsFile.getRegisterNode(testID, "???", registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, iFormatObject);
			done();
		});
		
		it("Invalid ID Type", function(done)
		{
			var iTypeObject = commonJsonObjectsFile.getRegisterNode(testID, -1, registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, iTypeObject);
			done();
		});
		
		it("Null", function(done)
		{
			var iPropObject = commonJsonObjectsFile.getRegisterNode(testID, null, registerArgumentObject.correctSet);
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, iPropObject);
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
			var iOverflow = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, "RO-10000");
			coordinateRegisterNodeInvalidNeutral(registerArgumentObject.regMode, iOverflow);
			
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
			var iTypeSet = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, -1);
			coordinateRegisterNodeInvalidThrow(registerArgumentObject.regMode, iTypeSet, "ioSetId.split is not a function");
			
			done();
		});
		
		it("Null", function(done)
		{
			var iNullSet = commonJsonObjectsFile.getRegisterNode(testID, registerArgumentObject.correctID, null);
			coordinateRegisterNodeInvalidThrow(registerArgumentObject.regMode, iNullSet, "Cannot read property 'split' of null");
			
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
		
		commonFunctionsFile.testPresent(callbackParse);
		commonFunctionsFile.testString(callbackParse);
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
			console.log(regErr);
		});
	}
	catch(e)
	{
		regComplete = false;
		regMessage = e.message;
	}
	
	var regRes = [regComplete, regMessage];
	commonFunctionsFile.testInvalidFunctionResult(regRes, expectedThrownError);
}

function getCallbackErrorMessage(eObject)
{
	var eType = typeof eObject;
	var mRes = null;
	
	if (eType === 'object')
	{
		mRes = eObject.message;
	}
	else if (eType === 'string')
	{
		mRes = eObject;
	}
	else
	{
		mRes = null;
	}
	
	return mRes;
}



function handleTestDelete()
{
	var deleteSpy = null;
	var deleteConfirmed = false;
	
	describe("Delete Test Device", function()
	{
		it("Delete Function Called", function(done)
		{
			deleteSpy = sinon.spy(rioFile, 'delRemoteIoDevice');
			
			rioFile.delRemoteIoDevice(testID, true, function()
			{
				deleteConfirmed = true;
				done();
			});
		});
		
		it("Delete Successful", function(done)
		{
			spyFile.verifyDeleteDeviceCalled(testID, true, deleteSpy.called, deleteSpy.lastCall);
			expect(deleteSpy.lastCall.exception).to.be.undefined;
			expect(deleteConfirmed).to.be.true;
			done();
		});
		
		it("Delete Test Complete", function(done)
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
			commonFile.callTestDeviceListValidReturnDynamic(postList);
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
		it("Function Spy Objects", function()
		{
			listSpy.restore();
			registerSpy.restore();
		});
		
		it("Test Device ID", function()
		{
			testID = null;
		});
		
		it("Argument Object", function()
		{
			registerArgumentObject = null;
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


function getRequiredRegisterFile(rPth)
{
	var res = null;
	
	try
	{
		res = require(rPth);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestRemoteIoIndexRegisterInvalid = testRemoteIoIndexRegisterInvalid;
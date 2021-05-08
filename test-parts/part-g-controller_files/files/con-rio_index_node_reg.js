const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const loadFoxFile = require(commonPaths.loadFox);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const rioFile = loadFoxFile(foxPath.rioIndexFile);
const rioSetFile = loadFoxFile(foxPath.rioSettingsFile);
const commonFile = require(commonPaths.rioCommonFile);
const spyFile = require("../sub-files/rio-spy_functions");
const registerArguments = require("../sub-files/rio-node_args");

var correctPrefix = null;
var correctIndex = null;
var correctBinary = null;

var origDeviceList = null;
var nodeTestID = null;
var nodeTestObject = null;
var nodeConfigObject = null;



function testRemoteIoIndexNodeReg()
{
	describe("Remote IO Index Node Functions", function()
	{
		handleNodePrepare();
		
		handleBeforeList();
		handleStaticAdd();
		handleStaticGet();
		handleCheckNodeExist();
		handleGetIoProperties();
		handleNodeConfig();
		handleRegisterNode();
		handleSetDeviceOutput();
		handleStaticDeleteObject();
		handleAfterList();
		
		handleNodeDispose();
	});
}


function handleNodePrepare()
{
	describe("Preperation", function()
	{
		
		it("Files Loaded", function()
		{
			commonFunctionsFile.testPresent(rioFile);
			commonFunctionsFile.testPresent(rioSetFile);
		});
		
		it("Function Arguments Assigned", function(done)
		{
			correctPrefix = rioSetFile.ioPrefixes.RO;
			correctIndex = 3;
			correctBinary = rioSetFile.binSignal.ON;
			
			done();
		});
	});
}


function handleBeforeList()
{
	var beforeListSpy = null;
	var beforeError = null;
	
	describe("List All Devices (listRemoteIoDevices, remote-io.index)", function()
	{
		
		it("Spy Assigned", function(done)
		{
			beforeListSpy = sinon.spy(rioFile, 'listRemoteIoDevices');
			done();
		});
		
		it("List Function Called", function(done)
		{
			rioFile.listRemoteIoDevices(function(err, devices)
			{
				origDeviceList = devices;
				beforeError = err;
				done();
			});
			
		});
		
		it("Function Called Successfully", function(done)
		{
			spyFile.verifyRemoteIoListCalled(beforeError, beforeListSpy.called, beforeListSpy.firstCall);
			done();
		});
		
		it("Return Valid", function(done)
		{
			commonFile.callTestDeviceListValidReturnDynamic(origDeviceList);
			done();
		});
		
		it("Spy Disposed", function(done)
		{
			beforeListSpy.restore();
			done();
		});
		
	});	
}

function handleStaticAdd()
{
	describe("Add Static Object (addRemoteIoDevice, remote-io.index)", function()
	{
		var staticAddSpy = null;
		var staticID = null;
		var staticErr = null;
		
		it("Spy Assigned", function(done)
		{
			staticAddSpy = sinon.spy(rioFile, 'addRemoteIoDevice');
			done();
		});
		
		it("Add Function Called", function(done)
		{
			rioFile.addRemoteIoDevice(commonJsonObjectsFile.nodeDevice, function(addingErr, addedID)
			{
				staticID = addedID;
				staticErr = addingErr;
				done();
			});
		});
		
		it("Add Successful", function(done)
		{
			spyFile.verifyAddDeviceCalled(commonJsonObjectsFile.nodeDevice, staticAddSpy.called, staticAddSpy.firstCall);
			
			expect(staticAddSpy.firstCall.exception).to.be.undefined;
			expect(staticErr).to.be.null;
			
			commonFunctionsFile.testPresent(staticID);
			commonFunctionsFile.testString(staticID);
					
			nodeTestID = staticID;
			done();
		});
		
		it("Object ID Retained", function(done)
		{
			expect(nodeTestID).to.equal(staticID);
			done();
		});
		
		it("Spy Disposed", function(done)
		{
			staticAddSpy.restore();
			done();
		});
		
	});
}

function handleStaticGet()
{
	describe("Get Static Object (getRemoteIoDevice, remote-io.index)", function()
	{
		var staticGetSpy = null;
		var staticErr = null;
		
		it("Spy Assigned", function(done)
		{
			staticGetSpy = sinon.spy(rioFile, 'getRemoteIoDevice');
			done();
		});
		
		it("Get Function Called", function(done)
		{
			rioFile.getRemoteIoDevice(nodeTestID, function(gError, gDevice)
			{
				nodeTestObject = gDevice;
				staticErr = gError;
				done();
			});
		});
		
		it("Get Successful", function(done)
		{
			spyFile.verifyGetDeviceCalled(nodeTestID, staticGetSpy.called, staticGetSpy.firstCall);
			expect(staticGetSpy.firstCall.exception).to.be.undefined;
			expect(staticErr).to.be.null;
			
			commonFunctionsFile.testPresent(nodeTestObject);
			expect(nodeTestObject).to.be.an("object");
			commonFile.callTestDeviceObjectStructure(nodeTestObject);
			
			done();
		});
		
		it("Retrieved Object Matches Original", function(done)
		{
			expect(nodeTestObject.id).to.equal(nodeTestID);
			commonFile.callCompareGetDeviceToOriginal(nodeTestObject, commonJsonObjectsFile.nodeDevice);
			done();
		});
		
		it("Spy Disposed", function(done)
		{
			staticGetSpy.restore();
			done();
		});
		
		
	});
}


function handleCheckNodeExist()
{
	describe("Function - Check Node Exists (isNodeExists, remote-io.index)", function()
	{
		var checkExistRes = null;
		
		describe("Valid Device ID", function()
		{
			it("Function Called", function(done)
			{
				checkExistRes = rioFile.isNodeExists(nodeTestID);
				done();
			});
			
			it("Correct Return Value", function()
			{
				expect(checkExistRes).to.be.true;
			});
			
		});
		
		describe("Invalid Calls", function()
		{
			it("Unknown Device ID", function()
			{
				coordinateCheckNodeExistInvalidCall(commonJsonObjectsFile.unknownID);
			});
			
			it("Invalid Type", function()
			{
				coordinateCheckNodeExistInvalidCall(-1);
			});
			
			it("Null", function()
			{
				coordinateCheckNodeExistInvalidCall(null);
			});
			
		});
		
	});
}




function handleGetIoProperties()
{
	describe("Function - Get IO Properties (getIoProperties, remote-io.index)", function()
	{
		var propertyRes = null;
		
		describe("Valid Device ID", function()
		{
			it("Function Called", function(done)
			{
				propertyRes = rioFile.getIoProperties(nodeTestID);
				done();
			});
			
			it("Property Object Returned", function()
			{
				commonFunctionsFile.testPresent(propertyRes);
				expect(propertyRes).to.be.an("object");
			});
			
			it("Object Structure Valid", function()
			{
				commonFunctionsFile.testObjectPropertyDefinition(propertyRes, 'name');
				commonFunctionsFile.testObjectPropertyDefinition(propertyRes, 'STATUS');
				commonFunctionsFile.testObjectPropertyDefinition(propertyRes, 'CONTROL');
				
				commonFunctionsFile.testString(propertyRes.name);
				commonFunctionsFile.testArrayPopulated(propertyRes.STATUS);
				commonFunctionsFile.testArrayPopulated(propertyRes.CONTROL);
			});
			
			it("Status and Control Arrays Valid", function()
			{
				commonFile.callTestPropertyArrayStructure(propertyRes.STATUS);
				commonFile.callTestPropertyArrayStructure(propertyRes.CONTROL);
			});
			
			it("Matching Names", function()
			{
				expect(propertyRes.name).to.equal(commonJsonObjectsFile.nodeDevice.name);
			});
			
		});
		
		describe("Invalid Calls", function()
		{
			it("Unknown Device ID", function()
			{
				coordinateGetIoPropertiesInvalidCall(commonJsonObjectsFile.unknownID);
			});
			
			it("Invalid Type", function()
			{
				coordinateGetIoPropertiesInvalidCall(-1);
			});
			
			it("Null", function()
			{
				coordinateGetIoPropertiesInvalidCall(null);
			});
			
		});
		
	});
	
}




function handleNodeConfig()
{
	describe("Function - Get Node Config Object (getRegisterNode, common-objects)", function()
	{
		it("Function Called", function(done)
		{
			nodeConfigObject = commonJsonObjectsFile.getRegisterNode(nodeTestID, registerArguments.correctID, registerArguments.correctSet);
			done();
		});
		
		it("Correct Return Structure", function(done)
		{
			commonFunctionsFile.testPresent(nodeConfigObject);
			expect(nodeConfigObject).to.be.an("object");
			commonFile.callTestNodeConfigObjectStructure(nodeConfigObject);
			done();
		});
		
		
		
	});
}



function handleRegisterNode()
{
	var registerSpy = null;
	var unregisterNodeSpy = null;
	var registerReturn = null;
	var registerComplete = false;
	
	describe("Function - Register Node (registerNode, remote-io.index)", function()
	{	
		
		describe("Valid Register (registerNode, remote-io-index)", function()
		{
			
			it("Register Spy Assigned", function(done)
			{
				registerSpy = sinon.spy(rioFile, 'registerNode');
				done();
			});
			
			it("Register Called", function(done)
			{
				rioFile.registerNode(registerArguments.regMode, nodeConfigObject, function(retError, retObject)
				{
					registerComplete = true;
				});
				
				done();
			});
			
			
			it("Register Successful", function(done)
			{
				spyFile.verifyRegisterNodeCalled(registerSpy.called, registerSpy.firstCall, registerArguments.regMode, nodeConfigObject);
				expect(registerSpy.firstCall.exception).to.be.undefined;
				done();
			});
			
			it("Callback Function Returned", function(done)
			{
				commonFunctionsFile.testPresent(registerSpy.firstCall.returnValue);
				expect(registerSpy.firstCall.returnValue).to.be.a("function");
				registerReturn = registerSpy.firstCall.returnValue;
				done();
			});
			
			
			it("Register Spy Disposed", function(done)
			{
				registerSpy.restore();
				done();
			});
			
		});
		
		describe("Valid Unregister (registerNode callback, device-model.class)", function()
		{
			
			it("Callback Function Remembered", function(done)
			{
				commonFunctionsFile.testPresent(registerReturn);
				expect(registerReturn).to.be.a("function");
				done();
			});
			
			it("Unregister Spy Assigned", function(done)
			{
				unregisterNodeSpy = sinon.spy(registerReturn);
				done();
			});
			
			it("Unregister Function Called", function(done)
			{
				unregisterNodeSpy();
				done();
			});
			
			it("Unregister Function Successful", function(done)
			{
				expect(unregisterNodeSpy.calledOnce).to.be.true;
				commonFunctionsFile.testPresent(unregisterNodeSpy.firstCall);
				
				commonFunctionsFile.testPresent(unregisterNodeSpy.firstCall.args);
				expect(unregisterNodeSpy.firstCall.args).to.be.an("array");
				expect(unregisterNodeSpy.firstCall.args).to.deep.equal([]);
				
				expect(unregisterNodeSpy.firstCall.callback).to.be.undefined;
				expect(unregisterNodeSpy.firstCall.returnValue).to.be.undefined;
				expect(unregisterNodeSpy.firstCall.exception).to.be.undefined;
				
				done();
			});
			
			it("Unregister Spy Disposed", function(done)
			{
				unregisterNodeSpy = null;
				done();
			});	
		});
		
		
	});
}


function handleSetDeviceOutput()
{
	
	var setDeviceOutputSpy = null;
	var setInvalidSpy = null;
	
	describe("Function - Set Device Output (remote-io.index, setDeviceOutput)", function()
	{
		
		describe("Valid Device ID", function()
		{
			it("Spy Assigned", function(done)
			{
				setDeviceOutputSpy = sinon.spy(rioFile, 'setDeviceOutput');
				done();
			});
			
			it("Set Output Function Called", function(done)
			{
				rioFile.setDeviceOutput(nodeTestID, correctPrefix, correctIndex, correctBinary);
				done();
			});
			
			it("Set Output Function Successful", function()
			{
				callSetDeviceOutputVerification(setDeviceOutputSpy.called, setDeviceOutputSpy.firstCall, nodeTestID, correctPrefix, correctIndex, correctBinary);
				expect(setDeviceOutputSpy.firstCall.exception).to.be.undefined;
			});
			
			it("Spy Disposed", function(done)
			{
				setDeviceOutputSpy.restore();
				done();
			});
			
		});
		
		
		describe("Invalid Calls", function()
		{
			it("Spy Assigned", function(done)
			{
				setInvalidSpy = sinon.spy(rioFile, 'setDeviceOutput');
				done();
			});
			
			it("Unknown Device ID", function(done)
			{
				coordinateSetDeviceOutputInvalidCall(setInvalidSpy, commonJsonObjectsFile.unknownID, correctPrefix, correctIndex, correctBinary);
				done();
			});
			
			it("Invalid ID Type", function(done)
			{
				//coordinateSetDeviceOutputInvalidCall(setInvalidSpy, -1, correctPrefix, correctIndex, correctBinary);
				coordinateSetDeviceOutputInvalidCall(setInvalidSpy, null, correctPrefix, correctIndex, correctBinary);
				done();
			});
			
			it("Invalid Prefix", function(done)
			{
				//coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, "XYZ", correctIndex, correctBinary);
				//coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, -1, correctIndex, correctBinary);
				coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, null, correctIndex, correctBinary);
				done();
			});
			
			it("Invalid Index", function(done)
			{	
				coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, correctPrefix, NaN, correctBinary);
				//coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, correctPrefix, "3", correctBinary);
				//coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, correctPrefix, null, correctBinary);
				done();
			});
			
			it("Overflow Index", function(done)
			{
				coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, correctPrefix, 10000, correctBinary);
				done();
			});
			
			it("Invalid Binary Signal", function(done)
			{
				//coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, correctPrefix, correctIndex, "UNKNOWN");
				//coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, correctPrefix, correctIndex, -1);
				coordinateSetDeviceOutputInvalidCall(setInvalidSpy, nodeTestID, correctPrefix, correctIndex, null);
				done();
			});
			
			it("Spy Disposed", function(done)
			{
				setInvalidSpy.restore();
				done();
			});
			
		});
		
		
	});
}


function handleStaticDeleteObject()
{
	describe("Delete Static Object (delRemoteIoDevice, remote-io-index)", function()
	{
		var deleteSpy = null;
		var deleteFinished = false;
		
		
		it("Spy Assigned", function(done)
		{
			deleteSpy = sinon.spy(rioFile, 'delRemoteIoDevice');
			done();
		});
		
		it("Delete Function Called", function(done)
		{
			rioFile.delRemoteIoDevice(nodeTestID, true, function()
			{
				deleteFinished = true;
				done();
			});
		});
		
		it("Delete Successful", function(done)
		{
			spyFile.verifyDeleteDeviceCalled(nodeTestID, true, deleteSpy.called, deleteSpy.firstCall);
			expect(deleteSpy.firstCall.exception).to.be.undefined;
			expect(deleteFinished).to.be.true;
			done();
		});
		
		it("Spy Disposed", function(done)
		{
			deleteSpy.restore();
			done();
		});
		
	});
}



function handleAfterList()
{
	var afterListSpy = null;
	var afterListArray = null;
	var afterError = null;
	
	describe("Compare Device List (listRemoteIoDevices, remote-io.index)", function()
	{
		it("Spy Assigned", function(done)
		{
			afterListSpy = sinon.spy(rioFile, 'listRemoteIoDevices');
			done();
		});
		
		it("Function Called", function(done)
		{
			rioFile.listRemoteIoDevices(function(aErr, aDevices)
			{
				afterListArray = aDevices;
				afterError = aErr;
				done();
			});
			
		});
		
		
		it("Call Successful", function()
		{
			spyFile.verifyRemoteIoListCalled(afterError, afterListSpy.called, afterListSpy.firstCall);
		});
		
		it("Return Valid", function()
		{
			commonFile.callTestDeviceListValidReturnDynamic(afterListArray);
		});
		
		it("Test Device Absent", function()
		{
			var listFlag = commonFile.callTestIdListed(afterListArray, nodeTestID);
			expect(listFlag).to.be.false;
		});
		
		it("Device List Intact", function()
		{
			expect(afterListArray).to.deep.equal(origDeviceList);
		});
		
		it("Spy Disposed", function(done)
		{
			afterListSpy.restore();
			done();
		});
		
		
	});
}


function handleNodeDispose()
{
	describe("Dispose", function()
	{	
		it("Function Arguments", function()
		{
			correctPrefix = null;
			correctIndex = null;
			correctBinary = null;
		});
		
		it("Original Device List", function()
		{
			origDeviceList = null;
		});
		
		it("Node Test Variables", function()
		{
			nodeTestID = null;
			nodeTestObject = null;
			nodeConfigObject = null;
		});
		
	});
}

function callSetDeviceOutputVerification(sdoSpyCalled, sdoCallObject, sdoID, sdoPre, sdoInd, sdoBin)
{
	spyFile.verifySetDeviceOutputCalled(sdoSpyCalled, sdoCallObject, sdoID, sdoPre, sdoInd, sdoBin);
}



function coordinateSetDeviceOutputInvalidCall(invalidSpy, invalidID, invalidPrefix, invalidIndex, invalidToggle)
{
	rioFile.setDeviceOutput(invalidID, invalidPrefix, invalidIndex, invalidToggle);
	callSetDeviceOutputVerification(true, invalidSpy.lastCall, invalidID, invalidPrefix, invalidIndex, invalidToggle);
}



function coordinateCheckNodeExistInvalidCall(invalidArg)
{
	var invalidRes = rioFile.isNodeExists(invalidArg);
	expect(invalidRes).to.be.false;
}



function coordinateGetIoPropertiesInvalidCall(invalidArg)
{
	var ioComplete = false;
	var ioError = "";
	
	try
	{
		rioFile.getIoProperties(invalidArg);
		ioComplete = true;
	}
	catch(e)
	{
		ioComplete = false;
		ioError = e.message;
	}
	
	var ioRes = [ioComplete, ioError];
	commonFunctionsFile.testInvalidFunctionResult(ioRes, commonErrorStringsFile.rioPropertiesUndefined);
}


module.exports =
{
	callTestRemoteIoIndexNodeReg: testRemoteIoIndexNodeReg
};
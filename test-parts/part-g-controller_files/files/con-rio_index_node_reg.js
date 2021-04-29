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

const rioFile = getIndexFileRequirement(foxPath.rioIndexFile);
const rioSetFile = require(foxPath.rioSettingsFile);
const commonFile = getIndexFileRequirement(subCommonPath.rioCommonFile);
const spyFile = getIndexFileRequirement("../sub-files/rio-spy_functions");
const rioArgFile = getIndexFileRequirement("../sub-files/rio-node_args");

var listAllSpy = null;
var addObjectSpy = null;
var getObjectSpy = null;
var checkNodeExistSpy = null;
var propertySpy = null;
var nodeObjectSpy = null;
var registerNodeSpy = null;
var setOutputSpy = null;
var deleteObjectSpy = null;

var registerArguments = null;
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
		it("Remote IO Index", function(done)
		{
			commonFunctionsFile.testPresent(rioFile);
			commonFunctionsFile.testType(rioFile, 'object');
			done();
		});
		
		it("Remote IO Settings", function(done)
		{
			commonFunctionsFile.testPresent(rioSetFile);
			commonFunctionsFile.testType(rioSetFile, 'object');
			done();
		});
		
		it("Sub-Files", function(done)
		{
			commonFunctionsFile.testPresent(commonFile);
			commonFunctionsFile.testType(commonFile, 'object');
			
			commonFunctionsFile.testPresent(spyFile);
			commonFunctionsFile.testType(spyFile, 'object');
			
			commonFunctionsFile.testPresent(rioArgFile);
			commonFunctionsFile.testType(rioArgFile, 'object');
			
			done();
		});
		
		
		
		it("Spy Objects Assigned", function(done)
		{
			listAllSpy = sinon.spy(rioFile, 'listRemoteIoDevices');
			addObjectSpy = sinon.spy(rioFile, 'addRemoteIoDevice');
			getObjectSpy = sinon.spy(rioFile, 'getRemoteIoDevice');
			checkNodeExistSpy = sinon.spy(rioFile, 'isNodeExists');
			propertySpy = sinon.spy(rioFile, 'getIoProperties');
			nodeObjectSpy = sinon.spy(commonJsonObjectsFile, 'getRegisterNode');
			registerNodeSpy = sinon.spy(rioFile, 'registerNode');
			setOutputSpy = sinon.spy(rioFile, 'setDeviceOutput');
			deleteObjectSpy = sinon.spy(rioFile, 'delRemoteIoDevice');
			
			done();
		});
		
		it("Function Arguments Assigned", function(done)
		{
			registerArguments = rioArgFile.getRegisterArguments();
			correctPrefix = rioSetFile.ioPrefixes.RO;
			correctIndex = 3;
			correctBinary = rioSetFile.binSignal.ON;
			
			done();
		});
		
		
	});
}


function handleBeforeList()
{
	var beforeError = null;
	
	describe("List All Devices (listRemoteIoDevices, remote-io.index)", function()
	{
		it("List Function Called", function(done)
		{
			rioFile.listRemoteIoDevices((err, devices) =>
			{
				origDeviceList = devices;
				beforeError = err;
				done();
			});
			
		});
		
		it("Function Called Successfully", function()
		{
			spyFile.verifyRemoteIoListCalled(beforeError, listAllSpy.called, listAllSpy.lastCall);
		});
		
		it("Return Valid", function()
		{
			commonFile.callTestDeviceListValidReturnDynamic(origDeviceList);
		});
	});	
}

function handleStaticAdd()
{
	describe("Add Static Object (addRemoteIoDevice, remote-io.index)", function()
	{
		var sCallbackID = null;
		var sCallbackErr = null;
		
		it("Add Function Called", function(done)
		{
			rioFile.addRemoteIoDevice(commonJsonObjectsFile.nodeDevice, function(aError, aID)
			{
				sCallbackID = aID;
				sCallbackErr = aError;
				done();
			});
		});
		
		it("Add Successful", function(done)
		{
			spyFile.verifyAddDeviceCalled(commonJsonObjectsFile.nodeDevice, addObjectSpy.called, addObjectSpy.lastCall);
			
			expect(addObjectSpy.lastCall.exception).to.be.undefined;
			commonFunctionsFile.testNull(sCallbackErr);
			
			commonFunctionsFile.testPresent(sCallbackID);
			commonFunctionsFile.testString(sCallbackID);
					
			nodeTestID = sCallbackID;
			done();
		});
		
		it("Object ID Retained", function(done)
		{
			commonFunctionsFile.testPresent(nodeTestID);
			commonFunctionsFile.testString(nodeTestID);
			done();
		});
		
	});
}

function handleStaticGet()
{
	describe("Get Static Object (getRemoteIoDevice, remote-io.index)", function()
	{
		var sObjectError = null;
		
		it("Get Function Called", function(done)
		{
			rioFile.getRemoteIoDevice(nodeTestID, (gError, gDevice) =>
			{
				nodeTestObject = gDevice;
				sObjectError = gError;
				done();
			});
		});
		
		it("Get Successful", function(done)
		{
			spyFile.verifyGetDeviceCalled(nodeTestID, getObjectSpy.called, getObjectSpy.lastCall);
			expect(getObjectSpy.lastCall.exception).to.be.undefined;
			commonFunctionsFile.testNull(sObjectError);
			
			commonFunctionsFile.testPresent(nodeTestObject);
			commonFunctionsFile.testType(nodeTestObject, 'object');
			commonFile.callTestDeviceObjectStructure(nodeTestObject);
			
			done();
		});
		
		it("Retrieved Object Matches Original", function(done)
		{
			expect(nodeTestObject.id).to.equal(nodeTestID);
			commonFile.callCompareGetDeviceToOriginal(nodeTestObject, commonJsonObjectsFile.nodeDevice);
			done();
		});
		
		
	});
}


function handleCheckNodeExist()
{
	describe("Function - Check Node Exists (isNodeExists, remote-io.index)", function()
	{
		var checkNodeExistReturn = null;
		
		describe("Valid Device ID", function()
		{
			it("Function Called", function(done)
			{
				checkNodeExistReturn = rioFile.isNodeExists(nodeTestID);
				done();
			});
			
			it("Call Successful", function()
			{
				spyFile.verifyCheckNodeExistCalled(nodeTestID, checkNodeExistSpy.called, checkNodeExistSpy.lastCall);
				expect(checkNodeExistSpy.lastCall.exception).to.be.undefined;
			});
			
			it("Correct Return Value", function()
			{
				commonFunctionsFile.testType(checkNodeExistReturn, 'boolean');
				commonFunctionsFile.testTrue(checkNodeExistReturn);
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
		var getIoPropertiesReturn = null;
		
		describe("Valid Device ID", function()
		{
			it("Function Called", function(done)
			{
				getIoPropertiesReturn = rioFile.getIoProperties(nodeTestID);
				done();
			});
			
			it("Call Successful", function()
			{
				spyFile.verifyGetIoPropertiesCalled(nodeTestID, propertySpy.called, propertySpy.lastCall);
				expect(propertySpy.lastCall.exception).to.be.undefined;
			});
			
			it("Property Object Returned", function()
			{
				commonFunctionsFile.testPresent(getIoPropertiesReturn);
				commonFunctionsFile.testType(getIoPropertiesReturn, 'object');
			});
			
			it("Object Structure Valid", function()
			{
				commonFunctionsFile.testObjectPropertyDefinition(getIoPropertiesReturn, 'name');
				commonFunctionsFile.testObjectPropertyDefinition(getIoPropertiesReturn, 'STATUS');
				commonFunctionsFile.testObjectPropertyDefinition(getIoPropertiesReturn, 'CONTROL');
				
				commonFunctionsFile.testString(getIoPropertiesReturn.name);
				commonFunctionsFile.testArray(getIoPropertiesReturn.STATUS);
				commonFunctionsFile.testArray(getIoPropertiesReturn.CONTROL);
			});
			
			it("Status and Control Arrays Valid", function()
			{
				commonFile.callTestPropertyArrayStructure(getIoPropertiesReturn.STATUS);
				commonFile.callTestPropertyArrayStructure(getIoPropertiesReturn.CONTROL);
			});
			
			it("Matching Name", function()
			{
				expect(getIoPropertiesReturn.name).to.equal(commonJsonObjectsFile.nodeDevice.name);
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
		it("Node Config Function Called", function(done)
		{
			nodeConfigObject = commonJsonObjectsFile.getRegisterNode(nodeTestID, registerArguments.correctID, registerArguments.correctSet);
			done();
		});
		
		it("Node Config Function Successful", function(done)
		{
			spyFile.verifyGetNodeConfigCalled(nodeTestID, nodeObjectSpy.called, nodeObjectSpy.lastCall);
			done();
		});
		
		it("Correct Return Structure", function(done)
		{
			commonFunctionsFile.testPresent(nodeConfigObject);
			commonFunctionsFile.testType(nodeConfigObject, 'object');
			commonFile.callTestNodeConfigObjectStructure(nodeConfigObject);
			done();
		});
		
		
		
	});
}



function handleRegisterNode()
{
	var registerReturn = null;
	
	describe("Function - Register Node (registerNode, remote-io.index)", function()
	{	
		
		describe("Valid Register (registerNode, remote-io-index)", function()
		{
			
			it("Register Function Called", function(done)
			{
				rioFile.registerNode(registerArguments.regMode, nodeConfigObject, function(retError, retObject)
				{
					commonFunctionsFile.displayCallbackMessage("Register Function Complete.", retError, retObject);
				});
				
				done();
			});
			
			
			it("Register Function Successful", function(done)
			{
				spyFile.verifyRegisterNodeCalled(registerNodeSpy.called, registerNodeSpy.lastCall, registerArguments.regMode, nodeConfigObject);
				expect(registerNodeSpy.lastCall.exception).to.be.undefined;
				done();
			});
			
			it("Callback Function Returned", function(done)
			{
				commonFunctionsFile.testPresent(registerNodeSpy.lastCall.returnValue);
				commonFunctionsFile.testType(registerNodeSpy.lastCall.returnValue, 'function');
				registerReturn = registerNodeSpy.lastCall.returnValue;
				done();
			});
			
		});
		
		describe("Valid Unregister (registerNode callback, device-model.class)", function()
		{
			var unregisterNodeSpy = null;
			
			it("Callback Function Remembered", function(done)
			{
				commonFunctionsFile.testPresent(registerReturn);
				commonFunctionsFile.testType(registerReturn, 'function');
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
				commonFunctionsFile.testTrue(unregisterNodeSpy.calledOnce);
				commonFunctionsFile.testPresent(unregisterNodeSpy.firstCall);
				
				commonFunctionsFile.testPresent(unregisterNodeSpy.firstCall.args);
				commonFunctionsFile.testArrayNeutral(unregisterNodeSpy.firstCall.args);
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
	
	describe("Function - Set Device Output (remote-io.index, setDeviceOutput)", function()
	{
		
		describe("Valid Device ID", function()
		{
			it("Set Output Function Called", function(done)
			{
				rioFile.setDeviceOutput(nodeTestID, correctPrefix, correctIndex, correctBinary);
				done();
			});
			
			it("Set Output Function Successful", function()
			{
				callSetDeviceOutputVerification(nodeTestID, correctPrefix, correctIndex, correctBinary);
				expect(setOutputSpy.lastCall.exception).to.be.undefined;
			});
			
		});
		
		
		describe("Invalid Calls", function()
		{
			it("Unknown Device ID", function()
			{
				coordinateSetDeviceOutputInvalidCall(commonJsonObjectsFile.unknownID, correctPrefix, correctIndex, correctBinary);
			});
			
			it("Invalid ID Type", function()
			{
				coordinateSetDeviceOutputInvalidCall(-1, correctPrefix, correctIndex, correctBinary);
				coordinateSetDeviceOutputInvalidCall(null, correctPrefix, correctIndex, correctBinary);
			});
			
			it("Invalid Prefix", function()
			{
				coordinateSetDeviceOutputInvalidCall(nodeTestID, "XYZ", correctIndex, correctBinary);
				coordinateSetDeviceOutputInvalidCall(nodeTestID, -1, correctIndex, correctBinary);
				coordinateSetDeviceOutputInvalidCall(nodeTestID, null, correctIndex, correctBinary);
			});
			
			it("Invalid Index", function()
			{	
				coordinateSetDeviceOutputInvalidCall(nodeTestID, correctPrefix, NaN, correctBinary);
				coordinateSetDeviceOutputInvalidCall(nodeTestID, correctPrefix, "3", correctBinary);
				coordinateSetDeviceOutputInvalidCall(nodeTestID, correctPrefix, null, correctBinary);
			});
			
			it("Overflow Index", function()
			{
				var indexOverflowError = "Example Message";
				coordinateSetDeviceOutputInvalidCall(nodeTestID, correctPrefix, 10000, correctBinary);
			});
			
			it("Invalid Binary Signal", function()
			{
				coordinateSetDeviceOutputInvalidCall(nodeTestID, correctPrefix, correctIndex, "UNKNOWN");
				coordinateSetDeviceOutputInvalidCall(nodeTestID, correctPrefix, correctIndex, -1);
				coordinateSetDeviceOutputInvalidCall(nodeTestID, correctPrefix, correctIndex, null);
			});
			
		});
		
		
	});
}




function callSetDeviceOutputVerification(sdoID, sdoPre, sdoInd, sdoBin)
{
	spyFile.verifySetDeviceOutputCalled(setOutputSpy.called, setOutputSpy.lastCall, sdoID, sdoPre, sdoInd, sdoBin);
}



function coordinateSetDeviceOutputInvalidCall(invalidID, invalidPrefix, invalidIndex, invalidToggle)
{
	rioFile.setDeviceOutput(invalidID, invalidPrefix, invalidIndex, invalidToggle);
	callSetDeviceOutputVerification(invalidID, invalidPrefix, invalidIndex, invalidToggle);
}



function coordinateCheckNodeExistInvalidCall(invalidArg)
{
	rioFile.isNodeExists(invalidArg);
	
	spyFile.verifyCheckNodeExistCalled(invalidArg, checkNodeExistSpy.called, checkNodeExistSpy.lastCall);
	expect(checkNodeExistSpy.lastCall.exception).to.be.undefined;
					
	commonFunctionsFile.testType(checkNodeExistSpy.lastCall.returnValue, 'boolean');
	commonFunctionsFile.testFalse(checkNodeExistSpy.lastCall.returnValue);
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
	commonFunctionsFile.testInvalidFunctionResult(ioRes, commonErrorStringsFile.getPropertiesUndefined);
}


function handleStaticDeleteObject()
{
	describe("Delete Static Object (delRemoteIoDevice, remote-io-index)", function()
	{
		var objCallFlag = false;
		
		it("Delete Function Called", function(done)
		{
			rioFile.delRemoteIoDevice(nodeTestID, true, function()
			{
				objCallFlag = true;
				done();
			});
		});
		
		it("Delete Successful", function(done)
		{
			spyFile.verifyDeleteDeviceCalled(nodeTestID, true, deleteObjectSpy.called, deleteObjectSpy.lastCall);
			expect(deleteObjectSpy.lastCall.exception).to.be.undefined;
			commonFunctionsFile.testTrue(objCallFlag);
			done();
		});
		
	});
}



function handleAfterList()
{
	var afterList = null;
	var afterError = null;
	
	describe("Compare Device List (listRemoteIoDevices, remote-io.index)", function()
	{
		it("List Function Called", function(done)
		{
			rioFile.listRemoteIoDevices((aErr, aDevices) =>
			{
				afterList = aDevices;
				afterError = aErr;
				done();
			});
			
		});
		
		
		it("Function Called Successfully", function()
		{
			spyFile.verifyRemoteIoListCalled(afterError, listAllSpy.called, listAllSpy.lastCall);
		});
		
		it("Return Valid", function()
		{
			commonFile.callTestDeviceListValidReturnDynamic(afterList);
		});
		
		it("Test Device Absent", function()
		{
			var listFlag = commonFile.callTestIdListed(afterList, nodeTestID);
			commonFunctionsFile.testFalse(listFlag);
		});
		
		it("Device List Intact", function()
		{
			expect(afterList).to.deep.equal(origDeviceList);
		});
		
		
	});
}


function handleNodeDispose()
{
	describe("Dispose", function()
	{
		it("Spy Objects", function()
		{
			listAllSpy.restore();
			addObjectSpy.restore();
			getObjectSpy.restore();
			checkNodeExistSpy.restore();
			propertySpy.restore();
			nodeObjectSpy.restore();
			registerNodeSpy.restore();
			setOutputSpy.restore();
			deleteObjectSpy.restore();
		});
		
		it("Function Arguments", function()
		{
			registerArguments = null;
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

exports.callTestRemoteIoIndexNodeReg = testRemoteIoIndexNodeReg;
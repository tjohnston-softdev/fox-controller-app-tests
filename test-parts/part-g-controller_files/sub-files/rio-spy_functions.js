const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrorsFile);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);



function verifyRemoteIoList(listError, listCalled, callObject)
{
	commonFunctionsFile.testTrue(listCalled);
	commonFunctionsFile.testPresent(callObject);
		
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	commonFunctionsFile.testPresent(callObject.args[0]);
	commonFunctionsFile.testType(callObject.args[0], 'function');
	
	commonFunctionsFile.testPresent(callObject.callback);
	commonFunctionsFile.testType(callObject.callback, 'function');
					
	expect(callObject.exception).to.be.undefined;
	commonFunctionsFile.testNull(listError);
}

function verifyAddDevice(addDeviceArg, addCalled, callObject)
{
	commonFunctionsFile.testTrue(addCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(addDeviceArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	commonFunctionsFile.testType(callObject.args[1], 'function');
	
	commonFunctionsFile.testPresent(callObject.callback);
	commonFunctionsFile.testType(callObject.callback, 'function');
}

function verifyGetDevice(getDeviceArg, getCalled, callObject)
{
	commonFunctionsFile.testTrue(getCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(getDeviceArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	commonFunctionsFile.testType(callObject.args[1], 'function');
	
	commonFunctionsFile.testPresent(callObject.callback);
	commonFunctionsFile.testType(callObject.callback, 'function');
}

function verifyGetDeviceStatus(getStatusArg, getStatusCalled, callObject)
{
	commonFunctionsFile.testTrue(getStatusCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(getStatusArg);
}

function verifyCheckNodeExists(existArg, existCalled, callObject)
{
	commonFunctionsFile.testTrue(existCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(existArg);
}

function verifyGetIoProperties(propArg, propCalled, callObject)
{
	commonFunctionsFile.testTrue(propCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(propArg);
}


function verifyRegisterNode(regCalled, callObject, aMode, aObject)
{
	commonFunctionsFile.testTrue(regCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(aMode);
	
	expect(callObject.args[1]).to.not.be.undefined;
	expect(callObject.args[1]).to.equal(aObject);
	
	commonFunctionsFile.testPresent(callObject.args[2]);
	commonFunctionsFile.testType(callObject.args[2], 'function');
}



function verifySetDeviceOutput(setCalled, callObject, aID, aPrefix, aIndex, aToggle)
{
	commonFunctionsFile.testTrue(setCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	expect(callObject.args).to.deep.equal([aID, aPrefix, aIndex, aToggle]);
	
	expect(callObject.returnValue).to.be.undefined;
}


function verifyModifyDevice(modifyArg, modifyCalled, callObject)
{
	commonFunctionsFile.testTrue(modifyCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(modifyArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	commonFunctionsFile.testType(callObject.args[1], 'function');
	
	commonFunctionsFile.testPresent(callObject.callback);
	commonFunctionsFile.testType(callObject.callback, 'function');
}

function verifyDeleteDevice(deleteArg, flagArg, deleteCalled, callObject)
{
	commonFunctionsFile.testTrue(deleteCalled);
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArray(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(deleteArg);
	
	expect(callObject.args[1]).to.not.be.undefined;
	expect(callObject.args[1]).to.equal(flagArg);
	
	commonFunctionsFile.testPresent(callObject.args[2]);
	commonFunctionsFile.testType(callObject.args[2], 'function');
	
	commonFunctionsFile.testPresent(callObject.callback);
	commonFunctionsFile.testType(callObject.callback, 'function');
}



function verifyGetNodeConfig(ncIdArg, ncCalled, ncCallObject)
{
	commonFunctionsFile.testTrue(ncCalled);
	commonFunctionsFile.testPresent(ncCallObject);
	
	commonFunctionsFile.testPresent(ncCallObject.args);
	commonFunctionsFile.testArray(ncCallObject.args);
	
	expect(ncCallObject.args[0]).to.not.be.undefined;
	expect(ncCallObject.args[0]).to.equal(ncIdArg);
	
	expect(ncCallObject.exception).to.be.undefined;
}




exports.verifyRemoteIoListCalled = verifyRemoteIoList
exports.verifyAddDeviceCalled = verifyAddDevice;
exports.verifyGetDeviceCalled = verifyGetDevice;
exports.verifyGetDeviceStatusCalled = verifyGetDeviceStatus;
exports.verifyCheckNodeExistCalled = verifyCheckNodeExists
exports.verifyGetIoPropertiesCalled = verifyGetIoProperties;
exports.verifyModifyDeviceCalled = verifyModifyDevice;
exports.verifyRegisterNodeCalled = verifyRegisterNode;
exports.verifySetDeviceOutputCalled = verifySetDeviceOutput;
exports.verifyDeleteDeviceCalled = verifyDeleteDevice;
exports.verifyGetNodeConfigCalled = verifyGetNodeConfig;
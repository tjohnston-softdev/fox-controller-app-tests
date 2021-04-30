const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);



function verifyRemoteIoList(listError, listCalled, callObject)
{
	expect(listCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
		
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	commonFunctionsFile.testPresent(callObject.args[0]);
	expect(callObject.args[0]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
					
	expect(callObject.exception).to.be.undefined;
	expect(listError).to.be.null;
}

function verifyAddDevice(addDeviceArg, addCalled, callObject)
{
	expect(addCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(addDeviceArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	expect(callObject.args[1]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}

function verifyGetDevice(getDeviceArg, getCalled, callObject)
{
	expect(getCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(getDeviceArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	expect(callObject.args[1]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}

function verifyGetDeviceStatus(getStatusArg, getStatusCalled, callObject)
{
	expect(getStatusCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(getStatusArg);
}

function verifyCheckNodeExists(existArg, existCalled, callObject)
{
	expect(existCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(existArg);
}

function verifyGetIoProperties(propArg, propCalled, callObject)
{
	expect(propCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(propArg);
}


function verifyRegisterNode(regCalled, callObject, aMode, aObject)
{
	expect(regCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(aMode);
	
	expect(callObject.args[1]).to.not.be.undefined;
	expect(callObject.args[1]).to.equal(aObject);
	
	commonFunctionsFile.testPresent(callObject.args[2]);
	expect(callObject.args[2]).to.be.a("function");
}



function verifySetDeviceOutput(setCalled, callObject, aID, aPrefix, aIndex, aToggle)
{
	expect(setCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	expect(callObject.args).to.deep.equal([aID, aPrefix, aIndex, aToggle]);
	
	expect(callObject.returnValue).to.be.undefined;
}


function verifyModifyDevice(modifyArg, modifyCalled, callObject)
{
	expect(modifyCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(modifyArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	expect(callObject.args[1]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}

function verifyDeleteDevice(deleteArg, flagArg, deleteCalled, callObject)
{
	expect(deleteCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.not.be.undefined;
	expect(callObject.args[0]).to.equal(deleteArg);
	
	expect(callObject.args[1]).to.not.be.undefined;
	expect(callObject.args[1]).to.equal(flagArg);
	
	commonFunctionsFile.testPresent(callObject.args[2]);
	expect(callObject.args[2]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}



function verifyGetNodeConfig(ncIdArg, ncCalled, ncCallObject)
{
	expect(ncCalled).to.be.true;
	commonFunctionsFile.testPresent(ncCallObject);
	
	commonFunctionsFile.testPresent(ncCallObject.args);
	commonFunctionsFile.testArrayPopulated(ncCallObject.args);
	
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
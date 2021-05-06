const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);



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
	
	expect(callObject.args[0]).to.equal(getDeviceArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	expect(callObject.args[1]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}


function verifyRegisterNode(regCalled, callObject, aMode, aObject)
{
	expect(regCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.equal(aMode);
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

function verifyDeleteDevice(deleteArg, flagArg, deleteCalled, callObject)
{
	expect(deleteCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	commonFunctionsFile.testArrayPopulated(callObject.args);
	
	expect(callObject.args[0]).to.equal(deleteArg);
	expect(callObject.args[1]).to.equal(flagArg);
	
	commonFunctionsFile.testPresent(callObject.args[2]);
	expect(callObject.args[2]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}




exports.verifyRemoteIoListCalled = verifyRemoteIoList
exports.verifyAddDeviceCalled = verifyAddDevice;
exports.verifyGetDeviceCalled = verifyGetDevice;
exports.verifyRegisterNodeCalled = verifyRegisterNode;
exports.verifySetDeviceOutputCalled = verifySetDeviceOutput;
exports.verifyDeleteDeviceCalled = verifyDeleteDevice;
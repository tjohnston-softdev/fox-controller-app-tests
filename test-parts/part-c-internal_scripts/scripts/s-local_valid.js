const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const localValidFile = getLocalValidationFile();
const localCommonFile = require("../sub-scripts/common-local_valid");

var exampleSpy = null;

function testLocalValid()
{
	describe("Local Validation", function()
	{
		checkLocalValidationFileExists();
		handleExampleFunction();
		handleTimezoneOffsetFunction();
		handleDriveLetterFunction();
		handleDrivePathFunction();
		handleFilenameFunction();
		handleRioPrefixFunction();
		handleRequirementPathFunction();
		handleRioTextFunction();
	});
}

function checkLocalValidationFileExists()
{
	describe("File", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(localValidFile);
			commonFunctionsFile.testType(localValidFile, 'object');
		});
	});
}


function handleExampleFunction()
{
	var exampleSyntax = /^hello$/i;
	var exampleValid = "Hello";
	var exampleInvalid = "Invalid";
	
	var nullLengthError = "Cannot read property 'length' of null";
	var subjectSyntaxError = "subjectSyntax.test is not a function";
	
	describe("Example (validateExampleTest)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateExampleTest');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateExampleTest', 'function');
			exampleSpy = sinon.spy(localValidFile, 'validateExampleTest');
			done();
		});
		
		it("Call - Valid String", function()
		{
			callExampleValid(exampleValid, exampleSyntax, false, true);
		});
		
		it("Call - Valid Empty", function()
		{
			callExampleValid("", exampleSyntax, true, true);
		});
		
		
		it("Call - Invalid String", function()
		{
			callExampleValid(exampleInvalid, exampleSyntax, false, false);
		});
		
		it("Call - Invalid Empty", function()
		{
			callExampleValid("", exampleSyntax, false, false);
		});
		
		it("Call - Null", function()
		{
			callExampleInvalid(null, exampleSyntax, false, nullLengthError);
			callExampleInvalid(exampleValid, null, false, "Cannot read property 'test' of null");
			callExampleInvalid(null, null, null, nullLengthError);
		});
		
		it("Call - Empty Syntax", function()
		{
			callExampleInvalid(exampleValid, "", false, subjectSyntaxError);
		});
		
		it("Call - Invalid Type", function()
		{
			callExampleInvalid(exampleValid, -1, false, subjectSyntaxError);;
		});
		
		it("Complete", function()
		{
			exampleSpy.restore();
		});
		
	});
}


function handleTimezoneOffsetFunction()
{
	var timeEarlyValid = "GMT+1234";
	var timeLateValid = "GMT+2345";
	var timeEarlyInvalid = "GMT+0970";
	var timeLateInvalid = "GMT+5678";
	var timeWrongPrefix = "UTC+1234";
	
	var timeSpy = null;
	
	describe("Timezone Offset Code (validateTimezoneOffset)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateTimezoneOffset');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateTimezoneOffset', 'function');
			timeSpy = sinon.spy(localValidFile, 'validateTimezoneOffset');
			done();
		});
		
		it("Call - Early Valid", function()
		{
			localValidFile.validateTimezoneOffset(timeEarlyValid, false);
			localCommonFile.callValidateSpyObject(timeSpy.called, timeSpy.lastCall, timeEarlyValid, false);
			expect(timeSpy.lastCall.returnValue).to.be.true;
		});
		
		it("Call - Late Valid", function()
		{
			localValidFile.validateTimezoneOffset(timeLateValid, false);
			localCommonFile.callValidateSpyObject(timeSpy.called, timeSpy.lastCall, timeLateValid, false);
			expect(timeSpy.lastCall.returnValue).to.be.true;
		});
		
		it("Call - Early Invalid", function()
		{
			localValidFile.validateTimezoneOffset(timeEarlyInvalid, false);
			localCommonFile.callValidateSpyObject(timeSpy.called, timeSpy.lastCall, timeEarlyInvalid, false);
			expect(timeSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Call - Late Invalid", function()
		{
			localValidFile.validateTimezoneOffset(timeLateInvalid, false);
			localCommonFile.callValidateSpyObject(timeSpy.called, timeSpy.lastCall, timeLateInvalid, false);
			expect(timeSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Call - Invalid Prefix", function()
		{
			localValidFile.validateTimezoneOffset(timeWrongPrefix, false);
			localCommonFile.callValidateSpyObject(timeSpy.called, timeSpy.lastCall, timeWrongPrefix, false);
			expect(timeSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			timeSpy.restore();
		});
		
		
	});
}


function handleDriveLetterFunction()
{
	var driveValid = "C:";
	var driveInvalid = "3:";
	var driveSpy = null;
	
	describe("Drive Letter (validateDriveLetter)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateDriveLetter');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateDriveLetter', 'function');
			driveSpy = sinon.spy(localValidFile, 'validateDriveLetter');
			done();
		});
		
		it("Call - Valid Format", function()
		{
			localValidFile.validateDriveLetter(driveValid, false);
			localCommonFile.callValidateSpyObject(driveSpy.calledOnce, driveSpy.firstCall, driveValid, false);
			expect(driveSpy.firstCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			localValidFile.validateDriveLetter(driveInvalid, false);
			localCommonFile.callValidateSpyObject(driveSpy.calledTwice, driveSpy.secondCall, driveInvalid, false);
			expect(driveSpy.secondCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			driveSpy.restore();
		});
	
	});
}


function handleDrivePathFunction()
{
	var dPathValid = "/dev/root";
	var dPathInvalid = "C:";
	var dPathSpy = null;
	
	describe("Drive Path (validateDrivePath)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateDrivePath');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateDrivePath', 'function');
			dPathSpy = sinon.spy(localValidFile, 'validateDrivePath');
			done();
		});
		
		it("Call - Valid Format", function()
		{
			localValidFile.validateDrivePath(dPathValid, false);
			localCommonFile.callValidateSpyObject(dPathSpy.calledOnce, dPathSpy.firstCall, dPathValid, false);
			expect(dPathSpy.firstCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			localValidFile.validateDrivePath(dPathInvalid, false);
			localCommonFile.callValidateSpyObject(dPathSpy.calledTwice, dPathSpy.secondCall, dPathInvalid, false);
			expect(dPathSpy.secondCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			dPathSpy.restore();
		});
		
		
	});
	
}



function handleFilenameFunction()
{
	var fnValid = "example.txt";
	var fnInvalid = "fi/le.txt";
	var fnSpy = null;
	
	describe("File Name (validateFilename)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateFilename');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateFilename', 'function');
			fnSpy = sinon.spy(localValidFile, 'validateFilename');
			done();
		});
		
		it("Call - Valid Format", function()
		{
			localValidFile.validateFilename(fnValid, false);
			localCommonFile.callValidateSpyObject(fnSpy.calledOnce, fnSpy.firstCall, fnValid, false);
			expect(fnSpy.firstCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			localValidFile.validateFilename(fnInvalid, false);
			localCommonFile.callValidateSpyObject(fnSpy.calledTwice, fnSpy.secondCall, fnInvalid, false);
			expect(fnSpy.secondCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			fnSpy.restore();
		});
		
		
	});
	
}





function handleRioPrefixFunction()
{
	var prefixValid = "AO-3";
	var prefixInvalid = "OA-5";
	var prefixNegative = "DI--1";
	var pxSpy = null;
	
	describe("Remote IO Prefix (validateRioPrefix)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateRioPrefix');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateRioPrefix', 'function');
			pxSpy = sinon.spy(localValidFile, 'validateRioPrefix');
			done();
		});
		
		it("Call - Valid Format", function()
		{
			localValidFile.validateRioPrefix(prefixValid, false);
			localCommonFile.callValidateSpyObject(pxSpy.calledOnce, pxSpy.firstCall, prefixValid, false);
			expect(pxSpy.firstCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			localValidFile.validateRioPrefix(prefixInvalid, false);
			localCommonFile.callValidateSpyObject(pxSpy.calledTwice, pxSpy.secondCall, prefixInvalid, false);
			expect(pxSpy.secondCall.returnValue).to.be.false;
		});
		
		it("Call - Negative Index", function()
		{
			localValidFile.validateRioPrefix(prefixNegative, false);
			localCommonFile.callValidateSpyObject(pxSpy.called, pxSpy.lastCall, prefixNegative, false);
			expect(pxSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			pxSpy.restore();
		});
		
	});
	
}






function handleRequirementPathFunction()
{
	var rForwardValid = "./folder/subfolder/file";
	var rBackwardValid = "../../../folder/subfolder/file";
	var rSiblingValid = "./file";
	
	var rSiblingInvalid = "file";
	var rFormatInvalid = "folder/subfolder/file";
	
	var rSpy = null;
	
	describe("Requirement Path (validateRequirementPath)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateRequirementPath');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateRequirementPath', 'function');
			rSpy = sinon.spy(localValidFile, 'validateRequirementPath');
			done();
		});
		
		it("Call - Valid Forward", function()
		{
			localValidFile.validateRequirementPath(rForwardValid, false);
			localCommonFile.callValidateSpyObject(rSpy.called, rSpy.lastCall, rForwardValid, false);
			expect(rSpy.lastCall.returnValue).to.be.true;
		});
		
		it("Call - Valid Backward", function()
		{
			localValidFile.validateRequirementPath(rBackwardValid, false);
			localCommonFile.callValidateSpyObject(rSpy.called, rSpy.lastCall, rBackwardValid, false);
			expect(rSpy.lastCall.returnValue).to.be.true;
		});
		
		it("Call - Valid Sibling", function()
		{
			localValidFile.validateRequirementPath(rSiblingValid, false);
			localCommonFile.callValidateSpyObject(rSpy.called, rSpy.lastCall, rSiblingValid, false);
			expect(rSpy.lastCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid Sibling", function()
		{
			localValidFile.validateRequirementPath(rSiblingInvalid, false);
			localCommonFile.callValidateSpyObject(rSpy.called, rSpy.lastCall, rSiblingInvalid, false);
			expect(rSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Call - Invalid Format", function()
		{
			localValidFile.validateRequirementPath(rFormatInvalid, false);
			localCommonFile.callValidateSpyObject(rSpy.called, rSpy.lastCall, rFormatInvalid, false);
			expect(rSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			rSpy.restore();
		});
		
	});
}



function handleRioTextFunction()
{
	var textValid = "Analogue Output 3";
	var textInvalid = "Output Analogue 5";
	var textNegative = "Digital Input -1";
	var rioTextSpy = null;
	
	describe("Remote IO Text (validateRioText)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateRioText');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateRioText', 'function');
			rioTextSpy = sinon.spy(localValidFile, 'validateRioText');
			done();
		});
		
		it("Call - Valid Format", function()
		{
			localValidFile.validateRioText(textValid, false);
			localCommonFile.callValidateSpyObject(rioTextSpy.calledOnce, rioTextSpy.firstCall, textValid, false);
			expect(rioTextSpy.firstCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			localValidFile.validateRioText(textInvalid, false);
			localCommonFile.callValidateSpyObject(rioTextSpy.calledTwice, rioTextSpy.secondCall, textInvalid, false);
			expect(rioTextSpy.secondCall.returnValue).to.be.false;
		});
		
		it("Call - Negative Number", function()
		{
			localValidFile.validateRioText(textNegative, false);
			localCommonFile.callValidateSpyObject(rioTextSpy.called, rioTextSpy.lastCall, textNegative, false);
			expect(rioTextSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			rioTextSpy.restore();
		});
	});
	
}




function callExampleValid(eString, eSyntax, eEmpty, eResult)
{
	localValidFile.validateExampleTest(eString, eSyntax, eEmpty);
	localCommonFile.callValidateExampleSpy(exampleSpy.called, exampleSpy.lastCall, eString, eSyntax, eEmpty);
	expect(exampleSpy.lastCall.exception).to.be.undefined;
	localCommonFile.callValidateExampleResult(exampleSpy.lastCall.returnValue, eResult);
}

function callExampleInvalid(eString, eSyntax, eEmpty, eError)
{
	var callComplete = false;
	var thrownError = "";
	
	try
	{
		localValidFile.validateExampleTest(eString, eSyntax, eEmpty);
		callComplete = true;
	}
	catch(e)
	{
		callComplete = false;
		thrownError = e.message;
	}
	
	var cRes = [callComplete, thrownError];
	localCommonFile.callValidateExampleSpy(exampleSpy.called, exampleSpy.lastCall, eString, eSyntax, eEmpty);
	commonFunctionsFile.testInvalidFunctionResult(cRes, eError);
}



function getLocalValidationFile()
{
	var dRes = null;
	
	try
	{
		dRes = require(commonPaths.localValid);
	}
	catch(e)
	{
		dRes = null;
	}
	
	return dRes;
}

exports.callTestLocalValid = testLocalValid;
const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrorsFile);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);


function validateGeneralInvalid(generalMessage, generalTarget)
{
	commonFunctionsFile.testPresent(generalMessage);
	commonFunctionsFile.testString(generalMessage);
	expect(generalMessage).to.equal(generalTarget);
}

function validateStatusInvalid(sReturn, sValue)
{
	commonFunctionsFile.testPresent(sReturn);
	commonFunctionsFile.testType(sReturn, 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(sReturn, 'id');
	commonFunctionsFile.testObjectPropertyDefinition(sReturn, 'isRunning');
	commonFunctionsFile.testObjectPropertyContent(sReturn, 'isRunning', 'boolean');
	
	expect(sReturn.id).to.equal(sValue);
	commonFunctionsFile.testFalse(sReturn.isRunning);
}

exports.callValidateStatusInvalid = validateStatusInvalid;
exports.callValidateGeneralInvalid = validateGeneralInvalid;
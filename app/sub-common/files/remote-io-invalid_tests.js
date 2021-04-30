const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);


function validateGeneralInvalid(generalMessage, generalTarget)
{
	commonFunctionsFile.testPresent(generalMessage);
	commonFunctionsFile.testString(generalMessage);
	expect(generalMessage).to.equal(generalTarget);
}

function validateStatusInvalid(sReturn, sValue)
{
	commonFunctionsFile.testPresent(sReturn);
	expect(sReturn).to.be.an("object");
	
	commonFunctionsFile.testObjectPropertyDefinition(sReturn, 'id');
	commonFunctionsFile.testObjectPropertyDefinition(sReturn, 'isRunning');
	commonFunctionsFile.testObjectPropertyContent(sReturn, 'isRunning', 'boolean');
	
	expect(sReturn.id).to.equal(sValue);
	expect(sReturn.isRunning).to.be.false;
}

exports.callValidateStatusInvalid = validateStatusInvalid;
exports.callValidateGeneralInvalid = validateGeneralInvalid;
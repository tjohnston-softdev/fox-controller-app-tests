const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);


function getRioSetFile()
{
	var res = null;
	
	try
	{
		res = require(foxPath.rioSettingsFile);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.getRemoteIoSettingsFile = getRioSetFile;
const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const mainPartDescription = "D - Online Checks";
const checkFilepath = "./checks/chk-online"

function coordinateOnline()
{
	var chkOnlineFile = require(checkFilepath);
	
	describe(mainPartDescription, function()
	{
		chkOnlineFile.callTestOnline();
	});
}

function coordinateOffline()
{
	var chkOnlineFile = require(checkFilepath);
	
	describe(mainPartDescription, function()
	{
		chkOnlineFile.callTestOffline();
	});
}

exports.callOnline = coordinateOnline;
exports.callOffline = coordinateOffline;
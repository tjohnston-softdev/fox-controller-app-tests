const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

function coordinateExternal()
{
	var eOperatingSystemFile = require("./modules/pkg-os");
	var eValidatorFile = require("./modules/pkg-validator");
	var eNetFile = require("./modules/pkg-net");
	var eRequestFile = require("./modules/pkg-request");
	
	describe("B - External Modules", function()
	{
		eOperatingSystemFile.callTestOsDependency();
		eValidatorFile.callTestValidatorDependency();
		eNetFile.callTestNetDependency();
		eRequestFile.callTestRequest();
	});
}

exports.callExternal = coordinateExternal;
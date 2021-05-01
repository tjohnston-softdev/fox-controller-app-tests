const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

function coordinateCommon()
{
	var cPathFile = require("./items/itm-app_paths");
	var cObjectFile = require("./items/itm-common_objects");
	var cErrorFile = require("./items/itm-common_errors");
	
	describe("A - Common Data", function()
	{
		cPathFile.callTestCommonPaths();
		cObjectFile.callTestCommonObjects();
		cErrorFile.callTestCommonErrors();
	});
}

exports.callCommon = coordinateCommon;
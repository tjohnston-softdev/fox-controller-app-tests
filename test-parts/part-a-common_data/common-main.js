const cPathFile = require("./items/itm-app_paths");
const cObjectFile = require("./items/itm-common_objects");
const cErrorFile = require("./items/itm-common_errors");

function coordinateCommon()
{
	describe("A - Common Data", function()
	{
		cPathFile.callTestCommonPaths();
		cObjectFile.callTestCommonObjects();
		cErrorFile.callTestCommonErrors();
	});
}


module.exports =
{
	callCommon: coordinateCommon
};
const pathTests = require("./items/itm-app_paths");
const objectTests = require("./items/itm-common_objects");
const errorTests = require("./items/itm-common_errors");

function coordinateCommon()
{
	describe("A - Common Data", function()
	{
		pathTests();
		objectTests();
		errorTests();
	});
}

module.exports = coordinateCommon;
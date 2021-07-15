const pathTests = require("./items/itm-app_paths");
const objectTests = require("./items/itm-common_objects");

function coordinateCommon()
{
	describe("A - Common Data", function()
	{
		pathTests();
		objectTests();
	});
}

module.exports = coordinateCommon;
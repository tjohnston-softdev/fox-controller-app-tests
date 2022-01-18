const definitionTests = require("./models/m-definitions");

function coordinateModels()
{	
	describe("F - Controller Models", function()
	{
		definitionTests();
	});
}

module.exports = coordinateModels;
const definitionTests = require("./models/m-model_definitions");

function coordinateModels()
{	
	describe("F - Controller Models", function()
	{
		definitionTests();
	});
}

module.exports = coordinateModels;
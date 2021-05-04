const modelDefinitionsFile = require("./models/m-model_definitions");

function coordinateModels()
{	
	describe("F - Controller Models", function()
	{
		modelDefinitionsFile.callTestModelDefinitionFiles();
	});
}

module.exports =
{
	callModels: coordinateModels
};
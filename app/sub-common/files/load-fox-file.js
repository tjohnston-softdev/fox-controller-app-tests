function loadFileSafely(tgtFilePath)
{
	var loadRes = null;
	
	try
	{
		loadRes = require(tgtFilePath);
	}
	catch(loadErr)
	{
		loadRes = null;
	}
	
	return loadRes;
}


module.exports = loadFileSafely;
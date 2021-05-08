function loadFileSafely(tgtFilePath)
{
	var loadRes = null;
	
	try
	{
		loadRes = require(tgtFilePath);
	}
	catch(e)
	{
		loadRes = null;
	}
	
	return loadRes;
}


module.exports = loadFileSafely;
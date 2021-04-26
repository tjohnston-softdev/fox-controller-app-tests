function requireModuleSafely(mName)
{
	var moduleRes = null;
	
	try
	{
		moduleRes = require(mName);
	}
	catch(e)
	{
		moduleRes = null;
	}
	
	return moduleRes;
}

exports.requireModuleSafe = requireModuleSafely;
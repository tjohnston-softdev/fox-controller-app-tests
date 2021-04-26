function defineRegisterArguments()
{
	var res = null;
	
	try
	{
		res =
		{
			"regMode": 'STATUS',
			"correctID": 'b9d6e1a.088782',
			"correctSet": 'RO-0',
			"invalidSet": 'XY-Z'
		};
	}
	catch(e)
	{
		res = null;
	}
	
	
	return res;
}

exports.getRegisterArguments = defineRegisterArguments;
exports.isObjectType = true;
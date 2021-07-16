function checkAllPropsType(objDef, allType)
{
	var currentVal = null;
	
	for (currentProp in objDef)
	{
		currentVal = objDef[currentProp];
		expect(currentVal).to.not.be.undefined;
		expect(currentVal).to.not.be.null;
		expect(currentVal).to.be.an(allType);
	}
}

function checkMatchKV(objDef)
{
	var currentVal = null;
	
	for (currentKey in objDef)
	{
		currentVal = objDef[currentKey];
		expect(currentVal).to.not.be.undefined;
		expect(currentVal).to.not.be.null;
		expect(currentVal).to.equal(currentKey);
	}
}

function checkMatchKVInsensitive(objDef)
{
	var currentKey = null;
	var currentVal = null;
	
	for (currentProp in objDef)
	{
		currentKey = currentProp.toLowerCase();
		currentVal = objDef[currentProp].toLowerCase();
		
		expect(currentVal).to.not.be.undefined;
		expect(currentVal).to.not.be.null;
		expect(currentVal).to.equal(currentKey);
	}
	
}


module.exports =
{
	testAllPropsType: checkAllPropsType,
	testMatchKV: checkMatchKV,
	testMatchKVInsensitive: checkMatchKVInsensitive
};
const possibleValues = ['aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'];

function checkOperatingSystemSupported(osStr)
{
	var searchIndex = possibleValues.indexOf(osStr);
	var searchResult = false;
	
	if (searchIndex >= 0 && searchIndex < possibleValues.length)
	{
		searchResult = true;
	}
	
	return searchResult;
}


module.exports =
{
	checkSupported: checkOperatingSystemSupported
};
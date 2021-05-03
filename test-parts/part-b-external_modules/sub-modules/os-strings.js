const supportedOperatingSystemArray = ['aix', 'darwin', 'freebsd', 'linux', 'mac', 'openbsd', 'sunos', 'win32'];

function checkOperatingSystemSupported(osStr)
{
	var searchIndex = supportedOperatingSystemArray.indexOf(osStr);
	var searchResult = false;
	
	if (searchIndex >= 0 && searchIndex < supportedOperatingSystemArray.length)
	{
		searchResult = true;
	}
	
	return searchResult;
}


module.exports =
{
	checkOsSupported: checkOperatingSystemSupported
};
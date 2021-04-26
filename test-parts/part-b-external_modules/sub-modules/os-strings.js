const supportedOperatingSystemArray = ['aix', 'darwin', 'freebsd', 'linux', 'mac', 'openbsd', 'sunos', 'win32'];

function checkOperatingSystemSupported(o)
{
	var searchIndex = supportedOperatingSystemArray.indexOf(o);
	var searchResult = false;
	
	if (searchIndex >= 0 && searchIndex < supportedOperatingSystemArray.length)
	{
		searchResult = true;
	}
	
	return searchResult;
}

exports.checkOsSupported = checkOperatingSystemSupported;
exports.usesArray = true;
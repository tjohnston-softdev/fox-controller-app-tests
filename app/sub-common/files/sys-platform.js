const os = require("os");
const runningPlatform = os.platform();


function getDummyStatus()
{
	var dummyRes = false;
	
	if (runningPlatform === 'win32' || runningPlatform === 'mac' || runningPlatform === 'darwin')
	{
		dummyRes = true;
	}
	
	return dummyRes;
}


function getWindowsStatus()
{
	var windowsRes = (runningPlatform === 'win32');
	return windowsRes;
}



module.exports =
{
	getDummy: getDummyStatus,
	getWindows: getWindowsStatus
};
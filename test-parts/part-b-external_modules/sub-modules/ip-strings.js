function defineIpStrings()
{
	var defineRes = {};
	
	defineRes["testString"] = "192.168.1.1";
	defineRes["invalidString"] = "192.168.1.2.3";
	defineRes["pingAddress"] = "https://www.google.com/";
	
	return defineRes;
}


module.exports = defineIpStrings();
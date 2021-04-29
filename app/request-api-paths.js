function defineApiPaths()
{
	var defineRes = {};
	
	defineRes["adminApi"] = "admin";
	defineRes["alarmApi"] = "alarm-history";
	defineRes["nodesApi"] = "nodes";
	defineRes["storageApi"] = "storage";
	defineRes["devicesApi"] = "devices";
	defineRes["rioApiSub"] = "remote-io";
	
	return defineRes;
}


module.exports = defineApiPaths();
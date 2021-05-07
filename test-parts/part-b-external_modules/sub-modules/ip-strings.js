function defineIpStrings()
{
	var defineRes = {};
	
	defineRes["testString"] = "192.168.1.1";
	defineRes["invalidString"] = "192.168.1.2.3";
	defineRes["pingAddress"] = "https://www.google.com/";
	defineRes["createAddress"] = "https://jsonplaceholder.typicode.com/posts";
	defineRes["updateAddress"] = "https://jsonplaceholder.typicode.com/posts/1";
	defineRes["deleteAddress"] = "https://jsonplaceholder.typicode.com/users/1";
	
	return defineRes;
}


module.exports = defineIpStrings();
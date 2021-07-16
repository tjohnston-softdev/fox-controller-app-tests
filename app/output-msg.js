function outputCallbackMessage(cHeader, errorArg, objectArg)
{
	console.log("");
	console.log(cHeader);
	console.log("Error: " + errorArg);
	console.log("Object: " + objectArg);
}


module.exports = outputCallbackMessage;
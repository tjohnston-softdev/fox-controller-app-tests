# Changelog

**./test-parts/part-i-api_frontend/sub-parts/common-nodes.js**
* Removed requirements:
	* sinon
	* commonPaths.commonErrors
	* commonPaths.commonObjects
* Renamed variables in 'testNodeStoreCount'
	* 'currentManufacturerProperty' to 'currentManufacturer'
	* 'currentManufacturerArray' to 'currentArray'
	* 'totalStoreCount' to 'totalCount'
* 'currentArray' in 'testNodeStoreCount' is declared as an array.
* Renamed variables in 'testNodeManufacturerArray'
	* 'manufacturerStringIndex' to 'stringIndex'
	* 'manufacturerStringElement' to 'currentElement'
* 'testStatusControl_____' functions
	* Renamed 'sca' parameter to 'structureObj'
* Renamed variables in 'testStatusControlSyntax' and 'testStatusControlIntegrity'
	* 'sIndex' to 'rioIndex'
	* 'sElement' to 'currentElement'
* writeExpectedNodeName
	* Renamed 'pFix' parameter to 'enteredPrefix'
	* Declared 'firstCharacter' and 'secondCharacter' variables.
	* Replaced `enteredPrefix[0]` with 'firstCharacter'
	* Replaced `enteredPrefix[1]` with 'secondCharacter'
	* The 'fullText' variable is declared at the start of the function and not the end.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-i-api_frontend/sub-parts/common-text.js**
* Renamed 'writeDeviceHeader' parameters:
	* 'dhManufacturer' to 'vManufacturer'
	* 'dhModel' to 'vModel'
* writeDeviceCacheHeader
	* Renamed 'dCacheObject' parameter to 'cacheObj'
	* Merged 'partArray' and 'res' variables.
* Renamed 'writeNodeCacheHeader' parameters:
	* 'nCacheText' to 'vText'
	* 'nCacheKey' to 'vKey'
* Renamed 'writeDeviceDescription' parameters:
	* 'descManufacturer' to 'vManufacturer'
	* 'descModel' to 'vModel'
* Restructured 'writeDeviceDescription' to use only one variable.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-i-api_frontend/sub-parts/test-device-cache.js**
* Renamed parameters in 'addDevice'
	* 'tdManufacturer' to 'vManufacturer'
	* 'tdModel' to 'vModel'
	* 'tdAddress' to 'vAddr'
	* 'tdKey' to 'vKey'
* 'cacheItem' in 'addDevice'
	* Declared as a blank object.
	* Properties are defined line-by-line.
* setList
	* Renamed parameter to 'newValue'
* 'getList' returns 'listCache' directly.
* 'countDevices' returns 'addedDeviceCache.length' directly.
* Renamed parameters in 'addNode'
	* 'nManufacturerName' to 'devManufacturer'
	* 'nDeviceArray' to 'devArr'
* getNodeManufacturer
	* Renamed parameter from 'mProperty' to 'mProp'
	* Rewrote body for simplicity.
* getNodePropertyList
	* Renamed 'nProp' to 'currentProp'
* Declared 'currentOuter' variable in 'getNodeArrayStructure'
	* Outer loop element.
	* Replaces `structureObject[currentProp]`
* Declared 'currentInner' variable in 'getNodeArrayStructure'
	* Inner loop element.
	* Replaces `structureObject[currentProp][currentIndex]`
* Rewrote 'getNodeArrayStructure loop code for simplicity.

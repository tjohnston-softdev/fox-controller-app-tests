# Changelog

**./app/common-objects.js**
* Removed 'exampleObject'

---

**./test-parts/part-a-common_data/items/itm-common_objects.js - Globals**
* Removed 'chai-things' and 'sinon' modules.
* 'commonPaths.commonObjects' is now required directly.
* Renamed 'commonObjectContentFile' to 'commonObjectsFile'

---

**./test-parts/part-a-common_data/items/itm-common_objects.js - Removed Functions**
* getCommonObjectFile
* verifyObjectFileExists
* verifyObjectPropertiesValid
* handleString
* retrievePropertyObject
* executeRegisterNodeObject
* quoteProperty
* testObjectStringValue
* quoteName

---

**./test-parts/part-a-common_data/items/itm-common_objects.js - Structure**
* 'testCommonObjects' has expanded into three `it` blocks:
	* The 'unknownID' string.
	* Device objects (eg. 'crudDevice')
	* 'getRegisterNode' function.

---

**./test-parts/part-a-common_data/items/itm-common_objects.js - Other Functions**
* handleDeviceObject
	* When assigning 'deviceObj', it now reads 'commonObjectsFile' directly.
	* Renamed parameter to 'devicePropName'
	* Replaced calls to 'testObjectStringValue' with 'testString'
* handleRegisterNodeObject
	* Renamed 'getRegisterReturn' to 'registerResult'
	* When assigning 'registerResult', the function is called directly.
	* Replaced calls to 'testObjectStringValue' with 'testString'
* Rewrote these functions using chai expectations:
	* testObjectType
	* testObjectFunction
	* testString
	* testObjectProperty

---

**./test-parts/part-a-common_data/items/itm-common_objects.js - Public**
* Replaced `exports` with `module.exports`

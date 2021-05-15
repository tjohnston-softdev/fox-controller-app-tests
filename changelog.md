# Changelog

### ./app/sub-common/files/remote-io-invalid_data.js

**New File**
* Preperation functions for invalid Remote IO objects.
* Split from 'rio-common.js'
* Not to be confused with 'remote-io-invalid_tests.js', which is empty.

---

### ./app/sub-common/files/remote-io-common.js

**Moved functions**
* Destination: 'remote-io-invalid_data.js'
	* getInvalidDeviceTypeObject
	* 'getResultObjectFVTP' as 'getResultObject'
	* 'combineErrorObject' as 'getErrorObject'
	* getInvalidManufacturerObject
	* getInvalidModelObject
	* getInvalidIPAddressObject
	* getInvalidMacAddressObject
	* getInvalidIDStringObject
	* getInvalidNameStringObject
	* getInvalidEnabledFlagObject
	* getInvalidIDStringObjectFactory
	* getInvalidIDStringObjectModify

\
**Removed**
* Functions:
	* getInvalidDeviceTypeObjectFactory
	* getInvalidManufacturerObjectFactory
	* getInvalidModelObjectFactory
	* getInvalidIPAddressObjectFactory
	* getResultObjectTP
	* getResultObjectVTP
* Global variables:
	* oFormat
	* oValue
	* oType
	* oProp
* Module requirements:
	* commonPaths.foxRelative
	* commonPaths.commonErrors
	* commonPaths.commonObjects

---

### ./app/paths/files/app-paths.js

**Changes**
* Updated 'rioCommonInvalidFile' property file name.
	* Before: 'remote-io-invalid_tests'
	* After: 'remote-io-invalid_data'

---

### ./test-parts/

**Affected Files**
* part-g-controller_files/files/
	* con-device_classes.js
	* con-rio_factories.js
* part-h-api_requests/requests/
	* req-devices_crud_invalid.js
	* req-devices_modify_invalid.js

\
**Requirements**
* Added 'commonPaths.rioCommonInvalidFile'

\
**Call Replacements**
* 'commonFile' with 'rioInvalid'
	* 'callCombineErrorObject' with 'getError'
	* 'callInvalidIDStringObjectFactory' with 'getIdFactory'
	* 'callInvalidDeviceTypeObject' with 'getDeviceType'
	* 'callInvalidManufacturerObject' with 'getManufacturer'
	* 'callInvalidModelObject' with 'getModel'
	* 'callInvalidNameStringObject' with 'getName'
	* 'callInvalidIPAddressObject' with 'getIpAddress'
	* 'callInvalidEnabledFlagObject' with 'getEnabled'
	* 'callInvalidMacAddressObject' with 'getMacAddress'
	* 'callInvalidDeviceTypeObjectFactory' with 'getDeviceType'
	* 'callInvalidManufacturerObjectFactory' with 'getManufacturer'
	* 'getInvalidModelObjectFactory' with 'getModel'
	* 'callInvalidIPAddressObjectFactory' with 'getIpAddress'

\
**Property Name Replacements**
* 'oValue' with 'valueCase'
* 'oType' with 'typeCase'
* 'oProp' with 'propCase'
* 'oFormat' with 'formatCase'

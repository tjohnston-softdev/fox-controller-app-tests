# Changelog

### ./test-parts/part-h-api_requests/requests/req-devices_modify_invalid.js

**handleUnknownDeviceTypeModifyTest**
* Renamed 'invalidEntry' variable to 'modBodyObject'
* Declared 'invalidValue' variable.
	* Local for 'deviceTypeObject.valueCase.jsonObject.deviceType'
* Declared 'targetErrorMsg' variable.
	* Local for 'deviceTypeObject.valueCase.errorMessage'
* 'modBodyObject.deviceType' is assigned with 'invalidValue'

---

**handleUnknownManufacturerModifyTest**
* Renamed 'invalidEntry' variable to 'modBodyObject'
* Declared 'invalidValue' variable.
	* Local for 'manufacturerObject.valueCase.jsonObject.maker'
* Declared 'targetErrorMsg' variable.
	* Local for 'manufacturerObject.valueCase.errorMessage'
* 'modBodyObject.maker' is assigned with 'invalidValue'

---

**handleUnknownModelModifyTest**
* Renamed 'invalidEntry' variable to 'modBodyObject'
* Declared 'invalidValue' variable.
	* Local for 'modelObject.valueCase.jsonObject.model'
* Declared 'targetErrorMsg' variable.
	* Local for 'modelObject.valueCase.errorMessage'
* 'modBodyObject.model' is assigned with 'invalidValue'

---

**handleBadIpAddressModifyTest**
* Declared 'invalidValue' variable.
	* Local for 'ipAddressObject.formatCase.jsonObject.ipAddress'
* Declared 'targetErrorMsg' variable.
	* Local for 'ipAddressObject.formatCase.errorMessage'
* 'ipObject.ipAddress' is assigned with 'invalidValue'

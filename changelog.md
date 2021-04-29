# Changelog

**./app/request-api.js - writeApiUrl**
* Renamed parameters:
	* 'apiFolder' to 'vFolder'
	* 'apiPage' to 'vPage'
* Removed variables:
	* rootPart
	* pagePart
	* combinedUrl
* 'apiUrlResult' is declared as a string.
* URL is now written using a single variable.

---

**./app/request-api.js - readApiResponseObject**
* Removed variables:
	* rText
	* rType
* Declared 'bodyType' variable
	* Reads 'responseObject.body' directly.
* 'responseObject.body' will only be used if it is an object.
	* Expanded validation to ignore undefined and null.

---

**./app/request-api.js - readApiResponseString**
* Renamed variables:
	* 'rObjType' to 'inputType'
	* 'rBdyType' to 'bodyType'
* Declared variable 'correctInput' - Indicates whether 'rObject' is an object.
* 'bodyType' is now declared as a blank string.
* Added IF structure to check 'rObject' type.
* Simplified result IF structure to use new variables.

---

**./app/request-api.js - getRequestOptionsObject**
* When assigning 'oRes'
	* Starts as a blank object.
	* Properties are defined individually.

---

**./app/request-api.js - getDeleteOptionsObject**
* When assigning 'dRes.headers'
	* Starts as a blank object.
	* Properties are defined individually.

---

**./app/request-api.js - getRandomIpNumber**
* 'randomBase' is multiplied by 255.
	* Hence, 'randomMultiply' has been removed.

---

**./app/request-api.js - checkWriteArgument**
* Renamed parameter to 'argValue'
* Rewrote IF conditions to use correct precedence.

---

**./app/request-api-paths.js**
* Public variables are now defined inside the function 'defineApiPaths'
* Replaced `exports` with `module.exports = defineApiPaths();`

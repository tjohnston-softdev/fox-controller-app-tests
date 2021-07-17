# Changelog

**./app/test-common.js**
* Removed commented out exports.

---

**./app/test-object.js**
* Removed `undefined` and `null` checks from:
	* checkMatchKV
	* checkMatchKVInsensitive
* Replaced calls to 'getJsonObjectProperties' with 'getObjectProperties'

---

**./app/test-array.js**
* Removed `undefined` and `null` checks from 'checkAllStringRequired'

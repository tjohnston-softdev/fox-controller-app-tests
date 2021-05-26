# Changelog

**./app/paths/files/fox-paths.js**
* Emulator build active.

---

**./test-parts/part-b-external_modules/modules/pkg-needle.js - verifyTimeoutRequest**
* Changed expected response message.
	* Before: "socket hang up"
	* After: "connect ECONNREFUSED 127.0.0.1:80"
* Changed expected error code from "ECONNRESET" to "ECONNREFUSED"

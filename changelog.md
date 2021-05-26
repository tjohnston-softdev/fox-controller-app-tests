# Changelog

**Test Status**
* Switching between Controller builds works as expected.
* Runtime error occurs when initializing tests for original build.
	* Cannot read property 'StoredDevice' of null

---

**./app/paths/files/fox-paths.js**
* Wrote new function 'getFoxRoot'
	* Retrieves FOX Controller root path depending on which build.
	* If emulation is enabled, it will retrieve the emulator build.
	* Otherwise, it will retrieve the original build.
* defineFoxPaths
	* Declared new variable 'useEmulator'
	* 'foxRoot' is now assigned with 'getFoxRoot'
* These changes only concern the development environment.
	* For release builds, 'useEmulator' will always be true.
	* It will retrieve the direct sibling build instead of a nested original.

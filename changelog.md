# Changelog

**./app/sub-common/files/sys-platform.js**
* New file - Provides common shortcut for running OS platform.
	* This is so that the platform is only retrieved once at startup and not multiple times throughout testing.
	* Does not expose the platform string itself. It only compares it to supported values.
	* Contains checks for 'Windows' and 'Dummy' operating systems.

---

**./app/paths/files/app-paths.js**
* Added 'sysPlatform' property. - Refers to:
	* ../../sub-common/files/sys-platform.js

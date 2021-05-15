# Changelog

**./app/sub-common/files/http-requests.js**
* Renamed the 'sendApplicationPing' function to 'requestPing'
	* Called publicly as 'ping'

---

**Affected Files**
* ./test-parts/
	* part-d-online_checks/checks/
		* chk-online.js
	* part-j-restart_controller/modes/
		* mode-factory_reset.js
		* mode-reboot.js
		* mode-restart.js

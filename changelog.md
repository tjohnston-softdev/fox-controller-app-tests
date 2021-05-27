# Changelog

**./test/fox-test-main.js**
* Updated function references for 'processPart'

---

**./test-parts/part-j-restart_controller/restart-main.js**
* Renamed global variables:
	* 'cRestartFile' to 'restartMode'
	* 'cRebootFile' to 'rebootMode'
	* 'cFactoryResetFile' to 'factoryResetMode'
* Required files are called directly.
* Removed 'Coordinate' from public function names.
	* eg. "callCoordinateRestart" becomes "callRestart"

---

**./test-parts/part-j-restart_controller/modes/**
* These functions are exported directly from their respective files:
	* testProcessRestart (mode-restart.js)
	* testFoxRestart (mode-reboot.js)
	* testFactoryReset (mode-factory_reset.js)

# Changelog

### ./test-parts/part-g-controller_files/controller-main.js

**Changes**
* All function calls are commented out except for 'cDeviceClassesFile'

---

### ./test-parts/part-g-controller_files/files/con-device_classes.js

**Globals**
* These files are now required directly:
	* subCommonPath.rioCommonFile
	* foxPath.storedDeviceClassFile
	* foxPath.connectedDeviceClassFile
* Removed spy globals:
	* storeDeviceSpy
	* connectSpy

\
**Removed Functions**
* getRemoteIoCommonFile
* getDeviceClassFile
* handleDeviceFiles

\
**handleDeviceConstructors**
* Removed:
	* 'storeDeviceSpy' assignment.
	* 'connectSpy' assignment.
	* 'done' callbacks.

\
**handleDeviceClasses - StoredDevice**
* Specific changes to "Call - Valid Model"
	* Spy is now defined locally instead of globally.
	* Replaced 'storeDeviceSpy' with 'validStoredDeviceSpy'
	* Added 'testPresent' check for 'firstCall'

\
**handleDeviceClasses - ConnectedDevice**
* Specific changes to "Call - Valid Model"
	* Spy is now defined locally instead of globally.
	* Replaced 'connectSpy' with 'validConnectedDeviceSpy'
	* Added 'testPresent' check for 'firstCall'

\
**callStoredDeviceUnsupported**
* Renamed variables:
	* 'comp' to 'storedDeviceComplete'
	* 'err' to 'storedDeviceError'

\
**callConnectedDeviceUnsupported**
* Renamed variables:
	* 'comp to 'connectionComplete'
	* 'err' to 'connectionError'

\
**callConnectedDeviceStringProperty**
* Renamed 'sInvalid' variable to 'invalidStr'

\
**callConnectedDeviceBooleanProperty**
* Renamed 'bInvalid' variable to 'invalidBoolean'

\
**Public**
* Replaced `exports` with `module.exports`

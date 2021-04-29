# Files

**[app/common-errors.js](../app/common-errors.js)**  
Used to store error strings and functions that write error strings. The reason some of these errors are stored in this file is so that they can be used by multiple parts of the test script. Tested in [itm-common_errors.js](../test-parts/part-a-common_data/items/itm-common_errors.js)

**[app/common-objects.js](../app/common-objects.js)**  
Used to store objects that need to be accessed by multiple parts of the test script. Most of these objects relate to generic Device objects which can be used by the Controller. Tested in [itm-common_objects.js](../test-parts/part-a-common_data/items/itm-common_objects.js)

**[app/define-api.js](../app/define-api.js)**  
Stores an array of Manufacturers that are supported by the test script and the Controller. Tested in [s-define_api.js](../test-parts/part-c-internal_scripts/scripts/s-define_api.js)

**[app/local-valid.js](../app/local-valid.js)**  
Stores functions used for validation that cannot be covered by 3rd-party modules. Most of these use Regular Expressions. Tested in [s-local_valid.js](../test-parts/part-c-internal_scripts/scripts/s-local_valid.js)

**[app/request-api.js](../app/request-api.js)**  
Stores functions related to HTTP requests. While the requesting is performed by a 3rd-party module inside the individual test scripts, these functions are used for preparation and results. Tested in [s-request_api.js](../test-parts/part-c-internal_scripts/scripts/s-request_api.js)

**[app/request-api-paths.js](../app/request-api-paths.js)**  
Stores the names of APIs used by the Controller. Tested in [s-request_api_paths.js](../test-parts/part-c-internal_scripts/scripts/s-request_api_paths.js)

**[app/supported-databases.js](../app/supported-databases.js)**  
Stores 'definitions' of known Databases used by the Controller. Information includes the name, type, and its size when empty. Tested in [s-supported-databases.js](../test-parts/part-c-internal_scripts/scripts/s-supported-databases.js)

**[app/test-common.js](../app/test-common.js)**  
Stores shortcut functions for performing Chai assertion tests. Tested in [itm-common_functions.js](../test-parts/part-a-common_data/items/itm-common_functions.js)

**[app/paths/files/app-paths.js](../app/paths/files/app-paths.js)**  
stores the paths to other files inside this project, including those in this subfolder. All of the files in this folder are tested in [itm-app_paths.js](../test-parts/part-a-common_data/items/itm-app_paths.js)

**[app/paths/files/fox-paths.js](../app/paths/files/fox-paths.js)**  
This stores the paths to files in the Controller.

**[app/paths/files/sub-common-paths.js](../app/paths/files/sub-common-paths.js)**  
This stores the paths to the contents of `app/sub-common/files`

**[test/fox-test-main.js](../test/fox-test-main.js)**  
The main part of the test script. This is run with the command `npm test`

**[changelog.md](../changelog.md)**  
This file contains a list of changes made for this current version of the project.

**[reference-links.txt](../reference-links.txt)**  
This file contains links to things used  and referenced in this project.

---

**Previous:** [Folders](./folders.md)  
**Next:** [References](./references.md)

[Contents](./readme.md)

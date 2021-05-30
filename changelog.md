# Changelog

**./information/install.md**
* Rewrote first sentence.
	* Before: "This [...] as to how the FOX Controller Test Script is installed."
	* After: "This [...] for installing the FOX Controller Test Script."
* Removed "If you are reading this, [...]. Either way,"
* Changed:
	* "set up a Node JS environment" to "set up your environment"
	* "clone" to "download"
	* "FOX Controller files, testing them" to "FOX Controller files in order to test them."

---

**./information/running.md**
* Changed:
    * 'quotation marks' to `code marks` when referring to the repository names.
    * "try something different" to "use something different"
    * "up to several seconds" to "some time"
    * "you will be indicated to enter a new command." to "the overall results will be displayed."
    * "in Remote IO" to "with Remote IO"

---

**./information/parts.md**
* General:
    * "simpler back then" to "simpler at first"
    * "but at the same time" to "but eventually"
    * "different parts and files" to "different parts"
    * 'quotation marks' to `code marks` when referring to the 'test-parts' subfolder.
* Part A - Common Data
    * Before: "test functions, [...], and example objects."
    * After: "error strings, example objects, and whether the FOX Controller files exist."
* B - External Modules
    * Changed 'request' package example to 'needle'
* C - Internal Scripts
    * Changed "These files are" to "These files include"
* E - Controller Settings
    * Changed "This gets a" to "This is a"
* F - Controller Models
    * Changed "one definition." to "one particular file."
* G - Controller Files
    * Changed "most Controller testing" to "most of the Controller file testing"

---

**./information/modes.md**
* Changed:
    * 'npm test' to use code marks.
    * "Each test mode" to "Each mode"
    * "cascade manner" to "cascading manner where one part depends on the previous"
    * "common dependencies are tested" to "external modules have been tested"
    * "just parts" to "just the parts"
    * "concurrency issues" to "concurrency and file locking issues"
    * "can be a reference" to "is a reference"
    * "parts D and H" to "parts D, H" in the 'request' mode
    * "parts J" to "part J" for reset modes.
    * "parts A-D and H" to "parts A-D, H"
    * "parts D and I" to "parts D, I"
    * "being worked on at the time." to "are being worked on at the time."
* Removed:
    * "The same can be said when running the project itself because"
    * "and no errors will be flagged."
* Removed the horizontal line between mode descriptions and "If no text is entered"
    * Replaced with two extra lines of white-space.

---

**./information/folders.md**
* Summary:
    * Before: "files might be kept there"
    * After: "files are kept there"
* File arrangement:
    * Before: "help you decide [...] work fine."
    * After: "help you decide where to place your files."
* app
    * Changed "for the testing project" to "across the testing project as a whole"
    * Removed "'app' being a shorthand for 'Application'."
    * Removed "In summary,"
    * Changed "multiple different parts" to "multiple parts"
    * Removed "one containing"
    * Changed "or a local script" to "to a local script"
* Rewrote the final section in 'app/paths/files'
    * Before: "Files in this folder are tested in part A, [...]"
    * After: "Files in this folder are exempt from testing [...]"
* app/sub-common/files
    * Changed "in a codependent manner" to "during their testing"
* information
    * Changed "documentation markdown files" to "documentation files in markdown format"
* node_modules
    * Changed "files related to the Node JS modules" to "the external modules"
    * Removed "One side-note [...] a lot smaller than 20MB"
    * Changed "For modules that are [...] not crucial" to "For other modules"
* test
    * 'npm test' now uses code marks.
    * Removed "With that being said"
    * Changed "put it" to "place it"

---

**./information/files.md**
* The following files are exempt from testing:
    * app/test-common.js
    * app/paths/files/app-paths.js
* Fixed capitalization in 'app/paths/files/app-paths.js'
* Removed 'app/paths/files/sub-common-paths.js'

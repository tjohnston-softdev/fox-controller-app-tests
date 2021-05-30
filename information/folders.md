# Folders

This explains the different folders in the project, what they are for, and what files are kept there. As you work on the test script, you may feel the need to add new folders and sub-folders for different sorts of files. However, it would be best to describe the existing folders first so that may help you decide where to place your files.

---

**app**  
This folder is used for storing script files needed across the testing project as a whole. If the file is going to be needed across multiple parts, it should be placed here. The file could be anything from shortcut test functions, to a local script that fulfils some purpose that 3rd party modules cannot. 

If the whole project depends on a particular file, it should be tested in part A. If only some parts depend on a file, it should be tested in part C.

**app/paths/files**  
This sub-folder is used for storing the paths to common files both within the test project and the Controller itself. The reason they are in a sub-folder is so that they sit at the same level as a test script calling a required file. When writing a relative path to a file, it would look the same between the path file and from a test script. The two scripts would start at the same 'location' when referring to a required file.

* root/app/paths/files/example.js
* root/test-parts/part-x-example_name/example/e-script.js

In short, you can write a relative path inside an 'app/paths/files' script. When that path is used, it will refer to the target.

Files in this folder are exempt from testing. This is except for [fox-paths.js](../app/paths/files/fox-paths.js) which is tested in part A to check whether the FOX Controller files exist. Testing is performed under the file [itm-app_paths.js](../test-parts/part-a-common_data/items/itm-app_paths.js)

**app/sub-common/files**  
This sub-folder is used to store script files that need to be accessed by multiple parts during their testing. The reason these particular files need to be stored inside the subfolders is so they are siblings to the dependent script files.

* root/app/sub-common/files/example.js
* root/test-parts/part-x-example_name/example/e-script.js

While most test script parts have their own subfolder for this purpose, having the same structure in 'app' enables these files to be accessed across multiple parts while also having the same access and scope.

**information**  
This folder was created to store documentation files in markdown format. Of course, you can expand on this in the future. This could be personal notes, a to-do list, anything that can be considered information you can refer to.

**node_modules**  
This folder contains the external modules used by the project. For the most part, you don't need to worry about this folder as long as it is there. If you look in the project root and see that it isn't, you may want to (re)install. The [package.json](../package.json) file keeps track of what modules are required.

Any module that is part of the test framework is exempt from testing itself. For other modules, they are tested in part B

**test**  
This folder contains the main part of the test script. When you run the `npm test` command, the test framework executes the one script file in this folder. You should not add anything to this folder. If you want to add something to the test script, place it within 'test-parts' and have the [test file](../test/fox-test-main.js) call it.

**test-parts**  
At first, the test script was one large file. Then it got too complex and tedious to maintain, so it was split into different [parts](./parts.md). This folder contains the different parts. Each one is a subfolder named as `part-x-example_name`.

---

**Previous:** [Test Modes](./modes.md)  
**Next:** [Files](./files.md)

[Contents](./readme.md)


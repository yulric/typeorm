"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulpclass_1 = require("gulpclass");
var gulp = require("gulp");
var del = require("del");
var shell = require("gulp-shell");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var file = require("gulp-file");
var uglify = require("gulp-uglify");
var mocha = require("gulp-mocha");
var chai = require("chai");
var tslint = require("gulp-tslint");
var stylish = require("tslint-stylish");
var sourcemaps = require("gulp-sourcemaps");
var istanbul = require("gulp-istanbul");
var remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");
var ts = require("gulp-typescript");
var Gulpfile = (function () {
    function Gulpfile() {
    }
    // -------------------------------------------------------------------------
    // General tasks
    // -------------------------------------------------------------------------
    /**
     * Cleans build folder.
     */
    Gulpfile.prototype.clean = function (cb) {
        return del(["./build/**"], cb);
    };
    /**
     * Runs typescript files compilation.
     */
    Gulpfile.prototype.compile = function () {
        return gulp.src("package.json", { read: false })
            .pipe(shell(["tsc"]));
    };
    // -------------------------------------------------------------------------
    // Build and packaging for browser
    // -------------------------------------------------------------------------
    /**
     * Copies all source files into destination folder in a correct structure.
     */
    Gulpfile.prototype.browserCopySources = function () {
        return gulp.src([
            "./src/**/*.ts",
            "!./src/commands/*.ts",
            "!./src/cli.ts",
            "!./src/typeorm.ts",
            "!./src/typeorm-model-shim.ts",
            "!./src/platform/PlatformTools.ts"
        ])
            .pipe(gulp.dest("./build/browser/typeorm"));
    };
    /**
     * Creates special main file for browser build.
     */
    Gulpfile.prototype.browserCopyMainBrowserFile = function () {
        return gulp.src("./package.json", { read: false })
            .pipe(file("typeorm.ts", "export * from \"./typeorm/index\";"))
            .pipe(gulp.dest("./build/browser"));
    };
    /**
     * Replaces PlatformTools with browser-specific implementation called BrowserPlatformTools.
     */
    Gulpfile.prototype.browserCopyPlatformTools = function () {
        return gulp.src("./src/platform/BrowserPlatformTools.template")
            .pipe(rename("PlatformTools.ts"))
            .pipe(gulp.dest("./build/browser/typeorm/platform"));
    };
    /**
     * Runs files compilation of browser-specific source code.
     */
    Gulpfile.prototype.browserCompile = function () {
        var tsProject = ts.createProject("tsconfig.json", {
            outFile: "typeorm-browser.js",
            module: "system",
            "lib": ["es5", "es6", "dom"],
            typescript: require("typescript")
        });
        var tsResult = gulp.src(["./build/browser/**/*.ts", "./node_modules/@types/**/*.ts"])
            .pipe(sourcemaps.init())
            .pipe(tsProject());
        return [
            // tsResult.dts.pipe(gulp.dest("./build/package")),
            tsResult.js
                .pipe(sourcemaps.write(".", { sourceRoot: "", includeContent: true }))
                .pipe(gulp.dest("./build/package"))
        ];
    };
    /**
     * Uglifys all code.
     */
    Gulpfile.prototype.browserUglify = function () {
        return gulp.src("./build/package/typeorm-browser.js")
            .pipe(uglify())
            .pipe(rename("typeorm-browser.min.js"))
            .pipe(gulp.dest("./build/package"));
    };
    // -------------------------------------------------------------------------
    // Main Packaging and Publishing tasks
    // -------------------------------------------------------------------------
    /**
     * Publishes a package to npm from ./build/package directory.
     */
    Gulpfile.prototype.packagePublish = function () {
        return gulp.src("package.json", { read: false })
            .pipe(shell([
            "cd ./build/package && npm publish"
        ]));
    };
    /**
     * Publishes a package to npm from ./build/package directory with @next tag.
     */
    Gulpfile.prototype.packagePublishNext = function () {
        return gulp.src("package.json", { read: false })
            .pipe(shell([
            "cd ./build/package && npm publish --tag next"
        ]));
    };
    /**
     * Copies all sources to the package directory.
     */
    Gulpfile.prototype.packageCompile = function () {
        var tsProject = ts.createProject("tsconfig.json", { typescript: require("typescript") });
        var tsResult = gulp.src(["./src/**/*.ts", "./node_modules/@types/**/*.ts"])
            .pipe(sourcemaps.init())
            .pipe(tsProject());
        return [
            tsResult.dts.pipe(gulp.dest("./build/package")),
            tsResult.js
                .pipe(sourcemaps.write(".", { sourceRoot: "", includeContent: true }))
                .pipe(gulp.dest("./build/package"))
        ];
    };
    /**
     * Moves all compiled files to the final package directory.
     */
    Gulpfile.prototype.packageMoveCompiledFiles = function () {
        return gulp.src("./build/package/src/**/*")
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Removes /// <reference from compiled sources.
     */
    Gulpfile.prototype.packageReplaceReferences = function () {
        return gulp.src("./build/package/**/*.d.ts")
            .pipe(replace("/// <reference types=\"node\" />", ""))
            .pipe(replace("/// <reference types=\"chai\" />", ""))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Moves all compiled files to the final package directory.
     */
    Gulpfile.prototype.packageClearPackageDirectory = function (cb) {
        return del([
            "build/package/src/**"
        ], cb);
    };
    /**
     * Change the "private" state of the packaged package.json file to public.
     */
    Gulpfile.prototype.packagePreparePackageFile = function () {
        return gulp.src("./package.json")
            .pipe(replace("\"private\": true,", "\"private\": false,"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Copies README.md into the package.
     */
    Gulpfile.prototype.packageCopyReadme = function () {
        return gulp.src("./README.md")
            .pipe(replace(/```typescript([\s\S]*?)```/g, "```javascript$1```"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Copies shims to use typeorm in different environment and conditions file into package.
     */
    Gulpfile.prototype.packageCopyShims = function () {
        return gulp.src(["./extra/typeorm-model-shim.js", "./extra/typeorm-class-transformer-shim.js"])
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Creates a package that can be published to npm.
     */
    Gulpfile.prototype.package = function () {
        return [
            "clean",
            ["browserCopySources", "browserCopyMainBrowserFile", "browserCopyPlatformTools"],
            ["packageCompile", "browserCompile"],
            ["packageMoveCompiledFiles", "browserUglify"],
            [
                "packageClearPackageDirectory",
                "packageReplaceReferences",
                "packagePreparePackageFile",
                "packageCopyReadme",
                "packageCopyShims"
            ],
        ];
    };
    /**
     * Creates a package and publishes it to npm.
     */
    Gulpfile.prototype.publish = function () {
        return ["package", "packagePublish"];
    };
    /**
     * Creates a package and publishes it to npm with @next tag.
     */
    Gulpfile.prototype.publishNext = function () {
        return ["package", "packagePublishNext"];
    };
    // -------------------------------------------------------------------------
    // Run tests tasks
    // -------------------------------------------------------------------------
    /**
     * Runs ts linting to validate source code.
     */
    Gulpfile.prototype.tslint = function () {
        return gulp.src(["./src/**/*.ts", "./test/**/*.ts", "./sample/**/*.ts"])
            .pipe(tslint())
            .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
    };
    /**
     * Runs before test coverage, required step to perform a test coverage.
     */
    Gulpfile.prototype.coveragePre = function () {
        return gulp.src(["./build/compiled/src/**/*.js"])
            .pipe(istanbul())
            .pipe(istanbul.hookRequire());
    };
    /**
     * Runs post coverage operations.
     */
    Gulpfile.prototype.coveragePost = function () {
        chai.should();
        chai.use(require("sinon-chai"));
        chai.use(require("chai-as-promised"));
        return gulp.src(["./build/compiled/test/**/*.js"])
            .pipe(mocha({
            timeout: 15000
        }))
            .pipe(istanbul.writeReports());
    };
    /**
     * Runs tests the quick way.
     */
    Gulpfile.prototype.quickTests = function () {
        chai.should();
        chai.use(require("sinon-chai"));
        chai.use(require("chai-as-promised"));
        return gulp.src(["./test/**/*.ts"])
            .pipe(mocha({
            timeout: 10000
        }));
    };
    Gulpfile.prototype.coverageRemap = function () {
        return gulp.src("./coverage/coverage-final.json")
            .pipe(remapIstanbul())
            .pipe(gulp.dest("./coverage"));
    };
    /**
     * Compiles the code and runs tests.
     */
    Gulpfile.prototype.tests = function () {
        return ["compile", "tslint", "coveragePost", "coverageRemap"];
    };
    // -------------------------------------------------------------------------
    // CI tasks
    // -------------------------------------------------------------------------
    Gulpfile.prototype.createTravisOrmConfig = function () {
        return gulp.src("./ormconfig.travis.json")
            .pipe(rename("ormconfig.json"))
            .pipe(gulp.dest("./"));
    };
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "clean", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "compile", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "browserCopySources", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "browserCopyMainBrowserFile", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "browserCopyPlatformTools", null);
    __decorate([
        gulpclass_1.MergedTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "browserCompile", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "browserUglify", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packagePublish", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packagePublishNext", null);
    __decorate([
        gulpclass_1.MergedTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageCompile", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageMoveCompiledFiles", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageReplaceReferences", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageClearPackageDirectory", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packagePreparePackageFile", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageCopyReadme", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageCopyShims", null);
    __decorate([
        gulpclass_1.SequenceTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "package", null);
    __decorate([
        gulpclass_1.SequenceTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "publish", null);
    __decorate([
        gulpclass_1.SequenceTask("publish-next"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "publishNext", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "tslint", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "coveragePre", null);
    __decorate([
        gulpclass_1.Task("coveragePost", ["coveragePre"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "coveragePost", null);
    __decorate([
        gulpclass_1.Task("ts-node-tests"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "quickTests", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "coverageRemap", null);
    __decorate([
        gulpclass_1.SequenceTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "tests", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "createTravisOrmConfig", null);
    Gulpfile = __decorate([
        gulpclass_1.Gulpclass()
    ], Gulpfile);
    return Gulpfile;
}());
exports.Gulpfile = Gulpfile;
//# sourceMappingURL=gulpfile.js.map
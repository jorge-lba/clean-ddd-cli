"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericUseCase = exports.GenericController = exports.GenericControllerFactory = void 0;
const controller_1 = require("./controller");
Object.defineProperty(exports, "GenericController", { enumerable: true, get: function () { return controller_1.GenericController; } });
const use_case_1 = require("./use-case");
Object.defineProperty(exports, "GenericUseCase", { enumerable: true, get: function () { return use_case_1.GenericUseCase; } });
class GenericControllerFactory {
    execute() {
        const useCase = new use_case_1.GenericUseCase();
        return new controller_1.GenericController(useCase);
    }
}
exports.GenericControllerFactory = GenericControllerFactory;

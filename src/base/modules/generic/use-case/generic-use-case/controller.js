"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericController = void 0;
const http_1 = require("../../../../core/infra/http");
class GenericController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.useCase.handle(dto);
            if (result.isLeft()) {
                return (0, http_1.clientError)([result.value]);
            }
            return (0, http_1.ok)(result.value);
        });
    }
}
exports.GenericController = GenericController;

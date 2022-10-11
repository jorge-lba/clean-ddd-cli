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
exports.GenericUseCase = void 0;
const Either_1 = require("../../../../core/shared/logic/Either");
const dto_1 = require("./dto");
class GenericUseCase {
    constructor() { }
    handle(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isError = new Error('Method not implemented!');
            if (isError instanceof Error) {
                return (0, Either_1.left)(isError);
            }
            return (0, Either_1.right)(new dto_1.GenericResponseDTO());
        });
    }
}
exports.GenericUseCase = GenericUseCase;

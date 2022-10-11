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
const Either_1 = require("./Either");
describe('Logic - Either', () => {
    it('left class should be understood as left', () => __awaiter(void 0, void 0, void 0, function* () {
        const left = new Either_1.Left('any_value');
        expect(left.value).toBe('any_value');
        expect(left.isLeft()).toBeTruthy();
        expect(left.isRight()).toBeFalsy();
    }));
    it('right class should be understood as right', () => __awaiter(void 0, void 0, void 0, function* () {
        const right = new Either_1.Right('any_value');
        expect(right.value).toBe('any_value');
        expect(right.isRight()).toBeTruthy();
        expect(right.isLeft()).toBeFalsy();
    }));
    it('left method should return a Left instance on left method', () => __awaiter(void 0, void 0, void 0, function* () {
        const leftReturn = (0, Either_1.left)('any_value');
        expect(leftReturn).toBeInstanceOf(Either_1.Left);
    }));
    it('right method should return a Right instance on right method', () => __awaiter(void 0, void 0, void 0, function* () {
        const rightReturn = (0, Either_1.right)('any_value');
        expect(rightReturn).toBeInstanceOf(Either_1.Right);
    }));
});

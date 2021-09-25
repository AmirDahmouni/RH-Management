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
exports.UpdatePasswordInput = exports.UpdateUserInput = exports.AddUserInput = exports.LoginInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let LoginInput = class LoginInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], LoginInput.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    graphql_1.InputType({ description: 'Login Input' })
], LoginInput);
exports.LoginInput = LoginInput;
let AddUserInput = class AddUserInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddUserInput.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddUserInput.prototype, "password", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddUserInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AddUserInput.prototype, "surname", void 0);
AddUserInput = __decorate([
    graphql_1.InputType({ description: 'add user input' })
], AddUserInput);
exports.AddUserInput = AddUserInput;
let UpdateUserInput = class UpdateUserInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "surname", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], UpdateUserInput.prototype, "admin", void 0);
UpdateUserInput = __decorate([
    graphql_1.InputType({ description: 'update user input' })
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;
let UpdatePasswordInput = class UpdatePasswordInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdatePasswordInput.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdatePasswordInput.prototype, "oldPassword", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdatePasswordInput.prototype, "newPassword", void 0);
UpdatePasswordInput = __decorate([
    graphql_1.InputType({ description: 'update user password input' })
], UpdatePasswordInput);
exports.UpdatePasswordInput = UpdatePasswordInput;
//# sourceMappingURL=user.input.js.map
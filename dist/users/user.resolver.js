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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const currentuser_decorator_1 = require("../auth/currentuser.decorator");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const user_type_1 = require("./types/user.type");
const user_input_1 = require("./types/user.input");
const auth_service_1 = require("../auth/auth.service");
let UserResolver = class UserResolver {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async login(loginInput) {
        return await this.authService.login(loginInput);
    }
    getUsers() {
        return this.userService.getUsers();
    }
    getUserWithToken(user) {
        return this.userService.getUser(user._id);
    }
    getUser(userid) {
        return this.userService.getUser(userid);
    }
    addUser(addUserInput) {
        const { username, password, name, surname } = addUserInput;
        return this.userService.addUser(username, password, name, surname);
    }
};
__decorate([
    graphql_1.Query(() => user_type_1.LoggedUserType),
    __param(0, graphql_1.Args('loginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.Query(() => [user_type_1.UserType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUsers", null);
__decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Query(() => user_type_1.UserType),
    __param(0, currentuser_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUserWithToken", null);
__decorate([
    graphql_1.Query(() => user_type_1.UserType),
    __param(0, graphql_1.Args('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUser", null);
__decorate([
    graphql_1.Mutation(() => user_type_1.UserType),
    __param(0, graphql_1.Args('UserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.AddUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "addUser", null);
UserResolver = __decorate([
    graphql_1.Resolver('User'),
    __metadata("design:paramtypes", [user_service_1.UserService, auth_service_1.AuthService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map
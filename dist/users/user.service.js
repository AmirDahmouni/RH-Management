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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
        this.getUsers = async () => {
            try {
                const users = await this.UserModel.find();
                return users;
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
        this.addUser = async (username, password, name, surname) => {
            try {
                const users = await this.UserModel.find();
                const filtredUsers = users.filter(user => { return user.username === username; });
                let Admin = false;
                if (users.length === 0)
                    Admin = true;
                if (filtredUsers.length === 0) {
                    const hashedpass = await bcrypt.hash(password, 11);
                    const newUser = new this.UserModel({
                        username,
                        surname,
                        name,
                        password: hashedpass,
                        admin: Admin
                    });
                    return await newUser.save();
                }
                throw new common_1.HttpException('user already exists', common_1.HttpStatus.CONFLICT);
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
        this.getUser = async (userid) => {
            try {
                const user = await this.UserModel.findOne({ _id: userid });
                if (user)
                    return user;
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
        this.getUserByUsername = async (username) => {
            try {
                const user = await this.UserModel.findOne({ username: username }).exec();
                if (user)
                    return user;
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
        this.getUserByToken = async (userId) => {
            try {
                const user = await this.UserModel.findById(userId).exec();
                if (user)
                    return user;
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
        this.editUser = async (senderId, userId, username, name, surname, admin) => {
            try {
                const user = await this.UserModel.findOne({ _id: senderId }).exec();
                if (user && (user.admin || user._id === userId)) {
                    await this.UserModel.updateOne({ _id: userId }, { $set: { username: username, name: name, surname: surname, admin: admin } });
                    return user;
                }
                throw new common_1.HttpException('username already exists', common_1.HttpStatus.CONFLICT);
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
        this.updatePassword = async (senderId, userId, oldPassword, newPassword) => {
            try {
                const userSender = await this.UserModel.findById(senderId);
                const user = await this.UserModel.findById(userId);
                if (user) {
                    if (userSender.admin) {
                        const hashedpass = await bcrypt.hash(newPassword, 11);
                        user.password = hashedpass;
                        return await user.save();
                    }
                    else if (userSender._id === userId)
                        if (await bcrypt.compare(oldPassword, user.password)) {
                            const hashedpass = await bcrypt.hash(newPassword, 11);
                            user.password = hashedpass;
                            return await user.save();
                        }
                    throw new common_1.HttpException('Wrong password', common_1.HttpStatus.FORBIDDEN);
                }
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
        this.deleteUser = async (senderId, userId) => {
            try {
                const user = await this.UserModel.findOne({ _id: senderId });
                if (user && (user.admin || user._id === userId)) {
                    await this.UserModel.deleteOne({ _id: userId });
                    return user;
                }
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            catch (error) {
                return new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
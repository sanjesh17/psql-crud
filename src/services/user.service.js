const UserModel = require("../models/user.model");

class UserService {
  static async createUser(userData) {
    return await UserModel.create(userData);
  }

  static async getAllUsers() {
    return await UserModel.findAll();
  }

  static async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw { type: "ValidationError", message: "User not found" };
    }
    return user;
  }

  static async updateUser(id, userData) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw { type: "ValidationError", message: "User not found" };
    }
    return await UserModel.update(id, userData);
  }

  static async deleteUser(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw { type: "ValidationError", message: "User not found" };
    }
    return await UserModel.delete(id);
  }
}

module.exports = UserService;

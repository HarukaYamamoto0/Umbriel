import UserSchema from "../database/schemas/UserSchema.js";
import validator from "validator";

/**
 * Class representing a User Model.
 * @class
 */
class UserModel {
  /**
   * Retrieves a user by their email.
   * @static
   * @async
   * @param {string} email - The email of the user.
   * @returns {Promise<Object|null>} A promise that resolves to the user object if found, otherwise null.
   * @throws {Error} Throws an error if there's an issue retrieving the user.
   */
  static async getUserByEmail(email) {
    try {
      UserModel.#checkEmail(email);

      const user = await UserSchema.findOne({ email });
      return user;
    } catch (error) {
      throw new Error("Unable to get user: " + error);
    }
  }

  /**
   * Creates a new user.
   * @static
   * @async
   * @param {Object} userObject - The user object containing username and email.
   * @param {string} userObject.username - The username of the new user.
   * @param {string} userObject.email - The email of the new user.
   * @returns {Promise<Object>} A promise that resolves to the created user object.
   * @throws {Error} Throws an error if there's an issue creating the user.
   */
  static async createUser({ username, email }) {
    try {
      UserModel.#checkEmail(email);

      const possibleUser = await UserSchema.findOne({ email });

      if (possibleUser) throw new Error("This user already exists");

      const newUser = await UserSchema.create({ username, email });
      return newUser;
    } catch (error) {
      throw new Error("Unable to create user: " + error);
    }
  }

  /**
   * Updates a user by their email.
   * @static
   * @async
   * @param {string} email - The email of the user to be updated.
   * @param {Object} values - The values to be updated.
   * @returns {Promise<Object|null>} A promise that resolves to the updated user object if found, otherwise null.
   * @throws {Error} Throws an error if there's an issue updating the user.
   */
  static async updateUserByEmail(email, values) {
    try {
      UserModel.#checkEmail(email);

      const user = await UserSchema.findOne({ email });

      if (!user) throw new Error("This user does not exist");

      const updatedUser = await UserSchema.findOneAndUpdate(
        { email },
        ...values,
        {
          new: true,
          runValidators: true,
        },
      );

      return updatedUser;
    } catch (error) {
      throw new Error("Unable to update user: " + error);
    }
  }

  /**
   * Deletes a user by their username.
   * @static
   * @async
   * @param {string} username - The username of the user to be deleted.
   * @throws {Error} Throws an error if there's an issue deleting the user.
   */
  static async deleteUserByUsername(username) {
    try {
      UserModel.#checkEmail(email);

      const user = await UserSchema.findOne({ email });

      if (!user) throw new Error("This user does not exist");

      await UserSchema.findOneAndRemove({ email });
    } catch (error) {
      throw new Error("Unable to remove user: " + error);
    }
  }

  /**
   * Private method to check if the given string is a valid email.
   * @static
   * @private
   * @param {string} email - The email to be checked.
   * @throws {Error} Throws an error if the email is not valid.
   */
  static #checkEmail(email) {
    if (!validator.isEmail(email)) {
      throw new Error("This is not a valid email: " + email);
    }
  }
}

export default UserModel;

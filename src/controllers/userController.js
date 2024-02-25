import UserModel from "../models/UserModel.js";

class UserController {
  async getUser(req, res) {
    try {
      const { email } = req.params;
      const user = await UserModel.getUserByEmail(email);

      if (user) res.send({ user });
      else res.status(400).send({ error: "This user does not exist" });
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Could not find this user" });
    }
  }

  async createUser(req, res) {
    try {
      const { username, password } = req.body;

      const possibleUser = await UserModel.getUserByEmail(email);

      if (possibleUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await UserModel.createUser({ username, email, password });
      user.password = null;

      res.send({ user });
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Error creating user" });
    }
  }

  async updateUser(req, res) {
    try {
      const { email } = req.params;
      const { username, password } = req.body;

      const user = await UserModel.getUserByEmail(email);
      if (!user) return res.status(400).send({ error: "User not found" });

      await UserModel.updateUser(email, { username, email, password });
      res.send({ message: "User updated successfully" });
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Error updating user" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { email } = req.params;
      const user = await UserModel.getUserByEmail(email);
      if (!user) return res.status(400).send({ error: "User not found" });

      await UserModel.deleteUserByEmail(email);
      res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Error deleting user" });
    }
  }
}

export default UserController;

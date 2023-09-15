import db from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import { validateEmail } from '../../../utils/validation';

export async function POST(req) {
  try {
    await db.connectDb();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Будь-ласка заповніть усі поля' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Некоректний E-mail' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'Користувач з таким E-mail вже існує' });
    }
    if (password.length < 6 || password.length > 36) {
      return res.status(400).json({
        message: 'Довжина Вашого паролю має бути більша за 6 і менша 36',
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
    });
    const addedUser = await newUser.save();
    await db.disconnectDb();
    return new Response('OK');
  } catch (err) {
    console.log(err);
  }
}

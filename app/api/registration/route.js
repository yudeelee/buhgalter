import db from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import { validateEmail } from '../../../utils/validation';

export async function POST(req) {
  try {
    await db.connectDb();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Будь-ласка заповніть усі поля', err: true })
      );
    }
    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ message: 'Некоректний E-mail', err: true })
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return new Response(
        JSON.stringify({
          message: 'Користувач з таким E-mail вже існує',
          err: true,
        })
      );
    }
    if (password.length < 6 || password.length > 36) {
      return new Response(
        JSON.stringify({
          message: 'Довжина Вашого паролю має бути більша за 6 і менша 36',
          err: true,
        })
      );
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
    });
    const addedUser = await newUser.save();
    await db.disconnectDb();
    return new Response(
      JSON.stringify({
        message:
          'Нового користувача успішно створено, зараз Вас перенаправлять на сторінку входу',
        err: false,
      })
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: 'Щось хибне трапилось на сервері',
        err: true,
      })
    );
  }
}

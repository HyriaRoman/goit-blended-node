import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { Users } from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export async function register(req, res) {
  const { email, password } = req.body;

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
}

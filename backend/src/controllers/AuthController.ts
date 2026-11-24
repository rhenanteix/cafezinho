import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { CreatorView } from "../views/CreatorView";
import { AppError } from "../utils/AppError";
import { signToken } from "../utils/token";
import type { RegisterInput } from "../validators/creatorValidators";

export const AuthController = {
  async register(req: Request, res: Response) {
    const { password, socials, paymentLinks, acceptedTerms: _terms, ...data } = req.body as RegisterInput;

    if (await UserModel.findByEmail(data.email)) {
      throw new AppError("Este e-mail já está cadastrado", 409, { email: "E-mail já cadastrado" });
    }
    if (await UserModel.isSlugTaken(data.slug)) {
      throw new AppError("Este endereço já está em uso", 409, { slug: "Endereço já está em uso" });
    }

    const user = await UserModel.create(
      { ...data, ...socials, passwordHash: await bcrypt.hash(password, 10) },
      paymentLinks,
    );
    res.status(201).json(CreatorView.session(user, signToken(user.id)));
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body as { email: string; password: string };
    const user = await UserModel.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError("E-mail ou senha incorretos", 401);
    }
    const full = await UserModel.findById(user.id);
    res.json(CreatorView.session(full!, signToken(user.id)));
  },
};

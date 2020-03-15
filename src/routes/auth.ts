import { Request, Response, Router } from 'express';
import { connection } from '@/config/connection';
import User from '@/entity/user';
import { successResponse, errorResponse } from '@/utils';

const router = Router();
router.post('/signup', async (req: Request, res: Response) => {
  const userModel = (await connection).getRepository(User);
  try {
    const body = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'jdoebobob',
      verified: true,
    };
    const user = userModel.create(body);
    const createdUser = await userModel.save(user);
    successResponse(res, { createdUser }, 201);
  } catch {
    errorResponse(res, {});
  }
});

export default router;

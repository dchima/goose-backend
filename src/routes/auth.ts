import { Request, Response, Router } from 'express';
import { models } from '@/models';
import { UserAttributes } from '@/models/user';
import { successResponse, errorResponse } from '@/utils';

const { User } = models;
const router = Router();
console.log('model :', models);
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const user: UserAttributes = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'jdoebobob',
      verified: true,
    };
    const createdUser = await User.create(user);
    successResponse(res, { createdUser }, 201);
  } catch (error) {
    console.log(error);
    errorResponse(res, {});
  }
});

export default router;

import { Response } from 'express';

export const errorResponse = (
  res: Response,
  { code = 500, message = 'Some error occurred while processing your Request' }
): object => {
  return res.status(code).json({
    status: 'fail',
    error: {
      message,
    },
  });
};

export const successResponse = (res: Response, data: object, code = 200): object => {
  return res.status(code).json({
    status: 'success',
    data,
  });
};

import express, { Request, Response } from 'express';
import passport from 'passport';
import * as authController from '../controllers/auth.controller';

export const authRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     loginInfo:
 *      type: object
 *      required:
 *       - loginname
 *       - password
 *      properties:
 *        loginname:
 *          type: string
 *        password:
 *          type: string
 *      example:
 *        loginname: jaham
 *        password: password
 *
 * securitySchemes:
 *  BearerAuth: []
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary:
 *      - Login with loginname, password
 *    tags:
 *      - auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/loginInfo'
 */
authRouter.post('/login', [
  authController.createToken,
  (err: any) => console.log(err),
]);

authRouter.get('/refreshToken', [
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    res.send('success');
  },
]);

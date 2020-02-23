import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
/**
 * add your routes here e.g
 * import authRoutes from './auth';
 */

const router = Router();
/**
 * declare routes here eg
 * router.use('/auth', authRoutes);
 */

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;

import { Router } from 'express';
import * as CattleController from './cattle.controller';

const router = Router();

router.get(
  '/',
  CattleController.allCattles,
);

router.post(
  '/',
  CattleController.createCattle,
);


export default router;

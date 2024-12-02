import express from 'express'
import { borrowControllers } from './borrow.controller';
const router = express.Router();

router.post('/',borrowControllers.createBorrow)

export const borrowRoutes = router
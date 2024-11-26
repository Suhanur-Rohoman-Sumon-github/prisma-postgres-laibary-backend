import express from 'express'
import { memberControllers } from './membar.controllers';


const router = express.Router();

router.post('/',memberControllers.createMember)
router.get('/',memberControllers.getAllMember)
router.get('/:bookId',memberControllers.getSingleMember)
router.put('/:bookId',memberControllers.updateMember)
router.delete('/:bookId',memberControllers.deleteMember)

export const membersRoutes = router
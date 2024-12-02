import express from 'express'
import { booksControllers } from './books.controllars';
import { borrowControllers } from '../borrow/borrow.controller';

const router = express.Router();

router.post('/',booksControllers.createBook)
router.get('/',booksControllers.getAllBooks)
router.get('/:bookId',booksControllers.getSingleBooks)
router.put('/:bookId',booksControllers.updateBook)
router.delete('/:bookId',booksControllers.deleteBook)
router.post('/return',borrowControllers.returnBook)

export const bookRoutes = router
import express from 'express'
import { booksControllers } from './books.controllars';

const router = express.Router();

router.post('/',booksControllers.createBook)
router.get('/',booksControllers.getAllBooks)
router.get('/:bookId',booksControllers.getSingleBooks)
router.put('/:bookId',booksControllers.updateBook)
router.delete('/:bookId',booksControllers.deleteBook)

export const bookRoutes = router

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookServices } from "./books.services";
const createBook = catchAsync(async (req, res) => {
  
  const results = await bookServices.createBookInDb(req.body);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Book created successfully',
    data: results,
  });
});
const getAllBooks = catchAsync(async (req, res) => {
  
  const results = await bookServices.getAllBooksFromDb();
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Books retrieved successfully',
    data: results,
  });
});
const getSingleBooks = catchAsync(async (req, res) => {
  
  
  const results = await bookServices.getSingleBooksFromDb(req.params.bookId);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Book retrieved successfully',
    data: results,
  });
});
const updateBook = catchAsync(async (req, res) => {
  
  
  const results = await bookServices.updateBookFromDB(req.params.bookId,req.body);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Book updated successfully',
    data: results,
  });
});
const deleteBook = catchAsync(async (req, res) => {
  
  
  const results = await bookServices.deleteBookFromDB(req.params.bookId);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Book successfully deleted',
    data: results,
  });
});

export const booksControllers = {
    createBook,
    getAllBooks,
    getSingleBooks,
    updateBook,
    deleteBook
}
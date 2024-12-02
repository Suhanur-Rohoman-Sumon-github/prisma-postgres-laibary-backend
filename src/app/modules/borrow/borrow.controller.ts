import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { borrowServices } from "./borrow.service";

const createBorrow = catchAsync(async (req, res) => {
  
  const results = await borrowServices.createBorrowInDB(req.body);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Book borrowed successfully',
    data: results,
  });
});

const returnBook = catchAsync(async (req, res) => {
  const borrowId = req.body.borrowId
  
  
  const results = await borrowServices.returnBookFromDB(borrowId);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Book returned successfully',
    data: results,
  });
});


export const borrowControllers = {
createBorrow,
returnBook
}
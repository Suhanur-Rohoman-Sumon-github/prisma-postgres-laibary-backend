
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { memberServices } from "./members.services";
const createMember = catchAsync(async (req, res) => {
  
  const results = await memberServices.createMemberInDb(req.body);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Member created successfully',
    data: results,
  });
});
const getAllMember = catchAsync(async (req, res) => {
  
  const results = await memberServices.getAllMemberFromDb();
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Members retrieved successfully',
    data: results,
  });
});
const getSingleMember = catchAsync(async (req, res) => {
  
  
  const results = await memberServices.getSingleMemberFromDb(req.params.bookId);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Member retrieved successfully',
    data: results,
  });
});
const updateMember = catchAsync(async (req, res) => {
  
  
  const results = await memberServices.updateMemberFromDB(req.params.bookId,req.body);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Member updated successfully',
    data: results,
  });
});
const deleteMember = catchAsync(async (req, res) => {
  
  
  const results = await memberServices.deleteMemberFromDB(req.params.bookId);
  sendResponse(res, {
    statusCode: 200, 
    success: true,
    message: 'Member successfully deleted',
    data: results,
  });
});

export const memberControllers = {
    createMember,
    getAllMember,
    getSingleMember,
    updateMember,
    deleteMember
}
import { Borrow, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

const createBorrowInDB = async (payload:Borrow) =>{
    const result = await prisma.borrow.create({
        data:payload
    })
    return result
}
const returnBookFromDB = async (borrowId: string) => {
    const result = await prisma.borrow.findUnique({
        where: { 
            borrowId: borrowId, 
        },
         include: {
      book: true, 
    },
    });
      if (!result) {
    throw new Error(`Borrow record with ID ${borrowId} not found.`);
  }
    
   return result.book;
  
};


export const borrowServices = {
    createBorrowInDB,
    returnBookFromDB
}
import { Book, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient

const createBookInDb = async (payload:Book) =>{
    const result = await prisma.book.create({
        data:payload
    })
    return result
}
const getAllBooksFromDb = async () =>{
    const result = await prisma.book.findMany()
    return result
}
const getSingleBooksFromDb = async (id: string) => {
    const result = await prisma.book.findUniqueOrThrow({
        where: {
            id
        },
    });
    return result;
};
const updateBookFromDB = async (id: string,payload:Partial<Book>) => {
    const result = await prisma.book.update({
        where: {
            id
        },
        data :payload
    });
    return result;
};
const deleteBookFromDB = async (id: string) => {
    const result = await prisma.book.delete({
        where: {
            id
        },
        
    });
    return result;
};


export const bookServices = {
    createBookInDb,
    getAllBooksFromDb,
    getSingleBooksFromDb,
    updateBookFromDB,
    deleteBookFromDB
}
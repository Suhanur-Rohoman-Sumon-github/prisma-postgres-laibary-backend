import { Book, Member, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient

const createMemberInDb = async (payload:Member) =>{
    const result = await prisma.member.create({
        data:payload
    })
    return result
}
const getAllMemberFromDb = async () =>{
    const result = await prisma.member.findMany()
    return result
}
const getSingleMemberFromDb = async (id: string) => {
    const result = await prisma.member.findUniqueOrThrow({
        where: {
         memberId:   id
        },
    });
    return result;
};
const updateMemberFromDB = async (id: string,payload:Partial<Book>) => {
    const result = await prisma.member.update({
        where: {
           memberId: id
        },
        data :payload
    });
    return result;
};
const deleteMemberFromDB = async (id: string) => {
    const result = await prisma.member.delete({
        where: {
           memberId: id
        },
        
    });
    return result;
};


export const memberServices = {
    createMemberInDb,
    getAllMemberFromDb,
    getSingleMemberFromDb,
    updateMemberFromDB,
    deleteMemberFromDB
}
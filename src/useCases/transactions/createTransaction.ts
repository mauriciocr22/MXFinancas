// import { PrismaClient, TransactionType } from "@prisma/client";

// type createTransactionType = {
//   description: string;
//   value: number;
//   type: TransactionType;
//   category: string;
// };

// const prisma = new PrismaClient();

// export async function createTransaction({
//   description,
//   value,
//   type,
//   category,
// }: createTransactionType) {
//   if (!description || !value || !type || !category) {
//     throw new Error("All fields are required!");
//   }

//   const transaction = await prisma.transaction.create({
//     data: {
//       description,
//       value,
//       type,
//       category,
//     },
//   });

//   return transaction;
// }

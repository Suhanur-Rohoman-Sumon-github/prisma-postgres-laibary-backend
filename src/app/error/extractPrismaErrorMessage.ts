export const extractPrismaErrorMessage = (message: string): string => {
  // Extract the specific error message using regex or string manipulation
  const match = message.match(/Argument `(.*?)` is missing/);
  return match ? `Argument ${match[1]} is missing.` : 'A Prisma error occurred.';
};
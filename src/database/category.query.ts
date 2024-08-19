import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findCategorys(filter?: Prisma.competition_categoryWhereInput) {
  const Categorys = await prisma.competition_category.findMany({ where: filter });
  return Categorys;
}

export async function findCategory(filter: Prisma.competition_categoryWhereUniqueInput) {
  const Category = await prisma.competition_category.findUnique({ where: filter });
  return Category;
}

export async function createCategory(data: Prisma.competition_categoryCreateInput) {
  const createdCategory = await prisma.competition_category.create({ data });
  return createdCategory;
}

export async function updateCategory(
  filter: Prisma.competition_categoryWhereUniqueInput,
  data: Prisma.competition_categoryUpdateInput
) {
  const updatedCategory = await prisma.competition_category.update({ where: filter, data });
  return updatedCategory;
}

export async function removeCategory(filter: Prisma.competition_categoryWhereUniqueInput) {
  const deletedCategory = await prisma.competition_category.delete({ where: filter });
  return deletedCategory;
}
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(prevState, formData) {
  const nome = formData.get("nome")?.toString().trim();

  if (!nome) {
    return { error: "O nome da categoria é obrigatório." };
  }

  try {
    // cria a categoria no banco via Prisma
    await prisma.categoria.create({
      data: { nome },
    });

    // atualiza a lista na tela sem precisar recarregar a página inteira
    revalidatePath("/admin/categorias");

    return { success: "Categoria criada com sucesso!" };
  } catch (error) {
    // trata erro de duplicidade (caso a categoria já exista)
    if (error.code === "P2002") {
      return { error: "Já existe uma categoria com este nome." };
    }
    console.error("Erro ao criar categoria:", error);
    return { error: "Erro ao salvar categoria no banco." };
  }
}

export async function updateCategoryAction(prevState, formData) {
  const id = formData.get("id")?.toString();
  const nome = formData.get("nome")?.toString().trim();

  if (!id || !nome) {
    return { error: "ID e nome da categoria são obrigatórios." };
  }

  try {
    await prisma.categoria.update({
      where: { id },
      data: { nome },
    });

    revalidatePath("/admin/categorias");

    return { success: "Categoria atualizada com sucesso!" };
  } catch (error) {
    if (error.code === "P2002") {
      return { error: "Já existe uma categoria com este nome." };
    }
    console.error("Erro ao atualizar categoria:", error);
    return { error: "Erro ao atualizar categoria no banco." };
  }
}

export async function deleteCategoryAction(formData) {
  const id = formData.get("id")?.toString();

  if (!id) return;

  try {
    await prisma.categoria.delete({
      where: { id },
    });

    revalidatePath("/admin/categorias");
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
  }
}
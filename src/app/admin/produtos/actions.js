"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProductAction(prevState, formData) {
  const nome = formData.get("nome")?.toString().trim();
  const preco = parseFloat(formData.get("preco")?.toString() || "0");
  const descricao = formData.get("descricao")?.toString().trim() || null;
  const categoriaId = formData.get("categoriaId")?.toString();
  const quantidade = parseInt(formData.get("quantidade") || "0")

if (!nome || isNaN(preco) || !categoriaId || isNaN(quantidade) || quantidade < 0) {
    return { error: "Preencha o nome, preço, uma quantidade válida (maior ou igual a 0) e selecione uma categoria." };
  }

  try {
    await prisma.produto.create({
      data: {
        nome,
        preco,
        descricao,
        categoriaId,
        quantidade
      },
    });

    revalidatePath("/admin/produtos");
    return { success: "Produto criado com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return { error: "Erro ao salvar produto no banco de dados." };
  }
}

export async function updateProductAction(prevState, formData) {
  const id = formData.get("id")?.toString();
  const nome = formData.get("nome")?.toString().trim();
  const preco = parseFloat(formData.get("preco")?.toString() || "0");
  const descricao = formData.get("descricao")?.toString().trim() || null;
  const categoriaId = formData.get("categoriaId")?.toString();
  const quantidade = parseInt(formData.get("quantidade") || "0")

if (!nome || isNaN(preco) || !categoriaId || isNaN(quantidade) || quantidade < 0) {
    return { error: "Preencha o nome, preço, uma quantidade válida (maior ou igual a 0) e selecione uma categoria." };
  }

  try {
    await prisma.produto.update({
      where: { id },
      data: {
        nome,
        preco,
        descricao,
        categoriaId,
        quantidade
      },
    });

    revalidatePath("/admin/produtos");
    return { success: "Produto atualizado com sucesso!" };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return { error: "Erro ao atualizar produto no banco de dados." };
  }
}

export async function deleteProductAction(formData) {
  const id = formData.get("id")?.toString();

  if (!id) return;

  try {
    await prisma.produto.delete({
      where: { id },
    });

    revalidatePath("/admin/produtos");
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
  }
}
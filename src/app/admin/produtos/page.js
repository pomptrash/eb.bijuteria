import { prisma } from "@/lib/prisma";
import ProductTable from "./productTable";

export default async function ProdutosPage() {
  // Procura produtos com os dados da categoria associada
  const produtos = await prisma.produto.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categoria: {
        select: { id: true, nome: true },
      },
    },
  });

  // Procura todas as categorias para preencher o <select> do formulário
  const categorias = await prisma.categoria.findMany({
    orderBy: { nome: "asc" },
  });

  return (
    <ProductTable produtos={produtos} categorias={categorias} />
  );
}
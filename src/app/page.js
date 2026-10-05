import { prisma } from "../lib/prisma";
import StoreFront from "../components/storeFront";

export const revalidate = 0;

export default async function Home() {
  const [produtos, categorias] = await Promise.all([
    prisma.produto.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        categoria: {
          select: { id: true, nome: true },
        },
      },
    }),
    prisma.categoria.findMany({
      orderBy: { nome: "asc" },
    }),
  ]);

  const produtosFormatados = produtos.map((prod) => ({
    ...prod,
    preco: Number(prod.preco),
  }));

  return <StoreFront produtos={produtosFormatados} categorias={categorias} />;
}
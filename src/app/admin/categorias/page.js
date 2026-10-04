import { prisma } from "@/lib/prisma";
import CategoryForm from "./categoryForm";
import CategoryTable from "./categoryTable";

export default async function CategoriasPage() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { nome: "asc" },
    include: {
      _count: {
        select: { produtos: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
        <p className="text-sm text-gray-600">
          Gerencie as categorias de produtos da loja.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <CategoryForm />
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categorias Cadastradas ({categorias.length})
          </h2>

          {categorias.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">
              Nenhuma categoria cadastrada ainda.
            </p>
          ) : (
            <CategoryTable categorias={categorias} />
          )}
        </div>
      </div>
    </div>
  );
}
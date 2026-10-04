import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const [totalProdutos, totalCategorias] = await Promise.all([
    prisma.produto.count(),
    prisma.categoria.count(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Visão geral do sistema e resumo dos produtos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Produtos Cadastrados
            </h2>
            <p className="text-3xl font-bold text-slate-800 mt-2">
              {totalProdutos}
            </p>
          </div>
          <Link
            href="/admin/produtos"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-md transition-colors"
          >
            Gerenciar →
          </Link>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Categorias Cadastradas
            </h2>
            <p className="text-3xl font-bold text-slate-800 mt-2">
              {totalCategorias}
            </p>
          </div>
          <Link
            href="/admin/categorias"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-md transition-colors"
          >
            Gerenciar →
          </Link>
        </div>
        
      </div>
    </div>
  );
}
import { verifySession } from "@/lib/auth";
import { logoutAction } from "../actions";

export default async function DashboardPage() {
  const session = await verifySession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Visão geral do sistema e resumo dos produtos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-sm font-medium text-gray-500">Produtos</h2>
          <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-sm font-medium text-gray-500">Categorias</h2>
          <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-sm font-medium text-gray-500">Vendas</h2>
          <p className="text-3xl font-bold text-slate-800 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
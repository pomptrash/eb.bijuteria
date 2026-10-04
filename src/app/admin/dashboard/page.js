import { verifySession } from "@/lib/auth";
import { logoutAction } from "../actions";

export default async function DashboardPage() {
  const session = await verifySession();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Painel Administrativo
            </h1>
            <p className="text-sm text-gray-600">
              Sessão ativa: <span className="font-semibold">{session?.email}</span>
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h2 className="font-semibold text-blue-900">Produtos</h2>
            <p className="text-2xl font-bold text-blue-700">0</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="font-semibold text-green-900">Categorias</h2>
            <p className="text-2xl font-bold text-green-700">0</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded">
            <h2 className="font-semibold text-purple-900">Vendas</h2>
            <p className="text-2xl font-bold text-purple-700">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
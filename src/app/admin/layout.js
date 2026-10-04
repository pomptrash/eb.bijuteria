import Link from "next/link";
import { verifySession } from "@/lib/auth";
import { logoutAction } from "./actions";

export default async function AdminLayout({ children }) {
  const session = await verifySession();

  // se a rota for a tela de login, renderiza apenas a página sem a Sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* sidebar  */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-4">
        <div>
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold tracking-wide text-white">
              EB Bijuteria
            </h2>
            <p className="text-xs text-slate-400">Painel de Controle</p>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/categorias"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Categorias
            </Link>
            <Link
              href="/admin/produtos"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Produtos
            </Link>
            <Link
              href="/admin/vendas"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Vendas (Em breve)
            </Link>
          </nav>
        </div>

        {/* rodapé da sidebar */}
        <div className="pt-4 border-t border-slate-800">
          <div className="mb-3 px-2">
            <p className="text-xs text-slate-400">Logado como:</p>
            <p className="text-xs font-semibold text-slate-200 truncate">
              {session.email}
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* conteúdo principal da página */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
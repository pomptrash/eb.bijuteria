"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCategoryAction } from "./actions";

export default function CategoryForm() {
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    null
  );
  const formRef = useRef(null);

  // limpa o input do formulário quando a categoria for criada com sucesso
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Nova Categoria
      </h2>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
          {state.success}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Categoria
          </label>
          <input
            type="text"
            name="nome"
            required
            placeholder="Ex: Anéis, Colares, Brincos"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 text-white py-2 px-4 rounded text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {isPending ? "Cadastrando..." : "Cadastrar Categoria"}
        </button>
      </form>
    </div>
  );
}
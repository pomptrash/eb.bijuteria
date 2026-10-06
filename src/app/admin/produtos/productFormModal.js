"use client";

import { useActionState, useEffect } from "react";
import { createProductAction, updateProductAction } from "./actions";
import ImageUploader from "./productImageUploader";

export default function ProductFormModal({ produto, categorias, onClose }) {
  const isEditing = Boolean(produto);
  const actionToUse = isEditing ? updateProductAction : createProductAction;

  const [state, formAction, isPending] = useActionState(actionToUse, null);

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold"
          >
            ✕
          </button>
        </div>

        {state?.error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          {isEditing && <input type="hidden" name="id" value={produto.id} />}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto *
            </label>
            <input
              type="text"
              name="nome"
              defaultValue={produto?.nome || ""}
              required
              placeholder="Ex: Anel Solitário Prata 925"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (€ / R$) *
              </label>
              <input
                type="number"
                step="0.01"
                name="preco"
                defaultValue={produto?.preco || ""}
                required
                placeholder="29.90"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria *
              </label>
              <select
                name="categoriaId"
                defaultValue={produto?.categoriaId || ""}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white"
              >
                <option value="" disabled>
                  Selecione...
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              rows={3}
              defaultValue={produto?.descricao || ""}
              placeholder="Detalhes sobre o material, tamanho..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="quantidade" className="text-xs font-medium text-zinc-700">
              Quantidade em estoque
            </label>
            <input
              type="number"
              id="quantidade"
              name="quantidade"
              min="0"
              defaultValue={produto?.quantidade ?? 0}
              required
              className="px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ex: 10"
            />
          </div>

          <ImageUploader imagensExistentes={produto?.imagensUrl || []} />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isPending
                ? "Salvando..."
                : isEditing
                ? "Salvar Alterações"
                : "Cadastrar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import EditCategoryModal from "./editCategoryModal";
import { deleteCategoryAction } from "./actions";

export default function CategoryTable({ categorias }) {
  const [editingCategory, setEditingCategory] = useState(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <th className="py-2 px-3 font-semibold">Nome</th>
              <th className="py-2 px-3 font-semibold">Produtos</th>
              <th className="py-2 px-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categorias.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="py-3 px-3 font-medium text-gray-800">
                  {cat.nome}
                </td>
                <td className="py-3 px-3 text-gray-500">
                  {cat._count.produtos} item(ns)
                </td>
                <td className="py-3 px-3 text-right space-x-3">
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                  >
                    Editar
                  </button>

                  <form action={deleteCategoryAction} className="inline">
                    <input type="hidden" name="id" value={cat.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-800 text-xs font-semibold"
                    >
                      Excluir
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCategory && (
        <EditCategoryModal
          categoria={editingCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}
    </>
  );
}
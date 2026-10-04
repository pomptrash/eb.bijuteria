"use client";

import { useState } from "react";
import ProductFormModal from "./productFormModal";
import { deleteProductAction } from "./actions";

export default function ProductTable({ produtos, categorias }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (produto) => {
    setEditingProduct(produto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
          <p className="text-sm text-gray-600">
            Gerencie o catálogo de produtos da loja.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          + Novo Produto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {produtos.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">
            Nenhum produto cadastrado ainda.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                  <th className="py-2 px-3 font-semibold">Nome</th>
                  <th className="py-2 px-3 font-semibold">Categoria</th>
                  <th className="py-2 px-3 font-semibold">Preço</th>
                  <th className="py-2 px-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {produtos.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3">
                      <p className="font-medium text-gray-800">{prod.nome}</p>
                      {prod.descricao && (
                        <p className="text-xs text-gray-500 truncate max-w-xs">
                          {prod.descricao}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-3 text-gray-600">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {prod.categoria?.nome || "Sem categoria"}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-800">
                      {prod.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-3 px-3 text-right space-x-3">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                      >
                        Editar
                      </button>

                      <form action={deleteProductAction} className="inline">
                        <input type="hidden" name="id" value={prod.id} />
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
        )}
      </div>

      {isModalOpen && (
        <ProductFormModal
          produto={editingProduct}
          categorias={categorias}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
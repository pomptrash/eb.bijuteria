"use client";

import { useState } from "react";
import { useCart } from "../context/cartContext";

export default function StoreFront({ produtos, categorias }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");
  const { addToCart, setIsOpen, totalItems } = useCart();

  // Filtragem dinamica de produtos
  const produtosFiltrados =
    categoriaAtiva === "TODOS"
      ? produtos
      : produtos.filter((p) => p.categoriaId === categoriaAtiva);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-chocolate font-sans antialiased pb-28">
      {/* HEADER FLUTUANTE */}
      <header className="sticky top-0 z-40 bg-brand-bg/85 backdrop-blur-md border-b border-brand-creme px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-wider text-brand-chocolate">
              EB BIJUTERIAS
            </h1>
            <p className="text-[10px] md:text-xs text-brand-gold font-medium tracking-widest uppercase">
              Acessórios que brilham ✨
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-brand-creme hover:bg-[#e8decb] text-brand-chocolate p-2.5 rounded-full transition-colors"
            aria-label="Abrir Sacola"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-bg">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-gradient-to-br from-brand-creme to-[#eaddce] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-sm">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-gold uppercase bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
            Coleção Exclusiva
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-chocolate max-w-lg mx-auto leading-tight">
            O toque final que faltava no seu look
          </h2>
          <p className="text-xs md:text-sm text-brand-chocolate/80 mt-2 max-w-md mx-auto">
            Bijuterias cheias de estilo e personalidade selecionadas com carinho.
          </p>
          <a
            href="#catalogo"
            className="inline-block mt-6 bg-brand-gold hover:bg-brand-goldHover text-white text-xs md:text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Explorar Peças
          </a>
        </div>
      </section>

      {/* FILTRO DE CATEGORIAS */}
      <section id="catalogo" className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setCategoriaAtiva("TODOS")}
            className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              categoriaAtiva === "TODOS"
                ? "bg-brand-chocolate text-brand-bg shadow-sm"
                : "bg-brand-creme text-brand-chocolate hover:bg-[#e4d8ca]"
            }`}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                categoriaAtiva === cat.id
                  ? "bg-brand-chocolate text-brand-bg shadow-sm"
                  : "bg-brand-creme text-brand-chocolate hover:bg-[#e4d8ca]"
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </section>

      {/* GRID DE PRODUTOS */}
      <main className="max-w-6xl mx-auto px-4">
        {produtosFiltrados.length === 0 ? (
          <div className="text-center py-12 text-brand-chocolate/60">
            <p className="text-sm">Nenhum produto encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {produtosFiltrados.map((prod) => (
              <div
                key={prod.id}
                className="group bg-brand-creme/60 hover:bg-brand-creme rounded-2xl p-3 border border-brand-creme transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#e0d4c5] mb-3 flex items-center justify-center text-brand-chocolate/40 text-xs">
                    {/* Placeholder para imagem */}
                    <span>✨ EB Bijuterias</span>
                    <span className="absolute top-2 left-2 bg-brand-bg/90 backdrop-blur-sm text-[10px] font-medium px-2.5 py-0.5 rounded-full text-brand-chocolate">
                      {prod.categoria?.nome || "Bijuteria"}
                    </span>
                  </div>

                  <h3 className="text-xs md:text-sm font-medium text-brand-chocolate line-clamp-2">
                    {prod.nome}
                  </h3>
                  {prod.descricao && (
                    <p className="text-[11px] text-brand-chocolate/70 line-clamp-1 mt-0.5">
                      {prod.descricao}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-brand-chocolate/5 flex items-center justify-between">
                  <span className="text-xs md:text-sm font-bold text-brand-chocolate">
                    {Number(prod.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="bg-brand-gold hover:bg-brand-goldHover text-white text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span>+</span> Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* BOTÃO FLUTUANTE DO CARRINHO */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-gold hover:bg-brand-goldHover text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3 group relative border-2 border-brand-bg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="text-xs font-bold pr-1 hidden sm:inline">
            Ver Sacola
          </span>
          <span className="bg-brand-chocolate text-brand-bg text-[11px] font-bold px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        </button>
      </div>
    </div>
  );
}
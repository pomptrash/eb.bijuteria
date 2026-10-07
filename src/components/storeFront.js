"use client";

import { useState } from "react";
import { useCart } from "../context/cartContext";

export default function StoreFront({ produtos, categorias }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");
  const [produtoModal, setProdutoModal] = useState(null);
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const { cart, addToCart, setIsOpen, totalItems } = useCart();

  // Filtragem dinamica de produtos
  const produtosFiltrados =
    categoriaAtiva === "TODOS"
      ? produtos
      : produtos.filter((p) => p.categoriaId === categoriaAtiva);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-chocolate font-sans antialiased">
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
            Bijuterias cheias de estilo e personalidade selecionadas com
            carinho.
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
            <p className="text-sm">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {produtosFiltrados.map((prod) => {
              // Procura a quantidade que o cliente já colocou no carrinho
              const itemNoCarrinho = cart.find((item) => item.id === prod.id);
              const qtdNoCarrinho = itemNoCarrinho
                ? itemNoCarrinho.quantidade
                : 0;

              // O produto está sem estoque total ou o cliente já atingiu o limite do estoque?
              const atingiuLimite =
                qtdNoCarrinho >= prod.quantidade || prod.quantidade <= 0;

              return (
                <div
                  key={prod.id}
                  className="group bg-brand-creme/60 hover:bg-brand-creme rounded-2xl p-3 border border-brand-creme transition-all duration-300 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => {
                        setProdutoModal(prod);
                        setImagemAtiva(0);
                      }}
                      className="relative aspect-square rounded-xl overflow-hidden bg-[#e0d4c5] mb-3 flex items-center justify-center text-brand-chocolate/40 text-xs cursor-pointer group-hover:opacity-90 transition-opacity"
                    >
                      {prod.imagensUrl && prod.imagensUrl.length > 0 ? (
                        <img
                          src={prod.imagensUrl[0]}
                          alt={prod.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        /* Placeholder fallback caso não haja imagem */
                        <span>✨ EB Bijuterias</span>
                      )}

                      <span className="absolute top-2 left-2 bg-brand-bg/90 backdrop-blur-sm text-[10px] font-medium px-2.5 py-0.5 rounded-full text-brand-chocolate">
                        {prod.categoria?.nome || "Bijuteria"}
                      </span>
                    </div>

                    <h3 className="text-xs md:text-sm font-medium text-brand-chocolate line-clamp-2">
                      {prod.nome}
                    </h3>
                    {prod.descricao && (
                      <p className="text-[11px] text-brand-chocolate/70 line-clamp-3 mt-0.5">
                        {prod.descricao}
                      </p>
                    )}
                    <p className="text-[11px] opacity-50">
                      ({prod.quantidade} unidades em estoque)
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-brand-chocolate/5 flex items-center justify-between">
                    <span className="text-xs md:text-sm font-bold text-brand-chocolate">
                      {Number(prod.preco).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <button
                      disabled={atingiuLimite}
                      onClick={() => addToCart(prod)}
                      className={`text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-sm ${
                        !atingiuLimite
                          ? "bg-brand-gold hover:bg-brand-goldHover text-white active:scale-95"
                          : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                      }`}
                    >
                      {!atingiuLimite ? (
                        <>
                          <span>+</span> Adicionar
                        </>
                      ) : (
                        "Esgotado"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
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

      {/* MODAL / GALERIA DE FOTOS DO PRODUTO */}
      {produtoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-bg rounded-3xl p-6 max-w-sm w-full shadow-2xl relative border border-brand-creme">
            {/* Botão Fechar */}
            <button
              onClick={() => setProdutoModal(null)}
              className="absolute top-4 right-4 text-brand-chocolate/60 hover:text-brand-chocolate text-sm font-bold bg-brand-creme w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            {/* Imagem Principal em Destaque */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#e0d4c5] mb-3 flex items-center justify-center">
              {produtoModal.imagensUrl && produtoModal.imagensUrl.length > 0 ? (
                <img
                  src={produtoModal.imagensUrl[imagemAtiva]}
                  alt={produtoModal.nome}
                  className="w-full h-full object-cover transition-all"
                />
              ) : (
                <span className="text-brand-chocolate/40 text-xs">
                  ✨ EB Bijuterias
                </span>
              )}
            </div>

            {/* Miniaturas da Galeria (se houver mais de 1 imagem) */}
            {produtoModal.imagensUrl && produtoModal.imagensUrl.length > 1 && (
              <div className="flex justify-center gap-2 mb-4">
                {produtoModal.imagensUrl.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagemAtiva(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      imagemAtiva === idx
                        ? "border-brand-gold scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Info do Produto no Modal */}
            <h3 className="font-serif font-bold text-lg text-brand-chocolate mb-1">
              {produtoModal.nome}
            </h3>
            {produtoModal.descricao && (
              <p className="text-xs text-brand-chocolate/70 mb-3 leading-relaxed">
                {produtoModal.descricao}
              </p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-brand-creme mt-2">
              <span className="text-base font-bold text-brand-chocolate">
                {Number(produtoModal.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>

              {/* Botão de Adicionar no Modal */}
              {(() => {
                const itemNoCarrinho = cart.find(
                  (item) => item.id === produtoModal.id,
                );
                const qtdNoCarrinho = itemNoCarrinho
                  ? itemNoCarrinho.quantidade
                  : 0;
                const atingiuLimite =
                  qtdNoCarrinho >= produtoModal.quantidade ||
                  produtoModal.quantidade <= 0;

                return (
                  <button
                    disabled={atingiuLimite}
                    onClick={() => {
                      addToCart(produtoModal);
                    }}
                    className={`text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1 shadow-sm ${
                      !atingiuLimite
                        ? "bg-brand-gold hover:bg-brand-goldHover text-white active:scale-95"
                        : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                    }`}
                  >
                    {!atingiuLimite ? "+ Adicionar à Sacola" : "Esgotado"}
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-brand-chocolate text-brand-creme mt-16 border-t border-brand-gold/20 py-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">
              EB Bijuterias
            </h3>
            <p className="text-xs text-brand-creme/80">
              Elegância e estilo para todas as ocasiões.
            </p>
          </div>

          
          <div>
            <a
              href="https://www.instagram.com/__eb.bijuterias__" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-creme/10 hover:bg-brand-creme/20 text-brand-creme px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 touch-manipulation"
            >
              
              <svg
                className="w-4 h-4 fill-current text-brand-gold"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Siga no Instagram
            </a>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t flex items-center justify-between flex-wrap text-center gap-4 border-brand-creme/10  text-[11px] text-brand-creme/50">
          <div>
            © {new Date().getFullYear()} EB Bijuterias. Todos os direitos
            reservados.
          </div>
          <div className="text-[9px] text-brand-creme/70 ">
            <p>
              Desenvolvido por{" "}
              <a
                className="font-medium text-brand-gold hover:underline transition-all"
              >
                João Pompeu
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";

import { useCart } from "../context/cartContext";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isOpen) return null;

  const handleCheckoutWhatsApp = () => {
    const telefone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    
    let mensagem = "Olá, gostaria de finalizar meu pedido:\n\n";
    
    cart.forEach((item) => {
      const subtotal = (Number(item.preco) * item.quantidade).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      mensagem += `• ${item.quantidade}x ${item.nome} (${subtotal})\n`;
    });

    const totalFormatado = totalPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    mensagem += `\n*Total:* ${totalFormatado}\n\nComo faço para combinar o pagamento e envio?`;

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="bg-brand-bg w-full max-w-md h-full flex flex-col shadow-2xl p-6 overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Cabeçalho do Carrinho */}
        <div className="flex items-center justify-between border-b border-brand-creme pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-serif font-bold text-brand-chocolate">
              Sua Sacola
            </h2>
            <span className="bg-brand-creme text-brand-chocolate text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "itens"}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-brand-chocolate/60 hover:text-brand-chocolate p-1 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-brand-chocolate/60 space-y-2">
              <span className="text-3xl">🛍️</span>
              <p className="text-sm">Sua sacola está vazia.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-brand-creme/50 p-3 rounded-2xl border border-brand-creme"
              >
                <div className="flex-1">
                  <h4 className="text-xs font-medium text-brand-chocolate">
                    {item.nome}
                  </h4>
                  <p className="text-xs font-bold text-brand-chocolate mt-1">
                    {Number(item.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                {/* controle de quantidade */}
                <div className="flex items-center bg-white rounded-full border border-brand-creme px-2 py-1 gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-xs font-bold text-brand-chocolate hover:text-brand-gold px-1"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold text-brand-chocolate min-w-[12px] text-center">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-xs font-bold text-brand-chocolate hover:text-brand-gold px-1"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 text-xs font-bold p-1"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com Total e Botão WhatsApp */}
        {cart.length > 0 && (
          <div className="border-t border-brand-creme pt-4 space-y-4">
            <div className="flex justify-between items-center text-brand-chocolate font-bold">
              <span>Subtotal:</span>
              <span className="text-lg">
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Finalizar via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
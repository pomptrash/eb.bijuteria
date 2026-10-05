import { CartProvider } from "../context/cartContext";
import CartDrawer from "../components/cartDrawer";
import "./globals.css";

export const metadata = {
  title: "EB Bijuterias",
  description: "O toque final que faltava no seu look.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-br"
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-chocolate">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
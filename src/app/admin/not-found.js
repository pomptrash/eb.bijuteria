import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm max-w-md w-full space-y-4">
        <span className="text-4xl font-extrabold text-slate-800">404</span>
        
        <h1 className="text-xl font-bold text-gray-800">
          Página não encontrada ou não existe.
        </h1>
        
      </div>
    </div>
  );
}
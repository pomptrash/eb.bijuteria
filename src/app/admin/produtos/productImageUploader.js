"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function ImageUploader({ imagensExistentes = [], onImagensChange }) {
  // guarda as URLs já salvas (caso seja edição) ou recém-enviadas
  const [imagens, setImagens] = useState(imagensExistentes);
  const [uploading, setUploading] = useState(false);
  const [erro, setErro] = useState("");

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // limite de no máximo 3 imagens
    if (imagens.length + files.length > 3) {
      setErro("Você pode adicionar no máximo 3 imagens por produto.");
      return;
    }

    setErro("");
    setUploading(true);

    try {
      // faz o upload de todos os arquivos selecionados para o Cloudinary
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const novassUrls = await Promise.all(uploadPromises);

      const listaAtualizada = [...imagens, ...novassUrls];
      setImagens(listaAtualizada);
      if (onImagensChange) onImagensChange(listaAtualizada);
    } catch (err) {
      console.error("Erro no upload:", err);
      setErro("Erro ao enviar imagem. Verifique as credenciais do Cloudinary.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexParaRemover) => {
    const listaFiltrada = imagens.filter((_, idx) => idx !== indexParaRemover);
    setImagens(listaFiltrada);
    if (onImagensChange) onImagensChange(listaFiltrada);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-zinc-700">
        Fotos do Produto (Até 3 imagens)
      </label>

      {/* Grid de Prévia das Imagens */}
      <div className="grid grid-cols-3 gap-2 my-1">
        {imagens.map((url, idx) => (
          <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-200">
            <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 hover:opacity-100 shadow"
              title="Remover foto"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Botão para adicionar mais fotos se for menor que 3 */}
        {imagens.length < 3 && (
          <label className={`aspect-square rounded-lg border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-all ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
            <span className="text-xl text-zinc-400">+</span>
            <span className="text-[10px] text-zinc-500 font-medium">
              {uploading ? "Enviando..." : "Adicionar"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Inputs escondidos para enviar as URLs via FormData na Server Action */}
      {imagens.map((url, idx) => (
        <input key={idx} type="hidden" name="imagensUrl" value={url} />
      ))}

      {erro && <p className="text-xs text-red-600">{erro}</p>}
    </div>
  );
}
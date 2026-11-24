"use client";

import { useState } from "react";
import { creatorService } from "@/models/services/creatorService";
import { ApiError } from "@/models/services/httpClient";

export function useAvatarUpload(onUploaded: (url: string) => void) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();

  async function upload(file: File) {
    if (file.size > 2 * 1024 * 1024) return setError("A imagem deve ter no máximo 2 MB");
    setError(undefined);
    setUploading(true);
    try {
      onUploaded(await creatorService.uploadAvatar(file));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Falha ao enviar a imagem");
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading, error };
}

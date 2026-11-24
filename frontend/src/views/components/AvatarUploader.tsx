"use client";

import { useRef } from "react";
import { Camera, LoaderCircle, Trash2 } from "lucide-react";
import { useAvatarUpload } from "@/viewmodels/useAvatarUpload";
import { Avatar } from "./Avatar";

interface Props {
  value: string | null;
  name: string;
  onChange: (url: string | null) => void;
}

export function AvatarUploader({ value, name, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const { upload, uploading, error } = useAvatarUpload(onChange);

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-semibold">
        Foto de perfil <span className="font-normal text-mocha/70">(opcional)</span>
      </span>
      <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/10">
        <button type="button" onClick={() => input.current?.click()} className="relative" aria-label="Escolher foto">
          <Avatar src={value} name={name || "?"} size={72} />
          <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-espresso text-white ring-2 ring-white">
            {uploading ? <LoaderCircle className="size-3.5 animate-spin" /> : <Camera className="size-3.5" />}
          </span>
        </button>
        <div className="flex-1 text-sm">
          <button type="button" onClick={() => input.current?.click()} className="font-semibold text-brand-600 hover:text-brand-700">
            {value ? "Trocar foto" : "Enviar uma foto"}
          </button>
          <p className="text-xs text-mocha/70">JPG, PNG ou WEBP até 2 MB</p>
          {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
        </div>
        {value && (
          <button type="button" onClick={() => onChange(null)} className="rounded-full p-2 text-mocha/60 hover:bg-black/5 hover:text-red-600" aria-label="Remover foto">
            <Trash2 className="size-4" />
          </button>
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

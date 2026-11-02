const ALLOWED = new Map<string, { ext: string[]; magic: (bytes: Uint8Array) => boolean }>([
  [
    "image/jpeg",
    {
      ext: ["jpg", "jpeg"],
      magic: (bytes) => bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
    },
  ],
  [
    "image/png",
    {
      ext: ["png"],
      magic: (bytes) =>
        bytes.length > 8 &&
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47,
    },
  ],
  [
    "image/webp",
    {
      ext: ["webp"],
      magic: (bytes) =>
        bytes.length > 12 &&
        bytes[0] === 0x52 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x46 &&
        bytes[3] === 0x46 &&
        bytes[8] === 0x57 &&
        bytes[9] === 0x45 &&
        bytes[10] === 0x42 &&
        bytes[11] === 0x50,
    },
  ],
  [
    "application/pdf",
    {
      ext: ["pdf"],
      magic: (bytes) =>
        bytes.length > 4 &&
        bytes[0] === 0x25 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x44 &&
        bytes[3] === 0x46,
    },
  ],
]);

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const MAX_UPLOAD_FILES = 5;

export type FileCheck =
  | { ok: true; contentType: string; extension: string }
  | { ok: false; message: string };

export async function validateUpload(file: File): Promise<FileCheck> {
  if (file.size <= 0) return { ok: false, message: "One of the files is empty." };
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "Each file must be 8 MB or smaller." };
  }
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const rule = ALLOWED.get(file.type);
  if (!rule || !rule.ext.includes(extension)) {
    return { ok: false, message: "Upload JPG, PNG, WEBP, or PDF files only." };
  }
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!rule.magic(bytes)) {
    return { ok: false, message: "A file did not match its declared type and was rejected." };
  }
  return { ok: true, contentType: file.type, extension };
}

export function safeFileName(name: string) {
  const base = name.split(/[/\\]/).pop() ?? "file";
  return base.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
}

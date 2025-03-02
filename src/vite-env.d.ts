/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASEURL: string;
    readonly VITE_API_URL: string;
    readonly VITE_CLOUDINARY_FOLDER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

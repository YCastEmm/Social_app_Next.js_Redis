export type FAQPageType = {
    id: number;
    title: string;
    body: any[]; // o unknown[] si querés forzar validaciones después
    slug: string;
};


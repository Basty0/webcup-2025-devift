export interface Type {
    id: number;
    label: string;
}

export interface Theend {
    id: number;
    slug: string;
    title: string;
    content: string;
    type_id: number;
    tone: string;
    image_url: string | null;
    gif_url: string | null;
    sound_url: string | null;
    is_public: boolean;
    is_draft: boolean;
}

export interface MediaItem {
    id: string;
    url: string;
    name: string;
}

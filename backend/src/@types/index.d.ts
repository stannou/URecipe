export interface SEARCH_RECIPES {
    user: SEARCH_USER[];
    note: string;
    description: string;
    title: string;
    ingredients: string;
    image: IMAGE;
}

export interface SEARCH_RECIPES_RESPONSE {
    user: string;
    note: string;
    description: string;
    title: string;
    ingredients: string;
    image: IMAGE | ImageBitmap;
    
}

interface SEARCH_USER {
    email: string;
}

interface IMAGE {
    id: string;
    url: string;
}
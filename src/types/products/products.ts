export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    rating: number;
    isNew: boolean;
    onSale: boolean;
    limitedDeal: boolean;
};

export type Category = {
    name: string;
    slug: string;
};

export type Filter = {
    searchTerm: string,
    category: string,
    priceRange: [number, number],
    status: string[],
    sortBy: string
};
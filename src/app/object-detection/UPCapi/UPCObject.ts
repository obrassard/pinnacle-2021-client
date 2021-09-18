export interface Offer {
    merchant: string;
    domain: string;
    title: string;
    currency: string;
    list_price: number;
    price: number;
    shipping: string;
    condition: string;
    availability: string;
    link: string;
    updated_t: number;
}

export interface Item {
    ean: string;
    title: string;
    upc: string;
    gtin: string;
    asin: string;
    description: string;
    brand: string;
    model: string;
    dimension: string;
    weight: string;
    category: string;
    currency: string;
    lowest_recorded_price: number;
    highest_recorded_price: number;
    images: string[];
    offers: Offer[];
}

export interface UPCObject {
    code: string;
    total: number;
    offset: number;
    items: Item[];
}
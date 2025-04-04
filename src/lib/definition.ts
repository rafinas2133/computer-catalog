export type User = {
    id: string;
    name: string | null;
    email: string;
    password: string;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    categoryId: number; 
    category: Category;
    createdAt: Date;    
    updatedAt: Date;    
}

export type Category = {
    id: number;
    name: string;
    imageUrl: string; // Match Prisma's nullable type
    parentId: number | null;
    parent: Category | null;
    subCategories: Category[];
    products: Product[];
}

export type Banner = {
    id: number;
    title: string;
    imageUrl: string;
    linkProduct: string;
}
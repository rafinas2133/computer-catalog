export type User = {
    id: number;
    username: string;
    password: string;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    categoryId: number; // Changed from string to number to match Prisma
    category: Category;
    createdAt: Date;    // Added to match Prisma
    updatedAt: Date;    // Added to match Prisma
}

export type Category = {
    id: number;
    name: string;
    imageUrl: string | null; // Match Prisma's nullable type
    parentId: number | null;
    parent: Category | null;
    subCategories: Category[];
    products: Product[];
}

export type Banner = {
    id: number;
    title: string;
    imageUrl: string;
}
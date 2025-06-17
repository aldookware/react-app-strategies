export interface Strategy {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
}

export interface FilterOptions {
    searchTerm: string;
    category: string;
}

export interface UploadData {
    file: File;
    description: string;
}
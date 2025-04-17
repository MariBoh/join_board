export interface Contact {
    id: string;
    name: string;
    mail: string; //changed by Shardzhil
    phone: string;
    color: string;
    initials: string;
}

export function generateInitials(name: string): string {
    return name.split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
}

export function generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
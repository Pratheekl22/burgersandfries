export interface Token {
    value: string;
    expires: number;
    name: 'access' | 'refresh';
    inception: number;
}
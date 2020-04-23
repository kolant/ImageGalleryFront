export interface IAsyncStorageProvider {
    set(key: string, value: any): Promise<any>
    get(key: string): Promise<any>
    delete(key: string): Promise<any>
}

export interface IStorageProvider {
    set(key: string, value: any)
    get(key: string): any
    delete(key: string)
}

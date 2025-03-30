export interface DataBaseProtocol {
    query(options: any): Promise<any>
    insert(payload: any): Promise<any>
    update(id: string, payload: any): Promise<any>
    delete(id: string): Promise<string | null>
}
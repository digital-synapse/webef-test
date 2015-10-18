
export interface map {}

export interface IEntity<T> {
	put(entity: T): Promise<T>;
	put(entities: T[]): Promise<T[]>;
	get(id: number): Promise<T>;
	get(id?: number[]): Promise<T[]>;
	delete(id: number): Promise<T>;
	delete(id?: number[]): Promise<T[]>;
	query(filters: map): Promise<T[]>;
	count(filters: map): Promise<number>;
	select(filters: map): Promise<T[]>;
	search(filters: map): Promise<T[]>;
}
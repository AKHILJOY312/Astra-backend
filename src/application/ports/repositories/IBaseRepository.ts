export interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T | void>;
  delete(id: string): Promise<T | null>;
  findById(id: string): Promise<T | null>;
}

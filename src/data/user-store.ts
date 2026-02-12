/**
 * Simulated async data store.
 *
 * In a real application these functions would query a database (e.g. PostgreSQL,
 * MongoDB). The artificial delay simulates the asynchronous nature of network
 * or disk I/O that you would encounter with a real data store.
 *
 * When you're ready to swap in a real database, replace the body of each
 * function with the appropriate query — the async signatures stay the same.
 */

export interface CreateUserInput {
  name: string
  email: string
}

export interface User extends CreateUserInput {
  id: number
}

const USERS: User[] = [{ id: 12345, name: 'John Doe', email: 'john@doe.com' }]

/** Simulates async I/O latency (e.g. a database round-trip). */
function simulateDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), 10))
}

export async function findAll(): Promise<User[]> {
  return simulateDelay([...USERS])
}

export async function findById(id: number): Promise<User | undefined> {
  return simulateDelay(USERS.find((u) => u.id === id))
}

export async function create(input: CreateUserInput): Promise<User> {
  const user: User = { ...input, id: Math.floor(Math.random() * 1000000) }
  USERS.push(user)
  return simulateDelay(user)
}

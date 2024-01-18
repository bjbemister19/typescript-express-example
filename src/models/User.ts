import * as t from 'io-ts'

export const UserCodec = t.type({
  id: t.number,
  name: t.string,
  email: t.string
})

export type User = t.TypeOf<typeof UserCodec>

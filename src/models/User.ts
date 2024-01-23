import * as t from 'io-ts'

export const UserCodec = t.intersection([
  t.type({
    name: t.string,
    email: t.string
  }),
  t.partial({
    id: t.number
  })
])

export type User = t.TypeOf<typeof UserCodec>

import { gql } from "apollo-angular"

export const USER_FRAGMENT = gql`
  fragment UserObj on User {
    id
    name
    lastName
    email
    registerDate @include(if: $include)
    birthday @include(if: $include)
    role
    active
  }
`
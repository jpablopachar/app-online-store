import { gql } from 'apollo-angular'
import { USER_FRAGMENT } from '../fragment'

export const LOGIN = gql`
  query getLogin($email: String!, $password: String!, $include: Boolean!) {
    login(email: $email, password: $password) {
      status
      message
      token
      user {
        ...UserObj
      }
    }
  }

  ${USER_FRAGMENT}
`
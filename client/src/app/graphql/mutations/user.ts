import { gql } from 'apollo-angular'
import { USER_FRAGMENT } from '../fragment'

export const REGISTER_USER = gql`
  mutation addUser($user: UserInput!, $include: Boolean!) {
    register(user: $user) {
      status
      message
      user {
        ...UserObj
      }
    }
  }
  ${USER_FRAGMENT}
`;
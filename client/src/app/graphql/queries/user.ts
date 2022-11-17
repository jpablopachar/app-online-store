import { gql } from 'apollo-angular'
import { RESULT_INFO_FRAGMENT, USER_FRAGMENT } from '../fragment'

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

export const USERS_LIST = gql`
  query usersList ($include: Boolean!, $page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
    users(page: $page, itemsPage: $itemsPage, active: $active) {
      info {
        ...ResultInfoObj
      }
      status
      message
      users {
        ...UserObj
      }
    }
  }
  ${ USER_FRAGMENT }
  ${ RESULT_INFO_FRAGMENT }
`;

export const ME_DATA = gql`
  query meData($include: Boolean!) {
    me {
      status
      message
      user {
        ...UserObj
      }
    }
  }

  ${USER_FRAGMENT}
`
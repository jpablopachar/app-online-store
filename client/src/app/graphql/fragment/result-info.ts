import { gql } from "apollo-angular"

export const RESULT_INFO_FRAGMENT = gql`
  fragment ResultInfoObj on ResultInfo {
    page
    pages
    total
    itemsPage
  }
`
import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
      _id
      username
      savedBooks {
        _id
        bookId
        title
        authors
      }
      email
      bookCount
    }
  }
`;
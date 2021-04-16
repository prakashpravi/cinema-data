import gql from "graphql-tag";
var allMoviesTitles = gql `query MyQuery {
  allMovieTitles {
    nodes {
    name
    id
    createdAt
    price
    movieImage
    description
    }
  }
}`;

export const userProfileById = (id) => {
  return gql `query MyQuery {
    userProfileById(id: "${id}") {
      id
      email
      createdAt
      birthday
      firstName
      lastName
      mobileNo
      profileImg
    }
  }
  `;
}
export const createMovieTitle = (name, price, description, movieImage, id, user_id, date) => {
  debugger
  return gql `mutation {
      createMovieTitle(
        input: {
          movieTitle: {
            name: "${name}"
            price: "${price}"
            description: "${description}"
            movieImage: "${movieImage}"
            id: "${id}"
            isPurchase: false
            updatedBy: "${user_id}"
            createdBy: "${user_id}"
            createdAt: "${date}"
            updatedAt: "${date}"
            isActive: true
          }
        }
      ) {
        clientMutationId
      }
    }
    `;
}
export const updateUserProfileById = (firstName, lastName, email, mobile_no, birthday, movieImage, id) => {
  debugger
  return gql `mutation {
    updateUserProfileById(
      input: {
        userProfilePatch: {
          birthday: "${birthday}"
          email: "${email}"
          firstName: "${firstName}"
          lastName: "${lastName}"
          mobileNo: "${mobile_no}"
          profileImg: "${movieImage}"
        }
        id: "${id}"
      }
    ) {
      clientMutationId
    }
  }
    `;
}
export {
  allMoviesTitles,
}
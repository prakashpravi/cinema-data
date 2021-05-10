import gql from "graphql-tag";

export const requestAll = gql `query MyQuery {
  allMovieTitles (filter: {isPurchase: {equalTo: false}}){
    nodes {
      nodeId
      createdBy
      createdAt
      description
      id
      isActive
      isPurchase
      movieImage
      name
      englishTitleName
      price
      updatedAt
      updatedBy
    }
  }
}`;

export const requestAccpect = (id) => {
  return gql `mutation MyMutation {
    updateMovieTitleById(
      input: {
        id: "${id}"
        movieTitlePatch: { isPurchase: true }
      }
    ) {
      clientMutationId
    }
  }
  `
};
export const myMoviesTitles = (id) => {
  return gql `query MyQuery {
  allMovieTitles(filter: {createdBy: {equalTo: "${id}"}, isPurchase: {equalTo: true}}) {
    nodes {
      name
      id
      englishTitleName
      description
      createdAt
      price
      movieImage
      isPurchase
    }
  }
}
`
};
export const myMoviesTitles1 = (id) => {
  return gql `query MyQuery {
  allMovieTitles(filter: {createdBy: {equalTo: "${id}"}}) {
    nodes {
      name
      id
      englishTitleName
      description
      createdAt
      price
      movieImage
      isPurchase
    }
  }
}
`
};

export const allMoviesTitles = gql `query MyQuery {
  allMovieTitles {
    nodes {
    name
    id
    englishTitleName
    createdAt
    price
    movieImage
    description
    isPurchase
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
  return gql `mutation {
      createMovieTitle(
        input: {
          movieTitle: {
            name: "${name}"
            englishTitleName: "${name}"
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
export const updatetabledata = (name, price, description, id, user_id, date) => {
  return gql `mutation MyMutation {
    updateMovieTitleById(
      input: {
        movieTitlePatch: {
          name: "${name}"
          englishTitleName: "${name}"
          updatedBy: "${user_id}"
          updatedAt: "${date}"
          price: "${price}"
          description: "${description}"
          createdBy: "${user_id}"
          createdAt: "${date}"
        }
        id: "${id}"
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
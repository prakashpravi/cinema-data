import gql from "graphql-tag";
var allMoviesTitles = gql`query MyQuery {
    allMovieTitles {
      nodes {
        name
      }
    }
  }`;
export {
    allMoviesTitles, 
} 
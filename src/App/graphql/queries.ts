// tslint:disable
// this is an auto generated file. This will be overwritten

export const getWorld = `query GetWorld($id: ID!) {
  getWorld(id: $id) {
    id
    name
    slug
    logo {
      name
      size
      type
      extension
    }
    games {
      items {
        id
        name
        slug
      }
      nextToken
    }
  }
}
`;
export const listWorlds = `query ListWorlds(
  $filter: ModelWorldFilterInput
  $limit: Int
  $nextToken: String
) {
  listWorlds(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      slug
      logo {
        name
        size
        type
        extension
      }
      games {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getGame = `query GetGame($id: ID!) {
  getGame(id: $id) {
    id
    name
    slug
    logo {
      name
      size
      type
      extension
    }
    world {
      id
      name
      slug
      logo {
        name
        size
        type
        extension
      }
      games {
        nextToken
      }
    }
  }
}
`;
export const listGames = `query ListGames(
  $filter: ModelGameFilterInput
  $limit: Int
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      slug
      logo {
        name
        size
        type
        extension
      }
      world {
        id
        name
        slug
      }
    }
    nextToken
  }
}
`;
export const searchWorlds = `query SearchWorlds(
  $filter: SearchableWorldFilterInput
  $sort: SearchableWorldSortInput
  $limit: Int
  $nextToken: Int
) {
  searchWorlds(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      slug
      logo {
        name
        size
        type
        extension
      }
      games {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const searchGames = `query SearchGames(
  $filter: SearchableGameFilterInput
  $sort: SearchableGameSortInput
  $limit: Int
  $nextToken: Int
) {
  searchGames(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      slug
      logo {
        name
        size
        type
        extension
      }
      world {
        id
        name
        slug
      }
    }
    nextToken
  }
}
`;

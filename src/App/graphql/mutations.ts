// tslint:disable
// this is an auto generated file. This will be overwritten

export const createWorld = `mutation CreateWorld($input: CreateWorldInput!) {
  createWorld(input: $input) {
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
export const updateWorld = `mutation UpdateWorld($input: UpdateWorldInput!) {
  updateWorld(input: $input) {
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
export const deleteWorld = `mutation DeleteWorld($input: DeleteWorldInput!) {
  deleteWorld(input: $input) {
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
export const createGame = `mutation CreateGame($input: CreateGameInput!) {
  createGame(input: $input) {
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
export const updateGame = `mutation UpdateGame($input: UpdateGameInput!) {
  updateGame(input: $input) {
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
export const deleteGame = `mutation DeleteGame($input: DeleteGameInput!) {
  deleteGame(input: $input) {
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

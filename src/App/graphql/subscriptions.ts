// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateWorld = `subscription OnCreateWorld {
  onCreateWorld {
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
export const onUpdateWorld = `subscription OnUpdateWorld {
  onUpdateWorld {
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
export const onDeleteWorld = `subscription OnDeleteWorld {
  onDeleteWorld {
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
export const onCreateGame = `subscription OnCreateGame {
  onCreateGame {
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
export const onUpdateGame = `subscription OnUpdateGame {
  onUpdateGame {
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
export const onDeleteGame = `subscription OnDeleteGame {
  onDeleteGame {
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

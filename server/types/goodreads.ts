export type GoodreadsRequestParams = {
    [key: string]: string;
};

export type GoodreadsResponseRaw = string;

export type GoodreadsResposeElement =
    | string
    | Partial<{
          _: string;
          type: 'integer' | 'boolean';
          nil: 'true';
      }>;

export type GoodreadsResposeElements = {
    [key: string]: GoodreadsResposeElement;
};

export type GoodreadsParsedResposeElement = string | number | boolean | null;

export type GoodreadsParsedResposeElements = {
    [key: string]: GoodreadsParsedResposeElement;
};

export type GoodreadsGetAuthUserResponse = {
    GoodreadsResponse: {
        user: GoodreadsResposeElements;
    };
};

export type GoodreadsGetAuthUserParsedResponse = {
    GoodreadsResponse: {
        user: GoodreadsUser;
    };
};

export type GoodreadsUser = {
    id: number;
    name: string;
    link: string;
};

export type GoodreadsGetShelvesResponse = {
    GoodreadsResponse: {
        shelves: {
            userShelf: GoodreadsResposeElements;
        };
    };
};

export type GoodreadsGetShelvesParsedResponse = {
    GoodreadsResponse: {
        shelves: {
            userShelf: GoodreadsShelf[];
        };
    };
};

export type GoodreadsShelf = GoodreadsParsedResposeElements;

export type GoodreadsGetBookResponse = {
    GoodreadsResponse: {
        book: GoodreadsResposeElements;
    };
};

export type GoodreadsGetBookParsedResponse = {
    GoodreadsResponse: {
        book: GoodreadsBook;
    };
};

export type GoodreadsBook = GoodreadsParsedResposeElements;

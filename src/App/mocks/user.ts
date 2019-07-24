import { User } from '../types/User';

export const USERNAME = 'librarian';

export const user: User = {
    username: USERNAME
};

export const adminUser: User = {
    username: USERNAME,
    isAdmin: true
};

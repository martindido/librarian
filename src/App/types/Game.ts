import { File } from './Storage';
import { World } from './World';

export type Game = {
    id: string;
    name: string;
    slug: string;
    logo: File;
    world: World;
};

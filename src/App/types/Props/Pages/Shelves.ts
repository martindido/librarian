import { LoadShelvesActionCreator } from '../../Action/Load';
import { Shelf } from '../../Shelf';

export type ShelvesPageProps = Readonly<{
    shelves: Shelf[];
    loadShelves: LoadShelvesActionCreator;
}>;

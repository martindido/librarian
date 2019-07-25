import { Storage } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { uploadFileError, uploadFileSuccess } from '../../actions/storage';
import { UPLOAD_FILE } from '../../constants/actions';
import { Action } from '../../types/Action';
import { UploadFileAction } from '../../types/Action/Storage';
import { S3File } from '../../types/Storage';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'storage', 'uploadFile']);

export default (action$: ActionsObservable<UploadFileAction>) =>
    action$.pipe(
        ofType(UPLOAD_FILE),
        switchMap(
            async (action: UploadFileAction): Promise<Action> => {
                try {
                    const file = (await Storage.put(action.payload.slug, action.payload.file, {
                        contentType: action.payload.file.type
                    })) as S3File;

                    return uploadFileSuccess(file);
                } catch (error) {
                    logger.error(error);
                    return uploadFileError(error.errors ? error.errors : [error]);
                }
            }
        )
    );

import { UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR } from '../constants/actions';
import { UploadFileAction, UploadFileSuccessAction, UploadFileErrorAction } from '../types/Action/Storage';
import { Errors } from '../types/Sync';
import { FileUpload, S3File } from '../types/Storage';

export function uploadFile(payload: FileUpload): UploadFileAction {
    return {
        type: UPLOAD_FILE,
        payload
    };
}

export function uploadFileSuccess(payload: S3File): UploadFileSuccessAction {
    return {
        type: UPLOAD_FILE_SUCCESS,
        payload
    };
}

export function uploadFileError(payload: Errors): UploadFileErrorAction {
    return {
        type: UPLOAD_FILE_ERROR,
        payload
    };
}
export function respondSuccess(data, message = 'Success') {
    return {
        code: 200,
        message,
        data,
    };
}

export function respondWithError(errorCode, message = 'Error', data = {}) {
    return {
        code: errorCode,
        message,
        errors: data,
    };
}

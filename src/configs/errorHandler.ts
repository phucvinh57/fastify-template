import { NOT_FOUND_GENERIC, TRY_LATER } from '@constants';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function customErrorHandler(err: FastifyError, _req: FastifyRequest, res: FastifyReply) {
    if (err.statusCode === undefined) {
        if (err.name === 'NotFoundError' || err.code === 'P2025') {
            err.statusCode = 400;
            err.message = NOT_FOUND_GENERIC;
            return res.send(err);
        }
        err.statusCode = 500;
    }

    // Intentionally thrown errors
    if (err.statusCode >= 500) {
        err.message = TRY_LATER;
        return res.send(err);
    }

    if (!err.validation || err.validation.length === 0) {
        return res.send(err);
    }

    const validation = err.validation[0];
    if (validation.keyword === 'required') {
        err.message = `${validation.params.missingProperty[0].toUpperCase() + validation.params.missingProperty.slice(1)} is required !`;
        return res.send(err);
    }
    // Error occurs on PathParams
    else if (validation.instancePath.length === 0) {
        err.message = 'Invalid path parameters !';
        return res.send(err);
    }

    const instanceAccesses = validation.instancePath.split('/');
    let rawErrorField: string;

    // Occurs if error on an item of an array
    if (!isNaN(parseInt(instanceAccesses[instanceAccesses.length - 1]))) {
        // If not have field name of input
        if (instanceAccesses[instanceAccesses.length - 2].length === 0) rawErrorField = 'item';
        else {
            rawErrorField = `An item of${
                instanceAccesses[instanceAccesses.length - 2][0].toUpperCase() + instanceAccesses[instanceAccesses.length - 2].slice(1)
            }`;
        }
    } else rawErrorField = instanceAccesses[instanceAccesses.length - 1];

    const errorField = rawErrorField
        // For snake case
        .replaceAll('_', ' ')
        // For camel case
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map((word) => word[0].toLowerCase() + word.slice(1))
        .join(' ');

    const capitalizedErrorField = errorField[0].toUpperCase() + errorField.slice(1);

    if (validation.keyword === 'maxLength' || validation.keyword === 'minLength') {
        err.message = `${capitalizedErrorField} ${validation.message ? validation.message : 'is invalid'} !`;
    } else if (validation.keyword === 'enum') {
        err.message = `${capitalizedErrorField} must be one of allowed values: ${
            validation.params.allowedValues instanceof Array
                ? validation.params.allowedValues.map((value: string) => `"${value}"`).join(', ')
                : validation.params.allowedValues
        } !`;
    } else if (validation.keyword === 'minItems' || validation.keyword === 'maxItems') {
        err.message = `${capitalizedErrorField} ${err.message} !`;
    } else if (validation.keyword === 'minimum') {
        err.message = `${capitalizedErrorField} must be greater than or equal ${validation.params.limit} !`;
    } else if (validation.keyword === 'maximum') {
        err.message = `${capitalizedErrorField} must be less than or equal ${validation.params.limit} !`;
    } else if (validation.keyword === 'type') {
        err.message = `${capitalizedErrorField} ${err.message} !`;
    } else if (validation.keyword === 'uniqueItems') {
        err.message = `Items of ${errorField} must be unique !`;
    } else if (validation.keyword === 'format') {
        err.message = `${capitalizedErrorField} has invalid format !`;
    } else if (validation.keyword === 'const') {
        err.message = `${capitalizedErrorField} has invalid value !`;
    }
    // Default
    else err.message = 'Bad request !';
    return res.send(err);
}

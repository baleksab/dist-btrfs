/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface CreateNewServerRequest
 */
export interface CreateNewServerRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateNewServerRequest
     */
    ipAddress: string;
    /**
     * 
     * @type {string}
     * @memberof CreateNewServerRequest
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof CreateNewServerRequest
     */
    password: string;
}
/**
 * 
 * @export
 * @interface CreateNewServerResponse
 */
export interface CreateNewServerResponse {
    /**
     * 
     * @type {string}
     * @memberof CreateNewServerResponse
     */
    ipAddress: string;
    /**
     * 
     * @type {string}
     * @memberof CreateNewServerResponse
     */
    uid: string;
}

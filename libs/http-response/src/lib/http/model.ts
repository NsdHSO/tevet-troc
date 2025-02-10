export enum HttpCodeW {
    // Successful Responses (2xx)
    OK = 200,
    Created = 201,
    NoContent = 204,

    // Client Errors (4xx)
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,

    // Server Errors (5xx)
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
}

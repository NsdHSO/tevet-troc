import { HttpCodeW } from "./model";
import { createResponse, ResponseObject } from "./response";

export const httpResponseBuilder = {
  OK: <K>(message: K): ResponseObject<K, HttpCodeW.OK> =>
      createResponse(message, HttpCodeW.OK),

  Created: <K>(message: K): ResponseObject<K, HttpCodeW.Created> =>
      createResponse(message, HttpCodeW.Created),

  NoContent: <K>(message: K): ResponseObject<K, HttpCodeW.NoContent> =>
      createResponse(message, HttpCodeW.NoContent),

  BadRequest: <K>(message: K): ResponseObject<K, HttpCodeW.BadRequest> =>
      createResponse(message, HttpCodeW.BadRequest),

  Unauthorized: <K>(message: K): ResponseObject<K, HttpCodeW.Unauthorized> =>
      createResponse(message, HttpCodeW.Unauthorized),
  Conflict: <K>(message: K): ResponseObject<K, HttpCodeW.Conflict> =>
      createResponse(message, HttpCodeW.Conflict),
  NotFound: <K>(message: K): ResponseObject<K, HttpCodeW.NotFound> =>
      createResponse(message, HttpCodeW.NotFound),
  NotImplemented: <K>(message: K): ResponseObject<K, HttpCodeW.NotImplemented> =>
      createResponse(message, HttpCodeW.NotImplemented),
  InternalServerError: <K>(message: K): ResponseObject<K, HttpCodeW.InternalServerError> =>
      createResponse(message, HttpCodeW.InternalServerError),
};
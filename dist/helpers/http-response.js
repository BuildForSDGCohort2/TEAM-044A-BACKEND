"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHttpError = makeHttpError;
exports.apiResponse = exports.onSuccess = void 0;

function makeHttpError({
  statusCode,
  id,
  title,
  errorMessage,
  stack
}) {
  const toReturn = {
    errors: [{
      id,
      title,
      error: errorMessage,
      stack
    }]
  };
  return {
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    statusCode,
    data: JSON.stringify(toReturn)
  };
}

const onSuccess = ({
  type,
  attributes,
  self,
  location,
  statusCode,
  id
}) => {
  const toReturn = {
    links: {
      self
    },
    data: [{
      type,
      id,
      attributes: attributes || null
    }]
  };
  return {
    headers: {
      Accept: 'application/vnd.api+json',
      Location: location,
      'Content-Type': 'application/vnd.api+json'
    },
    statusCode,
    data: JSON.stringify(toReturn)
  };
};

exports.onSuccess = onSuccess;

const apiResponse = ({
  status,
  statusCode,
  message,
  data
}) => {
  const toReturn = {
    status,
    message,
    data
  };
  return {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    },
    statusCode,
    data: JSON.stringify(toReturn)
  };
};

exports.apiResponse = apiResponse;
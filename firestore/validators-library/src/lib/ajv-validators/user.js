'use strict';
exports.isUserValid = validate11;
const schema12 = {
  type: 'object',
  properties: {
    coins: { type: 'array', items: { $ref: '#/definitions/Coin' } },
  },
};
const schema13 = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    creationDate: { $ref: '#/definitions/Timestamp' },
  },
  required: ['id'],
};
const schema14 = {
  type: 'object',
  properties: {
    seconds: {
      type: 'number',
      description:
        'The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.',
    },
    nanoseconds: {
      type: 'number',
      description: 'The fractions of a second at nanosecond resolution.*',
    },
  },
  required: ['seconds', 'nanoseconds'],
  description:
    'A `Timestamp` represents a point in time independent of any time zone or calendar, represented as seconds and fractions of seconds at nanosecond resolution in UTC Epoch time.\n\nIt is encoded using the Proleptic Gregorian Calendar which extends the Gregorian calendar backwards to year one. It is encoded assuming all minutes are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z.\n\nFor examples and further specifications, refer to the  {@link  https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto Timestamp definition } .',
};
function validate12(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (errors === 0) {
    if (data && typeof data == 'object' && !Array.isArray(data)) {
      let missing0;
      if (data.id === undefined && (missing0 = 'id')) {
        validate12.errors = [
          {
            instancePath,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing0 },
            message: "must have required property '" + missing0 + "'",
          },
        ];
        return false;
      } else {
        if (data.id !== undefined) {
          const _errs1 = errors;
          if (typeof data.id !== 'string') {
            validate12.errors = [
              {
                instancePath: instancePath + '/id',
                schemaPath: '#/properties/id/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
          var valid0 = _errs1 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.creationDate !== undefined) {
            let data1 = data.creationDate;
            const _errs3 = errors;
            const _errs4 = errors;
            if (errors === _errs4) {
              if (data1 && typeof data1 == 'object' && !Array.isArray(data1)) {
                let missing1;
                if (
                  (data1.seconds === undefined && (missing1 = 'seconds')) ||
                  (data1.nanoseconds === undefined &&
                    (missing1 = 'nanoseconds'))
                ) {
                  validate12.errors = [
                    {
                      instancePath: instancePath + '/creationDate',
                      schemaPath: '#/definitions/Timestamp/required',
                      keyword: 'required',
                      params: { missingProperty: missing1 },
                      message: "must have required property '" + missing1 + "'",
                    },
                  ];
                  return false;
                } else {
                  if (data1.seconds !== undefined) {
                    let data2 = data1.seconds;
                    const _errs6 = errors;
                    if (!(typeof data2 == 'number' && isFinite(data2))) {
                      validate12.errors = [
                        {
                          instancePath: instancePath + '/creationDate/seconds',
                          schemaPath:
                            '#/definitions/Timestamp/properties/seconds/type',
                          keyword: 'type',
                          params: { type: 'number' },
                          message: 'must be number',
                        },
                      ];
                      return false;
                    }
                    var valid2 = _errs6 === errors;
                  } else {
                    var valid2 = true;
                  }
                  if (valid2) {
                    if (data1.nanoseconds !== undefined) {
                      let data3 = data1.nanoseconds;
                      const _errs8 = errors;
                      if (!(typeof data3 == 'number' && isFinite(data3))) {
                        validate12.errors = [
                          {
                            instancePath:
                              instancePath + '/creationDate/nanoseconds',
                            schemaPath:
                              '#/definitions/Timestamp/properties/nanoseconds/type',
                            keyword: 'type',
                            params: { type: 'number' },
                            message: 'must be number',
                          },
                        ];
                        return false;
                      }
                      var valid2 = _errs8 === errors;
                    } else {
                      var valid2 = true;
                    }
                  }
                }
              } else {
                validate12.errors = [
                  {
                    instancePath: instancePath + '/creationDate',
                    schemaPath: '#/definitions/Timestamp/type',
                    keyword: 'type',
                    params: { type: 'object' },
                    message: 'must be object',
                  },
                ];
                return false;
              }
            }
            var valid0 = _errs3 === errors;
          } else {
            var valid0 = true;
          }
        }
      }
    } else {
      validate12.errors = [
        {
          instancePath,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
  }
  validate12.errors = vErrors;
  return errors === 0;
}
function validate11(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (errors === 0) {
    if (data && typeof data == 'object' && !Array.isArray(data)) {
      if (data.coins !== undefined) {
        let data0 = data.coins;
        const _errs1 = errors;
        if (errors === _errs1) {
          if (Array.isArray(data0)) {
            var valid1 = true;
            const len0 = data0.length;
            for (let i0 = 0; i0 < len0; i0++) {
              const _errs3 = errors;
              if (
                !validate12(data0[i0], {
                  instancePath: instancePath + '/coins/' + i0,
                  parentData: data0,
                  parentDataProperty: i0,
                  rootData,
                })
              ) {
                vErrors =
                  vErrors === null
                    ? validate12.errors
                    : vErrors.concat(validate12.errors);
                errors = vErrors.length;
              }
              var valid1 = _errs3 === errors;
              if (!valid1) {
                break;
              }
            }
          } else {
            validate11.errors = [
              {
                instancePath: instancePath + '/coins',
                schemaPath: '#/properties/coins/type',
                keyword: 'type',
                params: { type: 'array' },
                message: 'must be array',
              },
            ];
            return false;
          }
        }
      }
    } else {
      validate11.errors = [
        {
          instancePath,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
  }
  validate11.errors = vErrors;
  return errors === 0;
}
exports.isCoinValid = validate14;
function validate14(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (errors === 0) {
    if (data && typeof data == 'object' && !Array.isArray(data)) {
      let missing0;
      if (data.id === undefined && (missing0 = 'id')) {
        validate14.errors = [
          {
            instancePath,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing0 },
            message: "must have required property '" + missing0 + "'",
          },
        ];
        return false;
      } else {
        if (data.id !== undefined) {
          const _errs1 = errors;
          if (typeof data.id !== 'string') {
            validate14.errors = [
              {
                instancePath: instancePath + '/id',
                schemaPath: '#/properties/id/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
          var valid0 = _errs1 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.creationDate !== undefined) {
            let data1 = data.creationDate;
            const _errs3 = errors;
            const _errs4 = errors;
            if (errors === _errs4) {
              if (data1 && typeof data1 == 'object' && !Array.isArray(data1)) {
                let missing1;
                if (
                  (data1.seconds === undefined && (missing1 = 'seconds')) ||
                  (data1.nanoseconds === undefined &&
                    (missing1 = 'nanoseconds'))
                ) {
                  validate14.errors = [
                    {
                      instancePath: instancePath + '/creationDate',
                      schemaPath: '#/definitions/Timestamp/required',
                      keyword: 'required',
                      params: { missingProperty: missing1 },
                      message: "must have required property '" + missing1 + "'",
                    },
                  ];
                  return false;
                } else {
                  if (data1.seconds !== undefined) {
                    let data2 = data1.seconds;
                    const _errs6 = errors;
                    if (!(typeof data2 == 'number' && isFinite(data2))) {
                      validate14.errors = [
                        {
                          instancePath: instancePath + '/creationDate/seconds',
                          schemaPath:
                            '#/definitions/Timestamp/properties/seconds/type',
                          keyword: 'type',
                          params: { type: 'number' },
                          message: 'must be number',
                        },
                      ];
                      return false;
                    }
                    var valid2 = _errs6 === errors;
                  } else {
                    var valid2 = true;
                  }
                  if (valid2) {
                    if (data1.nanoseconds !== undefined) {
                      let data3 = data1.nanoseconds;
                      const _errs8 = errors;
                      if (!(typeof data3 == 'number' && isFinite(data3))) {
                        validate14.errors = [
                          {
                            instancePath:
                              instancePath + '/creationDate/nanoseconds',
                            schemaPath:
                              '#/definitions/Timestamp/properties/nanoseconds/type',
                            keyword: 'type',
                            params: { type: 'number' },
                            message: 'must be number',
                          },
                        ];
                        return false;
                      }
                      var valid2 = _errs8 === errors;
                    } else {
                      var valid2 = true;
                    }
                  }
                }
              } else {
                validate14.errors = [
                  {
                    instancePath: instancePath + '/creationDate',
                    schemaPath: '#/definitions/Timestamp/type',
                    keyword: 'type',
                    params: { type: 'object' },
                    message: 'must be object',
                  },
                ];
                return false;
              }
            }
            var valid0 = _errs3 === errors;
          } else {
            var valid0 = true;
          }
        }
      }
    } else {
      validate14.errors = [
        {
          instancePath,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
  }
  validate14.errors = vErrors;
  return errors === 0;
}

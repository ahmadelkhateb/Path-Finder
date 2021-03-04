module.exports = {
  '/deals': {
    get: {
      tags: ['Deal'],
      summary: 'Get Cheapest or Fastest Deal',
      operationId: 'FetchDeal',
      parameters: [
        {
          in: 'query',
          name: 'from',
          schema: {
            type: 'string'
          },
          description: 'the departure city'
        },
        {
          in: 'query',
          name: 'to',
          schema: {
            type: 'string'
          },
          description: 'the arrival city'
        },
        {
          in: 'query',
          name: 'filter',
          schema: {
            type: 'string'
          },
          description: 'cheapest || fastest'
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Done successfully.'
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/deals/init': {
    get: {
      tags: ['Deal'],
      summary: 'Fetch all deals',
      operationId: 'FetchDeals',
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Done successfully.'
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
};

require('../../../../../helper');

const request = require('supertest');
const app = require('../../../../../../src/interfaces/api/app');
const { createRecordWithQuery } = require('../../../../../db/helpers/records');
const { startServer } = require('../../../../../utils/api');
const config = require('../../../../../../src/configs/api');

const server = startServer(app, config.host, config.port);

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
});

const recordsParams = [
  {
    slug: 'honey',
    name: 'мед',
    description: 'полезная сладость',
    active: true,
  },
  {
    slug: 'bird',
    name: 'птица',
    description: 'птичка',
    active: false,
  },
  {
    slug: 'hedgehog',
    name: 'ежик',
    description: 'опасный зверь',
    active: true,
  },
];

describe('GET /categories', () => {
  beforeEach(async () => {
    for (const r of recordsParams) {
      await createRecordWithQuery(r);
    }
  });

  describe('with valid api-key token', () => {
    it('responds with 200 without params', async () => {
      const response = await request(server)
        .get(`/api/v1/categories`)
        .set('X-API-KEY', config.apiKey);

      expect(response.status).toEqual(200);

      const expected = [
        {
          id: /\d+/,
          slug: 'hedgehog',
          name: 'ежик',
          description: 'опасный зверь',
          active: true,
        },
        {
          id: /\d+/,
          slug: 'bird',
          name: 'птица',
          description: 'птичка',
          active: false,
        },
      ];

      expect(response.body.result).toMatchObject(expected);
    });
    it('get only by active=0 false records', async () => {
      const response = await request(server)
        .get(`/api/v1/categories?active=0`)
        .set('X-API-KEY', config.apiKey);

      expect(response.status).toEqual(200);

      const expected = [
        {
          id: /\d+/,
          slug: 'bird',
          name: 'птица',
          description: 'птичка',
          active: false,
        },
      ];

      expect(response.body.result).toMatchObject(expected);
    });
    it('get only true by active=1 records', async () => {
      const response = await request(server)
        .get(`/api/v1/categories?active=1`)
        .set('X-API-KEY', config.apiKey);

      expect(response.status).toEqual(200);

      const expected = [
        {
          id: /\d+/,
          slug: 'hedgehog',
          name: 'ежик',
          description: 'опасный зверь',
          active: true,
        },
        {
          id: /\d+/,
          slug: 'honey',
          name: 'мед',
          description: 'полезная сладость',
          active: true,
        },
      ];

      expect(response.body.result).toMatchObject(expected);
    });
    it('get 3 records', async () => {
      const response = await request(server)
        .get(`/api/v1/categories?pageSize=3`)
        .set('X-API-KEY', config.apiKey);

      expect(response.status).toEqual(200);

      const expected = [
        {
          id: /\d+/,
          slug: 'hedgehog',
          name: 'ежик',
          description: 'опасный зверь',
          active: true,
        },
        {
          id: /\d+/,
          slug: 'bird',
          name: 'птица',
          description: 'птичка',
          active: false,
        },
        {
          id: /\d+/,
          slug: 'honey',
          name: 'мед',
          description: 'полезная сладость',
          active: true,
        },
      ];

      expect(response.body.result).toMatchObject(expected);
    });
    it('get by sort -name records', async () => {
      const response = await request(server)
        .get(`/api/v1/categories?sort=-name`)
        .set('X-API-KEY', config.apiKey);

      expect(response.status).toEqual(200);

      const expected = [
        {
          id: /\d+/,
          slug: 'hedgehog',
          name: 'ежик',
          description: 'опасный зверь',
          active: true,
        },
        {
          id: /\d+/,
          slug: 'bird',
          name: 'птица',
          description: 'птичка',
          active: false,
        },
      ];

      expect(response.body.result).toMatchObject(expected);
    });
  });


  describe('without valid api key', () => {
    it('responds with 401', async () => {
      const response = await request(server)
        .get(`/api/v1/categories`)
        .set('X-API-KEY', 'lol');

      expect(response.status).toEqual(401);
    });
  });
});

describe('GET /category', () => {
  beforeEach(async () => {
    for (const r of recordsParams) {
      await createRecordWithQuery(r);
    }
  });

  describe('with valid api-key token', () => {
    it('responds with 200 by slug', async () => {
      const response = await request(server)
        .get(`/api/v1/category?slug=hedgehog`)
        .set('X-API-KEY', config.apiKey);

      expect(response.status).toEqual(200);

      const expected = {
          id: /\d+/,
          slug: 'hedgehog',
          name: 'ежик',
          description: 'опасный зверь',
          active: true,
      };

      expect(response.body.result).toMatchObject(expected);
    });
    it('responds with 200 without unknown slug', async () => {
      const response = await request(server)
        .get(`/api/v1/category?slug=ferfr`)
        .set('X-API-KEY', config.apiKey);

      expect(response.status).toEqual(200);

      const expected = {};

      expect(response.body.result).toMatchObject(expected);
    });
  });

  describe('without valid api key', () => {
    it('responds with 401', async () => {
      const response = await request(server)
        .get(`/api/v1/category`)
        .set('X-API-KEY', 'lol');

      expect(response.status).toEqual(401);
    });
  });
});

describe('POST /category', () => {
  const createRecordParams = {
      slug: 'dog',
      name: 'собака',
      description: 'лучший друг',
      active: true,
  };

  describe('with valid api-key token', () => {
    it('responds with 200', async () => {
      const response = await request(server)
        .post(`/api/v1/category`)
        .set('X-API-KEY', config.apiKey)
        .send(createRecordParams);

      expect(response.status).toEqual(200);

      const expected = {
        id: /\d+/,
        slug: 'dog',
        name: 'собака',
        description: 'лучший друг',
        active: true,
      };

      expect(response.body.result).toMatchObject(expected);
    });
  });

  describe('without valid api key', () => {
    it('responds with 401', async () => {
      const response = await request(server)
        .post(`/api/v1/category`)
        .set('X-API-KEY', 'bla-bla')
        .send(createRecordParams);


      expect(response.status).toEqual(401);
    });
  });
});

describe('PUT /category/:id', () => {
  const createRecordParams = {
    slug: 'dog',
    name: 'собака',
    description: 'лучший друг',
    active: true,
  };
  const updateRecordParams = {
    description: 'самый лучший друг',
  };

  describe('with valid api-key token', () => {
    it('responds with 200', async () => {
      const res = await createRecordWithQuery(createRecordParams);
      const response = await request(server)
        .put(`/api/v1/category/${res.id}`)
        .set('X-API-KEY', config.apiKey)
        .send(updateRecordParams);

      expect(response.status).toEqual(200);

      const expected = {
        id: /\d+/,
        slug: 'dog',
        name: 'собака',
        description: 'самый лучший друг',
        active: true,
      };

      expect(response.body.result).toMatchObject(expected);
    });
  });

  describe('without valid api key', () => {
    it('responds with 401', async () => {
      const res = await createRecordWithQuery(createRecordParams);
      const response = await request(server)
        .put(`/api/v1/category/${res.id}`)
        .set('X-API-KEY', 'bla-bla')
        .send(updateRecordParams);


      expect(response.status).toEqual(401);
    });
  });
});

describe('DELETE /category/:id', () => {
  const createRecordParams = {
    slug: 'cat',
    name: 'котэ',
    description: 'пушистый друг',
    active: true,
  };

  describe('with valid api-key token', () => {
    it('responds with 200', async () => {
      const res = await createRecordWithQuery(createRecordParams);
      const response = await request(server)
        .delete(`/api/v1/category/${res.id}`)
        .set('X-API-KEY', config.apiKey)

      expect(response.status).toEqual(200);

      const expected = {};

      expect(response.body.result).toMatchObject(expected);
    });
  });

  describe('without valid api key', () => {
    it('responds with 401', async () => {
      const res = await createRecordWithQuery(createRecordParams);
      const response = await request(server)
        .delete(`/api/v1/category/${res.id}`)
        .set('X-API-KEY', 'bla-bla')


      expect(response.status).toEqual(401);
    });
  });
});

const { assert } = require('chai');
const request = require('./request');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('Tours API', () => {
    before(() => dropCollection('tours'));

    let spring = {
        title: 'Spring swing',
        activities: ['fire-breathing', 'acrobatics', 'lion snuggling'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Gary',
                state: 'IN'
            },
            weather: {
                temperature: 102,
            },
            attendance: 27890
        }]
    };
    let fall = {
        title: 'Fallsout Tour',
        activities: ['goat-taming', 'dancing bears', 'lion snuggling'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Boston',
                state: 'MA'
            },
            weather: {
                temperature: 22,
            },
            attendance: 356
        }]
    };

    it('saves and gets a tour', () => {
        return request.post('/tours')
            .send(spring)
            .then(({ body }) => {
                const { _id, __v, launchDate } = body;
                assert.ok(_id);
                assert.ok(launchDate);
                assert.equal(__v, 0);
                assert.deepEqual(body, { _id, __v, launchDate, ...spring });
                spring = body;
            });
    });
});
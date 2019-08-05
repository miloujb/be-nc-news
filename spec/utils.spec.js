const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array if an array of length 0 is passed', () => {
    const input = [];
    const actual = formatDates(input);
    const expected = [];
    expect(actual).to.eql(expected)
  });
  it('returns an array of length 1 when an array of length one is passed as input, with the date in the DD/MM/YYYY format', () => {
    const input = [{
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
    created_at: 1511354163389
  }];
  const actual = formatDates(input)
  const expected = [{
    body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    belongs_to: "They're not exactly dogs, are they?",
    created_by: 'butter_bridge',
    votes: 16,
  created_at: new Date(1511354163389)
}]
expect(actual).to.eql(expected)
  });
  it('returns an array of a longer length when a longer array is passed, with the date in they DD/MM/YYYY format', () => {
    const input = [{
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
    created_at: 1511354163389
  },
  {
    body:
      'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'butter_bridge',
    votes: 14,
    created_at: 1479818163389,
  },
  {
    body:
      'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'icellusedkars',
    votes: 100,
    created_at: 1448282163389,
  }
];
    const actual = formatDates(input);
    const expected = [{
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
    created_at: new Date(1511354163389)
  },
  {
    body:
      'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'butter_bridge',
    votes: 14,
    created_at: new Date(1479818163389),
  },
  {
    body:
      'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
    belongs_to: 'Living in the shadow of a great man',
    created_by: 'icellusedkars',
    votes: 100,
    created_at: new Date(1448282163389),
  }
];
  expect(actual).to.eql(expected);
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});

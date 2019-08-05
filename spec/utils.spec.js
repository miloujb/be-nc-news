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

describe('makeRefObj', () => {
  it('returns an empty object if an empty array is passed in as the input', () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it('returns an object with one key-value pair with the title as the key and the article_id as the value', () => {
    const input = [{article_id: 1, title: 'A'}];
    const actual = makeRefObj(input);
    const expected = {A: 1};
    expect(actual).to.eql(expected);
  });
  it('returns an object with multiple key-value pairs if multiple objects within an array are passed', () => {
    const input = [{
      article_id: 1, title: 'A'
    },
    {
      article_id: 2, title: 'B'
    }, {
      article_id: 3, title: 'C'
    }, 
    {
      article_id: 4, title: 'D'
    }
  ];
  const actual = makeRefObj(input);
  const expected = {A: 1, B: 2, C: 3, D: 4};
  expect(actual).to.eql(expected);
  })
});

describe('formatComments', () => {
  it('returns an empty array if an empty array is passed', () => {
    const input = [];
    const actual = formatComments(input);
    const expected = []
    expect(actual).to.eql(expected);
  });
  it('returns an array of length one object if one comment is passed as input', () => {
    const input = [{
      body: 'Delicious crackerbreads',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 0,
      created_at: 1290602163389,
    }];
    const ref = {'Living in the shadow of a great man' : 1};
    const actual = formatComments(input, ref);
    const expected = [{
      body: 'Delicious crackerbreads',
      article_id: 1,
      author: 'icellusedkars',
      votes: 0,
      created_at: new Date(1290602163389),
    }];
    expect(actual).to.eql(expected)
  });
  it('returns an array of several objects when a longer input is passed', () => {
    const input = [{
      body: 'Delicious crackerbreads',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 0,
      created_at: 1290602163389,
    },
    {
      body: 'git push origin master',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 0,
      created_at: 1227530163389,
    },
    {
      body: 'Fruit pastilles',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 0,
      created_at: 1132922163389,
    }
  ];
  const ref = {'Living in the shadow of a great man' : 1, 'living in the shadow of a great man': 2, 'living in the shadow of a great man': 3};
  const actual = formatComments(input, ref);
  const expected = [{
    body: 'Delicious crackerbreads',
    article_id: 1,
    author: 'icellusedkars',
    votes: 0,
    created_at: new Date(1290602163389),
  },
  {
    body: 'git push origin master',
    article_id: 1,
    author: 'icellusedkars',
    votes: 0,
    created_at: new Date(1227530163389),
  },
  {
    body: 'Fruit pastilles',
    article_id: 1,
    author: 'icellusedkars',
    votes: 0,
    created_at: new Date(1132922163389),
  }
];
    expect(actual).to.eql(expected)
  });
});

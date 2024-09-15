// Helper function to convert snake_case to camelCase
const toCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

// Recursively camelize object keys
const camelizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  }
  if (obj !== null && obj.constructor === Object) {
    // eslint-disable-next-line unicorn/no-array-reduce
    return Object.keys(obj).reduce((result, key) => {
      // eslint-disable-next-line no-param-reassign
      result[toCamel(key)] = camelizeKeys(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

export default async function handler(req, res) {
  const response = await fetch(req.body.url, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_SEARCH_API_KEY,
      'Access-Control-Allow-Origin': '*',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ message: data.message || 'Something went wrong' });
  }

  // Camelize keys in the response data
  const camelizedData = camelizeKeys(data);

  // Send the camelized data back to the client
  return res.status(200).json(camelizedData);
}

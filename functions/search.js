const { urlGenerator, axios } = require("./shared/settings");

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
  const URL = urlGenerator(`/search/movie?query=${query}&`);
  let result = await axios.get(URL).then((data) => data.data.results);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

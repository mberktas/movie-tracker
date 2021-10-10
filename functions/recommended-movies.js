const { urlGenerator, axios } = require("./shared/settings");

exports.handler = async (event, contex) => {
  const id = event.queryStringParameters.id;
  const URL = urlGenerator(`/movie/${id}/recommendations`);
  let result = await axios.get(URL).then((data) => data.data.results);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

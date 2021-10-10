const { urlGenerator, axios } = require("./shared/settings");

exports.handler = async function(event, context) {
  const id = event.queryStringParameters.id;
  const URL = urlGenerator(`/movie/${id}`);
  const result = await axios.get(URL).then((data) => data.data);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

const { urlGenerator, axios } = require("./shared/settings");

exports.handler = async (event, context) => {
  const URL = urlGenerator("/genre/movie/list");
  let result = await axios.get(URL).then((data) => data.data.genres);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

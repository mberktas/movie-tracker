const { urlGenerator, axios } = require("./shared/settings");

exports.handler = async (event, context) => {
  const URL = urlGenerator("/movie/popular");
  let result = await axios.get(URL).then((data) => data.data.results);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

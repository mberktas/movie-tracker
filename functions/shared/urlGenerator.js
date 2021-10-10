const urlGenerator = (path) => {
  let lastCharacter = path.charAt(path.length - 1);
  if (lastCharacter == "&")
    return `${process.env.BASE_URL}${path}api_key=${process.env.API_KEY}`;
  return `${process.env.BASE_URL}${path}?api_key=${process.env.API_KEY}`;
};

module.exports = urlGenerator;

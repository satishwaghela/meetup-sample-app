export default (req, res) => {
  const { body } = req;
  const data = JSON.parse(body);
  res.statusCode = 200
  res.json({ ...data })
}
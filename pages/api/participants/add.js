import fakeData from '../../../modules/FakeData/FakeData';

export default (req, res) => {
  const { body } = req;
  const data = JSON.parse(body);
  res.statusCode = 200
  fakeData.unshift(data);
  res.json({ ...data })
}
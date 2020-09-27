import fakeData from '../../../modules/FakeData/FakeData';

export default (req, res) => {
  const { body } = req;
  res.statusCode = 200
  res.json(fakeData)
}
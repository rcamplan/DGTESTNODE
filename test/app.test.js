const expect = require('chai').expect;
const app = require('../app');
var data = require('../data').data;

describe('app.js test', () => {
  describe('searchNestedElements Test', () => {
    it('Should return all elements', () => {
      const c = app.searchNestedElements(
        data,
        ''
      );
      expect(c).to.be.a('array');
      expect(c).to.have.same.members(data);
    });
    it('Should return filtered elements', () => {
      const d = app.searchNestedElements(
        data,
        'ry'
      );
      expect(d).to.be.a('array');
    });
  });
  describe('countNestedElements Test', () => {
    it('Should count children', () => {
      const a = app.countNestedElements(data);
      expect(a).to.be.a('array');
    });
    it('Should return null', () => {
      const b = app.countNestedElements([]);
      expect(b).to.be.a('null');
    });
  });
});

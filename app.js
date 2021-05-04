const data = require('./data').data;

function execCommandLine(commandType, value) {
  switch (commandType) {
    case '--filter':
      if (!value) {
        console.error(
          'ERROR: No search value defined'
        );
        break;
      }
      return searchNestedElements(data, value);

    case '--count':
      return countNestedElements(data);
  }
}

function countNestedElements(obj) {
  if (!obj || !obj.length > 0) {
    return null;
  }
  const countResult = obj.map(country => {
    country.name = country.name.concat(
      ` [${country.people.length}]`
    );
    country.people = country.people.map(
      person => {
        person.name = person.name.concat(
          ` [${person.animals.length}]`
        );
        return person;
      }
    );
    return country;
  });
  return countResult;
}

function searchNestedElements(obj, filter) {
  if (!obj || !obj.length > 0) {
    return null;
  }
  if (!filter || filter === '') {
    return obj;
  }
  const expression = new RegExp(`${filter}`, 'i');
  const filteredResult = obj.filter(country => {
    country.people = country.people.filter(
      person => {
        person.animals = person.animals.filter(
          animal => {
            return expression.test(animal.name);
          }
        );

        return person.animals.length > 0
          ? true
          : false;
      }
    );
    return country.people.length > 0
      ? true
      : false;
  });
  return filteredResult;
}

function main() {
  const operation = process.argv.slice(2)[0];
  if (!operation) {
    console.error(
      'ERROR: No command specified !'
    );
    return;
  }
  const flag = operation.split('=')[0];
  const filter = operation.split('=')[1];

  console.log(
    JSON.stringify(
      execCommandLine(flag, filter),
      null,
      4
    )
  );
}

main();

module.exports = {
  main: main,
  execCommandLine: execCommandLine,
  searchNestedElements: searchNestedElements,
  countNestedElements: countNestedElements
};

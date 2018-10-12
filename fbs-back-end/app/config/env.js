const env = {
  //Localhost instance mapping
  database: 'flightbookingsystem',
  username: 'root',
  password: 'uah@1208',
  host: 'localhost',
  //AWS instance mapping
  // database: 'flightbookingsystem',
  // username: 'adminfbs',
  // password: 'uah#1500',
  // host: 'fbs.cegaauo5au7e.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;
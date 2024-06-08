install:
	npm install

test:
	npx jest

test-coverage:
	npx jest --coverage
	
lint:
	npx eslint .
install-test:
	npm install --save-dev jest

test:
	npx jest
	
lint:
	npx eslint .
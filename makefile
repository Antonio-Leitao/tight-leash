all: say_hello generate

say_hello:
	@echo "Running"

generate:
	@echo "Creating empty text files..."

clean:
	@echo "Cleaning up..."

update:
	npm run build
	git add -A
	git commit -m "$(m)"
	git push archive master
	npm run build
	
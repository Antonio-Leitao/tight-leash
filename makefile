all: say_hello generate

say_hello:
	@echo "Running"

generate:
	@echo "Creating empty text files..."

clean:
	@echo "Cleaning up..."

update:
	@npm run build
	
	@git add -A
	@DESCRIPTION=$$(gum write --placeholder "Details of this change (CTRL+D to finish)");\
	gum confirm "Commit changes?" && git commit -m "$$DESCRIPTION"
	@git push archive master
	
	@npm run deploy
	@echo "Done"
	
all: say_hello generate

say_hello:
	@echo "Running"

generate:
	@echo "Creating empty text files..."

clean:
	@echo "Cleaning up..."

update:
	@echo "1/3 Building Website..."
	@npm run build
	
	@echo "2/3 Commiting to git..."
	@git add -A
	@DESCRIPTION=$$(gum write --placeholder "Details of this change (CTRL+D to finish)");\
	gum confirm "Commit changes?" && git commit -m "$$DESCRIPTION"
	@git push archive master
	
	@echo "3/3 Deploying..."
	@npm run deploy
	@echo "Done"
	
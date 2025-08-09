.PHONY: setup-env preinstall install-deps start-db local-setup changelog

setup-env:
	@echo "Checking if .env file exists..."
	@if [ ! -f .env ]; then \
		echo ".env not found. Copying from .env.example..."; \
		cp .env.example .env; \
	else \
		echo ".env already exists. No actions needed."; \
	fi
	@echo ""

preinstall:
	@echo "Running nvm use..."
	bash -c '. ~/.nvm/nvm.sh && nvm use'

install-deps:
	@echo "Checking for 'node_modules' directory..."
	@if [ ! -d node_modules ]; then \
		echo "'node_modules' not found. Installing npm dependencies..."; \
		npm install; \
	else \
		echo "'node_modules' already exists. Skipping installation."; \
	fi
	@echo ""

start-db:
	@echo "Checking if 'postgres-local' container is running..."
	@if [ $$(docker ps -q -f name=postgres-local) ]; then \
		echo "Container 'postgres-local' is already up and running."; \
	else \
		echo "Container 'postgres-local' is not running. Starting it now..."; \
		docker compose up -d db; \
	fi
	@echo ""

local-setup: setup-env preinstall install-deps start-db
	@echo "All setup is complete. Run 'npm start:dev' to start server."

changelog:
	npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0

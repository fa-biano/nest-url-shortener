changelog:
	npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0

compose-up:
	docker compose up -d

compose-down:
	docker compose down
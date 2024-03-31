# Use the migrated distribution from custom tap
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
( use mongosh to run a shell )

# pin node 18
nvm install 18
nvm use 18


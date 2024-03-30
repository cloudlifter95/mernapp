# Use the migrated distribution from custom tap
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
( use mongosh to run a shell )


# Minecraft Username to UUID Fetcher

## Description
This project fetches UUIDs for a list of Minecraft usernames using the PlayerDB API and saves them to a file. It processes usernames asynchronously, handles errors gracefully, and optimizes file operations for efficiency.

## Features
- Reads Minecraft usernames from `usernames.txt`.
- Fetches UUIDs using the PlayerDB API.
- Saves UUIDs to `uuids.txt`.
- Handles errors and invalid usernames gracefully.
- Uses asynchronous operations for better performance.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/9de/Minecraft-usernames-to-uuid.git
   cd minecraft-uuid-fetcher
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Add Minecraft usernames (one per line) to `usernames.txt`.
2. Run the script:
   ```sh
   node index.js
   ```
3. The UUIDs will be saved in `uuids.txt`.

## Dependencies
- Node.js
- `fs` (built-in Node.js module)
- `./utils/playerdbapi.js` (custom API wrapper for PlayerDB)

## License
This project is open-source and available under the MIT License.


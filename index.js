const { getProfileInfo } = require('./utils/playerdbapi.js');
const fs = require('fs').promises;

async function fetchUsernames(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return data.trim().split('\n').filter(username => username); // Filter out empty lines
    } catch (error) {
        console.error(`Error reading ${filename}:`, error.message);
        return [];
    }
}

async function fetchUUID(username) {
    try {
        const profile = await getProfileInfo(username);
        const uuid = profile.data.id;
        console.log(`UUID for ${username}: ${uuid}`);
        return uuid;
    } catch (error) {
        console.error(`Error fetching UUID for ${username}:`, error.message);
        return null;
    }
}

async function saveUUIDs(uuids, filename) {
    try {
        const validUUIDs = uuids.filter(uuid => uuid !== null);
        if (validUUIDs.length > 0) {
            await fs.appendFile(filename, validUUIDs.join('\n') + '\n');
        }
    } catch (error) {
        console.error(`Error saving UUIDs to ${filename}:`, error.message);
    }
}

async function main() {
    const usernames = await fetchUsernames('usernames.txt');

    if (usernames.length === 0) {
        console.log("No valid usernames found.");
        return;
    }

    const results = await Promise.allSettled(usernames.map(fetchUUID));
    const uuids = results.map(result => (result.status === 'fulfilled' ? result.value : null));

    await saveUUIDs(uuids, 'uuids.txt');
}

main();

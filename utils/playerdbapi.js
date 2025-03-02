const axios = require('axios');

/**
 * Fetches Minecraft player profile information using the PlayerDB API
 * @param {String} username - Minecraft username or UUID
 * @returns {Promise<Object>} Player profile data
 * @throws {Error} If the request fails or username is invalid
 */
const getProfileInfo = async (username) => {
    // Input validation
    if (!username || typeof username !== 'string') {
        throw new Error('Username must be a non-empty string');
    }

    // Remove whitespace and validate username format
    const sanitizedUsername = username.trim();
    const usernameRegex = /^[a-zA-Z0-9_]{1,16}$/;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    if (!usernameRegex.test(sanitizedUsername) && !uuidRegex.test(sanitizedUsername)) {
        throw new Error('Invalid username or UUID format');
    }

    // API configuration
    const config = {
        headers: {
            'User-Agent': 'UsernameToUUIDConvert/1.0 (aldakheel@duck.com)',
            'Accept': 'application/json'
        },
        timeout: 5000 // 5 second timeout
    };

    try {
        const response = await axios.get(
            `https://playerdb.co/api/player/minecraft/${sanitizedUsername}`,
            config
        );

        // Verify the response structure
        if (!response.data || !response.data.success) {
            throw new Error('Invalid response from PlayerDB API');
        }

        return {
            success: true,
            data: response.data.data.player
        };

    } catch (error) {
        if (error.response) {
            // Handle specific HTTP errors
            switch (error.response.status) {
                case 400:
                    throw new Error('Player not found');
                case 429:
                    throw new Error('Rate limit exceeded');
                default:
                    throw new Error(`API Error: ${error.response.status}`);
            }
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout');
        } else {
            throw new Error(`Failed to fetch profile: ${error.message}`);
        }
    }
};



module.exports = { getProfileInfo };
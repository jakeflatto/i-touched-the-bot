# i-touched-the-bot

This is a Discord bot I created as a way to shortcut sending or creating various memes on the fly from within Discord.

There are two collections (stored in DynamoDB tables) that it uses to store the "quick images" and "quick memes" available. And I created two "admin" commands for adding to these collections on the fly as well.

Invoking a quick image is as simple as typing `!<quick_image_name>` from any server the bot is in, or in a DM to the bot.

Invoking a quick meme can be done with or without custom text overlaid, but typically looks like `!<quick_meme_name> <top-text> <bottom-text>`. Quick memes are built using the imgflip API, and the quick image templates are fetched from there as well.

The app is built using a (now likely outdated) quick start framework/template Discord provided using Node.js, and is deployed via Heroku.

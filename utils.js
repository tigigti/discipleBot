import "dotenv/config";

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = "https://discord.com/api/v10/" + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: "PUT", body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = [
    "😭",
    "😄",
    "😌",
    "🤓",
    "😎",
    "😤",
    "🤖",
    "😶‍🌫️",
    "🌏",
    "📸",
    "💿",
    "👋",
    "🌊",
    "✨",
  ];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Verse command functionality
const randomNumber = (max, offset = 1) => {
  return Math.floor(Math.random() * max) + offset;
};

export const getVerse = async (translation = "deu_sch") => {
  let displayMessage = "";

  const bookArray = await fetch(
    `https://bible.helloao.org/api/${translation}/books.json`
  ).then((res) => res.json());

  // const bookArray = schlachterBibelBooks;

  const randomBook = bookArray.books[randomNumber(66)];

  const randomChapter = randomNumber(randomBook.numberOfChapters);

  const getRandomChapter = await fetch(
    `https://bible.helloao.org/api/${translation}/${randomBook.id}/${randomChapter}.json`
  ).then((res) => res.json());

  const verseArray = getRandomChapter.chapter.content;
  const amountVerses = getRandomChapter.numberOfVerses;

  const randomVerse = verseArray[randomNumber(amountVerses, 0)];

  displayMessage = `${getRandomChapter.book.name} ${randomChapter}:${randomVerse.number} - ${randomVerse.content[0]}`;
  return displayMessage;
};

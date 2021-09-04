const fortuneCookies = [
  "The love of your life is right in front of your eyes.",
  "Behind this fortune is the love of my life.",
  "You have a secret admirer.",
  "Love, because it is the only true adventure",
  "The love of your life will appear in front of you unexpectedly!",
  "An old love will come back to you",
];

exports.getFortune = () => {
  return fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
};

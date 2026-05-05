export type Review = {
  name: string;
  rating: number;
  date: string;
  review: string;
  avatarUrl?: string;
  images?: string[];
  sourceUrl?: string;
};

export const fallbackReviews: Review[] = [
  {
    name: "Patrick Savage",
    rating: 5,
    date: "October 2024",
    review:
      "Captain Joseph runs an incredible trip. From planning and communication to preparation and execution, everything was seamless. This was my fourth charter since relocating to the area, and hands down the best. I'll be booking again—both for clients and family. Highly recommend Palmetto Tide Charters.",
  },
  {
    name: "Skye Peacock",
    rating: 5,
    date: "April 2025",
    review:
      "Had a great time with Capt Joe despite bad weather conditions. I'm a lifelong fisher and took my girlfriend and her 11 yr old daughter who is just discovering fishing. She had a perma grin the entire time and caught trout, flounder, sheepshead and a few others. Pretty sure this trip cemented her passion for fishing.",
  },
  {
    name: "Andy Volk",
    rating: 5,
    date: "January 2025",
    review:
      "We had an amazing morning on the boat with Captain Joseph! He was friendly, knowledgeable, and made the whole experience fun and relaxed. The fishing was incredible—we caught plenty of red drum and stayed busy the entire trip. Would absolutely book again!",
  },
  {
    name: "T",
    rating: 5,
    date: "July 2024",
    review:
      "Joseph is a fantastic captain. He knows exactly what to do and where to go. Even when things got hectic (multiple fish hooked at the same time) Joseph was calm and helped us through it all. We absolutely slayed fish and I can't wait to go again. Highly recommend.",
  },
  {
    name: "Madison Koelbl",
    rating: 5,
    date: "January 2025",
    review:
      "Joseph was friendly and professional, honest with expectations, and worked hard for clients. We would recommend this charter!",
  },
  {
    name: "Caleb Smith",
    rating: 5,
    date: "July 2024",
    review:
      "This guy really knows what he's talking about. Had a great time and caught some massive fish!",
  },
];

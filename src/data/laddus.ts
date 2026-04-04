import ladduAlmond from "@/assets/laddu-date-almond.jpg";
import ladduCashew from "@/assets/laddu-date-cashew.jpg";
import ladduPeanut from "@/assets/laddu-date-peanut.jpg";
import ladduPumpkin from "@/assets/laddu-date-pumpkin.jpg";
import ladduSunflower from "@/assets/laddu-date-sunflower.jpg";
import ladduPistachio from "@/assets/laddu-date-pistachio.jpg";
import ladduMixed from "@/assets/laddu-date-mixed.jpg";

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Laddu {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  reviews: Review[];
}

export const laddus: Laddu[] = [
  {
    id: "date-almond",
    name: "Date + Almond Laddu",
    description: "Rich and nutty laddus made with premium Medjool dates and crunchy California almonds. A perfect blend of natural sweetness and nutrition.",
    price: 250,
    image: ladduAlmond,
    ingredients: ["Dates", "Almonds"],
    reviews: [
      { name: "Priya S.", rating: 5, comment: "Absolutely delicious! The almond crunch with dates is heavenly.", date: "2024-12-15" },
      { name: "Rahul M.", rating: 4, comment: "Great taste and very healthy. My kids love them!", date: "2024-11-20" },
      { name: "Anita K.", rating: 5, comment: "Best date laddu I've ever had. Will order again!", date: "2025-01-05" },
    ],
  },
  {
    id: "date-cashew",
    name: "Date + Cashew Laddu",
    description: "Creamy and indulgent laddus crafted with sweet dates and buttery cashews. A luxurious treat for every occasion.",
    price: 250,
    image: ladduCashew,
    ingredients: ["Dates", "Cashews"],
    reviews: [
      { name: "Deepak R.", rating: 5, comment: "The cashew flavor is so rich and creamy. Love it!", date: "2024-12-28" },
      { name: "Meera V.", rating: 5, comment: "Perfect gift for festivals. Everyone loved them!", date: "2025-01-10" },
      { name: "Suresh P.", rating: 4, comment: "Very tasty and fresh. Good packaging too.", date: "2024-11-15" },
    ],
  },
  {
    id: "date-peanut",
    name: "Date + Peanut Laddu",
    description: "Wholesome laddus combining the goodness of dates with protein-packed peanuts. Crunchy, sweet, and satisfying.",
    price: 250,
    image: ladduPeanut,
    ingredients: ["Dates", "Peanuts"],
    reviews: [
      { name: "Kavitha L.", rating: 5, comment: "So crunchy and delicious! Great for snacking.", date: "2025-01-02" },
      { name: "Arun T.", rating: 4, comment: "Healthy and tasty. Perfect post-workout snack!", date: "2024-12-10" },
      { name: "Lakshmi N.", rating: 5, comment: "My grandmother's recipe taste! Nostalgic and yummy.", date: "2024-11-30" },
    ],
  },
  {
    id: "date-pumpkin",
    name: "Date + Pumpkin Seed Laddu",
    description: "Unique and nutritious laddus with dates and superfoood pumpkin seeds. Packed with zinc and iron for your wellness.",
    price: 280,
    image: ladduPumpkin,
    ingredients: ["Dates", "Pumpkin Seeds"],
    reviews: [
      { name: "Dr. Sharma", rating: 5, comment: "Excellent nutrition profile! I recommend these to my patients.", date: "2025-01-08" },
      { name: "Pooja D.", rating: 4, comment: "Unique flavor combination. Really enjoyed these!", date: "2024-12-22" },
      { name: "Vikram S.", rating: 5, comment: "Finally a healthy sweet that actually tastes great!", date: "2024-12-05" },
    ],
  },
  {
    id: "date-sunflower",
    name: "Date + Sunflower Seed Laddu",
    description: "Light and nutritious laddus featuring dates with vitamin E-rich sunflower seeds. A sunshine boost in every bite.",
    price: 250,
    image: ladduSunflower,
    ingredients: ["Dates", "Sunflower Seeds"],
    reviews: [
      { name: "Nisha G.", rating: 5, comment: "Love the subtle nutty flavor. So addictive!", date: "2025-01-12" },
      { name: "Rajesh K.", rating: 4, comment: "Great for health-conscious people. Tastes wonderful.", date: "2024-12-18" },
      { name: "Sunita B.", rating: 5, comment: "My daily energy booster! Can't stop eating these.", date: "2024-11-25" },
    ],
  },
  {
    id: "date-pistachio",
    name: "Date + Pistachio Laddu",
    description: "Premium laddus with rich dates and aromatic pistachios. An elegant treat with a beautiful green garnish.",
    price: 280,
    image: ladduPistachio,
    ingredients: ["Dates", "Pistachios"],
    reviews: [
      { name: "Ayesha F.", rating: 5, comment: "The pistachio flavor is amazing! Premium quality.", date: "2025-01-15" },
      { name: "Kiran J.", rating: 5, comment: "Best premium laddu in the market. Worth every rupee!", date: "2024-12-30" },
      { name: "Mohan R.", rating: 4, comment: "Rich and aromatic. Perfect with evening chai!", date: "2024-12-12" },
    ],
  },
  {
    id: "date-mixed",
    name: "Royal Mixed Dry Fruit Laddu",
    description: "Our signature premium laddu with dates, almonds, cashews, peanuts, pumpkin seeds, sunflower seeds, and pistachios. The ultimate indulgence!",
    price: 350,
    image: ladduMixed,
    ingredients: ["Dates", "Almonds", "Cashews", "Peanuts", "Pumpkin Seeds", "Sunflower Seeds", "Pistachios"],
    reviews: [
      { name: "Amit G.", rating: 5, comment: "The BEST laddu ever! Every bite has a different flavor.", date: "2025-01-20" },
      { name: "Swati M.", rating: 5, comment: "Perfect for gifting. The packaging is beautiful too!", date: "2025-01-05" },
      { name: "Ravi T.", rating: 5, comment: "Worth every penny. This is pure luxury in a laddu!", date: "2024-12-25" },
    ],
  },
];

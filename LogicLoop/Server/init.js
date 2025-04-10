const mongoose = require("mongoose");
const Question = require("./Models/Question.js");
const url =
  "mongodb://127.0.0.1:27017/LogicLoop?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4";

const Questions = [
  {
    question: "1. What is the fastest animal in the world?",
    options: ["Cheetah", "Tiger", "Lion", "Leopard"],
    ans: "Cheetah",
  },
  {
    question: "2. Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    ans: "Mars",
  },
  {
    question: "3. Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Wordsworth",
      "William Shakespeare",
      "John Keats",
      "Charles Dickens",
    ],
    ans: "William Shakespeare",
  },
  {
    question: "4. What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    ans: "Paris",
  },
  {
    question: "5. What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    ans: "Carbon Dioxide",
  },
  {
    question: "6. Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Zinc"],
    ans: "Oxygen",
  },
  {
    question: "7. What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    ans: "Blue Whale",
  },
  {
    question: "8. Who was the first person to walk on the moon?",
    options: [
      "Buzz Aldrin",
      "Yuri Gagarin",
      "Neil Armstrong",
      "Michael Collins",
    ],
    ans: "Neil Armstrong",
  },
  {
    question: "9. What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Granite"],
    ans: "Diamond",
  },
  {
    question: "10. Which country is famous for the Great Wall?",
    options: ["India", "Japan", "China", "Russia"],
    ans: "China",
  },
];

const initData = async () => {
  try {
    await mongoose.connect(url);
    await Question.deleteMany({});
    await Question.insertMany(Questions);
    console.log("Questions inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initData();

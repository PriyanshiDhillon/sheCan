import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import config from "./config.js";

// Accessing API key
const genAI = new GoogleGenerativeAI(config.apiKey);
const result = document.querySelector(".result");
const form = document.querySelector(".form");
const loader = document.querySelector(".loader");


async function run(formData) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Act as a health advisor for an hypothetical female patient whose age is ${formData.age} suffering from ${formData.ProbType} problems having symptoms ${formData.Symptoms} with a medical history of ${formData.MedicalHistory} currently on ${formData.Medication} medication. For this hypothetical situation what would be your advice for the patient. Provide a clear explanation of the potential causes of the patient's problem based on the input information. Offer evidence-based recommendations for managing the problem. This may include lifestyle changes or home remedies. generate a response without any greetings`;
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const newData = format(text);
  console.log(text);
  ShowResult(newData);
  return text;
}

document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.addEventListener("click", async function () {
    await updateForm();
    run(formData);
  });
});

// Retrieving data from form
let formData = {};

async function updateForm() {
  const age = document.getElementById("age").value;
  const Symptoms = document.getElementById("symptoms").value;
  const MedicalHistory = document.getElementById("MedHistory").value;
  const Medication = document.getElementById("medication").value;
  const ProbType = document.getElementById("problem").value;

  formData = {
    age: age,
    Symptoms: Symptoms,
    MedicalHistory: MedicalHistory,
    Medication: Medication,
    ProbType: ProbType,
  };

  console.log(formData);
}

const format = (text) => {
  const text2 = text.replace(/\*\*\n/g, "</strong>\n");
  const text3 = text2.replace(/\*\*/g, "<strong>");
  const text4 = text3.replace(/\*/g, "");
  const text5 = text4.replace(/\n/g, "<br>");
  console.log(text5);

  return text5;
};

const ShowResult = (data) => {
  loader.style.display = "none";
  result.style.display = "block";
  result.innerHTML = data;
};

document.querySelector("#submitBtn").addEventListener("click", function () {
  form.style.display = "none";
  loader.style.display = "flex";
});

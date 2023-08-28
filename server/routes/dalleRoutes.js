import express from "express";
import * as dotenv from "dotenv";
import Post from "../mongodb/models/post.js";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello from openAI's DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });
    console.log(aiResponse);

    const image = aiResponse.data[0].url;

    res.status(200).json({ photo: image });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

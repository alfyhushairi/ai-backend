import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import path from "path";

dotenv.config({path: path.resolve('../.env')});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: "Hello from server"
  })
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const completionResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""'],
    });

    console.log("alfy completionResponse", completionResponse);

    const imageResponse = await openai.createImage({
      prompt: `${completionResponse.data.choices[0].text}`, //It doesn like (Anna Kendrick) for some reason
      n: 1,
      size: "1024x1024",
    });
    console.log("alfy", imageResponse);

    res.status(200).send({
      image: imageResponse.data.data[0].url,
      // TODO also return both prompts and reqs
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () => console.log("Sever is running on port 5000"));
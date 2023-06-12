import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import path from "path";

dotenv.config({path: path.resolve('.env')});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

app.use('/', router);

router.get('/', async (req, res) => {
  res.status(200).send({
    message: "Hello from server"
  })
});

router.post("/imagemock", async (req, res) => {
  try {
    res.status(200).send({
      image:
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-LmA6NA4u0UQ2HUDkZzIhoHFR/user-EvjNfLp4XB6oXxIgz3Mg8QYm/img-VDe5JGaHZsYyOSjGYkg2LJmg.png?st=2023-06-12T08%3A17%3A04Z&se=2023-06-12T10%3A17%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-11T20%3A41%3A02Z&ske=2023-06-12T20%3A41%3A02Z&sks=b&skv=2021-08-06&sig=HndIUOc%2BfoB3HVLmPMzY%2Beq24TUCBGGYMtBDVMTadZg%3D",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.post('/', async (req, res) => {
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
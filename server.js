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

router.get("/swimlane_one", async (req, res) => {
  res.status(200).send({
    data: [
      {
        title: "Yellowstone",
        description:
          "Follow the violent world of the Dutton family, who controls the largest contiguous ranch in the United States. Led by their patriarch John Dutton, the family defends their property against constant attack by land developers, an Indian reservation, and America’s first National Park.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6294745306001/thumbnail/landscape/poster?locale=en",
          },
        },
      },
      {
        title: "Chernobyl",
        description:
          "The true story of one of the worst man-made catastrophes in history: the catastrophic nuclear accident at Chernobyl. A tale of the brave men and women who sacrificed to save Europe from unimaginable disaster.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6294742097001/thumbnail/landscape/poster?locale=en",
          },
        },
      },
      {
        title: "Station Eleven",
        description:
          "A post apocalyptic saga spanning multiple timelines telling the stories of survivors of a devastating flu as they attempt to rebuild and reimagine the world anew while holding on to the best of what's been lost.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6294785527001/thumbnail/landscape/poster?locale=en",
          },
        },
      },
      {
        title: "Curb Your Enthusiasm",
        description:
          "The off-kilter, unscripted comic vision of Larry David, who plays himself in a parallel universe in which he can't seem to do anything right, and, by his standards, neither can anyone else.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6295148400001/thumbnail/landscape/poster?locale=en",
          },
        },
      },
      {
        title: "The Terror",
        description:
          "A Royal Naval expedition voyages into unchartered territory as the crew attempts to discover the Northwest Passage. Faced with treacherous conditions, limited resources, dwindling hope and fear of the unknown, the crew is pushed to the brink of extinction.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6295389680001/thumbnail/landscape/poster?locale=en",
          },
        },
      },
    ],
  });
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
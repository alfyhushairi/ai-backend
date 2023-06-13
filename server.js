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
        id: 0,
        title: "South Park",
        description:
          "In this feature film based on the hit animated series, the third graders of South Park sneak into an R-rated film by ultra-vulgar Canadian television personalities Terrance (Matt Stone) and Phillip (Trey Parker), and emerge with expanded vocabularies that leave their parents and teachers scandalized. When outraged Americans try to censor the film, the controversy becomes a call to war with Canada, and Terrance and Phillip end up on death row -- with only the kids left to save them.",
        images: {
          thumbnail: {
            url: "https://ca-times.brightspotcdn.com/dims4/default/d551c4a/2147483647/strip/true/crop/1080x1080+0+0/resize/1200x1200!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F50%2Fdf%2F5574648a43aca6c783b02944972b%2Fsouth-park-group-photo-credit-south-park.jpeg",
          },
        },
        releaseDate: "2018-06-20T00:00:00Z",
        releaseDateEpoch: 1529452800,
        genres: ["Western", "Drama"],
      },
      {
        id: 1,
        title: "Yellowstone",
        description:
          "Follow the violent world of the Dutton family, who controls the largest contiguous ranch in the United States. Led by their patriarch John Dutton, the family defends their property against constant attack by land developers, an Indian reservation, and America’s first National Park.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6294745306001/thumbnail/landscape/poster?locale=en",
          },
        },
        releaseDate: "2018-06-20T00:00:00Z",
        releaseDateEpoch: 1529452800,
        genres: ["Western", "Drama"],
      },
      {
        id: 2,
        title: "Chernobyl",
        description:
          "The true story of one of the worst man-made catastrophes in history: the catastrophic nuclear accident at Chernobyl. A tale of the brave men and women who sacrificed to save Europe from unimaginable disaster.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6294742097001/thumbnail/landscape/poster?locale=en",
          },
        },
        releaseDate: "2019-05-06T00:00:00Z",
        releaseDateEpoch: 1557100800,
        genres: ["Drama"],
      },
      {
        id: 3,
        title: "Station Eleven",
        description:
          "A post apocalyptic saga spanning multiple timelines telling the stories of survivors of a devastating flu as they attempt to rebuild and reimagine the world anew while holding on to the best of what's been lost.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6294785527001/thumbnail/landscape/poster?locale=en",
          },
        },
        releaseDate: "2021-12-16T00:00:00Z",
        releaseDateEpoch: 1639612800,
        genres: ["Drama", "Sci-Fi", "Fantasy"],
      },
      {
        id: 4,
        title: "Toy Story",
        description:
          "Taking place in a world where toys come to life when humans are not present, the plot of Toy Story focuses on the relationship between an old-fashioned pull-string cowboy doll named Woody and a modern space cadet action figure, Buzz Lightyear, as Woody develops jealousy towards Buzz when he becomes their owner Andy's",
        images: {
          thumbnail: {
            url: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
          },
        },
        releaseDate: "2000-10-15T00:00:00Z",
        releaseDateEpoch: 971568000,
        genres: ["Comedy"],
      },
      {
        id: 5,
        title: "Curb Your Enthusiasm",
        description:
          "The off-kilter, unscripted comic vision of Larry David, who plays himself in a parallel universe in which he can't seem to do anything right, and, by his standards, neither can anyone else.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6295148400001/thumbnail/landscape/poster?locale=en",
          },
        },
        releaseDate: "2000-10-15T00:00:00Z",
        releaseDateEpoch: 971568000,
        genres: ["Comedy"],
      },
      {
        id: 6,
        title: "The Terror",
        description:
          "A Royal Naval expedition voyages into unchartered territory as the crew attempts to discover the Northwest Passage. Faced with treacherous conditions, limited resources, dwindling hope and fear of the unknown, the crew is pushed to the brink of extinction.",
        images: {
          thumbnail: {
            url: "https://df110612.customer.static.core.one.accedo.tv/df11061288d03fc3/image/collection/6295389680001/thumbnail/landscape/poster?locale=en",
          },
        },
        releaseDate: "2018-04-26T00:00:00Z",
        releaseDateEpoch: 1524700800,
        genres: ["Mystery", "Drama", "Fantasy"],
      },
      {
        id: 7,
        title: "Shrek",
        description:
          "Once upon a time, in a far away swamp, there lived an ogre named Shrek (Mike Myers) whose precious solitude is suddenly shattered by an invasion of annoying fairy tale characters. They were all banished from their kingdom by the evil Lord Farquaad (John Lithgow). Determined to save their home -- not to mention his -- Shrek cuts a deal with Farquaad and sets out to rescue Princess Fiona (Cameron Diaz) to be Farquaad's bride. Rescuing the Princess may be small compared to her deep, dark secret.",
        images: {
          thumbnail: {
            url: "https://gonewiththetwins.com/new/wp-content/uploads/2015/08/shrek.jpg",
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
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-LmA6NA4u0UQ2HUDkZzIhoHFR/user-EvjNfLp4XB6oXxIgz3Mg8QYm/img-wbq8QyGJfg4Y7m2ute8FxXaj.png?st=2023-06-12T15%3A27%3A36Z&se=2023-06-12T17%3A27%3A36Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-12T03%3A59%3A49Z&ske=2023-06-13T03%3A59%3A49Z&sks=b&skv=2021-08-06&sig=yv28TLCMiNQGckWFRTvJXp43t6K6Q1hY1N6EXYOxcBU%3D",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.post("/promptwithtitle", async (req, res) => {
  try {
    const completionPrompt = req?.body?.prompt;
    const completionResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${completionPrompt}`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""'],
    });

    const imagePrompt = completionResponse.data.choices[0].text;
    const imageResponse = await openai.createImage({
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
    });

    res.status(200).send({
      completionPrompt: completionPrompt,
      imagePrompt: imagePrompt,
      image: imageResponse.data.data[0].url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: error.response.status,
      data: error.response.data,
      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const completionData = {
      title: req?.body?.title || '',
      description: req?.body?.description || '',
    };
    const completionPrompt = processPrompt(completionData);
    const completionResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${completionPrompt}`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""'],
    });

    const imagePrompt = cleanUpPrompt(
      completionData,
      completionResponse.data.choices[0].text
    );
    const imageResponse = await openai.createImage({
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
    });

    res.status(200).send({
      completionData: completionData,
      completionPrompt: completionPrompt,
      imagePrompt: imagePrompt,
      image: imageResponse.data.data[0].url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: error.response.status,
      data: error.response.data,
      error: error.message
     });
  }
});

app.listen(5000, () => console.log("Sever is running on port 5000"));

const processPrompt = data => {
  let finalData = `find the characters in the following summary "${data.description}"`;

  return finalData;
};

const cleanUpPrompt = (originalData, data) => {
  let cleanData = data;
  cleanData = cleanData.replace(/ *\([^)]*\) */g, "");
  cleanData = cleanData.replace(/\n/g, " ");

  const finalData = `create a story with the characters ${cleanData} from the movie ${originalData.title}`;

  return finalData;
};
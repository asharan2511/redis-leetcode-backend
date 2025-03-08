import { createClient } from "redis";

const client = createClient();

const processSubmission = async (submission: string) => {
  const { problemId, code, language } = JSON.parse(submission);

  console.log("Processing submission for problemId: " + problemId);
  console.log("code: " + code);
  console.log("language:" + language);

  //here you should add your actual processing

  //simulate processing delay

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Finished processing submission for problemId: " + problemId);
};

const startWorker = async () => {
  try {
    await client.connect();
    console.log("Worker connnected to redis");

    while (1) {
      try {
        const submission = await client.brPop("problems", 0);
        // @ts-ignore

        await processSubmission(submission);
      } catch (error) {
        console.error("Submission error");
      }
    }
  } catch (error) {
    console.error("Connection error");
  }
};

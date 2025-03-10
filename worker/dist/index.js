"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const processSubmission = (submission) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemId, code, language } = JSON.parse(submission);
    console.log("Processing submission for problemId: " + problemId);
    console.log("code: " + code);
    console.log("language:" + language);
    //here you should add your actual processing
    //simulate processing delay
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Finished processing submission for problemId: " + problemId);
});
const startWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Worker connnected to redis");
        while (1) {
            try {
                const submission = yield client.brPop("problems", 0);
                // @ts-ignore
                yield processSubmission(submission);
            }
            catch (error) {
                console.error("Submission error");
            }
        }
    }
    catch (error) {
        console.error("Connection error");
    }
});

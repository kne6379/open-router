import fetch from "node-fetch";
import * as dotenv from "dotenv";
import * as readline from "readline";
import { AVAILABLE_MODELS, Model, getDefaultModel } from "./model.js";
import { OpenRouterResponse } from "./types.js";

dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("API 키를 찾을 수 없습니다.");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function callOpenRouter(
  userMessage: string,
  model: Model
): Promise<OpenRouterResponse | null> {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model.id,
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      }
    );

    const data = (await response.json()) as OpenRouterResponse;
    if (!response.ok) {
      console.error("API 호출 실패:", data);
      return null;
    }

    return data;
  } catch (e) {
    console.error("API 호출 중 에러 발생:", e);
    return null;
  }
}

function displayAvailableModels() {
  console.log("사용 가능한 모델 목록:");
  AVAILABLE_MODELS.forEach((model, index) => {
    console.log(`${index + 1}. ${model.name} (${model.provider})`);
  });
}

function askQuestion(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function selectModel(): Promise<Model> {
  displayAvailableModels();
  const defaultModel = getDefaultModel();
  const selection = await askQuestion(
    `모델을 선택하세요 (기본값: ${defaultModel.name}): `
  );
  if (!selection || selection.trim() === "") {
    return defaultModel;
  }

  const index = parseInt(selection) - 1;
  if (isNaN(index) || index < 0 || index >= AVAILABLE_MODELS.length) {
    console.error("잘못된 선택입니다. 기본 모델을 사용합니다.");
    return defaultModel;
  }
  return AVAILABLE_MODELS[index];
}

async function main() {
  console.log("OpenRouter AI CLI Started\n");
  const selectedModel = await selectModel();
  console.log(`선택한 모델: ${selectedModel.name} (${selectedModel.provider})`);

  while (true) {
    const question = await askQuestion(
      "질문을 입력하세요 (종료하려면 'exit' 입력): "
    );
    if (question.toLowerCase() === "exit") {
      console.log("프로그램을 종료합니다.");
      rl.close();
      break;
    }
    console.log(`\n[${selectedModel.name}에게 질문중...]`);
    const response = await callOpenRouter(question, selectedModel);
    if (response) {
      if (response.choices && response.choices.length > 0) {
        const answer = response.choices[0].message.content;
        console.log("\n응답:");
        console.log(answer);
      } else {
        console.log("\n응답:", response);
      }
    } else {
      console.log("\n응답을 받지 못했습니다.");
    }
  }
}

main();

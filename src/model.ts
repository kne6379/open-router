export interface Model {
  id: string;
  name: string;
  provider: string;
}

export const AVAILABLE_MODELS: Model[] = [
  { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  {
    id: "openai/gpt-4o-search-preview",
    name: "GPT-4o Search Preview",
    provider: "OpenAI",
  },
  {
    id: "anthropic/claude-3.7-sonnet",
    name: "claude-3.7-sonnet",
    provider: "Anthropic",
  },
  {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Llama 3 70B",
    provider: "Meta",
  },
  {
    id: "google/gemini-2.0-pro-exp-02-05:free",
    name: "gemini-2.0-pro-exp-02-05:free",
    provider: "Google",
  },
  {
    id: "mistralai/mistral-small-3.1-24b-instruct:free",
    name: "Mistral Small 3.1 24B:free",
    provider: "MistralAI",
  },
  {
    id: "open-r1/olympiccoder-32b:free",
    name: "OlympicCoder 32B:free",
    provider: "Open-R1",
  },
];

export const getModelById = (id: string): Model | undefined => {
  return AVAILABLE_MODELS.find((model) => model.id === id);
};

export const getDefaultModel = (): Model => {
  return AVAILABLE_MODELS[0];
};

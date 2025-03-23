export interface OpenRouterMessage {
  role?: string;
  content?: string;
  [key: string]: any;
}

export interface OpenRouterChoice {
  logprobs: null;
  finish_reason: string;
  native_finish_reason: string;
  index: number;
  message: OpenRouterMessage;
}

export interface OpenRouterResponse {
  id: string;
  provider: string;
  model: string;
  object: string;
  created: number;
  choices: OpenRouterChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

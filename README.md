# OpenRouter AI CLI

OpenRouter AI CLI는 OpenRouter API를 통해 다양한 AI 모델에 쉽게 접근하고 사용할 수 있는 도구입니다.

## 설치 방법

```bash
# 저장소 클론
git clone https://github.com/kne6379/open-router.git
cd open-router

# 의존성 설치
npm install

# 빌드
npm run build

# 전역으로 설치 (선택사항)
npm link
```

## 사용 방법

### 환경 변수 설정

OpenRouter API 키를 `.env` 파일에 설정합니다. `.env.example` 파일을 참고하여 `.env` 파일을 생성하세요.

### CLI 실행

```bash
# 빌드 후 실행
npm run build
npm start
```

프로그램을 실행하면 사용 가능한 모델 목록이 표시되고, 모델을 선택한 후 질문을 입력할 수 있습니다.

### 모델 추가 및 수정

`src/model.ts` 파일에서 `AVAILABLE_MODELS` 배열을 수정하여 새로운 모델을 추가하거나 기존 모델을 수정할 수 있습니다. 모델 객체는 `id`, `name`, `provider` 속성을 가져야 합니다.

```typescript
export interface Model {
  id: string;
  name: string;
  provider: string;
}

export const AVAILABLE_MODELS: Model[] = [
  { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  // ... 기존 모델 ...
];
```

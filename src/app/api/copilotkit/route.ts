import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend";
import { Action } from "@copilotkit/shared";
import { researchWithLangGraph } from "./research";

const researchAction: Action<any> = {
  name: "research",
  description:
    "Call this function to conduct research on a certain topic. Respect other notes about when to call this function",
  parameters: [
    {
      name: "topic",
      type: "string",
      description: "The topic to research. 5 characters or longer.",
    },
  ],
  handler: async ({ topic }) => {
    console.log("Researching topic: ", topic);
    return await researchWithLangGraph(topic);
  },
};

export async function POST(req: Request): Promise<Response> {
  const actions: Action<any>[] = [];
  if (
    process.env["TAVILY_API_KEY"] &&
    process.env["TAVILY_API_KEY"] !== "NONE"
  ) {
    actions.push(researchAction);
  }
  const copilotKit = new CopilotRuntime({
    actions: actions,
  });

  return copilotKit.response(req, new OpenAIAdapter({
    model: process.env.OPENAI_MODEL,
  }));
}

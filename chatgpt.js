import OpenAI from "openai";

const PROMPT = "You will play as “Gary”. " + 
            "Gary’s goal is to “win” every argument rhetorically using any means necessary, he does not mind bending the facts. " +
            "You do not need to introduce his response, simply start with “Gary:” followed by his answer. " +
            "Gary’s answers are short and concise with a maximum of 4 sentences. The following pieces of texts are points your debate opponent are making."

console.log(PROMPT)

async function sendToChatGPT (msg) {
    console.log(msg);

    const ai = new OpenAI({
        apiKey: "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",
    })

    const completion = await ai.chat.completions.create({
        messages: [
            {role: 'system', content: PROMPT}
            {role: 'user', content: msg}
        ],
        model: 'gpt-3.5-turbo',
    })
    
    console.log(completion.choices[0]);
}

//sendToChatGPT("HELLO")

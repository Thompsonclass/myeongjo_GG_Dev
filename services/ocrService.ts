import { GoogleGenAI, Type } from "@google/genai";

// Fix: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY
// and assume the API key is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        resonatorName: { type: Type.STRING, description: "캐릭터 이름. 방랑자의 경우, '방랑자 (회절)' 처럼 속성을 포함해야 합니다." },
        level: { type: Type.INTEGER, description: "캐릭터 레벨" },
        hp: { type: Type.INTEGER, description: "최대 HP" },
        atk: { type: Type.INTEGER, description: "총 공격력" },
        def: { type: Type.INTEGER, description: "총 방어력" },
        critRate: { type: Type.NUMBER, description: "치명타 확률 (백분율)" },
        critDmg: { type: Type.NUMBER, description: "치명타 피해 (백분율)" },
        energyRecharge: { type: Type.NUMBER, description: "공명 효율 (백분율)" },
        elementalDmgType: { type: Type.STRING, description: "가장 높은 속성 피해 유형 (예: '기류 피해 보너스', '전도 피해 보너스'). 없으면 '없음'으로 설정." },
        elementalDmgBonus: { type: Type.NUMBER, description: "가장 높은 속성 피해 보너스 값 (백분율). 없으면 0으로 설정." },
    },
    required: ["resonatorName", "level", "hp", "atk", "def", "critRate", "critDmg", "energyRecharge", "elementalDmgType", "elementalDmgBonus"]
};


export const parseScreenshotWithGemini = async (base64Image: string): Promise<any> => {
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image,
    },
  };

  const textPart = {
    text: `
      Analyze this screenshot from the game Wuthering Waves (명조).
      It's a character details screen from the Korean client.
      Extract the following stats and return them as a JSON object that strictly follows the provided schema.
      - Resonator Name (캐릭터 이름): If the character is '방랑자', look for the element icon or text nearby to determine the specific type (e.g., '방랑자 (회절)', '방랑자 (인멸)').
      - Level (레벨)
      - Max HP (HP)
      - Total ATK (공격력)
      - Total DEF (방어력)
      - Crit Rate (치명타 확률)
      - Crit DMG (치명타 피해)
      - Energy Recharge (공명 효율)
      - The type of the highest elemental damage bonus shown (e.g., '기류 피해 보너스', '전도 피해 보너스'). If no elemental damage is shown, set this to '없음'.
      - The value of the highest elemental damage bonus shown. If none, default to 0.

      Pay close attention to parsing numbers and percentages correctly. For example, '50.5%' should be 50.5.
    `,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to parse screenshot. The AI model might be unavailable or the image is unreadable.");
  }
};
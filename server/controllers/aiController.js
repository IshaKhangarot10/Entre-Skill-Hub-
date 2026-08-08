const { GoogleGenAI, Type } = require('@google/genai');

exports.recommendCourses = async (req, res, next) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: 'GEMINI_API_KEY is not configured in the environment.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // We can use the user's selected skills or role to generate tailored recommendations.
    // For now, we'll use a generic prompt if specific interests aren't provided.
    const userContext = req.user ? `for a professional building an enterprise` : `for an aspiring entrepreneur`;
    
    const prompt = `Recommend 4 highly actionable, premium courses ${userContext}. Return them in the exact JSON format specified.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'The title of the course'
              },
              platform: {
                type: Type.STRING,
                description: 'The platform offering the course (e.g., Coursera, Udemy, MasterClass)'
              },
              difficulty: {
                type: Type.STRING,
                description: 'Beginner, Intermediate, or Advanced'
              },
              reason: {
                type: Type.STRING,
                description: 'A brief, 1-sentence reason why this course is highly recommended for this user'
              }
            },
            required: ['title', 'platform', 'difficulty', 'reason']
          }
        }
      }
    });

    const recommendations = JSON.parse(response.text);

    res.json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Error fetching AI recommendations:', error);
    next(error);
  }
};

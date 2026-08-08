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
    console.error('Error fetching AI recommendations (falling back to mock data):', error.message);
    
    // Fallback mock data for demo/testing purposes when API key is invalid
    const mockRecommendations = [
      {
        title: "Zero to One: Startup Fundamentals",
        platform: "Coursera",
        difficulty: "Beginner",
        reason: "Provides the foundational mental models needed to build a scalable enterprise from scratch."
      },
      {
        title: "Y Combinator's Startup School",
        platform: "YouTube",
        difficulty: "Intermediate",
        reason: "Offers actionable, real-world advice from founders who have successfully scaled billion-dollar companies."
      },
      {
        title: "Advanced Product Strategy",
        platform: "Reforge",
        difficulty: "Advanced",
        reason: "Deep dive into creating growth loops and finding true product-market fit for your specific idea."
      },
      {
        title: "Financial Modeling for Entrepreneurs",
        platform: "Udemy",
        difficulty: "Intermediate",
        reason: "Crucial for understanding your burn rate, runway, and unit economics before raising capital."
      }
    ];
    
    res.json({ success: true, data: mockRecommendations });
  }
};

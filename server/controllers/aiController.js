const { GoogleGenAI, Type } = require('@google/genai');
const mongoose = require('mongoose');
const User = require('../models/User');

// Helper to safely extract name from skill/interest (whether populated document or object)
const getItemName = (item) => {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item.name || '';
};

// Helper to generate dynamic personalized recommendations when AI call fails or is unavailable
const generateDynamicFallback = (user) => {
  const primaryInterest = getItemName(user?.interests?.[0]) || 'Modern Entrepreneurship';
  const secondaryInterest = getItemName(user?.interests?.[1]) || 'Business Innovation';
  const primarySkill = getItemName(user?.skills?.[0]) || 'Product Strategy';
  const userGoal = user?.goal ? user.goal.replace(/-/g, ' ') : 'building a sustainable business';
  const budget = user?.budget ? `$${user.budget}` : 'your target budget';

  const goalKey = user?.goal ? user.goal.replace(/-/g, ' ') : '';
  const goalCourseMap = {
    'extra income': {
      title: 'Micro-SaaS & Side Hustle Launch Guide',
      platform: 'Coursera',
      difficulty: 'Beginner',
      reason: `Designed to help you generate extra income by rapidly monetizing your existing ${primarySkill} skills.`
    },
    'replace job': {
      title: 'Full-Time Founder: From Idea to Sustainable Income',
      platform: 'YouTube',
      difficulty: 'Intermediate',
      reason: `Step-by-step roadmap tailored to transitioning out of full-time employment into running your own enterprise.`
    },
    'build big': {
      title: 'Venture Scale & Capital Fundraising Masterclass',
      platform: 'Reforge',
      difficulty: 'Advanced',
      reason: `Essential playbook for high-growth ventures seeking to scale ${primaryInterest} and raise institutional capital.`
    }
  };

  const goalCourse = goalCourseMap[goalKey] || {
    title: `The Lean Venture: Rapid Prototyping in ${secondaryInterest}`,
    platform: 'edX',
    difficulty: 'Intermediate',
    reason: `Equips you with agile execution frameworks to validate ventures in ${secondaryInterest}.`
  };

  return [
    {
      title: `Mastering ${primaryInterest}: Opportunity Analysis & Market Fit`,
      platform: 'Coursera',
      difficulty: 'Beginner',
      reason: `Tailored to your passion for ${primaryInterest}, guiding you from initial domain exploration to customer validation.`,
      url: `https://www.coursera.org/search?query=${encodeURIComponent(primaryInterest)}`
    },
    {
      title: `Commercializing ${primarySkill} for Founders`,
      platform: 'Udemy',
      difficulty: 'Intermediate',
      reason: `Leverages your background in ${primarySkill} to build defensible commercial offerings and high-margin products.`,
      url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(primarySkill)}`
    },
    {
      ...goalCourse,
      url: 'https://www.startupschool.org/'
    },
    {
      title: 'Financial Modeling, Unit Economics & Cash Runway',
      platform: 'Udemy',
      difficulty: 'Intermediate',
      reason: `Critical for managing your ${budget} allocation, avoiding burn rate pitfalls, and achieving profitability.`,
      url: 'https://www.udemy.com/course/financial-modeling-for-startups-small-businesses/'
    }
  ];
};

const resolveUser = async (reqUser) => {
  if (!reqUser) return null;
  const userId = reqUser.id || reqUser._id;
  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    try {
      const dbUser = await User.findById(userId).populate('skills').populate('interests');
      if (dbUser) return dbUser;
    } catch (e) {
      // fallback to reqUser
    }
  }
  return reqUser;
};

exports.recommendCourses = async (req, res, next) => {
  let user = null;
  try {
    // 1. Fetch authenticated user with populated skills and interests
    user = await resolveUser(req.user);

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not configured. Serving dynamic profile-based recommendations.');
      return res.json({ success: true, data: generateDynamicFallback(user) });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // 2. Extract dynamic user attributes
    const userName = user?.name || 'Entrepreneur';
    const skillsList = user?.skills?.length 
      ? user.skills.map(getItemName).filter(Boolean).join(', ') 
      : 'General Business, Strategy';
    const interestsList = user?.interests?.length 
      ? user.interests.map(getItemName).filter(Boolean).join(', ') 
      : 'Startups, Innovation';
    const userGoal = user?.goal ? user.goal.replace(/-/g, ' ') : 'build and grow a profitable venture';
    const budgetInfo = user?.budget ? `$${user.budget}` : 'flexible';
    const timeInfo = user?.timeCommitment ? `${user.timeCommitment} hours/week` : 'flexible';

    // 3. Build a dynamic, personalized prompt for Gemini
    const prompt = `You are an executive entrepreneurial advisor recommending tailored learning resources for ${userName}.
User Profile:
- Current Core Skills: ${skillsList}
- Passion & Industry Interests: ${interestsList}
- Primary Business Goal: ${userGoal}
- Capital Budget: ${budgetInfo}
- Time Commitment: ${timeInfo}

Recommend 4 distinct, highly actionable, premium courses specifically tailored to this user's profile, skill gaps, and industry interests.
Ensure the recommendations are fresh, creative, and directly applicable to their stated goals and interests.
Return them in the exact JSON format specified, including a direct website URL or search link for each course.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
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
                description: 'The platform offering the course (e.g., Coursera, Udemy, MasterClass, edX)'
              },
              difficulty: {
                type: Type.STRING,
                description: 'Beginner, Intermediate, or Advanced'
              },
              reason: {
                type: Type.STRING,
                description: 'A brief, 1-sentence reason why this course is specifically tailored to this user'
              },
              url: {
                type: Type.STRING,
                description: 'A direct website URL or search link for the course'
              }
            },
            required: ['title', 'platform', 'difficulty', 'reason', 'url']
          }
        }
      }
    });

    const recommendations = JSON.parse(response.text);

    res.json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Error fetching AI recommendations (falling back to dynamic profile data):', error.message);
    
    if (!user) {
      user = await resolveUser(req.user);
    }

    // Serve personalized dynamic fallback tailored to the user's skills and interests
    const dynamicRecommendations = generateDynamicFallback(user);
    
    res.json({ success: true, data: dynamicRecommendations });
  }
};


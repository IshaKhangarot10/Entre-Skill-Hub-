require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const User = require('./models/User');
const Skill = require('./models/Skill');
const Interest = require('./models/Interest');
const BusinessIdea = require('./models/BusinessIdea');
const Roadmap = require('./models/Roadmap');
const RoadmapStep = require('./models/RoadmapStep');
const LearningResource = require('./models/LearningResource');
const Mentor = require('./models/Mentor');
const MentorSession = require('./models/MentorSession');
const ProgressTracking = require('./models/ProgressTracking');
const Feedback = require('./models/Feedback');

const seed = async () => {
  await connectDB();
  
  // Clear all collections
  await Promise.all([
    User.deleteMany({}),
    Skill.deleteMany({}),
    Interest.deleteMany({}),
    BusinessIdea.deleteMany({}),
    Roadmap.deleteMany({}),
    RoadmapStep.deleteMany({}),
    LearningResource.deleteMany({}),
    Mentor.deleteMany({}),
    MentorSession.deleteMany({}),
    ProgressTracking.deleteMany({}),
    Feedback.deleteMany({})
  ]);

  console.log('Collections cleared.');

  // ─── SKILLS ───
  const skills = await Skill.insertMany([
    { name: 'Tailoring', category: 'Crafts', icon: 'cut' },
    { name: 'Cooking', category: 'Food', icon: 'restaurant' },
    { name: 'Coding', category: 'Digital', icon: 'code' },
    { name: 'Design', category: 'Creative', icon: 'palette' },
    { name: 'Editing', category: 'Digital', icon: 'auto_fix_high' },
    { name: 'Language', category: 'Education', icon: 'translate' },
    { name: 'Photography', category: 'Creative', icon: 'camera_alt' },
    { name: 'Repair', category: 'Technical', icon: 'build' },
    { name: 'Handicrafts', category: 'Crafts', icon: 'brush' },
    { name: 'Digital Marketing', category: 'Digital', icon: 'campaign' },
    { name: 'Writing', category: 'Creative', icon: 'edit_note' },
    { name: 'Teaching', category: 'Education', icon: 'school' }
  ]);
  console.log(`${skills.length} skills created.`);

  const skillMap = {};
  skills.forEach(s => { skillMap[s.name] = s._id; });

  // ─── INTERESTS ───
  const interests = await Interest.insertMany([
    { name: 'Low investment', category: 'Financial', icon: 'attach_money', description: 'Minimal upfront capital required. Focus on sweat equity and lean operations.' },
    { name: 'Work from home', category: 'Lifestyle', icon: 'home_work', description: 'Fully remote capable. Build and manage entirely from your personal space.' },
    { name: 'Quick to start', category: 'Speed', icon: 'bolt', description: 'Rapid deployment models. Go from concept to execution in days, not months.' },
    { name: 'Long-term growth', category: 'Strategy', icon: 'trending_up', description: 'Sustainable scaling strategies. Built for durability and compounding returns.' },
    { name: 'Community impact', category: 'Social', icon: 'groups', description: 'Create positive change in your local community while building a business.' },
    { name: 'Creative freedom', category: 'Lifestyle', icon: 'auto_awesome', description: 'Express your artistic vision while earning. No creative boundaries.' }
  ]);
  console.log(`${interests.length} interests created.`);

  const intMap = {};
  interests.forEach(i => { intMap[i.name] = i._id; });

  // ─── BUSINESS IDEAS (10) ───
  const ideaData = [
    {
      title: 'Home Tailoring Service',
      description: 'Leverage your background in textile design to offer bespoke alterations and custom garment creation. High demand in your localized urban area with minimal overhead costs.',
      matchedSkills: [skillMap['Tailoring'], skillMap['Design']],
      matchedInterests: [intMap['Low investment'], intMap['Work from home'], intMap['Creative freedom']],
      difficulty: 'beginner',
      costEstimate: { min: 500, max: 3000 },
      icon: 'styler',
      tags: ['LOW INVESTMENT', 'WORK FROM HOME', 'HIGH DEMAND'],
      category: 'Crafts & Fashion',
      estimatedTime: '2-3 weeks'
    },
    {
      title: 'Home Catering & Tiffin Service',
      description: 'Turn your culinary skills into a profitable home-based catering business. Serve daily tiffins, party orders, or specialty cuisines to your local community.',
      matchedSkills: [skillMap['Cooking']],
      matchedInterests: [intMap['Low investment'], intMap['Quick to start'], intMap['Community impact']],
      difficulty: 'beginner',
      costEstimate: { min: 1000, max: 5000 },
      icon: 'lunch_dining',
      tags: ['FOOD BUSINESS', 'COMMUNITY', 'DAILY INCOME'],
      category: 'Food & Beverage',
      estimatedTime: '1-2 weeks'
    },
    {
      title: 'Freelance Web Development',
      description: 'Build websites and web applications for small businesses. High demand, remote-friendly, and scalable from solo freelancer to agency.',
      matchedSkills: [skillMap['Coding'], skillMap['Design']],
      matchedInterests: [intMap['Work from home'], intMap['Long-term growth'], intMap['Quick to start']],
      difficulty: 'intermediate',
      costEstimate: { min: 0, max: 2000 },
      icon: 'code',
      tags: ['REMOTE', 'SCALABLE', 'TECH FOCUS'],
      category: 'Digital Services',
      estimatedTime: '2-4 weeks'
    },
    {
      title: 'Mobile Phone Repair Shop',
      description: 'Start a mobile repair business from home or a small shop. High demand for screen replacements, battery changes, and software fixes.',
      matchedSkills: [skillMap['Repair']],
      matchedInterests: [intMap['Quick to start'], intMap['Community impact'], intMap['Low investment']],
      difficulty: 'intermediate',
      costEstimate: { min: 2000, max: 8000 },
      icon: 'phone_android',
      tags: ['HIGH DEMAND', 'LOCAL SERVICE', 'REPAIR'],
      category: 'Technical Services',
      estimatedTime: '2-3 weeks'
    },
    {
      title: 'Handmade Crafts E-Shop',
      description: 'Sell your handmade jewelry, pottery, or artwork online through platforms like Etsy, Instagram, or your own website. Low startup cost with creative fulfillment.',
      matchedSkills: [skillMap['Handicrafts'], skillMap['Design'], skillMap['Photography']],
      matchedInterests: [intMap['Creative freedom'], intMap['Work from home'], intMap['Low investment']],
      difficulty: 'beginner',
      costEstimate: { min: 500, max: 3000 },
      icon: 'palette',
      tags: ['CREATIVE', 'E-COMMERCE', 'LOW COST'],
      category: 'Crafts & Art',
      estimatedTime: '2-3 weeks'
    },
    {
      title: 'Language Tutoring Academy',
      description: 'Offer online or in-person language lessons. Teach English, regional languages, or foreign languages to students and professionals.',
      matchedSkills: [skillMap['Language'], skillMap['Teaching']],
      matchedInterests: [intMap['Work from home'], intMap['Low investment'], intMap['Community impact']],
      difficulty: 'beginner',
      costEstimate: { min: 0, max: 1000 },
      icon: 'translate',
      tags: ['EDUCATION', 'ONLINE', 'FLEXIBLE'],
      category: 'Education',
      estimatedTime: '1-2 weeks'
    },
    {
      title: 'Photography & Videography Studio',
      description: 'Offer event photography, portrait sessions, product photography, or video production services. Build a portfolio and grow through referrals.',
      matchedSkills: [skillMap['Photography'], skillMap['Editing']],
      matchedInterests: [intMap['Creative freedom'], intMap['Long-term growth']],
      difficulty: 'intermediate',
      costEstimate: { min: 5000, max: 15000 },
      icon: 'camera_alt',
      tags: ['CREATIVE', 'EVENT BASED', 'PORTFOLIO'],
      category: 'Creative Services',
      estimatedTime: '3-4 weeks'
    },
    {
      title: 'Social Media Marketing Agency',
      description: 'Help small businesses manage their social media presence. Create content, run ads, and grow their online following.',
      matchedSkills: [skillMap['Digital Marketing'], skillMap['Design'], skillMap['Writing']],
      matchedInterests: [intMap['Work from home'], intMap['Long-term growth'], intMap['Quick to start']],
      difficulty: 'intermediate',
      costEstimate: { min: 500, max: 3000 },
      icon: 'campaign',
      tags: ['DIGITAL', 'SCALABLE', 'RECURRING REVENUE'],
      category: 'Digital Services',
      estimatedTime: '2-3 weeks'
    },
    {
      title: 'Content Writing & Blog Service',
      description: 'Provide content writing, copywriting, and blog management services to businesses. Work remotely with flexible hours.',
      matchedSkills: [skillMap['Writing'], skillMap['Digital Marketing']],
      matchedInterests: [intMap['Work from home'], intMap['Low investment'], intMap['Quick to start']],
      difficulty: 'beginner',
      costEstimate: { min: 0, max: 500 },
      icon: 'edit_note',
      tags: ['WRITING', 'REMOTE', 'ZERO INVESTMENT'],
      category: 'Digital Services',
      estimatedTime: '1 week'
    },
    {
      title: 'Boutique Plant Nursery',
      description: 'Cultivate and sell indoor plants, succulents, and gardening supplies. Combine with online presence for wider reach.',
      matchedSkills: [skillMap['Handicrafts']],
      matchedInterests: [intMap['Community impact'], intMap['Creative freedom'], intMap['Long-term growth']],
      difficulty: 'beginner',
      costEstimate: { min: 2000, max: 8000 },
      icon: 'local_florist',
      tags: ['MODERATE TIME', 'OUTDOOR', 'GROWING MARKET'],
      category: 'Agriculture & Nature',
      estimatedTime: '3-4 weeks'
    }
  ];

  const ideas = await BusinessIdea.insertMany(ideaData);
  console.log(`${ideas.length} business ideas created.`);

  // ─── ROADMAPS & STEPS ───
  const standardSteps = [
    { title: 'Idea Validation', desc: 'Assess market demand, define your unique value proposition, and conduct initial competitor analysis to ensure viability.' },
    { title: 'Required Skills & Tools', desc: 'Identify the essential tools, platforms, and competencies needed to launch and run your business effectively.' },
    { title: 'Legal & Registration Steps', desc: 'Navigate business entity formation, tax IDs, licenses, and basic compliance required before accepting payments.' },
    { title: 'Cost Estimation', desc: 'Calculate initial overhead, inventory costs, marketing budget, and recurring operational fees for your business.' },
    { title: 'Marketing Basics', desc: 'Set up core customer acquisition channels, create your brand identity, and plan your initial launch strategy.' }
  ];

  for (const idea of ideas) {
    const roadmap = await Roadmap.create({
      businessIdeaId: idea._id,
      title: `Launch Your ${idea.title}`,
      description: `A comprehensive guide to transforming your concept into a market-ready ${idea.title.toLowerCase()}, covering legal structures to initial marketing sprints.`,
      estimatedTime: idea.estimatedTime,
      difficulty: idea.difficulty,
      totalSteps: 5
    });

    const stepDocs = standardSteps.map((step, idx) => ({
      roadmapId: roadmap._id,
      title: step.title,
      content: step.desc,
      order: idx + 1,
      estimatedDuration: ['30 mins', '45 mins', '1 hour', '45 mins', '1 hour'][idx],
      videoTitle: `${step.title} for ${idea.title}`,
      videoDuration: ['03:45', '04:32', '05:10', '03:58', '06:22'][idx],
      actionItems: [
        { text: `Complete ${step.title.toLowerCase()} checklist`, description: `Work through all items in the ${step.title.toLowerCase()} module for your ${idea.title.toLowerCase()}.` },
        { text: 'Document your findings', description: 'Keep notes on key decisions and research results.' }
      ],
      resourceLinks: [
        { title: `${step.title} Guide`, url: '#', type: 'article' },
        { title: `${step.title} Template`, url: '#', type: 'download' }
      ]
    }));

    await RoadmapStep.insertMany(stepDocs);
  }
  console.log('Roadmaps and steps created for all ideas.');

  // ─── LEARNING RESOURCES ───
  const roadmaps = await Roadmap.find();
  const resourceDocs = [];
  for (const rm of roadmaps) {
    resourceDocs.push(
      { title: `Getting Started with ${rm.title}`, type: 'video', url: '#', relatedRoadmapId: rm._id, status: 'approved' },
      { title: `${rm.title} Checklist`, type: 'checklist', content: 'Step-by-step checklist for launching your business.', relatedRoadmapId: rm._id, status: 'approved' },
      { title: `Market Research for ${rm.title}`, type: 'article', content: 'How to validate your business idea and find your target market.', relatedRoadmapId: rm._id, status: 'approved' }
    );
  }
  await LearningResource.insertMany(resourceDocs);
  console.log(`${resourceDocs.length} learning resources created.`);

  // ─── USERS ───
  const adminUser = await User.create({
    name: 'Admin User',
    email: 'admin@skillspark.io',
    password: 'admin123',
    role: 'admin',
    onboardingComplete: true
  });

  const mentorUser = await User.create({
    name: 'Eleanor Masters',
    email: 'mentor@skillspark.io',
    password: 'mentor123',
    role: 'mentor',
    skills: [skillMap['Coding'], skillMap['Design'], skillMap['Digital Marketing']],
    interests: [intMap['Long-term growth'], intMap['Work from home']],
    onboardingComplete: true
  });

  const demoUser = await User.create({
    name: 'Evelyn Parker',
    email: 'user@skillspark.io',
    password: 'user123',
    role: 'user',
    skills: [skillMap['Tailoring'], skillMap['Design'], skillMap['Cooking']],
    interests: [intMap['Low investment'], intMap['Work from home'], intMap['Quick to start']],
    budget: 5000,
    timeCommitment: '5-15',
    goal: 'extra-income',
    onboardingComplete: true,
    bookmarks: [ideas[0]._id, ideas[4]._id]
  });

  console.log('Users created: admin@skillspark.io / admin123, mentor@skillspark.io / mentor123, user@skillspark.io / user123');

  // ─── MENTOR PROFILE ───
  const mentorProfile = await Mentor.create({
    userId: mentorUser._id,
    expertise: ['Web Development', 'UI/UX Design', 'Digital Marketing'],
    experience: '8 years in tech startups and freelancing',
    bio: 'Passionate about helping aspiring entrepreneurs build sustainable businesses. Specializing in digital strategy and product development.',
    verificationStatus: 'approved',
    totalMentees: 14,
    totalSessions: 48,
    avgResponseTime: '2.4h'
  });

  // ─── MENTOR SESSIONS ───
  await MentorSession.insertMany([
    { mentorId: mentorProfile._id, menteeId: demoUser._id, title: 'Portfolio Review', status: 'scheduled', scheduledAt: new Date(Date.now() + 3600000), duration: 45 },
    { mentorId: mentorProfile._id, menteeId: demoUser._id, title: 'Code Architecture', status: 'scheduled', scheduledAt: new Date(Date.now() + 86400000), duration: 30 }
  ]);

  // ─── DEMO USER PROGRESS ───
  const firstRoadmap = roadmaps[0];
  const firstSteps = await RoadmapStep.find({ roadmapId: firstRoadmap._id }).sort('order');
  
  await ProgressTracking.create({
    userId: demoUser._id,
    roadmapId: firstRoadmap._id,
    businessIdeaId: ideas[0]._id,
    completedSteps: [firstSteps[0]._id, firstSteps[1]._id],
    percentComplete: 40,
    currentStepOrder: 3,
    hoursInvested: 12
  });

  // ─── FEEDBACK ───
  await Feedback.create({
    userId: demoUser._id,
    type: 'feedback',
    message: 'The platform has been incredibly helpful in planning my tailoring business!',
    rating: 5,
    status: 'open'
  });

  console.log('\n✅ Seed complete! Database populated with demo data.');
  console.log('\nDemo Accounts:');
  console.log('  User:   user@skillspark.io / user123');
  console.log('  Mentor: mentor@skillspark.io / mentor123');
  console.log('  Admin:  admin@skillspark.io / admin123');

  process.exit(0);
};

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});

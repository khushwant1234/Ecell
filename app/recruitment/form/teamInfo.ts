interface Question {
  id: string;
  label: string;
  type: "text" | "email" | "long-text" | "number" | "link" | "radio";
  validation?: { required?: string };
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface TeamConfig {
  id: string;
  title: string;
  questions: Question[];
}

export const generalQuestions: Question[] = [
  {
    id: "name",
    label: "Full name",
    type: "text",
    placeholder: "John Doe",
    validation: { required: "Name is required" },
  },
  {
    id: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@snu.edu.in",
    validation: { required: "Email is required" },
  },
  {
    id: "phone",
    label: "Phone number",
    type: "text",
    placeholder: "+91 98765 43210",
    validation: { required: "Phone number is required" },
  },
  {
    id: "branch",
    label: "Branch",
    type: "text",
    placeholder: "Computer Science",
    validation: { required: "Branch is required" },
  },
  {
    id: "rollNumber",
    label: "Roll Number",
    type: "text",
    placeholder: "2X1011XXXX",
    validation: { required: "Roll Number is required" },
  },
  {
    id: "year",
    label: "Year",
    type: "radio",
    options: [
      { value: "2026", label: "2026" },
      { value: "2027", label: "2027" },
      { value: "2028", label: "2028" },
      { value: "2029", label: "2029" },
    ],
    validation: { required: "Year is required" },
  },
];

export const teamConfigs: TeamConfig[] = [
  {
    id: "tech-team",
    title: "Tech Team",
    questions: [
      {
        id: "projectDescription",
        label: "What is your current experience in tech?",
        type: "text",
        validation: { required: "Don't be shy, tell us your tech tales!" },
      },
      {
        id: "techInterest",
        label: "What are you more interested in working with?",
        type: "radio",
        options: [
          { value: "hardware", label: "Hardware" },
          { value: "software", label: "Software" },
        ],
        validation: {
          required: "Pick wisely, the fate of your keyboard depends on it!",
        },
      },
      {
        id: "relevantExperience",
        label:
          "Relevant experience with the same : (From Starting Out to Being Very Proficient)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: {
          required: "Rate yourself! (No pressure, we all started at 1)",
        },
      },
      {
        id: "favTool",
        label: "Favorite AI tool & why?:",
        type: "text",
        validation: { required: "Share your AI crush! (No judgment)" },
      },
      {
        id: "weirdestBug",
        label:
          "What's the weirdest bug you've ever encountered, and how did you squash it?",
        type: "long-text",
        validation: {
          required:
            "Share your bug-hunting story! (Bonus points for creative solutions)",
        },
      },
      {
        id: "favoriteAI",
        label:
          "What new innovations/changes in the tech world are you excited about?",
        type: "text",
      },
      {
        id: "githubLink",
        label: "GitHub Profile URL",
        type: "link",
        validation: {
          required: "Show us your code magic! (GitHub link please)",
        },
      },
      {
        id: "portfolio",
        label: "Anything that you worked on that you'd like us to see?",
        type: "text",
        validation: {
          required: "Brag a little! Drop your coolest project link.",
        },
      },
    ],
  },
  {
    id: "marketing-team",
    title: "Marketing Team",
    questions: [
      {
        id: "whyMarketing",
        label: "Why do you want to join the Marketing Team?",
        type: "text",
      },
      {
        id: "marketingSkills",
        label:
          "How will you market a flagship E-Cell event (such as the E-Summit) on campus and outside of campus?",
        type: "long-text",
        validation: { required: "Convince us! Pretend we're your audience." },
      },
      {
        id: "experience",
        label: "Any prior experience in marketing? If yes, please elaborate.",
        type: "long-text",
        validation: {
          required: "Spill the beans! Tell us your marketing adventures.",
        },
      },
      {
        id: "superpower",
        label:
          "If you could have any superpower for a day, what would it be and why?",
        type: "long-text",
        validation: {
          required: "Unleash your inner superhero! (No capes required)",
        },
      },
      {
        id: "creativity",
        label: "Do you follow us on insta?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          {
            value: "I'll just do it - Only Correct Option",
            label: "I'll just do it - Only Correct Option",
          },
        ],
        validation: {
          required: "We know you want to! (Pick one)",
        },
      },
      {
        id: "bonusQuestion",
        label: "BONUS QUESTION - Who let the dogs out ?",
        type: "text",
      },
    ],
  },
  {
    id: "design-team",
    title: "Design Team",
    questions: [
      {
        id: "designMotivation",
        label:
          "Why do you wanna be a part of the E-Cell? And why the Design Team?",
        type: "text",
        validation: { required: "Let your creative juices flow!" },
      },
      {
        id: "designPhilosophy",
        label:
          "What design software(s) are you proficient in and which do you prefer for specific tasks?",
        type: "text",
        validation: { required: "Name drop your favorite design tools!" },
      },
      {
        id: "designProject",
        label:
          "Tell us a bit about a project that you have worked on and if you learned anything from that experience.",
        type: "text",
        validation: { required: "Share your design wisdom!" },
      },
      {
        id: "designReel",
        label:
          "Drop the link to the best reel you can find (it will be taken very seriously)",
        type: "link",
      },
      {
        id: "designPortfolio",
        label:
          "Please attach a link to your design portfolio (make sure we can access the files).",
        type: "text",
        validation: {
          required: "Show off your masterpieces! Portfolio link please.",
        },
      },
    ],
  },
  {
    id: "content-team",
    title: "Content & Creation Team",
    questions: [
      {
        id: "contentMotivation",
        label:
          "Why do you wanna be a part of E-Cell, and why in the content team?",
        type: "text",
        validation: { required: "Drop a link and tell us why you're awesome!" },
      },
      {
        id: "initiative",
        label:
          "If there was something that you wanted to start or take initiative on as a member of the team, what would it be?",
        type: "long-text",
        validation: { required: "Pitch your wildest idea!" },
      },
      {
        id: "strengthsWeaknesses",
        label: "What do you see as your biggest strengths and weaknesses?",
        type: "long-text",
        validation: {
          required: "Be honest! (We all have a weakness for pizza)",
        },
      },
      {
        id: "contentCreation",
        label: "Attach some of your previous work : ",
        type: "text",
        validation: {
          required: "Show us your creative side! Attach your best work.",
        },
      },
    ],
  },
  {
    id: "pr-spons-team",
    title: "PR & Sponsorship Team",
    questions: [
      {
        id: "interest",
        label:
          "What interests you about the Entrepreneurship Cell? and Why are you interested in joining the PR team?",
        type: "text",
        validation: { required: "Tell us what makes PR exciting for you!" },
      },
      {
        id: "qualities",
        label:
          "What qualities do you possess that would make you a good PR executive?",
        type: "long-text",
        validation: { required: "Brag a little! We love confidence." },
      },
      {
        id: "entrepreneurshipMotivation",
        label:
          "Tell us something about yourself that pushed you towards entrepreneurship.",
        type: "long-text",
        validation: { required: "Share your entrepreneurial spark!" },
      },
      {
        id: "approachBrand",
        label:
          "If given a task to approach a brand for sponsorship, how would you plan your first step?",
        type: "long-text",
        validation: {
          required: "Walk us through your first move — be bold and practical!",
        },
      },
      {
        id: "handleBudgetHesitancy",
        label:
          "Imagine a sponsor shows interest but is hesitant about the budget. How would you handle the situation?",
        type: "long-text",
        validation: {
          required:
            "Convince us — how would you save the deal (creativity wins bonus points)?",
        },
      },
    ],
  },
  {
    id: "video-team",
    title: "Videography Team",
    questions: [
      {
        id: "videoMotivation",
        label: "Why do you want to be a part of the E-Cell? ",
        type: "text",
        validation: {
          required: "Share your Oscar-worthy motivation! (Link please)",
        },
      },
      {
        id: "videoInterest",
        label: "Why Videography?",
        type: "long-text",
        validation: {
          required: "Lights, camera, action! Tell us why you love videography.",
        },
      },
      {
        id: "videoEditingApproach",
        label: "What is your approach towards editing a video?",
        type: "long-text",
        validation: {
          required:
            "Reveal your editing secrets! (We promise not to steal them)",
        },
      },
      {
        id: "videoReel",
        label:
          "This is our Instagram: E Cell, which reel, according to you is the best & why?",
        type: "link",
        validation: {
          required: "Pick a reel and tell us why it's a blockbuster!",
        },
      },
      {
        id: "videoEditingSoftware",
        label: "What Software do you use for editing?",
        type: "long-text",
        validation: {
          required: "Name your editing weapon of choice!",
        },
      },
      {
        id: "videoEquipment",
        label: "What equipment do you generally use for shooting & why?",
        type: "long-text",
        validation: {
          required: "Tell us about your gear! (Bonus points for cool gadgets)",
        },
      },
      {
        id: "Questions",
        label: "Any Questions for us? ",
        type: "long-text",
      },
      {
        id: "videoWorkSamples",
        label: "Anything that you worked on that you'd like us to see?",
        type: "text",
      },
    ],
  },
  {
    id: "event-team",
    title: "Event Management Team",
    questions: [
      {
        id: "jugaaduSolve",
        label:
          "What’s the most jugaadu (creative hack) thing you’ve ever done to solve a problem?",
        type: "long-text",
        validation: {
          required: "Tell us your most creative hack — we love jugaad!",
        },
      },
      {
        id: "decorBudgetPlan",
        label:
          "You have a budget of ₹700 and need to decorate a hall for 100 people. What’s your plan? (Yes EM mei decor bhi hota hai)",
        type: "long-text",
        validation: { required: "Pitch your budget-friendly decor plan!" },
      },
      {
        id: "em_timeManagement",
        label: "Rate yourself: Time management (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your time management (1-5)" },
      },
      {
        id: "em_creativity",
        label: "Rate yourself: Creativity (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your creativity (1-5)" },
      },
      {
        id: "em_handlingPressure",
        label: "Rate yourself: Handling pressure (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your ability to handle pressure (1-5)" },
      },
      {
        id: "em_teamwork",
        label: "Rate yourself: Teamwork (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your teamwork (1-5)" },
      },
      {
        id: "em_lastMinute",
        label: "Rate yourself: Being the “last-minute saviour” (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your last-minute saviour skills (1-5)" },
      },
      {
        id: "em_lateNightComfort",
        label:
          "Our events often mean late nights, heavy lifting, solving problems on the spot and wrapping up the event being the last ones to leave. How comfortable are you with this? (Be honest)",
        type: "radio",
        options: [
          { value: "very", label: "Very comfortable" },
          { value: "somewhat", label: "Somewhat comfortable" },
          { value: "not", label: "Not comfortable" },
        ],
        validation: { required: "Be honest — how comfortable are you?" },
      },
      {
        id: "em_submissionConflict",
        label:
          "You have a major submission the next day, but your team needs you at an event. How would you handle it?",
        type: "long-text",
        validation: {
          required:
            "Describe your plan to balance both responsibilities — practicality scores high!",
        },
      },
      {
        id: "em_outOfComfort",
        label:
          "Give an example of a time you took responsibility for something outside your comfort zone. (previous EM work if any)",
        type: "long-text",
        validation: { required: "Share that brave moment!" },
      },
      {
        id: "em_lightsOut",
        label:
          "The lights go off during the crisis segment of Xcelarate, do you:",
        type: "radio",
        options: [
          { value: "panic", label: "Panic and hide" },
          { value: "backstage", label: "Run to the backstage" },
          { value: "joke", label: "Crack a joke to the audience" },
          { value: "other", label: "Something else (be smart)" },
        ],
        validation: { required: "Pick one — quick thinking counts!" },
      },
    ],
  },
];

// ========================================
// US EXPANSION ANTIPLAYBOOK - DATA
// Fallback data with tag-based structure
// ========================================

// Predefined tags for fallback matching
const predefinedTags = {
    // Business Model
    'b2b': { slug: 'b2b', display_name: 'B2B', category: 'business_model', icon: '🏢' },
    'b2c': { slug: 'b2c', display_name: 'B2C', category: 'business_model', icon: '👤' },
    'b2b2c': { slug: 'b2b2c', display_name: 'B2B2C', category: 'business_model', icon: '🔄' },
    'marketplace': { slug: 'marketplace', display_name: 'Marketplace', category: 'business_model', icon: '🛒' },
    'p2p': { slug: 'p2p', display_name: 'P2P/Consumer', category: 'business_model', icon: '🤝' },

    // Vertical
    'saas': { slug: 'saas', display_name: 'SaaS', category: 'vertical', icon: '☁️' },
    'fintech': { slug: 'fintech', display_name: 'Fintech', category: 'vertical', icon: '💳' },
    'consumer': { slug: 'consumer', display_name: 'Consumer', category: 'vertical', icon: '🛍️' },
    'deeptech': { slug: 'deeptech', display_name: 'Deep Tech/AI', category: 'vertical', icon: '🤖' },
    'defense-tech': { slug: 'defense-tech', display_name: 'Defense Tech', category: 'vertical', icon: '🛡️' },
    'govtech': { slug: 'govtech', display_name: 'GovTech', category: 'vertical', icon: '🏛️' },
    'healthcare': { slug: 'healthcare', display_name: 'Healthcare', category: 'vertical', icon: '🏥' },
    'climate-tech': { slug: 'climate-tech', display_name: 'Climate Tech', category: 'vertical', icon: '🌱' },

    // Revenue Model
    'subscription': { slug: 'subscription', display_name: 'Subscription', category: 'revenue_model', icon: '🔁' },
    'transactional': { slug: 'transactional', display_name: 'Transactional', category: 'revenue_model', icon: '💰' },
    'freemium': { slug: 'freemium', display_name: 'Freemium', category: 'revenue_model', icon: '🆓' },
    'commission': { slug: 'commission', display_name: 'Commission', category: 'revenue_model', icon: '📊' },

    // Funding Stage
    'pre-seed': { slug: 'pre-seed', display_name: 'Pre-seed', category: 'funding_stage', icon: '🌱' },
    'seed': { slug: 'seed', display_name: 'Seed', category: 'funding_stage', icon: '🌿' },
    'series-a': { slug: 'series-a', display_name: 'Series A', category: 'funding_stage', icon: '📈' },
    'series-b': { slug: 'series-b', display_name: 'Series B', category: 'funding_stage', icon: '📊' },
    'series-c-plus': { slug: 'series-c-plus', display_name: 'Series C+', category: 'funding_stage', icon: '🚀' },
    'growth': { slug: 'growth', display_name: 'Growth/Late', category: 'funding_stage', icon: '🏆' },

    // Journey Stage
    'exploring': { slug: 'exploring', display_name: 'Exploring', category: 'journey_stage', icon: '🔍' },
    'early-entry': { slug: 'early-entry', display_name: 'Early Entry', category: 'journey_stage', icon: '🛫' },
    'scaling': { slug: 'scaling', display_name: 'Scaling', category: 'journey_stage', icon: '📈' },
    'established': { slug: 'established', display_name: 'Established', category: 'journey_stage', icon: '🏢' },

    // Concern Areas
    'hiring': { slug: 'hiring', display_name: 'Hiring', category: 'concern_area', icon: '👥' },
    'pmf': { slug: 'pmf', display_name: 'Product-Market Fit', category: 'concern_area', icon: '🎯' },
    'gtm': { slug: 'gtm', display_name: 'GTM Strategy', category: 'concern_area', icon: '🚀' },
    'legal': { slug: 'legal', display_name: 'Legal/Compliance', category: 'concern_area', icon: '⚖️' },
    'fundraising': { slug: 'fundraising', display_name: 'Fundraising', category: 'concern_area', icon: '💵' },
    'operations': { slug: 'operations', display_name: 'Operations', category: 'concern_area', icon: '⚙️' },

    // Special Considerations
    'itar-relevant': { slug: 'itar-relevant', display_name: 'ITAR Relevant', category: 'special', icon: '🔒' },
    'cfius-relevant': { slug: 'cfius-relevant', display_name: 'CFIUS Relevant', category: 'special', icon: '🏦' },
    'regulated-industry': { slug: 'regulated-industry', display_name: 'Regulated Industry', category: 'special', icon: '📋' },
    'defense-hq-timing': { slug: 'defense-hq-timing', display_name: 'Defense HQ Timing', category: 'special', icon: '⏰' }
};

const mistakesData = [
    {
        id: 1,
        title: "Lack of Focus",
        icon: "&#x1F6E0;",
        category: "Product",
        cost: "$2,000,000+",
        preview: "European founders underestimate how much more focus the US market requires. Touting platform depth won't work here.",
        // Legacy relevance (for backward compatibility)
        relevance: {
            verticals: ["b2b-saas", "fintech", "deeptech", "marketplace"],
            stages: ["seed", "series-a", "series-b"],
            journeys: ["exploring", "early", "scaling"],
            worries: ["product", "strategy"]
        },
        // New tag-based relevance
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'scaling', 'pmf', 'gtm'],
        tagWeights: { 'pmf': 4, 'gtm': 4, 'exploring': 3 },
        content: {
            problem: "Lack of product focus",
            points: [
                "Sounds simple but essentially all EU founders will <strong>underestimate how much more focus the US market requires</strong>",
                "The vast majority of EU founders will tout the depth of their platform when winning in the US requires choosing one critical use case and nailing it better than anyone else in the market",
                "Often the use case will be different in the US than in EU",
                "Fail to nail your use case and you can go home: money wasted upwards of $2M mini for your cash-tight start-up"
            ],
            remediation: "A co-founder needs to meet with dozens of customers & industry thought leaders multiple times for at least 6 months prior to honing-in on a killer use case"
        }
    },
    {
        id: 2,
        title: "Falling for the Smooth Talkers",
        icon: "&#x1F5E3;",
        category: "Recruiting",
        cost: "Varies",
        preview: "Americans are trained to sell themselves exceptionally well. Don't confuse polish with performance.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["series-a", "series-b", "growth"],
            journeys: ["early", "scaling", "established"],
            worries: ["recruiting"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'early-entry', 'scaling', 'established', 'hiring'],
        tagWeights: { 'hiring': 5 },
        content: {
            problem: "Getting seduced by smooth talkers in interviews",
            points: [
                "Americans are trained from a young age to present themselves confidently and sell their achievements",
                "European founders often mistake this polish for actual competence",
                "The interview performance rarely correlates with job performance",
                "These people aren't gods - how European founders can stop making the #1 mistake in US recruiting"
            ],
            remediation: "Reference check extensively. Ask for specific metrics and verify them. Run trial projects when possible. Don't be dazzled by the presentation.",
            resource: "https://kellblog.com/2024/05/18/these-people-arent-gods-how-european-founders-can-stop-making-the-1-mistake-in-us-recruiting/"
        }
    },
    {
        id: 3,
        title: "Overlook Rockstars",
        icon: "&#x1F3B8;",
        category: "Recruiting",
        cost: "$500,000+",
        preview: "You need to invest big bucks for your rock star(s). A US rockstar is worth 3-5x their EU equivalent.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "deeptech", "marketplace"],
            stages: ["series-a", "series-b", "growth"],
            journeys: ["early", "scaling", "established"],
            worries: ["recruiting", "strategy"]
        },
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'early-entry', 'scaling', 'established', 'hiring', 'gtm'],
        tagWeights: { 'hiring': 5, 'gtm': 3 },
        content: {
            problem: "Not paying enough for top US talent",
            points: [
                "You need to invest big bucks for your rock star(s). It can be a solo sales contributor or a CRO or a CMO. It depends on your business. But you need to pay the price.",
                "100% worth it. A US employee is typically paid at least twice as much as an equivalent EU employee (think a 50k€ EU job is worth $100k in the US)",
                "When you include burden it is more like 75k€ against $120k",
                "For a rock star don't shy away from paying 3, sometimes 4, if not 5x an EU equivalent"
            ],
            remediation: "Budget appropriately for US talent. One exceptional hire at $300k+ will outperform three mediocre $100k hires."
        }
    },
    {
        id: 4,
        title: "Your Swiss Army Knife Won't Work",
        icon: "&#x1F91D;",
        category: "Recruiting",
        cost: "Varies",
        preview: "US employees are ultra-specialized. Don't expect your hire to be good at two things even if they sell it to you.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["seed", "series-a", "series-b", "growth"],
            journeys: ["early", "scaling", "established"],
            worries: ["recruiting", "operations"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'growth', 'early-entry', 'scaling', 'established', 'hiring', 'operations'],
        tagWeights: { 'hiring': 5, 'operations': 3 },
        content: {
            problem: "Expecting US employees to be multi-skilled generalists",
            points: [
                "A major difference with Europe vastly misunderstood: in the US, your average employee is a lot less impactful and resourceful than in Europe",
                "You want to hire someone for a very precise task. A lot narrower than in Europe",
                "US is here again a lot more focused in terms of organization",
                "Don't expect your employee to be good at two things even though they can sell it to you 10 times better than your EU employee in an interview",
                "\"The US is very much about ultra specialisation, so basically you have an org chart and a have a very defined role and that's your job\" - Renaud Deraison, ex-CTO Tenable"
            ],
            remediation: "The advantage is that if someone leaves in the US you can replace that job fairly easily. As the company starts you can do the European approach, then move to a more specialized structure as you grow."
        }
    },
    {
        id: 5,
        title: "Weak Narrative / Storytelling",
        icon: "&#x1F4AC;",
        category: "Product",
        cost: "$1,000,000+",
        preview: "EU founders think US focus on narrative is window-dressing. It's the opposite - it impacts strategy and roadmap.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["seed", "series-a", "series-b"],
            journeys: ["exploring", "early", "scaling"],
            worries: ["product", "strategy"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'scaling', 'pmf', 'gtm'],
        tagWeights: { 'pmf': 4, 'gtm': 4 },
        content: {
            problem: "Not nailing your narrative",
            points: [
                "This one is so commonly misunderstood by EU founders. They think the US focus on narrative is only window-dressing",
                "Turns out it is the opposite. If you own a greenfield, you must be able to express it in a concise and impactful way. Each word counts",
                "Very often this stage will deeply impact the strategic positioning of the company as well as its product roadmap",
                "Weak narrative = no consistent sales machine in the US"
            ],
            remediation: "Work with a world-class narrative marketer. Does not have to be a costly tier 1 agency. Can be a solo star out of his/her garage."
        }
    },
    {
        id: 6,
        title: "Not Having a Strong Vision",
        icon: "&#x1F441;",
        category: "Strategy",
        cost: "Varies",
        preview: "Americans love a winner. European founders present past-to-future; Americans start with a bold future vision.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["seed", "series-a", "series-b", "growth"],
            journeys: ["exploring", "early", "scaling", "established"],
            worries: ["strategy", "product"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'growth', 'exploring', 'early-entry', 'scaling', 'established', 'gtm', 'pmf', 'fundraising'],
        tagWeights: { 'gtm': 4, 'fundraising': 4 },
        content: {
            problem: "Not having a strong vision",
            points: [
                "Americans love a winner. So make sure you present like one.",
                "European founders typically present a company narrative by examining current metrics, comparing them to the past, and predicting future trends",
                "In contrast, American founders start with a bold vision of the future and then explain how they plan to achieve it, often referencing past successes at the end",
                "Adopting the U.S. approach doesn't mean losing your authenticity",
                "Take Stripe, founded by the Irish Collison brothers. Their bold vision to 'increase the GDP of the internet' is about more than just making payments easier; it's about expanding opportunities for everyone",
                "A big vision can be both daring and inspirational without seeming arrogant"
            ],
            remediation: "Reframe your pitch to lead with an ambitious, inspiring vision. Where are you taking the world, not just where your company is today."
        }
    },
    {
        id: 7,
        title: "Networking the Wrong Way",
        icon: "&#x1F44B;",
        category: "Marketing",
        cost: "Varies",
        preview: "Silicon Valley is like a country club. Either get all the signatures or bust in with a parachute.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["seed", "series-a", "series-b"],
            journeys: ["exploring", "early"],
            worries: ["strategy", "recruiting"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'gtm', 'hiring', 'fundraising'],
        tagWeights: { 'exploring': 4, 'early-entry': 4, 'fundraising': 3 },
        content: {
            problem: "Find the right connector",
            points: [
                "The Silicon Valley scene is like a country club with two ways in. Either you get all the signatures of recommendation or you bust into the middle of the garden party with a parachute and make a real entrance.",
                "You can't afford to wait for introductions, so get out there and meet as many of the right people as you can",
                "Go to events where you're likely to meet people who can connect you to the U.S. market",
                "Make the most of digital tools to find second-degree contacts within your own network",
                "Crucially, when you do get in front of the right people, don't be afraid to ask. Americans value confidence and audacity",
                "If you have trouble, just remind yourself: There are people with less talent and inferior companies getting ahead. So get to it."
            ],
            remediation: "Be bold. Make clear requests for introductions or meetings. Don't wait for permission.",
            resource: "https://www.tapestry.vc/perspectives/5-tips-for-founders-looking-to-launch-in-the-us"
        }
    },
    {
        id: 8,
        title: "Your Company Name Sucks",
        icon: "&#x2122;",
        category: "Marketing",
        cost: "$10,000-50,000",
        preview: "A bad brand can drag your market entry. Test your brand before starting your go to market.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "marketplace"],
            stages: ["seed", "series-a"],
            journeys: ["exploring", "early"],
            worries: ["strategy", "product"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'marketplace', 'seed', 'series-a', 'exploring', 'early-entry', 'gtm', 'pmf'],
        tagWeights: { 'exploring': 4, 'gtm': 3 },
        content: {
            problem: "Not testing your brand before GTM",
            points: [
                "Test your brand before starting your go to market",
                "A bad brand can drag your market entry. It is not a roadblock but you'd be surprised how easy it is to change a brand before entering the market",
                "Consider it if your brand is too descriptive, a mouthful or simply not impactful",
                "Again, you don't need an expensive marketer. A solo contributor can help you nail the right brand for less than $10,000 in a month"
            ],
            remediation: "Test your name with US customers before launch. Consider hiring a naming specialist - even established brands have done this."
        }
    },
    {
        id: 9,
        title: "Incomplete Market Research",
        icon: "&#x1F50E;",
        category: "Strategy",
        cost: "$500,000+",
        preview: "Your pre-entry market research should take 3-4 months and cover much more than you think.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["seed", "series-a", "series-b"],
            journeys: ["exploring", "early"],
            worries: ["strategy", "product", "operations"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'gtm', 'pmf', 'operations'],
        tagWeights: { 'exploring': 5, 'gtm': 4 },
        content: {
            problem: "Incomplete market research",
            points: [
                "What your pre-entry market research should include:",
                "3-4 month timetable",
                "Value chain comparison",
                "Customer research",
                "Competitor research & positioning",
                "Product localisation",
                "Location recommendation",
                "Regulation",
                "Operations (legal, financial, HR, IP, subsidiary, etc)",
                "Pre- and post-launch timetable",
                "Year one budget, and staffing plan"
            ],
            remediation: "Don't skip steps. Create a comprehensive checklist and allocate proper time and budget for thorough research."
        }
    },
    {
        id: 10,
        title: "Waiting Too Long on Licenses",
        icon: "&#x2705;",
        category: "Regulation",
        cost: "18+ months delay",
        preview: "If you need licenses to operate, US expansion could be delayed by 18+ months. Start early.",
        relevance: {
            verticals: ["fintech", "deeptech"],
            stages: ["seed", "series-a", "series-b"],
            journeys: ["exploring", "early"],
            worries: ["operations"]
        },
        tags: ['fintech', 'healthcare', 'deeptech', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'legal', 'operations', 'regulated-industry'],
        tagWeights: { 'fintech': 5, 'healthcare': 5, 'legal': 5, 'regulated-industry': 6 },
        content: {
            problem: "Waiting before licenses",
            points: [
                "If you need to acquire licenses to operate, US expansion could be delayed by 18m+",
                "Many European founders underestimate the regulatory timeline",
                "Starting the process late means missing your market window"
            ],
            remediation: "Start the licensing process as early as possible, even before you're certain about US expansion. The timeline is often the biggest bottleneck."
        }
    },
    {
        id: 11,
        title: "Wrong HQ Location",
        icon: "&#x1F3EB;",
        category: "Regulation",
        cost: "Varies",
        preview: "Choosing the wrong US location for your HQ can impact hiring, costs, and access to customers.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["series-a", "series-b", "growth"],
            journeys: ["exploring", "early", "scaling"],
            worries: ["operations", "recruiting"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'exploring', 'early-entry', 'scaling', 'operations', 'hiring'],
        tagWeights: { 'operations': 4, 'hiring': 3 },
        content: {
            problem: "Choosing the wrong HQ location",
            points: [
                "Location matters more than many European founders realize",
                "Different cities offer different talent pools, costs, and customer access",
                "SF/NYC aren't always the right choice",
                "Consider your industry, customers, and hiring needs"
            ],
            remediation: "Research thoroughly. Consider: Where are your customers? What talent do you need? What's the cost of living? What's the timezone alignment with your EU HQ?"
        }
    },
    {
        id: 12,
        title: "Don't Invest Enough",
        icon: "&#x1F4B0;",
        category: "Strategy",
        cost: "$2,000,000+",
        preview: "They tend to just see the US as a sales office. If you want to win here, you have to bet the farm.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "consumer", "deeptech", "marketplace", "other"],
            stages: ["series-a", "series-b", "growth"],
            journeys: ["exploring", "early", "scaling"],
            worries: ["strategy"]
        },
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'exploring', 'early-entry', 'scaling', 'gtm', 'fundraising'],
        tagWeights: { 'gtm': 5, 'fundraising': 4 },
        content: {
            problem: "Not investing enough in US expansion",
            points: [
                "\"They tend to just see the US as a sales office and don't go there to win\"",
                "\"If you really want to win here you have to bet the farm\"",
                "- Renaud Deraison, ex-CTO Tenable",
                "Half-measures lead to failure",
                "The US market requires full commitment"
            ],
            remediation: "Go all in or don't go at all. Budget for real investment, not just a toe in the water."
        }
    },
    {
        id: 13,
        title: "Setting Up US HQ Too Early for Defense Tech",
        icon: "&#x1F6E1;",
        category: "Strategy",
        cost: "$500,000+ and lost government opportunities",
        preview: "European Defense Tech companies often rush to set up US HQ, not realizing being European can be advantageous.",
        relevance: {
            verticals: ["deeptech"],
            stages: ["seed", "series-a", "series-b"],
            journeys: ["exploring", "early"],
            worries: ["strategy", "operations"]
        },
        tags: ['defense-tech', 'govtech', 'deeptech', 'exploring', 'early-entry', 'legal', 'operations', 'gtm', 'itar-relevant', 'cfius-relevant', 'defense-hq-timing'],
        tagWeights: { 'defense-tech': 6, 'govtech': 6, 'defense-hq-timing': 8, 'itar-relevant': 5, 'cfius-relevant': 5 },
        specialConsiderations: ['defense-hq-timing', 'itar-relevant', 'cfius-relevant'],
        priority: true,
        content: {
            problem: "Rushing to establish US headquarters for Defense Tech companies",
            points: [
                "<strong>Being European can be an advantage</strong> for selling to European governments - don't give this up prematurely",
                "ITAR (International Traffic in Arms Regulations) creates complex compliance requirements for US-based defense companies",
                "CFIUS (Committee on Foreign Investment) can review and potentially block transactions involving foreign ownership in sensitive sectors",
                "FOCI (Foreign Ownership, Control, or Influence) requirements may mandate expensive mitigation measures",
                "Many European governments prefer to buy from European companies for sovereignty reasons",
                "Setting up US HQ may disqualify you from certain European defense contracts"
            ],
            remediation: "Evaluate where your primary revenue will come from before restructuring. If selling to European governments is significant, maintain European HQ status. Consult with defense industry legal counsel before any corporate restructuring. Consider establishing a US subsidiary rather than moving HQ if US presence is needed.",
            resource: "https://www.bis.doc.gov/index.php/policy-guidance/lists-of-parties-of-concern"
        }
    }
];

const testimonialsData = [
    {
        id: 1,
        type: "video",
        youtubeId: "4EHmDidPZj4",
        title: "Founder Story",
        author: "Red River West",
        role: "Founder Testimonial"
    },
    {
        id: 2,
        type: "video",
        youtubeId: "JAz0WNNoSMg",
        title: "US Expansion Insights",
        author: "Red River West",
        role: "Founder Testimonial"
    },
    {
        id: 3,
        type: "quote",
        content: "The US is very much about ultra specialisation. You have an org chart and a very defined role and that's your job. In Europe you tend to have people that are jack of all trades that operate outside of their lane.",
        author: "Renaud Deraison",
        role: "Ex-CTO, Tenable",
        avatar: "&#x1F468;&#x200D;&#x1F4BB;"
    },
    {
        id: 4,
        type: "quote",
        content: "They tend to just see the US as a sales office and don't go there to win. If you really want to win here you have to bet the farm.",
        author: "Renaud Deraison",
        role: "Ex-CTO, Tenable",
        avatar: "&#x1F680;"
    },
    {
        id: 5,
        type: "quote",
        content: "You can try to get the best of both worlds. As the company starts you can do the European approach where they don't clearly have swim lanes defined, and as the company grows you can have a more specialised approach.",
        author: "Renaud Deraison",
        role: "Ex-CTO, Tenable",
        avatar: "&#x1F3AF;"
    },
    {
        id: 6,
        type: "quote",
        content: "There are people with less talent and inferior companies getting ahead. The Silicon Valley scene is like a country club - either you get all the signatures of recommendation or you bust in with a parachute.",
        author: "Red River West",
        role: "Investment Team",
        avatar: "&#x1F3C6;"
    }
];

// Quiz configuration for fallback
const quizConfig = {
    questions: [
        {
            id: 'business_model',
            key: 'businessModel',
            text: "What's your business model?",
            isMultiSelect: false,
            options: [
                { key: 'b2b', label: 'B2B', tags: ['b2b'] },
                { key: 'b2c', label: 'B2C', tags: ['b2c'] },
                { key: 'b2b2c', label: 'B2B2C', tags: ['b2b2c'] },
                { key: 'marketplace', label: 'Marketplace', tags: ['marketplace'] },
                { key: 'p2p', label: 'P2P/Consumer', tags: ['p2p'] }
            ]
        },
        {
            id: 'vertical',
            key: 'vertical',
            text: "What's your vertical?",
            isMultiSelect: false,
            options: [
                { key: 'saas', label: 'SaaS', tags: ['saas'] },
                { key: 'fintech', label: 'Fintech', tags: ['fintech', 'regulated-industry'] },
                { key: 'consumer', label: 'Consumer', tags: ['consumer'] },
                { key: 'deeptech', label: 'Deep Tech / AI', tags: ['deeptech'] },
                { key: 'defense-tech', label: 'Defense Tech', tags: ['defense-tech', 'itar-relevant', 'cfius-relevant'] },
                { key: 'govtech', label: 'GovTech', tags: ['govtech'] },
                { key: 'healthcare', label: 'Healthcare', tags: ['healthcare', 'regulated-industry'] },
                { key: 'climate-tech', label: 'Climate Tech', tags: ['climate-tech'] }
            ]
        },
        {
            id: 'funding_stage',
            key: 'stage',
            text: "What's your funding stage?",
            isMultiSelect: false,
            options: [
                { key: 'pre-seed', label: 'Pre-seed', tags: ['pre-seed'] },
                { key: 'seed', label: 'Seed', tags: ['seed'] },
                { key: 'series-a', label: 'Series A', tags: ['series-a'] },
                { key: 'series-b', label: 'Series B', tags: ['series-b'] },
                { key: 'series-c-plus', label: 'Series C+', tags: ['series-c-plus'] },
                { key: 'growth', label: 'Growth/Late', tags: ['growth'] }
            ]
        },
        {
            id: 'journey_stage',
            key: 'journey',
            text: "Where are you on your US journey?",
            isMultiSelect: false,
            options: [
                { key: 'exploring', label: 'Exploring - Researching the opportunity', tags: ['exploring'] },
                { key: 'early-entry', label: 'Early Entry - First hires or entity setup', tags: ['early-entry'] },
                { key: 'scaling', label: 'Scaling - Growing the US team', tags: ['scaling'] },
                { key: 'established', label: 'Established - Significant US presence', tags: ['established'] }
            ]
        },
        {
            id: 'concerns',
            key: 'concerns',
            text: "What are your primary concerns? (Select all that apply)",
            isMultiSelect: true,
            options: [
                { key: 'hiring', label: 'Hiring & Talent', tags: ['hiring'] },
                { key: 'pmf', label: 'Product-Market Fit', tags: ['pmf'] },
                { key: 'gtm', label: 'GTM Strategy', tags: ['gtm'] },
                { key: 'legal', label: 'Legal & Compliance', tags: ['legal'] },
                { key: 'fundraising', label: 'Fundraising', tags: ['fundraising'] },
                { key: 'operations', label: 'Operations', tags: ['operations'] }
            ]
        }
    ],
    conditionalQuestions: [
        {
            id: 'gov_contracts',
            key: 'govContracts',
            text: "Are you targeting US or European government contracts?",
            isMultiSelect: false,
            triggeredBy: { question: 'vertical', values: ['defense-tech', 'govtech'] },
            options: [
                { key: 'us-gov', label: 'US Government', tags: ['itar-relevant'] },
                { key: 'eu-gov', label: 'European Government', tags: ['defense-hq-timing'] },
                { key: 'both', label: 'Both', tags: ['itar-relevant', 'cfius-relevant', 'defense-hq-timing'] },
                { key: 'neither', label: 'Neither / Private sector', tags: [] }
            ]
        },
        {
            id: 'security_clearance',
            key: 'securityClearance',
            text: "Do you have or need security clearances?",
            isMultiSelect: false,
            triggeredBy: { question: 'vertical', values: ['defense-tech', 'govtech'] },
            options: [
                { key: 'have-us', label: 'Have US clearances', tags: [] },
                { key: 'need-us', label: 'Need US clearances', tags: ['itar-relevant'] },
                { key: 'have-eu', label: 'Have EU clearances only', tags: ['defense-hq-timing'] },
                { key: 'none', label: 'No clearances needed', tags: [] }
            ]
        },
        {
            id: 'state_licensing',
            key: 'stateLicensing',
            text: "Do you need state-by-state licensing?",
            isMultiSelect: false,
            triggeredBy: { question: 'vertical', values: ['fintech'] },
            options: [
                { key: 'yes-mtl', label: 'Yes - Money Transmitter Licenses', tags: ['regulated-industry'] },
                { key: 'yes-other', label: 'Yes - Other licenses', tags: ['regulated-industry'] },
                { key: 'no', label: 'No / Not sure yet', tags: [] }
            ]
        },
        {
            id: 'hipaa',
            key: 'hipaaCompliance',
            text: "Is HIPAA compliance required for your product?",
            isMultiSelect: false,
            triggeredBy: { question: 'vertical', values: ['healthcare'] },
            options: [
                { key: 'required', label: 'Yes - Required', tags: ['regulated-industry'] },
                { key: 'planned', label: 'Planning for it', tags: ['regulated-industry'] },
                { key: 'not-applicable', label: 'Not applicable', tags: [] }
            ]
        }
    ]
};

const companyProfiles = {
    archetypes: {
        "exploring": {
            name: "The Explorer",
            description: "Early-stage company researching the US market",
            level: 1,
            avatar: "&#x1F50D;",
            traits: ["Curious", "Research-focused", "Pre-expansion"]
        },
        "early-entry": {
            name: "The Pioneer",
            description: "Making first moves into the US market",
            level: 2,
            avatar: "&#x1F6EB;",
            traits: ["Bold", "First hires", "Entity setup"]
        },
        "scaling": {
            name: "The Builder",
            description: "Actively scaling US operations",
            level: 3,
            avatar: "&#x1F3D7;",
            traits: ["Growing team", "Revenue focus", "Scaling ops"]
        },
        "established": {
            name: "The Champion",
            description: "Established US presence, optimizing for growth",
            level: 4,
            avatar: "&#x1F3C6;",
            traits: ["Established", "Major market", "Optimization"]
        }
    },

    // Legacy support for old answer format
    journeyMap: {
        'exploring': 'exploring',
        'early': 'early-entry',
        'scaling': 'scaling',
        'established': 'established'
    },

    getProfile: function(answers) {
        // Support both old and new journey keys
        const journeyKey = this.journeyMap[answers.journey] || answers.journey || 'exploring';
        const archetype = this.archetypes[journeyKey] || this.archetypes.exploring;

        // Build attributes from answers
        const attributes = [];

        // Vertical label
        const verticalLabels = {
            'b2b-saas': 'B2B SaaS',
            'saas': 'SaaS',
            'fintech': 'Fintech',
            'consumer': 'Consumer',
            'deeptech': 'Deep Tech / AI',
            'defense-tech': 'Defense Tech',
            'govtech': 'GovTech',
            'healthcare': 'Healthcare',
            'climate-tech': 'Climate Tech',
            'marketplace': 'Marketplace',
            'other': 'Other'
        };
        attributes.push({ icon: '&#x1F3E2;', label: verticalLabels[answers.vertical] || 'Unknown' });

        // Stage label
        const stageLabels = {
            'pre-seed': 'Pre-seed',
            'seed': 'Seed Stage',
            'series-a': 'Series A',
            'series-b': 'Series B+',
            'series-c-plus': 'Series C+',
            'growth': 'Growth Stage'
        };
        attributes.push({ icon: '&#x1F4C8;', label: stageLabels[answers.stage] || 'Unknown' });

        // Worry/concern label (support both old and new)
        const worryLabels = {
            'recruiting': 'Hiring Focus',
            'hiring': 'Hiring Focus',
            'product': 'PMF Focus',
            'pmf': 'PMF Focus',
            'strategy': 'GTM Focus',
            'gtm': 'GTM Focus',
            'operations': 'Ops Focus',
            'legal': 'Legal Focus',
            'fundraising': 'Fundraising Focus'
        };
        const concern = answers.worry || (Array.isArray(answers.concerns) ? answers.concerns[0] : answers.concerns);
        attributes.push({ icon: '&#x26A0;', label: worryLabels[concern] || 'Unknown' });

        return {
            ...archetype,
            attributes
        };
    },

    getRelevantMistakes: function(answers) {
        // Convert old format answers to tags if needed
        const userTags = this.answersToTags(answers);

        // Score each mistake based on tag matching
        const scored = mistakesData.map(mistake => {
            let score = 0;
            const mistakeTags = mistake.tags || [];
            const tagWeights = mistake.tagWeights || {};

            // Base score from matching tags
            for (const tag of mistakeTags) {
                if (userTags.includes(tag)) {
                    const weight = tagWeights[tag] || 2;
                    score += weight;
                }
            }

            // Priority boost for special content
            if (mistake.priority && mistake.specialConsiderations) {
                for (const special of mistake.specialConsiderations) {
                    if (userTags.includes(special)) {
                        score += 10; // High priority boost
                    }
                }
            }

            return { ...mistake, score };
        });

        // Sort by score and return top 3
        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    },

    answersToTags: function(answers) {
        const tags = [];

        // Map old vertical keys to new tags
        const verticalTagMap = {
            'b2b-saas': ['b2b', 'saas'],
            'saas': ['saas'],
            'fintech': ['fintech'],
            'consumer': ['consumer'],
            'deeptech': ['deeptech'],
            'defense-tech': ['defense-tech'],
            'govtech': ['govtech'],
            'healthcare': ['healthcare'],
            'climate-tech': ['climate-tech'],
            'marketplace': ['marketplace']
        };
        if (answers.vertical && verticalTagMap[answers.vertical]) {
            tags.push(...verticalTagMap[answers.vertical]);
        }

        // Map stage to tags
        if (answers.stage) {
            tags.push(answers.stage);
        }

        // Map journey to tags (support old format)
        const journeyTagMap = {
            'exploring': 'exploring',
            'early': 'early-entry',
            'early-entry': 'early-entry',
            'scaling': 'scaling',
            'established': 'established'
        };
        if (answers.journey && journeyTagMap[answers.journey]) {
            tags.push(journeyTagMap[answers.journey]);
        }

        // Map worry to concern tags
        const worryTagMap = {
            'recruiting': 'hiring',
            'product': 'pmf',
            'strategy': 'gtm',
            'operations': 'operations'
        };
        if (answers.worry && worryTagMap[answers.worry]) {
            tags.push(worryTagMap[answers.worry]);
        }

        // Add concerns if multi-select
        if (Array.isArray(answers.concerns)) {
            tags.push(...answers.concerns);
        }

        return tags;
    },

    // Check if defense HQ warning should be shown
    shouldShowDefenseHqWarning: function(answers) {
        const defenseTags = ['defense-tech', 'govtech'];
        const earlyStages = ['exploring', 'early', 'early-entry'];

        const isDefenseTech = defenseTags.includes(answers.vertical);
        const isEarlyStage = earlyStages.includes(answers.journey);

        return isDefenseTech && isEarlyStage;
    }
};

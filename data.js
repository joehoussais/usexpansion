// ========================================
// US EXPANSION ANTIPLAYBOOK - DATA
// Fallback data with tag-based structure
// Enhanced with proper sourcing and citations
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
        title: "Copy-Pasting Your European GTM",
        icon: "&#x1F4CB;",
        category: "Strategy",
        cost: "$2,000,000+",
        severity: "critical",
        preview: "Your European playbook won't work here. US buyers expect urgency, enterprise security, and American logos before they'll talk.",
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'scaling', 'pmf', 'gtm'],
        tagWeights: { 'pmf': 4, 'gtm': 5, 'exploring': 3 },
        sources: [
            {
                title: "Europe to US: The Expansion Playbook Every Founder Needs",
                url: "https://www.thevccorner.com/p/europe-to-us-startup-expansion-playbook",
                author: "The VC Corner",
                type: "article"
            },
            {
                title: "The Top 5 Mistakes European Startups Make in US Expansion",
                url: "https://www.balderton.com/resources/the-top-5-mistakes-european-technology-startups-make-in-us-expansion/",
                author: "Balderton Capital",
                type: "article"
            }
        ],
        content: {
            problem: "Trying to drag-and-drop your home-market GTM into the US",
            points: [
                "<strong>US banking VPs demand urgency</strong> - they want a demo tomorrow, not next week. European sales cycles feel glacially slow to American buyers.",
                "Enterprise customers expect <strong>SOC2 compliance, Salesforce integration, and at least three American logos</strong> before forwarding you to procurement.",
                "Your European case studies don't carry weight. <strong>US buyers need US social proof</strong> - companies they recognize and can call for references.",
                "The competitive landscape is deeper than you think. For every European competitor you know, there are 10 US alternatives you've never heard of.",
                "Pricing that works in Europe often needs to be <strong>2-3x higher</strong> for US enterprise - but you also need to deliver 2-3x the value."
            ],
            remediation: "Spend 3-6 months on customer discovery before any real sales push. Meet with 50+ potential customers. Build a US-specific pitch deck. Get at least 2 design partners before scaling your sales team.",
            redFlags: [
                "You're using the same sales deck in the US that worked in Europe",
                "Your pipeline relies on European case studies and logos nobody in the US recognizes",
                "US prospects keep asking for SOC2 or Salesforce integration and you don't have either",
                "Your sales cycle in the US is 3x longer than projected",
                "You haven't spoken to 20+ US buyers before hiring your first US salesperson"
            ],
            actionItems: [
                "Interview 50 potential US customers before committing to a sales strategy",
                "Build a US-specific pitch deck with American logos, compliance badges, and US-relevant ROI metrics",
                "Achieve SOC2 Type II certification before enterprise outreach",
                "Identify and secure 2-3 US design partners willing to be named references",
                "Map the top 10 US competitors you've never heard of and position against them",
                "Adjust pricing upward by 2-3x from European levels and validate with 10 prospects",
                "Hire a US-based GTM advisor who has sold to your target buyer persona"
            ],
            metrics: [
                "Number of US customer discovery calls completed (target: 50+ before sales push)",
                "US-specific win rate vs. European win rate",
                "Average US sales cycle length vs. plan",
                "Number of referenceable US customers"
            ],
            timeline: "Pre-entry through first 12 months",
            quickWin: "Book 5 customer discovery calls with US prospects this week using LinkedIn outreach - ask about their buying process, not your product.",
            testimonials: [
                {
                    quote: "We thought our European success would translate directly. It took 6 months and $500k in burned runway to realize we needed to completely rebuild our pitch for American buyers.",
                    author: "Series B SaaS Founder",
                    role: "Anonymous"
                }
            ]
        }
    },
    {
        id: 2,
        title: "Falling for the Smooth Talkers",
        icon: "&#x1F5E3;",
        category: "Recruiting",
        cost: "$300,000-500,000",
        severity: "critical",
        preview: "Americans are trained to sell themselves brilliantly. Don't confuse polish with performance - that perfect interview rarely predicts success.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'early-entry', 'scaling', 'established', 'hiring'],
        tagWeights: { 'hiring': 5 },
        sources: [
            {
                title: "These People Aren't Gods: How European Founders Can Stop Making the #1 Mistake in US Recruiting",
                url: "https://kellblog.com/2024/05/18/these-people-arent-gods-how-european-founders-can-stop-making-the-1-mistake-in-us-recruiting/",
                author: "Dave Kellogg",
                authorRole: "Former CEO, Host Analytics",
                type: "article"
            },
            {
                title: "10 Things Not to Do When Hiring a Team in the US",
                url: "https://sifted.eu/articles/10-things-not-to-do-hiring-team-in-the-us",
                author: "Sifted",
                type: "article"
            }
        ],
        content: {
            problem: "Getting seduced by smooth talkers in interviews",
            points: [
                "Americans are trained from childhood to <strong>present themselves confidently and sell their achievements</strong>. This is cultural, not a character flaw - but it means interviews are performances.",
                "There's a <strong>common misperception that US salespeople possess magical abilities</strong> and can sell anything to anyone. Their true expertise lies in selling themselves.",
                "European founders often mistake polish for competence. The candidate who presents best <strong>rarely correlates with the candidate who performs best</strong>.",
                "A great VP of Sales cannot compensate for lack of market demand, a broken product, or poor product-market fit. <strong>They also cannot relieve founders of understanding their own sales process.</strong>"
            ],
            remediation: "Reference check obsessively. Go beyond the 'front-door references' (those provided by candidates) and seek back-channel references through your network. Ask for specific metrics and verify them. Run paid trial projects when possible.",
            redFlags: [
                "You're blown away by a candidate's interview performance and want to skip remaining steps",
                "The candidate speaks in generalities about 'driving growth' but can't name specific numbers they owned",
                "References are all from the candidate's provided list with no back-channel checks",
                "You're comparing US candidates to European interview norms and the Americans seem 10x better"
            ],
            actionItems: [
                "Create a structured scorecard with measurable criteria before any interviews begin",
                "Require every finalist to provide 3 specific, verifiable metrics from their last role",
                "Conduct at least 2 back-channel references per finalist through your own network",
                "Run a paid 2-week project or consulting engagement before making a full-time offer for key roles",
                "Have a US-based advisor sit in on final interviews to calibrate against American presentation norms"
            ],
            metrics: [
                "Percentage of hires still in role after 12 months (target: 80%+)",
                "Number of back-channel references completed per hire",
                "Time-to-productivity for new US hires vs. plan"
            ],
            timeline: "First US hire through scaling phase",
            quickWin: "Identify 3 people in your network who can provide back-channel references on your current top candidate.",
            testimonials: [
                {
                    quote: "Before I went over, I talked to a lot of people about what to do and what not to do, and they all said: 'You're going to make hiring mistakes if you don't do XYZ'. I ended up making exactly those hiring mistakes.",
                    author: "Thomas Holl",
                    role: "Co-founder & Managing Director, Babbel"
                }
            ]
        }
    },
    {
        id: 3,
        title: "Underpaying for Rockstars",
        icon: "&#x1F3B8;",
        category: "Recruiting",
        cost: "$500,000+ in missed opportunities",
        severity: "high",
        preview: "A US rockstar is worth 3-5x their European equivalent. Trying to save money on key hires is the most expensive mistake you can make.",
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'early-entry', 'scaling', 'established', 'hiring', 'gtm'],
        tagWeights: { 'hiring': 5, 'gtm': 3 },
        sources: [
            {
                title: "Salaries in US Expansion",
                url: "https://sifted.eu/articles/10-things-not-to-do-hiring-team-in-the-us",
                author: "Sifted",
                type: "article"
            }
        ],
        content: {
            problem: "Trying to apply European salary benchmarks to US hires",
            points: [
                "A US employee is typically paid <strong>at least 2x as much</strong> as an equivalent European employee. That 50k EUR job in Europe is $100k+ in the US - and that's just for average talent.",
                "Some early-stage startups found their <strong>first US employees making more than the existing executive staff</strong> in Europe. This is normal and necessary.",
                "For genuine rockstars - the people who can accelerate your US entry by years - <strong>don't shy away from paying 3-5x</strong> what you'd pay in Europe.",
                "One exceptional $300k+ hire will outperform three mediocre $100k hires. This isn't European thinking, but it's American reality."
            ],
            remediation: "Budget appropriately for US talent from day one. Accept that your US team will be more expensive per head than your European team. Prioritize quality over quantity in your early US hires.",
            redFlags: [
                "Your US job offers are getting rejected or ghosted after the comp discussion",
                "You're benchmarking US salaries against European pay bands",
                "Your board is pushing back on US salary levels as 'excessive'",
                "Top candidates are choosing competitors who pay 30-50% more",
                "You're hiring two junior people instead of one senior person to save money"
            ],
            actionItems: [
                "Run a compensation benchmark using Levels.fyi, Pave, or Option Impact for your specific role and market",
                "Budget US team costs at 2-3x European equivalents in your financial model",
                "Present US comp benchmarks to your board proactively so there are no surprises",
                "Structure offers with base + meaningful equity so total comp is competitive",
                "Hire one exceptional person at market rate rather than two mediocre people at discount"
            ],
            metrics: [
                "Offer acceptance rate for US roles (target: 70%+)",
                "US comp percentile vs. market for key roles (target: 65th-75th)",
                "Revenue per US employee vs. European employee",
                "Time-to-fill for US roles vs. plan"
            ],
            timeline: "Pre-hire planning through first 18 months",
            quickWin: "Pull salary data for your top 3 US roles from Levels.fyi or Pave and compare against your current budget.",
            testimonials: [
                {
                    quote: "Our biggest mistake was trying to hire a 'good enough' sales leader at European prices. We went through two mediocre hires before finally paying market rate for someone exceptional. Those two years of lost momentum cost us far more than the salary difference.",
                    author: "European Fintech CEO",
                    role: "Series B"
                }
            ]
        }
    },
    {
        id: 4,
        title: "Expecting Swiss Army Knives",
        icon: "&#x1F91D;",
        category: "Recruiting",
        cost: "Varies",
        severity: "medium",
        preview: "US employees are ultra-specialized. That versatile European hire who does three jobs well doesn't exist in America.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'growth', 'early-entry', 'scaling', 'established', 'hiring', 'operations'],
        tagWeights: { 'hiring': 5, 'operations': 3 },
        sources: [
            {
                title: "Interview with Renaud Deraison",
                author: "Renaud Deraison",
                authorRole: "Ex-CTO, Tenable",
                type: "interview"
            }
        ],
        content: {
            problem: "Expecting US employees to be multi-skilled generalists like Europeans",
            points: [
                "<strong>\"The US is very much about ultra-specialization\"</strong> - you have an org chart and a very defined role and that's your job. Period.",
                "In Europe, you tend to have people who are jack-of-all-trades and operate outside their lane. <strong>Don't expect this in America.</strong>",
                "Someone will sell themselves as able to do two things in an interview (they're trained to oversell, remember?) but <strong>they'll only be good at one</strong>.",
                "The upside: when someone leaves, <strong>you can replace that job fairly easily</strong>. The role is well-defined and the market is liquid."
            ],
            remediation: "As the company starts, you can do the European approach where people don't have clearly defined swim lanes. As you grow, transition to a more specialized structure. Plan your org chart accordingly.",
            redFlags: [
                "US hires are confused about their role scope or pushing back on tasks 'outside their job description'",
                "You wrote a job description combining 3 roles and can't find candidates",
                "Your US employees are underperforming because they're stretched across too many functions",
                "You're frustrated that your US team won't 'just figure it out' like your European team does"
            ],
            actionItems: [
                "Rewrite US job descriptions to focus on one core function with clear deliverables",
                "Map your current European generalist roles to 2-3 specialist roles for the US org chart",
                "Plan your US hiring sequence: which specialist roles do you need first vs. later",
                "Set explicit expectations about role scope during onboarding, not after friction appears",
                "Accept generalist hires only for your first 1-2 US employees, then specialize"
            ],
            metrics: [
                "Employee satisfaction scores on role clarity (target: 8+/10)",
                "US employee retention at 6 months vs. European baseline",
                "Time-to-fill for US roles (narrower scope should fill faster)"
            ],
            timeline: "First US hire through 20-person US team",
            quickWin: "Review your open US job descriptions - if any combine more than one core function, split them into separate roles.",
            testimonials: [
                {
                    quote: "You can try to get the best of both worlds. As the company starts you can do the European approach, then as you grow have a more specialised approach.",
                    author: "Renaud Deraison",
                    role: "Ex-CTO, Tenable"
                }
            ]
        }
    },
    {
        id: 5,
        title: "Underestimating the Narrative Game",
        icon: "&#x1F4AC;",
        category: "Product",
        cost: "$1,000,000+",
        severity: "critical",
        preview: "Europeans think US focus on narrative is window-dressing. It's the opposite - weak storytelling means no sales machine.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'scaling', 'pmf', 'gtm'],
        tagWeights: { 'pmf': 4, 'gtm': 4 },
        sources: [
            {
                title: "The Top 5 Mistakes European Startups Make in US Expansion",
                url: "https://kellblog.com/2022/06/27/the-top-5-mistakes-european-startups-make-in-us-expansion/",
                author: "Dave Kellogg",
                type: "article"
            }
        ],
        content: {
            problem: "Not investing enough in your narrative and positioning",
            points: [
                "European founders think the US focus on narrative is only window-dressing. <strong>It's the opposite.</strong>",
                "If you own a greenfield opportunity, you must express it concisely and impactfully. <strong>Each word counts.</strong>",
                "This stage often <strong>deeply impacts strategic positioning and product roadmap</strong> - it's not just marketing fluff.",
                "Weak narrative = no consistent sales machine. American buyers need to understand your category and why you win in 30 seconds.",
                "Many European founders <strong>still believe the best product always wins</strong>. In America, the best-positioned product with the clearest story wins."
            ],
            remediation: "Work with a world-class narrative marketer. Doesn't have to be a costly tier 1 agency - can be a solo star. Invest in positioning before you invest in sales.",
            redFlags: [
                "Prospects can't explain what you do after a 30-second pitch",
                "Your website leads with features and technology instead of the problem you solve",
                "Sales reps are each describing your product differently because there's no clear narrative",
                "You're losing deals to inferior products with better positioning",
                "Your category doesn't exist in the US market and you haven't defined it"
            ],
            actionItems: [
                "Hire a positioning specialist or narrative strategist before your first US sales hire",
                "Write a one-sentence positioning statement that a US buyer can repeat from memory",
                "Create a category narrative: what is the problem, why now, why you",
                "Test your narrative with 10 US prospects and iterate until they can repeat it back to you",
                "Align your website, pitch deck, sales scripts, and investor materials to one consistent story",
                "Study how US competitors in your space position themselves and find your angle"
            ],
            metrics: [
                "Prospect recall rate: can they describe what you do after one meeting (target: 80%+)",
                "Inbound lead quality improvement after narrative refresh",
                "Sales cycle length before vs. after positioning work",
                "Win rate in competitive deals"
            ],
            timeline: "3-6 months before US sales launch",
            quickWin: "Ask 3 existing US contacts to describe what your company does in one sentence - if answers vary wildly, your narrative needs work.",
            testimonials: [
                {
                    quote: "Many European founders fail to both understand and believe in the importance of sales & marketing and still believe that they will win the market because they have the best product. Deprogramming is difficult and too often accomplished only by losing in the market.",
                    author: "Dave Kellogg",
                    role: "Former CEO, Host Analytics"
                }
            ]
        }
    },
    {
        id: 6,
        title: "The Timid European Pitch",
        icon: "&#x1F441;",
        category: "Strategy",
        cost: "Failed fundraises, lost deals",
        severity: "high",
        preview: "Europeans present past-to-future; Americans start with a bold vision. Lead with where you're taking the world, not where you are today.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'growth', 'exploring', 'early-entry', 'scaling', 'established', 'gtm', 'pmf', 'fundraising'],
        tagWeights: { 'gtm': 4, 'fundraising': 5 },
        sources: [
            {
                title: "9 Confessions From European CEOs Who Launched in the US",
                url: "https://octopusgroup.com/insights/nine-confessions-european-ceos-launched-us/",
                author: "Octopus Group",
                type: "article"
            }
        ],
        content: {
            problem: "Presenting like a European when you need to pitch like an American",
            points: [
                "<strong>Americans love a winner.</strong> Make sure you present like one.",
                "European founders typically present by examining current metrics, comparing to past, and predicting trends. <strong>Americans start with a bold vision of the future</strong> and then explain how they'll achieve it.",
                "This doesn't mean losing authenticity. Take Stripe: founded by Irish brothers, their bold vision to <strong>\"increase the GDP of the internet\"</strong> is daring and inspirational without seeming arrogant.",
                "A big vision can be both ambitious and authentic. The key is leading with where you're taking the world, not where your company is today."
            ],
            remediation: "Reframe your pitch to lead with an ambitious, inspiring vision. Practice with American investors or advisors. Get comfortable with bold claims backed by credible execution plans.",
            redFlags: [
                "Your pitch starts with your founding story or current metrics instead of the big vision",
                "US investors say your pitch is 'interesting but not compelling'",
                "You feel uncomfortable making bold claims even when you have the data to back them up",
                "American competitors with weaker products are raising larger rounds than you"
            ],
            actionItems: [
                "Rewrite your pitch deck's first 3 slides to lead with a bold market vision, not your history",
                "Practice your pitch with 3 US-based investors or advisors and get brutally honest feedback",
                "Study 5 successful US pitch decks in your space to calibrate your ambition level",
                "Develop a 'North Star' vision statement that is audacious but credibly achievable",
                "Record yourself pitching and compare your energy and conviction to US founder pitches on YouTube"
            ],
            metrics: [
                "Investor meeting-to-term-sheet conversion rate",
                "Number of second meetings secured after initial pitch (target: 40%+)",
                "Fundraise timeline: days from first pitch to close"
            ],
            timeline: "3 months before any US fundraise or enterprise sales push",
            quickWin: "Rewrite your opening slide to start with a bold vision of the future your company is creating, not what you do today.",
            testimonials: [
                {
                    quote: "Learn from the one mistake that founders (including us) make when coming to the US: Don't underestimate it.",
                    author: "Richard Valtr",
                    role: "Founder, Mews"
                }
            ]
        }
    },
    {
        id: 7,
        title: "Networking Like a European",
        icon: "&#x1F44B;",
        category: "Marketing",
        cost: "Missed opportunities",
        severity: "high",
        preview: "Silicon Valley is a country club. Either get all the signatures of recommendation or bust in with a parachute.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'gtm', 'hiring', 'fundraising'],
        tagWeights: { 'exploring': 4, 'early-entry': 4, 'fundraising': 3 },
        sources: [
            {
                title: "5 Tips for Founders Looking to Launch in the US",
                url: "https://www.tapestry.vc/perspectives/5-tips-for-founders-looking-to-launch-in-the-us",
                author: "Tapestry VC",
                type: "article"
            }
        ],
        content: {
            problem: "Waiting politely for introductions instead of aggressively building network",
            points: [
                "The Silicon Valley scene is like a country club with two ways in: <strong>get all the signatures of recommendation or bust in with a parachute</strong> and make a real entrance.",
                "You can't afford to wait for introductions. <strong>Get out there and meet as many of the right people as you can.</strong>",
                "Go to events where you're likely to meet connectors. Use digital tools to find second-degree contacts within your network.",
                "Crucially, when you do get in front of the right people, <strong>don't be afraid to ask</strong>. Americans value confidence and audacity.",
                "Remind yourself: <strong>There are people with less talent and inferior companies getting ahead.</strong> So get to it."
            ],
            remediation: "Be bold. Make clear requests for introductions or meetings. Don't wait for permission. Americans respect the hustle - use it.",
            redFlags: [
                "You've been in the US for 3 months and your network hasn't grown beyond your existing European contacts",
                "You're waiting for warm intros instead of cold-emailing relevant people",
                "You attend conferences but leave without following up on conversations within 24 hours",
                "You feel uncomfortable asking for introductions directly"
            ],
            actionItems: [
                "Identify 20 people in your target market and send personalized cold outreach this month",
                "Attend 2-3 US industry events per quarter and set a goal of 10 meaningful conversations each",
                "Ask every new contact for 2 introductions before the conversation ends",
                "Join 3 relevant US-based communities (Slack groups, associations, founder networks)",
                "Schedule monthly 'networking sprints' where you focus solely on expanding your US contacts"
            ],
            metrics: [
                "New meaningful US contacts per month (target: 15-20)",
                "Introduction requests made vs. introductions received",
                "Meetings booked from cold outreach (target: 15-20% response rate)"
            ],
            timeline: "6-12 months before US launch through first year",
            quickWin: "Send 5 cold LinkedIn messages today to US-based people in your space with a specific, concise ask.",
            testimonials: [
                {
                    quote: "The most important thing for founders thinking of expanding to the US is to speak to people who have already done it. They have stories on what to do, what not to do, what mistakes were made and what strategies were successful.",
                    author: "Paul Strachman",
                    role: "ISAI"
                }
            ]
        }
    },
    {
        id: 8,
        title: "Your Brand Doesn't Travel",
        icon: "&#x2122;",
        category: "Marketing",
        cost: "$10,000-50,000 to fix",
        severity: "medium",
        preview: "A bad brand can drag your market entry. Test your name and positioning before committing to US GTM.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'marketplace', 'seed', 'series-a', 'exploring', 'early-entry', 'gtm', 'pmf'],
        tagWeights: { 'exploring': 4, 'gtm': 3 },
        sources: [
            {
                title: "13 Costly Mistakes to Avoid When Expanding Into the US Market",
                url: "https://hsp.com/navigating-overseas-expansion-into-the-us-13-costly-mistakes-to-avoid/",
                author: "HSP Group",
                type: "article"
            }
        ],
        content: {
            problem: "Not testing your brand and name before entering US market",
            points: [
                "Test your brand before starting your go-to-market. <strong>What works in Europe may confuse or even offend Americans.</strong>",
                "A bad brand isn't a roadblock, but it drags every interaction. <strong>It's surprisingly easy to change before entering the market</strong> - much harder after.",
                "Consider rebranding if your name is: too descriptive, hard to pronounce, culturally problematic, or simply not impactful.",
                "You don't need an expensive agency. A solo naming specialist can help you nail the right brand for <strong>less than $10,000 in a month</strong>."
            ],
            remediation: "Test your name with US customers before launch. Run quick surveys. Check for trademark conflicts. Consider hiring a naming specialist if there's any doubt.",
            redFlags: [
                "Americans mispronounce or misspell your company name consistently",
                "Your brand name has an unintended meaning or connotation in American English",
                "US prospects can't remember your name after meetings",
                "Your domain or social handles are taken by US companies with similar names"
            ],
            actionItems: [
                "Test your brand name with 20 Americans who've never heard of you - can they spell it, say it, remember it?",
                "Run a US trademark search through USPTO to check for conflicts",
                "Check domain availability and social media handles for your brand in the US",
                "If your name fails any test, hire a naming specialist ($5-10k) to develop US-friendly alternatives",
                "Test new name candidates with a quick SurveyMonkey poll of 50+ US respondents"
            ],
            metrics: [
                "Brand name recall rate among US test audience (target: 70%+ after one exposure)",
                "Direct website traffic from US visitors (indicates name memorability)",
                "Trademark clearance status (clear in all target categories)"
            ],
            timeline: "6-12 months before US market entry",
            quickWin: "Ask 5 American contacts to spell your company name after hearing it once - if more than 1 gets it wrong, you have a problem.",
            testimonials: [
                {
                    quote: "We spent two years building pipeline under a name Americans couldn't pronounce. Every cold call started with spelling our name three times. When we finally rebranded, our outbound response rate doubled overnight.",
                    author: "European SaaS Founder",
                    role: "Series A, rebranded for US market"
                }
            ]
        }
    },
    {
        id: 9,
        title: "Rushing the Research Phase",
        icon: "&#x1F50E;",
        category: "Strategy",
        cost: "$500,000+",
        severity: "critical",
        preview: "Your pre-entry research should take 3-4 months minimum. Most founders skip steps that cost them dearly later.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'gtm', 'pmf', 'operations'],
        tagWeights: { 'exploring': 5, 'gtm': 4 },
        sources: [
            {
                title: "Europe to US: The Expansion Playbook Every Founder Needs",
                url: "https://www.thevccorner.com/p/europe-to-us-startup-expansion-playbook",
                author: "The VC Corner",
                type: "article"
            }
        ],
        content: {
            problem: "Incomplete or rushed market research before US entry",
            points: [
                "<strong>Your pre-entry market research should include:</strong>",
                "Value chain comparison and customer research (who buys, how they buy, what they pay)",
                "Competitor research & positioning (the US landscape is deeper than you think)",
                "Product localization requirements",
                "Location recommendation based on customers, talent, and timezone alignment",
                "Regulatory research and compliance requirements",
                "Operations planning (legal, financial, HR, IP, subsidiary structure)",
                "Pre- and post-launch timetable with Year 1 budget and staffing plan",
                "<strong>Timeline: 3-4 months minimum.</strong> Rushing this phase is the most expensive shortcut you can take."
            ],
            remediation: "Create a comprehensive checklist. Allocate proper time and budget. Talk to 50+ potential customers before committing. Visit the US multiple times before any permanent setup.",
            redFlags: [
                "You're planning to launch in the US within 2 months of deciding to expand",
                "You haven't visited the US to meet customers in person",
                "Your competitive analysis lists fewer than 5 US-based competitors",
                "You don't know the typical buying process, budget cycle, or decision-maker title for your US target customer",
                "You haven't budgeted separately for US market research"
            ],
            actionItems: [
                "Block 3-4 months for dedicated pre-entry research before any hiring or entity setup",
                "Complete a US competitive landscape map with at least 10 direct and indirect competitors",
                "Conduct 50+ customer discovery interviews with US-based potential buyers",
                "Visit at least 3 US cities to understand regional differences in your market",
                "Build a Year 1 budget that includes legal setup, first hires, office space, and marketing",
                "Research regulatory requirements specific to your industry and target states",
                "Create a pre- and post-launch timetable with milestones and decision gates"
            ],
            metrics: [
                "Number of US customer discovery interviews completed (target: 50+)",
                "Competitive landscape completeness (target: 10+ mapped competitors with positioning analysis)",
                "Research phase duration (target: 3-4 months minimum)",
                "Number of US city visits before committing to location (target: 3+)"
            ],
            timeline: "12-6 months before planned US launch",
            quickWin: "List every US competitor you know, then ask 3 US-based industry contacts to name competitors you missed.",
            testimonials: [
                {
                    quote: "Most companies underestimate the breadth and depth of the US market, its regional differences, and the fullness of the competitive landscape.",
                    author: "Balderton Capital",
                    role: "Research Report"
                }
            ]
        }
    },
    {
        id: 10,
        title: "Starting Licenses Too Late",
        icon: "&#x2705;",
        category: "Regulation",
        cost: "18+ months delay",
        severity: "critical",
        preview: "If you need licenses to operate, US expansion could be delayed by 18+ months. Start the process before you're ready.",
        tags: ['fintech', 'healthcare', 'deeptech', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'legal', 'operations', 'regulated-industry'],
        tagWeights: { 'fintech': 5, 'healthcare': 5, 'legal': 5, 'regulated-industry': 6 },
        sources: [
            {
                title: "7 Common Mistakes in US Expansion",
                url: "https://www.legaledge.co.uk/2024/05/7-common-mistakes-in-us-expansion/",
                author: "LegalEdge LLP",
                type: "article"
            }
        ],
        content: {
            problem: "Waiting too long to start the licensing process",
            points: [
                "If you need licenses to operate (fintech, healthcare, insurance), <strong>US expansion could be delayed by 18+ months</strong>.",
                "For fintech: Money Transmitter Licenses are required in most states. <strong>Each state has different requirements and timelines.</strong>",
                "For healthcare: HIPAA compliance, state medical board approvals, and other certifications can take a year or more.",
                "Starting late means missing your market window while competitors establish themselves."
            ],
            remediation: "Start the licensing process as early as possible - even before you're certain about US expansion. The timeline is often the biggest bottleneck. Work with specialized regulatory counsel from day one.",
            redFlags: [
                "You're planning US revenue targets without confirming licensing timelines",
                "You haven't identified which states require licenses for your specific activity",
                "Your US launch plan assumes licensing will take 3-6 months (it usually takes 12-18+)",
                "You're using a general corporate lawyer instead of a specialized regulatory attorney"
            ],
            actionItems: [
                "Engage specialized regulatory counsel in your industry this month to map all required licenses",
                "Create a state-by-state licensing matrix with requirements, costs, and timelines",
                "Begin applications in your top 3 priority states immediately, even if launch is 18 months away",
                "Explore sponsor bank or partner-based models that can get you to market while licenses are pending",
                "Budget $200-500k for the full licensing process across all target states",
                "Set up a tracking system for each state application with milestones and follow-up dates"
            ],
            metrics: [
                "Number of state license applications submitted vs. plan",
                "Average time from application to approval per state",
                "Percentage of target states where you're licensed to operate",
                "Revenue delayed due to licensing gaps"
            ],
            timeline: "18-24 months before planned US revenue",
            quickWin: "Email a specialized regulatory lawyer in your industry today to schedule a scoping call on US licensing requirements.",
            testimonials: [
                {
                    quote: "We assumed our European banking license would accelerate the US process. It didn't. Every state has its own requirements, its own timeline, its own examiner. We lost 14 months and our Series B almost fell apart because we couldn't show US revenue on schedule.",
                    author: "European Fintech CEO",
                    role: "Series B, Payments Company"
                }
            ]
        }
    },
    {
        id: 11,
        title: "Defaulting to SF or NYC",
        icon: "&#x1F3EB;",
        category: "Operations",
        cost: "Varies significantly",
        severity: "medium",
        preview: "San Francisco isn't always the answer. 44% of European startups now choose New York, and cities like Austin offer compelling alternatives.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'exploring', 'early-entry', 'scaling', 'operations', 'hiring'],
        tagWeights: { 'operations': 4, 'hiring': 3 },
        sources: [
            {
                title: "Want to Expand Into the US as a European Startup? Read This First",
                url: "https://sifted.eu/articles/expand-into-the-us-startup-read-this-first",
                author: "Sifted / Index Ventures Research",
                type: "article"
            },
            {
                title: "Navigating U.S. Expansion: Lessons from a European Tech Startup",
                url: "https://itbrief.co.uk/story/navigating-u-s-expansion-lessons-from-a-european-tech-startup",
                author: "SEON",
                type: "case study"
            }
        ],
        content: {
            problem: "Assuming Silicon Valley is the only option for US HQ",
            points: [
                "According to Index Ventures research, <strong>44% of European startups now choose New York</strong> over the Bay Area (28%) for US HQ.",
                "New York maximizes timezone overlap with Europe - <strong>you can have meaningful working hours with both coasts and EU</strong>.",
                "Austin, Texas offers: affordability, diverse talent, central timezone, and proximity to Latin American markets. <strong>SEON chose Austin for exactly these reasons.</strong>",
                "At 30%, <strong>San Francisco has the highest employee turnover</strong> in the US (vs 20% national average and 10-15% in Europe).",
                "Consider: Where are your customers? What talent do you need? What's the cost of living? What's the timezone alignment with EU HQ?"
            ],
            remediation: "Research thoroughly before choosing a location. Visit multiple cities. Talk to other European founders who've made the move. Don't default to SF just because it's the famous option.",
            redFlags: [
                "You chose SF or NYC because 'that's where startups go' without analyzing alternatives",
                "Your burn rate is 40-60% higher than planned because of city costs",
                "Your European team can never overlap working hours with the US team",
                "You're losing hires to local competitors offering better comp in the same expensive market",
                "Your customers are concentrated in a region far from your US office"
            ],
            actionItems: [
                "Score 5 US cities on: customer proximity, talent availability, cost of living, timezone overlap with EU, and state tax burden",
                "Visit your top 3 candidate cities and meet with local founders, recruiters, and potential customers",
                "Calculate total cost comparison: salary benchmarks, office space, state taxes, and cost of living across cities",
                "Talk to 3 European founders who chose non-obvious US cities and ask about their experience",
                "Consider starting remote-first and choosing a city after 6 months of US market exposure"
            ],
            metrics: [
                "Monthly burn rate vs. budget (location is typically the biggest variable)",
                "Overlap hours with European HQ (target: 4+ hours daily)",
                "Employee turnover rate vs. city average",
                "Travel cost to visit top 10 US customers"
            ],
            timeline: "During research phase, 6-12 months before setting up US office",
            quickWin: "Create a spreadsheet comparing 5 US cities on the criteria that matter most to your business: customer density, talent pool, costs, and timezone overlap.",
            testimonials: [
                {
                    quote: "SEON chose Austin, which offered a blend of affordability, access to diverse talent pools, and proximity to Latin American markets. Austin's central time zone further facilitated collaboration between global teams.",
                    author: "SEON",
                    role: "Company Case Study"
                }
            ]
        }
    },
    {
        id: 12,
        title: "Treating US as 'Just a Sales Office'",
        icon: "&#x1F4B0;",
        category: "Strategy",
        cost: "$2,000,000+",
        severity: "critical",
        preview: "Half-measures kill US expansions. If you want to win here, you have to bet the farm - not just open a sales outpost.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'series-a', 'series-b', 'growth', 'exploring', 'early-entry', 'scaling', 'gtm', 'fundraising'],
        tagWeights: { 'gtm': 5, 'fundraising': 4 },
        sources: [
            {
                title: "Interview with Renaud Deraison",
                author: "Renaud Deraison",
                authorRole: "Ex-CTO, Tenable",
                type: "interview"
            },
            {
                title: "All CEOs Underestimated US Costs",
                url: "https://octopusgroup.com/insights/nine-confessions-european-ceos-launched-us/",
                author: "Octopus Group",
                type: "research"
            }
        ],
        content: {
            problem: "Not investing enough in US expansion - treating it as a side project",
            points: [
                "<strong>\"They tend to just see the US as a sales office and don't go there to win.\"</strong>",
                "<strong>\"If you really want to win here you have to bet the farm.\"</strong> - Renaud Deraison, ex-CTO Tenable",
                "All the European CEOs surveyed by Octopus Group <strong>underestimated the cost of entering the US market</strong>.",
                "Half-measures lead to failure. The US market requires full commitment - or you're better off not entering at all.",
                "Early-stage US startups raise <strong>more than 7x the capital</strong> of their European peers, often for the same product. You're competing against that level of funding."
            ],
            remediation: "Go all in or don't go at all. Budget for real investment, not just a toe in the water. Expect US expansion to cost 2-3x your initial estimates. Have 18-24 months of runway before expecting meaningful revenue.",
            redFlags: [
                "Your US 'team' is one sales rep working from a WeWork with no local support",
                "Product decisions are made entirely in Europe with no US customer input",
                "Your US budget is less than 20% of your total company spend despite the US being your biggest market opportunity",
                "The CEO visits the US once a quarter instead of spending extended time there",
                "US employees feel like second-class citizens compared to the European HQ team"
            ],
            actionItems: [
                "Have the CEO or a co-founder spend at least 50% of their time in the US during the first 12 months",
                "Budget US expansion at 2-3x your initial estimate and secure 18-24 months of runway",
                "Build a cross-functional US team (not just sales) including customer success, marketing, and product input",
                "Give the US team real decision-making authority on product localization and GTM strategy",
                "Present the US expansion as a company-level strategic bet to your board, not a side project"
            ],
            metrics: [
                "CEO time spent in US market (target: 50%+ in year 1)",
                "US team headcount as percentage of total (should grow faster than EU)",
                "US budget vs. actual spend (expect 2-3x initial estimates)",
                "US revenue trajectory vs. 18-month plan"
            ],
            timeline: "Decision to expand through first 24 months",
            quickWin: "Block 2 weeks on the CEO's calendar for a US immersion trip within the next 60 days.",
            testimonials: [
                {
                    quote: "They tend to just see the US as a sales office and don't go there to win. If you really want to win here you have to bet the farm.",
                    author: "Renaud Deraison",
                    role: "Ex-CTO, Tenable"
                }
            ]
        }
    },
    {
        id: 13,
        title: "Rushing to Set Up US HQ (Defense Tech)",
        icon: "&#x1F6E1;",
        category: "Strategy",
        cost: "$500,000+ and lost government contracts",
        severity: "critical",
        preview: "European Defense Tech companies often rush to US HQ, not realizing being European can be a strategic advantage for EU government sales.",
        tags: ['defense-tech', 'govtech', 'deeptech', 'exploring', 'early-entry', 'legal', 'operations', 'gtm', 'itar-relevant', 'cfius-relevant', 'defense-hq-timing'],
        tagWeights: { 'defense-tech': 6, 'govtech': 6, 'defense-hq-timing': 8, 'itar-relevant': 5, 'cfius-relevant': 5 },
        specialConsiderations: ['defense-hq-timing', 'itar-relevant', 'cfius-relevant'],
        priority: true,
        sources: [
            {
                title: "CFIUS for Foreign Investors and U.S. Businesses",
                url: "https://www.pearlcohen.com/cfius-for-foreign-investors-and-u-s-businesses-what-you-need-to-know/",
                author: "Pearl Cohen",
                type: "legal guide"
            },
            {
                title: "How Defense Tech Is Evolving",
                url: "https://www.orrick.com/en/Insights/2025/03/How-Defense-Tech-Is-Evolving-and-Harnessing-User-Input",
                author: "Orrick",
                type: "article"
            },
            {
                title: "Export Compliance for Technology Startups",
                url: "https://learnexportcompliance.com/insights/what-technology-startup-companies-and-their-funders-should-know-about-export-compliance",
                author: "ECTI",
                type: "guide"
            }
        ],
        content: {
            problem: "Rushing to establish US headquarters for Defense Tech companies",
            points: [
                "<strong>Being European can be an advantage</strong> for selling to European governments - don't give this up prematurely.",
                "<strong>ITAR (International Traffic in Arms Regulations)</strong> creates complex compliance requirements for US-based defense companies that can limit your global sales.",
                "<strong>CFIUS (Committee on Foreign Investment)</strong> can review and potentially block transactions involving foreign ownership. Penalties now exceed $5 million per violation.",
                "FOCI (Foreign Ownership, Control, or Influence) requirements may mandate expensive mitigation measures.",
                "Many European governments <strong>prefer to buy from European companies for sovereignty reasons</strong>. Setting up US HQ may disqualify you from certain EU defense contracts.",
                "As experts note: <strong>\"There are significant hurdles to get through to actually get [products] into the hands of a warfighter.\"</strong>"
            ],
            remediation: "Evaluate where your primary revenue will come from before any restructuring. If European government sales are significant, maintain European HQ status. Consider a US subsidiary rather than moving HQ. Consult with defense industry legal counsel before any corporate restructuring.",
            redFlags: [
                "US VCs are pressuring you to flip to a US entity before you've analyzed the defense implications",
                "You haven't assessed whether moving HQ would disqualify you from EU defense contracts",
                "You're not aware of ITAR, CFIUS, or FOCI requirements and how they apply to your technology",
                "Your corporate restructuring plan doesn't include defense-specialized legal counsel",
                "You're assuming US and EU government contracts can be pursued from the same entity structure"
            ],
            actionItems: [
                "Hire defense industry legal counsel (not general corporate) to assess ITAR/CFIUS/FOCI implications before any restructuring",
                "Map your current and projected revenue split between US government, EU government, and commercial",
                "Evaluate a US subsidiary structure that preserves your European HQ status for EU contracts",
                "Research FOCI mitigation options (proxy boards, SSAs, VTAs) and their costs",
                "Talk to 3 European defense companies that have successfully entered the US market about their corporate structure",
                "Assess which of your technologies might be ITAR-controlled and plan accordingly"
            ],
            metrics: [
                "Revenue split: US gov vs. EU gov vs. commercial (drives optimal structure)",
                "ITAR/CFIUS compliance cost estimate vs. budget",
                "Number of EU defense contracts at risk from restructuring",
                "Time to FOCI mitigation approval (typically 12-18 months)"
            ],
            timeline: "12-24 months before any corporate restructuring decision",
            quickWin: "Schedule a call with a defense industry lawyer this week to get an initial assessment of ITAR/CFIUS implications for your specific technology.",
            testimonials: [
                {
                    quote: "We were weeks from flipping to a US entity when our defense counsel flagged that it would disqualify us from three EU NATO contracts worth more than our entire US pipeline. We restructured as a subsidiary instead and kept both markets.",
                    author: "European Defense Tech Founder",
                    role: "Series A, Dual-use Technology"
                }
            ]
        }
    },
    {
        id: 14,
        title: "Hiring a Senior Exec to Lead Launch",
        icon: "&#x1F464;",
        category: "Recruiting",
        cost: "$500,000+ in salary and lost time",
        severity: "high",
        preview: "Hiring a fancy exec to lead your US launch is a classic mistake. They've never started a company before - that's your job.",
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'series-a', 'series-b', 'early-entry', 'scaling', 'hiring', 'gtm'],
        tagWeights: { 'hiring': 5, 'gtm': 4 },
        sources: [
            {
                title: "Top 5 Mistakes in US Expansion: Hiring the Wrong People",
                url: "https://www.balderton.com/resources/the-top-5-mistakes-in-us-expansion-mistake-3-hiring-the-wrong-people/",
                author: "Balderton Capital",
                type: "article"
            },
            {
                title: "10 Hiring Mistakes Early Stage Founders Make",
                url: "https://a16zcrypto.com/posts/article/10-hiring-mistakes-early-stage-founders/",
                author: "a16z crypto",
                type: "article"
            }
        ],
        content: {
            problem: "Hiring a senior executive to lead the launch of your US company",
            points: [
                "It may appear appealing to hire a seasoned executive with experience and connections. <strong>But it's almost certain they've never started a new company before.</strong>",
                "<strong>Ideally, the founder should personally lead initial sales engagements</strong> and close the first several accounts in the US.",
                "Only after closing initial sales and identifying solid product-market fit signals does it make sense to begin scaling a sales organization.",
                "Hiring super-senior people with fancy resumes too early can be a trap. <strong>Founders should be deeply involved in product development and stay close to users.</strong>",
                "At the earliest stage, focus on engineers (product velocity) and individual contributor salespeople (validate demand) - not executives."
            ],
            remediation: "Founder(s) should relocate or spend significant time in the US during the launch phase. Close your first 5-10 deals personally. Only then hire someone to scale what you've proven works.",
            redFlags: [
                "You're interviewing VP-level candidates before closing your first US deal",
                "Your job description for the US lead reads like a CEO role",
                "You're hoping a senior hire will 'figure out' the US market for you",
                "The exec candidates you're interviewing have never built anything from zero",
                "You're spending more time recruiting than selling in the US"
            ],
            actionItems: [
                "Commit to the founder personally leading US sales for the first 6-12 months",
                "Close 5-10 US deals yourself before hiring any sales leadership",
                "Document your US sales process so it can be replicated and handed off",
                "Hire individual contributor salespeople (AEs, SDRs) before hiring a VP of Sales",
                "When ready for a leader, hire someone who has scaled a team from 0 to 10, not 100 to 500"
            ],
            metrics: [
                "Number of US deals closed by founder personally (target: 5-10 before hiring sales leader)",
                "Founder time spent in US market (target: 60%+ during launch phase)",
                "US sales process documentation completeness before first sales hire",
                "Time from first US hire to first US revenue"
            ],
            timeline: "Pre-entry through first 12 months of US presence",
            quickWin: "Cancel any VP-level recruiting processes and instead book 5 sales meetings with US prospects for the founder this month.",
            testimonials: [
                {
                    quote: "Hiring is a distraction in the early days - founders can and should find as much product market fit as possible before hiring.",
                    author: "Y Combinator",
                    role: "Startup Advice"
                }
            ]
        }
    },
    {
        id: 15,
        title: "Expanding Too Early (or Too Late)",
        icon: "&#x23F0;",
        category: "Strategy",
        cost: "$1,000,000+ either way",
        severity: "high",
        preview: "Founders either rush in before PMF or delay forever with artificial thresholds. Both paths lead to failure.",
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'marketplace', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'gtm', 'pmf'],
        tagWeights: { 'exploring': 5, 'gtm': 4, 'pmf': 4 },
        sources: [
            {
                title: "When Should European Startups Expand to the US?",
                url: "https://frontline.vc/report/the-us-playbook/when-to-expand/",
                author: "Frontline Ventures",
                type: "research"
            },
            {
                title: "Europe to US: The Expansion Playbook",
                url: "https://www.thevccorner.com/p/europe-to-us-startup-expansion-playbook",
                author: "The VC Corner",
                type: "article"
            }
        ],
        content: {
            problem: "Getting the timing wrong on US expansion",
            points: [
                "<strong>Too early:</strong> \"Too many startups try to break into the US markets too soon and it's like trying to land the whale.\" Expanding before product-market fit means expensive failure.",
                "<strong>Too late:</strong> Founders establish artificial thresholds: \"We need $5M ARR... no, $10M... no, $20M.\" <strong>Meanwhile, US competitors or copycats establish themselves.</strong>",
                "The sweet spot: <strong>Expand when you have strong unit economics in your home market but before reaching growth plateau.</strong>",
                "Most successful expansions take <strong>18-24 months from initial planning to meaningful market presence</strong>. Companies that rush this (under 12 months) typically struggle with cultural adaptation."
            ],
            remediation: "Start planning when you have clear PMF signals in Europe. Begin research and network-building 12-18 months before intended launch. Don't set arbitrary revenue thresholds - focus on readiness signals.",
            redFlags: [
                "You're expanding to the US before achieving product-market fit in your home market",
                "You've moved your ARR threshold for US expansion upward three or more times",
                "US competitors are establishing themselves in your category while you wait",
                "Your board keeps asking 'when are you going to the US?' and you keep deferring",
                "You're treating US expansion as an all-or-nothing bet instead of a phased approach"
            ],
            actionItems: [
                "Define 3-5 objective readiness signals (not revenue thresholds) for US expansion",
                "Start network-building and market research 12-18 months before planned launch",
                "Monitor US competitive landscape monthly to detect window-closing signals",
                "Plan a phased approach: research trip, design partners, first hires, full commitment",
                "Set a firm decision date with your board and commit to go or no-go"
            ],
            metrics: [
                "European PMF signals: NRR > 120%, positive unit economics, repeatable sales process",
                "US competitive landscape: number of funded US competitors in your category",
                "Research phase completion percentage against your pre-entry checklist",
                "Months since initial US expansion discussion (if > 18, you may be too late)"
            ],
            timeline: "Ongoing assessment from Series A through expansion decision",
            quickWin: "Write down your 3 biggest reasons for delaying US expansion and honestly assess whether each is a valid concern or fear-based avoidance.",
            testimonials: [
                {
                    quote: "Expanding to the USA is scary, so founders delay it again and again. They establish artificial thresholds and re-establish them. The company starts too late, potentially lets US competitors get established, and now faces an even more difficult expansion.",
                    author: "The VC Corner",
                    role: "Research"
                }
            ]
        }
    },
    {
        id: 16,
        title: "Visa & Immigration Bottlenecks",
        icon: "&#x1F6C2;",
        category: "Operations",
        cost: "6-18 months delay",
        severity: "high",
        preview: "Visa applications are the most common bottleneck holding up US expansion. Start the process before you need it.",
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'seed', 'series-a', 'series-b', 'exploring', 'early-entry', 'operations', 'hiring', 'legal'],
        tagWeights: { 'operations': 5, 'hiring': 4, 'legal': 4 },
        sources: [
            {
                title: "Want to Expand Into the US? Read This First",
                url: "https://sifted.eu/articles/expand-into-the-us-startup-read-this-first",
                author: "Sifted / Index Ventures",
                type: "article"
            }
        ],
        content: {
            problem: "Not planning early enough for visa and immigration requirements",
            points: [
                "<strong>\"Visa applications for relocation - for founders and employees - is the most common bottleneck holding up US expansion.\"</strong>",
                "Founder visas (O-1, L-1, E-2) can take 6-12 months. Employee visas can take even longer, especially H-1B with its lottery system.",
                "You need to <strong>set up a US company before you can hire your first US-based employee</strong> - most companies establish a Delaware C-Corp.",
                "You'll need advisors: immigration lawyer, tax accountant, bank, and insurance provider. <strong>Each takes time to set up properly.</strong>"
            ],
            remediation: "Start visa applications 12+ months before planned relocation. Use a global mobility company that provides immigration, tax, and moving support. Have backup plans for key personnel.",
            redFlags: [
                "Your US launch date is set but nobody has started visa paperwork",
                "You're relying on visa-free travel (ESTA/VWP) for what is actually work activity",
                "Your immigration lawyer is a generalist, not a specialist in business immigration",
                "You haven't set up a US entity yet but plan to hire US employees",
                "Key team members needed in the US have complex immigration situations (dual citizenship, prior visa issues)"
            ],
            actionItems: [
                "Engage a specialized business immigration attorney 12+ months before planned relocation",
                "Incorporate a Delaware C-Corp as the sponsoring entity for all US visa applications",
                "Assess the best visa category for each person: O-1 (extraordinary ability), L-1 (intracompany transfer), E-2 (treaty investor), or H-1B",
                "Build backup plans: if the founder's visa is delayed, who leads the US operation?",
                "Engage a global mobility company for tax planning, relocation logistics, and insurance",
                "Budget $10-20k per visa application including legal fees and premium processing"
            ],
            metrics: [
                "Visa application submission date vs. planned relocation date (target: 12+ months lead time)",
                "Number of visa applications in progress with expected approval dates",
                "Immigration legal costs vs. budget",
                "Days of delay caused by immigration issues"
            ],
            timeline: "12-18 months before any planned US relocation",
            quickWin: "Identify which visa category each founder/key employee qualifies for and email an immigration attorney to confirm.",
            testimonials: [
                {
                    quote: "Use a global mobility company that acts as a 'one-stop-shop' to move employees between countries, providing support on immigration, tax advice and moving services.",
                    author: "Index Ventures",
                    role: "Recommendation"
                }
            ]
        }
    },
    {
        id: 17,
        title: "Underestimating US Legal Complexity",
        icon: "&#x2696;",
        category: "Regulation",
        cost: "Six figures in lawsuits",
        severity: "critical",
        preview: "US employment law varies by state and anyone can sue anyone for anything. A single lawsuit can tank an early-stage company.",
        tags: ['b2b', 'saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'series-a', 'series-b', 'early-entry', 'scaling', 'legal', 'operations', 'hiring'],
        tagWeights: { 'legal': 5, 'hiring': 4, 'operations': 3 },
        sources: [
            {
                title: "10 Things Not to Do When Hiring in the US",
                url: "https://sifted.eu/articles/10-things-not-to-do-hiring-team-in-the-us",
                author: "Sifted",
                type: "article"
            },
            {
                title: "13 Costly Mistakes to Avoid",
                url: "https://hsp.com/navigating-overseas-expansion-into-the-us-13-costly-mistakes-to-avoid/",
                author: "HSP Group",
                type: "article"
            }
        ],
        content: {
            problem: "Not understanding the complexity and litigation risk of US legal environment",
            points: [
                "<strong>\"What I learned over there is anybody can sue anybody for anything\"</strong> - and the typical lawsuit runs six figures. That can tank early-stage companies.",
                "Employment law varies dramatically by state. <strong>New York has specific rules around pay transparency and AI in recruiting</strong> that don't exist elsewhere.",
                "Common mistake: opting for a branch office instead of incorporating. <strong>This exposes your entire European business to US taxes and liabilities.</strong>",
                "Each state has different rules for employment contracts, background checks, non-competes, and termination. You need state-specific legal counsel."
            ],
            remediation: "Form a US subsidiary (Delaware C-Corp or LLC) rather than a branch. Get specialized employment law counsel for each state where you hire. Budget for legal expenses from day one. Get comprehensive liability insurance.",
            redFlags: [
                "You're using a branch office structure instead of a proper US subsidiary",
                "You're applying European employment norms (notice periods, termination rules) to US hires",
                "You don't have employment practices liability insurance (EPLI)",
                "You're hiring in multiple states using the same employment contract",
                "Your European lawyer is handling your US legal matters"
            ],
            actionItems: [
                "Incorporate a Delaware C-Corp or LLC as a proper US subsidiary immediately",
                "Engage state-specific employment counsel for every state where you have employees",
                "Purchase employment practices liability insurance (EPLI) before your first US hire",
                "Create state-compliant offer letters, employment agreements, and employee handbooks",
                "Build a termination checklist with your US employment lawyer to avoid wrongful termination claims",
                "Budget $50-100k annually for US legal expenses as a baseline"
            ],
            metrics: [
                "Legal compliance audit score across all states with employees",
                "EPLI and D&O insurance coverage in place (binary yes/no)",
                "Number of employment disputes or claims (target: zero)",
                "Legal expense tracking vs. annual budget"
            ],
            timeline: "Before first US hire through ongoing operations",
            quickWin: "Confirm you have a proper US subsidiary (not a branch) and employment practices liability insurance. If not, call a lawyer today.",
            testimonials: [
                {
                    quote: "What I learned over there is anybody can sue anybody for anything... and if you go in front of a court, the typical lawsuit is six figures. That can tank a lot of companies in their early stages if you're not aware and prepared for it.",
                    author: "Thomas Holl",
                    role: "Co-founder, Babbel"
                }
            ]
        }
    },
    {
        id: 18,
        title: "Ignoring the Analyst & Influencer Ecosystem",
        icon: "&#x1F4CA;",
        category: "Marketing",
        cost: "Lost enterprise deals",
        severity: "high",
        preview: "US enterprise buyers rely on Gartner, Forrester, and industry analysts. Europeans underestimate this ecosystem at their peril.",
        tags: ['b2b', 'saas', 'deeptech', 'series-a', 'series-b', 'growth', 'scaling', 'established', 'gtm', 'pmf'],
        tagWeights: { 'gtm': 5, 'scaling': 4 },
        sources: [
            {
                title: "The Top 5 Mistakes European Startups Make in US Expansion",
                url: "https://kellblog.com/2022/06/27/the-top-5-mistakes-european-startups-make-in-us-expansion/",
                author: "Dave Kellogg",
                type: "article"
            }
        ],
        content: {
            problem: "Not engaging with US analyst and influencer ecosystem",
            points: [
                "While European buyers seem more independent, <strong>US buyers (especially Fortune 1000 IT departments) routinely rely on advice from analysts and influencers</strong>.",
                "This ecosystem ranges from <strong>Gartner, Forrester, and IDC to boutique analyst groups</strong> in specific verticals.",
                "If you're not in the Magic Quadrant or Wave reports, <strong>you may not even make it onto enterprise shortlists</strong>.",
                "Analyst relations is a distinct discipline from PR. It requires dedicated budget, time, and often a specialist agency or hire."
            ],
            remediation: "Budget for analyst relations as part of your US GTM. Identify the key analysts in your space. Start briefings early - it can take 12-18 months to appear in major reports. Consider hiring an AR specialist or agency.",
            redFlags: [
                "Enterprise prospects are asking if you're in the Gartner Magic Quadrant and you're not",
                "You've never briefed an industry analyst about your company",
                "Your marketing budget has zero allocation for analyst relations",
                "You're losing RFPs where analyst inclusion is a requirement",
                "You don't know which analysts cover your specific category"
            ],
            actionItems: [
                "Identify the top 5 analysts covering your category (Gartner, Forrester, IDC, plus boutique firms)",
                "Schedule introductory briefings with 3 analysts within the next 90 days (briefings are typically free)",
                "Budget $50-150k annually for analyst relations (subscriptions, inquiries, report participation)",
                "Hire an AR specialist or agency if targeting enterprise deals above $100k ACV",
                "Request inclusion in upcoming Magic Quadrant, Wave, or MarketScape evaluations",
                "Create an analyst-specific briefing deck that differs from your sales pitch"
            ],
            metrics: [
                "Number of analyst briefings completed per quarter (target: 2-3)",
                "Inclusion in major analyst reports (Gartner MQ, Forrester Wave, etc.)",
                "Enterprise deals where analyst coverage was cited as a factor",
                "Analyst sentiment score (positive mentions in inquiries)"
            ],
            timeline: "12-18 months before targeting Fortune 1000 enterprise deals",
            quickWin: "Identify the 3 most influential analysts in your space and request a free introductory briefing with each.",
            testimonials: [
                {
                    quote: "We were winning every technical evaluation but losing every deal. It wasn't until a champion inside a Fortune 500 told us 'you're not on our approved vendor list because Gartner doesn't cover you' that we understood how critical analysts are in US enterprise sales.",
                    author: "European B2B SaaS CEO",
                    role: "Series B, Enterprise Security"
                }
            ]
        }
    },
    {
        id: 19,
        title: "Know When to Ignore Best Practices",
        icon: "&#x1F6AB;",
        category: "Strategy",
        cost: "Missed opportunities worth millions",
        severity: "high",
        preview: "Following rigid best practices can cost you everything. Sometimes your founder instinct knows better than the playbook.",
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'marketplace', 'series-a', 'series-b', 'series-c-plus', 'growth', 'scaling', 'established', 'gtm', 'operations', 'fundraising'],
        tagWeights: { 'growth': 5, 'series-b': 4, 'series-c-plus': 5, 'scaling': 4, 'established': 4, 'gtm': 3 },
        sources: [
            {
                title: "Lessons from 1,000+ YC Startups",
                url: "https://www.lennysnewsletter.com/p/lessons-from-1000-yc-startups",
                author: "Dalton Caldwell",
                authorRole: "Managing Director, Y Combinator",
                type: "article"
            }
        ],
        content: {
            problem: "Blindly following best practices when your instincts tell you otherwise",
            points: [
                "<strong>Best practices are averages</strong> - they work for most situations, but your situation might be the exception.",
                "Advisors default to conventional wisdom because it's safe advice. <strong>They won't share your downside if they're wrong.</strong>",
                "Time-sensitive opportunities require speed, not process. When there's a rare window, <strong>bureaucratic best practices can slam it shut</strong>.",
                "A founder considering an exit was told to hire an investment banker. The process added months. <strong>The window closed.</strong>",
                "As one founder put it: <em>'A good M&A deal, when it's meant to be, happens pretty quickly. When it drags on, that's a sign it's not going to work.'</em>",
                "Your pattern recognition as a founder is an asset. <strong>You've seen your market, your customers, your timing. Experts haven't.</strong>"
            ],
            remediation: "Trust your instincts when they conflict with best practices - especially when timing matters. Ask: 'What do I know about this situation that the advisor doesn't?' Best practices are guidelines, not commandments.",
            redFlags: [
                "You're following a rigid playbook despite evidence it doesn't fit your situation",
                "Advisors are giving you conflicting advice and you're paralyzed by analysis",
                "A time-sensitive opportunity is slipping away while you run through 'the process'",
                "You've hired expensive consultants who are applying generic frameworks to your unique situation"
            ],
            actionItems: [
                "When advice conflicts with your instinct, write down what you know that the advisor doesn't",
                "Identify which decisions are reversible (move fast) vs. irreversible (be careful)",
                "Set a time limit for major decisions: 72 hours for reversible ones, 2 weeks for irreversible ones",
                "Build a small circle of 2-3 trusted advisors who know your specific context, not just general best practices",
                "When evaluating M&A, partnerships, or pivots, trust your pattern recognition on timing"
            ],
            metrics: [
                "Decision velocity: time from opportunity identification to commitment",
                "Ratio of reversible vs. irreversible decisions in your pipeline",
                "Opportunities captured vs. missed due to process delays"
            ],
            timeline: "Scaling phase through established operations",
            quickWin: "Identify one decision you've been delaying because of conflicting advice, and make it by end of week based on your own judgment.",
            testimonials: [
                {
                    quote: "The defining trait of successful founders isn't a specific personality type but rather a profound self-belief. They possess an unwavering conviction in their startup's potential, even in the face of daunting obstacles.",
                    author: "Dalton Caldwell",
                    role: "Managing Director, Y Combinator"
                }
            ]
        }
    },
    {
        id: 20,
        title: "Skipping Reference Checks",
        icon: "&#x1F4DE;",
        category: "Recruiting",
        cost: "$200,000-500,000 per bad hire",
        severity: "high",
        preview: "The reference call you skip is the one that would have saved you. Go beyond front-door references - dig deep.",
        tags: ['b2b', 'saas', 'fintech', 'deeptech', 'series-a', 'series-b', 'growth', 'early-entry', 'scaling', 'hiring'],
        tagWeights: { 'hiring': 5 },
        sources: [
            {
                title: "10 Things Not to Do When Hiring in the US",
                url: "https://sifted.eu/articles/10-things-not-to-do-hiring-team-in-the-us",
                author: "Sifted",
                type: "article"
            },
            {
                title: "Here Are the Three Biggest Hiring Mistakes",
                url: "https://fortune.com/article/hiring-mistakes-startups-founders/",
                author: "Fortune",
                type: "article"
            }
        ],
        content: {
            problem: "Not doing thorough reference checks on US hires",
            points: [
                "Babbel's founder didn't do the reference call personally for a key US hire, leaving it to a consultant. <strong>\"They watched for the wrong warning signs.\"</strong> The hire was disastrous.",
                "Don't skimp on thorough reference checks. <strong>Go beyond 'front-door references'</strong> (those provided by candidates).",
                "Seek out <strong>back-channel references by tapping into your network's network</strong>. The truth is often hidden from official references.",
                "Americans are culturally trained to give positive references. You need to <strong>read between the lines and ask probing questions</strong>."
            ],
            remediation: "Always do reference calls personally for key hires. Find back-channel references through LinkedIn connections. Ask specific questions about failures, not just successes. Look for patterns across multiple references.",
            redFlags: [
                "You're relying solely on references the candidate provided",
                "Your reference calls are 5-minute formalities instead of 30-minute deep dives",
                "You're delegating reference checks for key hires to recruiters or consultants",
                "References give vague praise but can't cite specific accomplishments",
                "You feel pressure to skip references because the candidate has a 'great reputation'"
            ],
            actionItems: [
                "Conduct all reference calls personally for any hire at director level or above",
                "Complete at least 2 back-channel references per finalist (people NOT on the candidate's list)",
                "Use LinkedIn to find mutual connections at the candidate's previous companies",
                "Ask references: 'Would you hire this person again? In what role specifically?' - listen for hesitation",
                "Ask about failures and how the candidate handled them, not just successes",
                "Look for consistency across 4-5 references - contradictions are a red flag"
            ],
            metrics: [
                "Number of references completed per key hire (target: 5+, including 2+ back-channel)",
                "Percentage of hires where founder personally conducted references (target: 100% for director+)",
                "Bad hire rate (hires terminated or departed within 12 months)",
                "Average reference call duration (target: 25-30 minutes)"
            ],
            timeline: "Every hiring decision from first US hire onward",
            quickWin: "For your current top candidate, find 2 people on LinkedIn who worked with them but aren't on their reference list, and call them.",
            testimonials: [
                {
                    quote: "I think they watched for the wrong warning signs. The reference call you don't do is the one that would have told you everything you needed to know.",
                    author: "Thomas Holl",
                    role: "Co-founder, Babbel"
                }
            ]
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
        type: "placeholder",
        content: "Tons of founder stories coming soon from Alfred, Antoine, and many more who've been through the US expansion journey. Stay tuned.",
        author: "Coming Soon",
        role: "",
        avatar: "&#x1F6A7;"
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

    journeyMap: {
        'exploring': 'exploring',
        'early': 'early-entry',
        'early-entry': 'early-entry',
        'scaling': 'scaling',
        'established': 'established'
    },

    getProfile: function(answers) {
        const journeyKey = this.journeyMap[answers.journey] || answers.journey || 'exploring';
        const archetype = this.archetypes[journeyKey] || this.archetypes.exploring;

        const attributes = [];

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

        const stageLabels = {
            'pre-seed': 'Pre-seed',
            'seed': 'Seed Stage',
            'series-a': 'Series A',
            'series-b': 'Series B+',
            'series-c-plus': 'Series C+',
            'growth': 'Growth Stage'
        };
        attributes.push({ icon: '&#x1F4C8;', label: stageLabels[answers.stage] || 'Unknown' });

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
        const userTags = this.answersToTags(answers);

        const scored = mistakesData.map(mistake => {
            let score = 0;
            const mistakeTags = mistake.tags || [];
            const tagWeights = mistake.tagWeights || {};

            for (const tag of mistakeTags) {
                if (userTags.includes(tag)) {
                    const weight = tagWeights[tag] || 2;
                    score += weight;
                }
            }

            if (mistake.priority && mistake.specialConsiderations) {
                for (const special of mistake.specialConsiderations) {
                    if (userTags.includes(special)) {
                        score += 10;
                    }
                }
            }

            return { ...mistake, score };
        });

        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    },

    answersToTags: function(answers) {
        const tags = [];

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

        if (answers.stage) {
            tags.push(answers.stage);
        }

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

        const worryTagMap = {
            'recruiting': 'hiring',
            'product': 'pmf',
            'strategy': 'gtm',
            'operations': 'operations'
        };
        if (answers.worry && worryTagMap[answers.worry]) {
            tags.push(worryTagMap[answers.worry]);
        }

        if (Array.isArray(answers.concerns)) {
            tags.push(...answers.concerns);
        }

        return tags;
    },

    shouldShowDefenseHqWarning: function(answers) {
        const defenseTags = ['defense-tech', 'govtech'];
        const earlyStages = ['exploring', 'early', 'early-entry'];

        const isDefenseTech = defenseTags.includes(answers.vertical);
        const isEarlyStage = earlyStages.includes(answers.journey);

        return isDefenseTech && isEarlyStage;
    }
};

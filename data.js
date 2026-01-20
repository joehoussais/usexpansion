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
            testimonials: []
        }
    },
    {
        id: 9,
        title: "Rushing the Research Phase",
        icon: "&#x1F50E;",
        category: "Strategy",
        cost: "$500,000+",
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
            testimonials: []
        }
    },
    {
        id: 11,
        title: "Defaulting to SF or NYC",
        icon: "&#x1F3EB;",
        category: "Operations",
        cost: "Varies significantly",
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
            testimonials: []
        }
    },
    {
        id: 14,
        title: "Hiring a Senior Exec to Lead Launch",
        icon: "&#x1F464;",
        category: "Recruiting",
        cost: "$500,000+ in salary and lost time",
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
            testimonials: []
        }
    },
    {
        id: 19,
        title: "Know When to Ignore Best Practices",
        icon: "&#x1F6AB;",
        category: "Strategy",
        cost: "Missed opportunities worth millions",
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
                "As one founder put it: <em>'Un bon deal de M&A quand ça meant to be, ça se fait de manière assez rapide. Quand ça traîne, c'est que c'est pas bon.'</em>",
                "Your pattern recognition as a founder is an asset. <strong>You've seen your market, your customers, your timing. Experts haven't.</strong>"
            ],
            remediation: "Trust your instincts when they conflict with best practices - especially when timing matters. Ask: 'What do I know about this situation that the advisor doesn't?' Best practices are guidelines, not commandments.",
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
        content: "Before I went over, I talked to a lot of people about what to do and what not to do, and they all said: 'You're going to make hiring mistakes if you don't do XYZ'. I ended up making exactly those hiring mistakes.",
        author: "Thomas Holl",
        role: "Co-founder & Managing Director, Babbel",
        avatar: "&#x1F4A1;"
    },
    {
        id: 6,
        type: "quote",
        content: "The most important thing for founders thinking of expanding to the US is to speak to people who have already done it. They have stories on what to do, what not to do, what mistakes were made.",
        author: "Paul Strachman",
        role: "ISAI",
        avatar: "&#x1F91D;"
    },
    {
        id: 7,
        type: "quote",
        content: "Learn from the one mistake that founders (including us) make when coming to the US: Don't underestimate it.",
        author: "Richard Valtr",
        role: "Founder, Mews",
        avatar: "&#x1F3AF;"
    },
    {
        id: 8,
        type: "quote",
        content: "What I learned over there is anybody can sue anybody for anything... and if you go in front of a court, the typical lawsuit is six figures. That can tank a lot of companies in their early stages.",
        author: "Thomas Holl",
        role: "Co-founder & Managing Director, Babbel",
        avatar: "&#x2696;"
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

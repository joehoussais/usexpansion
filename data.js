// ========================================
// US EXPANSION ANTIPLAYBOOK - DATA
// ========================================

const mistakesData = [
    {
        id: 1,
        title: "Lack of Focus",
        icon: "&#x1F6E0;",
        category: "Product",
        cost: "$2,000,000+",
        preview: "European founders underestimate how much more focus the US market requires. Touting platform depth won't work here.",
        relevance: {
            verticals: ["b2b-saas", "fintech", "deeptech", "marketplace"],
            stages: ["seed", "series-a", "series-b"],
            journeys: ["exploring", "early", "scaling"],
            worries: ["product", "strategy"]
        },
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
    }
];

const testimonialsData = [
    {
        id: 1,
        content: "The US is very much about ultra specialisation. You have an org chart and a very defined role and that's your job. In Europe you tend to have people that are jack of all trades that operate outside of their lane.",
        author: "Renaud Deraison",
        role: "Ex-CTO, Tenable",
        avatar: "&#x1F468;&#x200D;&#x1F4BB;"
    },
    {
        id: 2,
        content: "They tend to just see the US as a sales office and don't go there to win. If you really want to win here you have to bet the farm.",
        author: "Renaud Deraison",
        role: "Ex-CTO, Tenable",
        avatar: "&#x1F680;"
    },
    {
        id: 3,
        content: "You can try to get the best of both worlds. As the company starts you can do the European approach where they don't clearly have swim lanes defined, and as the company grows you can have a more specialised approach.",
        author: "Renaud Deraison",
        role: "Ex-CTO, Tenable",
        avatar: "&#x1F3AF;"
    },
    {
        id: 4,
        content: "There are people with less talent and inferior companies getting ahead. The Silicon Valley scene is like a country club - either you get all the signatures of recommendation or you bust in with a parachute.",
        author: "Red River West",
        role: "Investment Team",
        avatar: "&#x1F3C6;"
    }
];

const companyProfiles = {
    archetypes: {
        "explorer": {
            name: "The Explorer",
            description: "Early-stage company researching the US market",
            level: 1,
            avatar: "&#x1F50D;",
            traits: ["Curious", "Research-focused", "Pre-expansion"]
        },
        "pioneer": {
            name: "The Pioneer",
            description: "Making first moves into the US market",
            level: 2,
            avatar: "&#x1F6EB;",
            traits: ["Bold", "First hires", "Entity setup"]
        },
        "builder": {
            name: "The Builder",
            description: "Actively scaling US operations",
            level: 3,
            avatar: "&#x1F3D7;",
            traits: ["Growing team", "Revenue focus", "Scaling ops"]
        },
        "champion": {
            name: "The Champion",
            description: "Established US presence, optimizing for growth",
            level: 4,
            avatar: "&#x1F3C6;",
            traits: ["Established", "Major market", "Optimization"]
        }
    },

    getProfile: function(answers) {
        // Determine archetype based on journey stage
        let archetype;
        switch(answers.journey) {
            case 'exploring':
                archetype = this.archetypes.explorer;
                break;
            case 'early':
                archetype = this.archetypes.pioneer;
                break;
            case 'scaling':
                archetype = this.archetypes.builder;
                break;
            case 'established':
                archetype = this.archetypes.champion;
                break;
            default:
                archetype = this.archetypes.explorer;
        }

        // Build attributes from answers
        const attributes = [];

        // Vertical label
        const verticalLabels = {
            'b2b-saas': 'B2B SaaS',
            'fintech': 'Fintech',
            'consumer': 'Consumer',
            'deeptech': 'Deep Tech / AI',
            'marketplace': 'Marketplace',
            'other': 'Other'
        };
        attributes.push({ icon: '&#x1F3E2;', label: verticalLabels[answers.vertical] || 'Unknown' });

        // Stage label
        const stageLabels = {
            'seed': 'Seed Stage',
            'series-a': 'Series A',
            'series-b': 'Series B+',
            'growth': 'Growth Stage'
        };
        attributes.push({ icon: '&#x1F4C8;', label: stageLabels[answers.stage] || 'Unknown' });

        // Worry label
        const worryLabels = {
            'recruiting': 'Hiring Focus',
            'product': 'PMF Focus',
            'strategy': 'GTM Focus',
            'operations': 'Ops Focus'
        };
        attributes.push({ icon: '&#x26A0;', label: worryLabels[answers.worry] || 'Unknown' });

        return {
            ...archetype,
            attributes
        };
    },

    getRelevantMistakes: function(answers) {
        // Score each mistake based on relevance to user answers
        const scored = mistakesData.map(mistake => {
            let score = 0;

            // Check vertical match
            if (mistake.relevance.verticals.includes(answers.vertical)) {
                score += 3;
            }

            // Check stage match
            if (mistake.relevance.stages.includes(answers.stage)) {
                score += 2;
            }

            // Check journey match
            if (mistake.relevance.journeys.includes(answers.journey)) {
                score += 2;
            }

            // Check worry match (highest weight)
            if (mistake.relevance.worries.includes(answers.worry)) {
                score += 4;
            }

            return { ...mistake, score };
        });

        // Sort by score and return top 3
        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }
};

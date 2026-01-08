-- ========================================
-- US EXPANSION ANTIPLAYBOOK - SUPABASE SETUP
-- Run this in Supabase SQL Editor (Database > SQL Editor > New Query)
-- ========================================

-- ========================================
-- 1. CORE MISTAKES (Admin-managed content)
-- ========================================
CREATE TABLE mistakes (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    cost TEXT,
    preview TEXT NOT NULL,
    problem TEXT NOT NULL,
    points JSONB NOT NULL,  -- Array of bullet points
    remediation TEXT NOT NULL,
    resource_url TEXT,
    -- Relevance scoring for classifier
    relevance_verticals TEXT[] DEFAULT '{}',
    relevance_stages TEXT[] DEFAULT '{}',
    relevance_journeys TEXT[] DEFAULT '{}',
    relevance_worries TEXT[] DEFAULT '{}',
    -- Meta
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 2. TESTIMONIALS (Admin-managed)
-- ========================================
CREATE TABLE testimonials (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    author_avatar TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 3. COMMUNITY SUBMISSIONS (User-generated)
-- ========================================
CREATE TABLE community_mistakes (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    story TEXT NOT NULL,
    cost TEXT,
    category TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_avatar TEXT NOT NULL,
    author_level INTEGER NOT NULL,
    author_attributes JSONB,
    approved BOOLEAN DEFAULT false,  -- Requires admin approval
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 4. EMAIL SUBSCRIBERS
-- ========================================
CREATE TABLE email_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    vertical TEXT,
    stage TEXT,
    journey TEXT,
    worry TEXT,
    source TEXT DEFAULT 'content_gate',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- ROW LEVEL SECURITY POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Mistakes: Anyone can read active mistakes
CREATE POLICY "Public read active mistakes" ON mistakes
    FOR SELECT USING (is_active = true);

-- Testimonials: Anyone can read active testimonials
CREATE POLICY "Public read active testimonials" ON testimonials
    FOR SELECT USING (is_active = true);

-- Community mistakes: Anyone can read approved, anyone can insert
CREATE POLICY "Public read approved community mistakes" ON community_mistakes
    FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can submit community mistakes" ON community_mistakes
    FOR INSERT WITH CHECK (true);

-- Email subscribers: Anyone can insert (no read for public)
CREATE POLICY "Anyone can subscribe" ON email_subscribers
    FOR INSERT WITH CHECK (true);

-- ========================================
-- INSERT INITIAL MISTAKES DATA
-- ========================================

INSERT INTO mistakes (title, icon, category, cost, preview, problem, points, remediation, resource_url, relevance_verticals, relevance_stages, relevance_journeys, relevance_worries, display_order) VALUES

(
    'Lack of Focus',
    '&#x1F6E0;',
    'Product',
    '$2,000,000+',
    'European founders underestimate how much more focus the US market requires. Touting platform depth won''t work here.',
    'Lack of product focus',
    '["Sounds simple but essentially all EU founders will <strong>underestimate how much more focus the US market requires</strong>", "The vast majority of EU founders will tout the depth of their platform when winning in the US requires choosing one critical use case and nailing it better than anyone else in the market", "Often the use case will be different in the US than in EU", "Fail to nail your use case and you can go home: money wasted upwards of $2M mini for your cash-tight start-up"]',
    'A co-founder needs to meet with dozens of customers & industry thought leaders multiple times for at least 6 months prior to honing-in on a killer use case',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'deeptech', 'marketplace'],
    ARRAY['seed', 'series-a', 'series-b'],
    ARRAY['exploring', 'early', 'scaling'],
    ARRAY['product', 'strategy'],
    1
),

(
    'Falling for the Smooth Talkers',
    '&#x1F5E3;',
    'Recruiting',
    'Varies',
    'Americans are trained to sell themselves exceptionally well. Don''t confuse polish with performance.',
    'Getting seduced by smooth talkers in interviews',
    '["Americans are trained from a young age to present themselves confidently and sell their achievements", "European founders often mistake this polish for actual competence", "The interview performance rarely correlates with job performance", "These people aren''t gods - how European founders can stop making the #1 mistake in US recruiting"]',
    'Reference check extensively. Ask for specific metrics and verify them. Run trial projects when possible. Don''t be dazzled by the presentation.',
    'https://kellblog.com/2024/05/18/these-people-arent-gods-how-european-founders-can-stop-making-the-1-mistake-in-us-recruiting/',
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['series-a', 'series-b', 'growth'],
    ARRAY['early', 'scaling', 'established'],
    ARRAY['recruiting'],
    2
),

(
    'Overlook Rockstars',
    '&#x1F3B8;',
    'Recruiting',
    '$500,000+',
    'You need to invest big bucks for your rock star(s). A US rockstar is worth 3-5x their EU equivalent.',
    'Not paying enough for top US talent',
    '["You need to invest big bucks for your rock star(s). It can be a solo sales contributor or a CRO or a CMO. It depends on your business. But you need to pay the price.", "100% worth it. A US employee is typically paid at least twice as much as an equivalent EU employee (think a 50k€ EU job is worth $100k in the US)", "When you include burden it is more like 75k€ against $120k", "For a rock star don''t shy away from paying 3, sometimes 4, if not 5x an EU equivalent"]',
    'Budget appropriately for US talent. One exceptional hire at $300k+ will outperform three mediocre $100k hires.',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'deeptech', 'marketplace'],
    ARRAY['series-a', 'series-b', 'growth'],
    ARRAY['early', 'scaling', 'established'],
    ARRAY['recruiting', 'strategy'],
    3
),

(
    'Your Swiss Army Knife Won''t Work',
    '&#x1F91D;',
    'Recruiting',
    'Varies',
    'US employees are ultra-specialized. Don''t expect your hire to be good at two things even if they sell it to you.',
    'Expecting US employees to be multi-skilled generalists',
    '["A major difference with Europe vastly misunderstood: in the US, your average employee is a lot less impactful and resourceful than in Europe", "You want to hire someone for a very precise task. A lot narrower than in Europe", "US is here again a lot more focused in terms of organization", "Don''t expect your employee to be good at two things even though they can sell it to you 10 times better than your EU employee in an interview", "\"The US is very much about ultra specialisation, so basically you have an org chart and a have a very defined role and that''s your job\" - Renaud Deraison, ex-CTO Tenable"]',
    'The advantage is that if someone leaves in the US you can replace that job fairly easily. As the company starts you can do the European approach, then move to a more specialized structure as you grow.',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['seed', 'series-a', 'series-b', 'growth'],
    ARRAY['early', 'scaling', 'established'],
    ARRAY['recruiting', 'operations'],
    4
),

(
    'Weak Narrative / Storytelling',
    '&#x1F4AC;',
    'Product',
    '$1,000,000+',
    'EU founders think US focus on narrative is window-dressing. It''s the opposite - it impacts strategy and roadmap.',
    'Not nailing your narrative',
    '["This one is so commonly misunderstood by EU founders. They think the US focus on narrative is only window-dressing", "Turns out it is the opposite. If you own a greenfield, you must be able to express it in a concise and impactful way. Each word counts", "Very often this stage will deeply impact the strategic positioning of the company as well as its product roadmap", "Weak narrative = no consistent sales machine in the US"]',
    'Work with a world-class narrative marketer. Does not have to be a costly tier 1 agency. Can be a solo star out of his/her garage.',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['seed', 'series-a', 'series-b'],
    ARRAY['exploring', 'early', 'scaling'],
    ARRAY['product', 'strategy'],
    5
),

(
    'Not Having a Strong Vision',
    '&#x1F441;',
    'Strategy',
    'Varies',
    'Americans love a winner. European founders present past-to-future; Americans start with a bold future vision.',
    'Not having a strong vision',
    '["Americans love a winner. So make sure you present like one.", "European founders typically present a company narrative by examining current metrics, comparing them to the past, and predicting future trends", "In contrast, American founders start with a bold vision of the future and then explain how they plan to achieve it, often referencing past successes at the end", "Adopting the U.S. approach doesn''t mean losing your authenticity", "Take Stripe, founded by the Irish Collison brothers. Their bold vision to ''increase the GDP of the internet'' is about more than just making payments easier; it''s about expanding opportunities for everyone", "A big vision can be both daring and inspirational without seeming arrogant"]',
    'Reframe your pitch to lead with an ambitious, inspiring vision. Where are you taking the world, not just where your company is today.',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['seed', 'series-a', 'series-b', 'growth'],
    ARRAY['exploring', 'early', 'scaling', 'established'],
    ARRAY['strategy', 'product'],
    6
),

(
    'Networking the Wrong Way',
    '&#x1F44B;',
    'Marketing',
    'Varies',
    'Silicon Valley is like a country club. Either get all the signatures or bust in with a parachute.',
    'Find the right connector',
    '["The Silicon Valley scene is like a country club with two ways in. Either you get all the signatures of recommendation or you bust into the middle of the garden party with a parachute and make a real entrance.", "You can''t afford to wait for introductions, so get out there and meet as many of the right people as you can", "Go to events where you''re likely to meet people who can connect you to the U.S. market", "Make the most of digital tools to find second-degree contacts within your own network", "Crucially, when you do get in front of the right people, don''t be afraid to ask. Americans value confidence and audacity", "If you have trouble, just remind yourself: There are people with less talent and inferior companies getting ahead. So get to it."]',
    'Be bold. Make clear requests for introductions or meetings. Don''t wait for permission.',
    'https://www.tapestry.vc/perspectives/5-tips-for-founders-looking-to-launch-in-the-us',
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['seed', 'series-a', 'series-b'],
    ARRAY['exploring', 'early'],
    ARRAY['strategy', 'recruiting'],
    7
),

(
    'Your Company Name Sucks',
    '&#x2122;',
    'Marketing',
    '$10,000-50,000',
    'A bad brand can drag your market entry. Test your brand before starting your go to market.',
    'Not testing your brand before GTM',
    '["Test your brand before starting your go to market", "A bad brand can drag your market entry. It is not a roadblock but you''d be surprised how easy it is to change a brand before entering the market", "Consider it if your brand is too descriptive, a mouthful or simply not impactful", "Again, you don''t need an expensive marketer. A solo contributor can help you nail the right brand for less than $10,000 in a month"]',
    'Test your name with US customers before launch. Consider hiring a naming specialist - even established brands have done this.',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'consumer', 'marketplace'],
    ARRAY['seed', 'series-a'],
    ARRAY['exploring', 'early'],
    ARRAY['strategy', 'product'],
    8
),

(
    'Incomplete Market Research',
    '&#x1F50E;',
    'Strategy',
    '$500,000+',
    'Your pre-entry market research should take 3-4 months and cover much more than you think.',
    'Incomplete market research',
    '["What your pre-entry market research should include:", "3-4 month timetable", "Value chain comparison", "Customer research", "Competitor research & positioning", "Product localisation", "Location recommendation", "Regulation", "Operations (legal, financial, HR, IP, subsidiary, etc)", "Pre- and post-launch timetable", "Year one budget, and staffing plan"]',
    'Don''t skip steps. Create a comprehensive checklist and allocate proper time and budget for thorough research.',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['seed', 'series-a', 'series-b'],
    ARRAY['exploring', 'early'],
    ARRAY['strategy', 'product', 'operations'],
    9
),

(
    'Waiting Too Long on Licenses',
    '&#x2705;',
    'Regulation',
    '18+ months delay',
    'If you need licenses to operate, US expansion could be delayed by 18+ months. Start early.',
    'Waiting before licenses',
    '["If you need to acquire licenses to operate, US expansion could be delayed by 18m+", "Many European founders underestimate the regulatory timeline", "Starting the process late means missing your market window"]',
    'Start the licensing process as early as possible, even before you''re certain about US expansion. The timeline is often the biggest bottleneck.',
    NULL,
    ARRAY['fintech', 'deeptech'],
    ARRAY['seed', 'series-a', 'series-b'],
    ARRAY['exploring', 'early'],
    ARRAY['operations'],
    10
),

(
    'Wrong HQ Location',
    '&#x1F3EB;',
    'Regulation',
    'Varies',
    'Choosing the wrong US location for your HQ can impact hiring, costs, and access to customers.',
    'Choosing the wrong HQ location',
    '["Location matters more than many European founders realize", "Different cities offer different talent pools, costs, and customer access", "SF/NYC aren''t always the right choice", "Consider your industry, customers, and hiring needs"]',
    'Research thoroughly. Consider: Where are your customers? What talent do you need? What''s the cost of living? What''s the timezone alignment with your EU HQ?',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['series-a', 'series-b', 'growth'],
    ARRAY['exploring', 'early', 'scaling'],
    ARRAY['operations', 'recruiting'],
    11
),

(
    'Don''t Invest Enough',
    '&#x1F4B0;',
    'Strategy',
    '$2,000,000+',
    'They tend to just see the US as a sales office. If you want to win here, you have to bet the farm.',
    'Not investing enough in US expansion',
    '["\"They tend to just see the US as a sales office and don''t go there to win\"", "\"If you really want to win here you have to bet the farm\"", "- Renaud Deraison, ex-CTO Tenable", "Half-measures lead to failure", "The US market requires full commitment"]',
    'Go all in or don''t go at all. Budget for real investment, not just a toe in the water.',
    NULL,
    ARRAY['b2b-saas', 'fintech', 'consumer', 'deeptech', 'marketplace', 'other'],
    ARRAY['series-a', 'series-b', 'growth'],
    ARRAY['exploring', 'early', 'scaling'],
    ARRAY['strategy'],
    12
);

-- ========================================
-- INSERT INITIAL TESTIMONIALS
-- ========================================

INSERT INTO testimonials (content, author_name, author_role, author_avatar, display_order) VALUES
(
    'The US is very much about ultra specialisation. You have an org chart and a very defined role and that''s your job. In Europe you tend to have people that are jack of all trades that operate outside of their lane.',
    'Renaud Deraison',
    'Ex-CTO, Tenable',
    '&#x1F468;&#x200D;&#x1F4BB;',
    1
),
(
    'They tend to just see the US as a sales office and don''t go there to win. If you really want to win here you have to bet the farm.',
    'Renaud Deraison',
    'Ex-CTO, Tenable',
    '&#x1F680;',
    2
),
(
    'You can try to get the best of both worlds. As the company starts you can do the European approach where they don''t clearly have swim lanes defined, and as the company grows you can have a more specialised approach.',
    'Renaud Deraison',
    'Ex-CTO, Tenable',
    '&#x1F3AF;',
    3
),
(
    'There are people with less talent and inferior companies getting ahead. The Silicon Valley scene is like a country club - either you get all the signatures of recommendation or you bust in with a parachute.',
    'Red River West',
    'Investment Team',
    '&#x1F3C6;',
    4
);

-- ========================================
-- INSERT SAMPLE COMMUNITY MISTAKES (approved)
-- ========================================

INSERT INTO community_mistakes (title, story, cost, category, author_name, author_avatar, author_level, author_attributes, approved) VALUES
(
    'Hired a VP Sales with no startup experience',
    'We hired a VP Sales from a Fortune 500 company thinking their network would help. They couldn''t adapt to our scrappy startup culture and left after 6 months. We lost a year of momentum.',
    '$250,000 + 1 year delay',
    'Recruiting',
    'The Pioneer',
    '&#x1F6EB;',
    2,
    '[{"label": "B2B SaaS"}, {"label": "Series A"}]',
    true
),
(
    'Launched with our European pricing',
    'We kept our Euro pricing and just converted to USD. Turns out US customers expected way higher prices for enterprise software. We left 40% revenue on the table for 18 months before fixing it.',
    '$800,000 in lost revenue',
    'Strategy',
    'The Builder',
    '&#x1F3D7;',
    3,
    '[{"label": "B2B SaaS"}, {"label": "Series B+"}]',
    true
),
(
    'Didn''t localize our messaging',
    'Our website copy was too technical and modest - very European. US competitors had bold, benefit-driven messaging. We completely rewrote everything with a US copywriter and saw 3x conversion improvement.',
    '$15,000 to fix',
    'Marketing',
    'The Explorer',
    '&#x1F50D;',
    1,
    '[{"label": "Fintech"}, {"label": "Seed Stage"}]',
    true
);

-- ========================================
-- HELPFUL VIEWS FOR ADMIN
-- ========================================

-- View all pending community submissions (for moderation)
CREATE VIEW pending_submissions AS
SELECT * FROM community_mistakes WHERE approved = false ORDER BY created_at DESC;

-- View all subscribers with their quiz answers
CREATE VIEW subscriber_insights AS
SELECT
    email,
    vertical,
    stage,
    journey,
    worry,
    created_at
FROM email_subscribers
ORDER BY created_at DESC;

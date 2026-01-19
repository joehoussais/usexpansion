-- ========================================
-- US EXPANSION ANTIPLAYBOOK - DATABASE MIGRATIONS
-- Enhanced Quiz, Tags, and Content Builder Support
-- Run this in Supabase SQL Editor (Database > SQL Editor > New Query)
-- ========================================

-- ========================================
-- PHASE 1: TAG SYSTEM
-- ========================================

-- Tag categories (business_model, vertical, etc.)
CREATE TABLE IF NOT EXISTS tag_categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- All tags (predefined + custom)
CREATE TABLE IF NOT EXISTS tags (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT REFERENCES tag_categories(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    is_predefined BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tag relationships to mistakes (many-to-many with relevance weight)
CREATE TABLE IF NOT EXISTS mistake_tags (
    id BIGSERIAL PRIMARY KEY,
    mistake_id BIGINT REFERENCES mistakes(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE,
    relevance_weight INTEGER DEFAULT 2 CHECK (relevance_weight BETWEEN 1 AND 5),
    UNIQUE(mistake_id, tag_id)
);

-- ========================================
-- PHASE 2: QUIZ CONFIGURATION
-- ========================================

-- Quiz questions (configurable, not hardcoded)
CREATE TABLE IF NOT EXISTS quiz_questions (
    id BIGSERIAL PRIMARY KEY,
    question_key TEXT NOT NULL UNIQUE,
    question_text TEXT NOT NULL,
    question_subtitle TEXT,
    question_icon TEXT,
    display_order INTEGER DEFAULT 0,
    is_multi_select BOOLEAN DEFAULT false,
    is_required BOOLEAN DEFAULT true,
    is_conditional BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz options for each question
CREATE TABLE IF NOT EXISTS quiz_options (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_key TEXT NOT NULL,
    option_label TEXT NOT NULL,
    option_description TEXT,
    option_icon TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(question_id, option_key)
);

-- Conditional quiz logic (which questions follow based on answers)
CREATE TABLE IF NOT EXISTS quiz_conditions (
    id BIGSERIAL PRIMARY KEY,
    source_question_key TEXT NOT NULL,
    source_option_keys TEXT[] NOT NULL,
    target_question_key TEXT NOT NULL,
    condition_type TEXT DEFAULT 'show' CHECK (condition_type IN ('show', 'skip', 'required')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link quiz options to tags they assign
CREATE TABLE IF NOT EXISTS quiz_option_tags (
    id BIGSERIAL PRIMARY KEY,
    option_id BIGINT REFERENCES quiz_options(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(option_id, tag_id)
);

-- ========================================
-- PHASE 3: USER PROFILES
-- ========================================

CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT,
    quiz_answers JSONB DEFAULT '{}',
    assigned_tags BIGINT[] DEFAULT '{}',
    archetype TEXT,
    archetype_level INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- PHASE 4: ENHANCED MISTAKES TABLE
-- ========================================

-- Add new columns to existing mistakes table
ALTER TABLE mistakes ADD COLUMN IF NOT EXISTS special_considerations TEXT[] DEFAULT '{}';
ALTER TABLE mistakes ADD COLUMN IF NOT EXISTS rich_content TEXT;
ALTER TABLE mistakes ADD COLUMN IF NOT EXISTS examples JSONB DEFAULT '[]';
ALTER TABLE mistakes ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);
ALTER TABLE mistakes ADD COLUMN IF NOT EXISTS last_edited_by UUID REFERENCES auth.users(id);
ALTER TABLE mistakes ADD COLUMN IF NOT EXISTS is_community_sourced BOOLEAN DEFAULT false;

-- ========================================
-- PHASE 5: RESOURCES SYSTEM
-- ========================================

-- Standalone resources that can be linked to mistakes
CREATE TABLE IF NOT EXISTS resources (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    resource_type TEXT DEFAULT 'article' CHECK (resource_type IN ('article', 'video', 'tool', 'template', 'guide')),
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link resources to mistakes (many-to-many)
CREATE TABLE IF NOT EXISTS mistake_resources (
    id BIGSERIAL PRIMARY KEY,
    mistake_id BIGINT REFERENCES mistakes(id) ON DELETE CASCADE,
    resource_id BIGINT REFERENCES resources(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    UNIQUE(mistake_id, resource_id)
);

-- ========================================
-- PHASE 6: ENHANCED TESTIMONIALS
-- ========================================

-- Standalone testimonials (linkable to multiple mistakes)
CREATE TABLE IF NOT EXISTS testimonial_quotes (
    id BIGSERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT,
    author_company TEXT,
    author_avatar TEXT,
    source_url TEXT,
    is_video BOOLEAN DEFAULT false,
    video_id TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link testimonials to mistakes (many-to-many)
CREATE TABLE IF NOT EXISTS mistake_testimonials (
    id BIGSERIAL PRIMARY KEY,
    mistake_id BIGINT REFERENCES mistakes(id) ON DELETE CASCADE,
    testimonial_id BIGINT REFERENCES testimonial_quotes(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    UNIQUE(mistake_id, testimonial_id)
);

-- ========================================
-- ROW LEVEL SECURITY POLICIES
-- ========================================

-- Enable RLS on new tables
ALTER TABLE tag_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistake_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_option_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistake_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonial_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistake_testimonials ENABLE ROW LEVEL SECURITY;

-- Public read for tags and quiz config
CREATE POLICY "Public read tag_categories" ON tag_categories FOR SELECT USING (true);
CREATE POLICY "Public read active tags" ON tags FOR SELECT USING (is_active = true);
CREATE POLICY "Public read mistake_tags" ON mistake_tags FOR SELECT USING (true);
CREATE POLICY "Public read active quiz_questions" ON quiz_questions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active quiz_options" ON quiz_options FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active quiz_conditions" ON quiz_conditions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read quiz_option_tags" ON quiz_option_tags FOR SELECT USING (true);
CREATE POLICY "Public read active resources" ON resources FOR SELECT USING (is_active = true);
CREATE POLICY "Public read mistake_resources" ON mistake_resources FOR SELECT USING (true);
CREATE POLICY "Public read active testimonial_quotes" ON testimonial_quotes FOR SELECT USING (is_active = true);
CREATE POLICY "Public read mistake_testimonials" ON mistake_testimonials FOR SELECT USING (true);

-- User profiles: users can read/write their own
CREATE POLICY "Users manage own profiles" ON user_profiles
    FOR ALL USING (auth.uid() = user_id OR session_id IS NOT NULL);
CREATE POLICY "Anyone can insert profiles" ON user_profiles FOR INSERT WITH CHECK (true);

-- ========================================
-- SEED DATA: TAG CATEGORIES
-- ========================================

INSERT INTO tag_categories (name, display_name, display_order) VALUES
    ('business_model', 'Business Model', 1),
    ('vertical', 'Industry Vertical', 2),
    ('revenue_model', 'Revenue Model', 3),
    ('funding_stage', 'Funding Stage', 4),
    ('journey_stage', 'US Journey Stage', 5),
    ('concern_area', 'Primary Concerns', 6),
    ('location', 'Location Preference', 7),
    ('special', 'Special Considerations', 8),
    ('custom', 'Custom Tags', 99)
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- SEED DATA: PREDEFINED TAGS
-- ========================================

-- Business Model Tags
INSERT INTO tags (category_id, slug, display_name, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'business_model'), 'b2b', 'B2B', '&#x1F3E2;', true),
    ((SELECT id FROM tag_categories WHERE name = 'business_model'), 'b2c', 'B2C', '&#x1F464;', true),
    ((SELECT id FROM tag_categories WHERE name = 'business_model'), 'b2b2c', 'B2B2C', '&#x1F465;', true),
    ((SELECT id FROM tag_categories WHERE name = 'business_model'), 'marketplace', 'Marketplace', '&#x1F6D2;', true),
    ((SELECT id FROM tag_categories WHERE name = 'business_model'), 'p2p', 'P2P / Consumer', '&#x1F91D;', true)
ON CONFLICT (slug) DO NOTHING;

-- Vertical Tags
INSERT INTO tags (category_id, slug, display_name, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'saas', 'SaaS', '&#x2601;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'fintech', 'Fintech', '&#x1F4B3;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'consumer', 'Consumer', '&#x1F6CD;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'deeptech', 'Deep Tech / AI', '&#x1F916;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'defense-tech', 'Defense Tech', '&#x1F6E1;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'govtech', 'GovTech', '&#x1F3DB;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'healthcare', 'Healthcare', '&#x1F3E5;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'climate-tech', 'Climate Tech', '&#x1F331;', true),
    ((SELECT id FROM tag_categories WHERE name = 'vertical'), 'other-vertical', 'Other', '&#x2699;', true)
ON CONFLICT (slug) DO NOTHING;

-- Revenue Model Tags
INSERT INTO tags (category_id, slug, display_name, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'revenue_model'), 'subscription', 'Subscription', '&#x1F504;', true),
    ((SELECT id FROM tag_categories WHERE name = 'revenue_model'), 'transactional', 'Transactional', '&#x1F4B5;', true),
    ((SELECT id FROM tag_categories WHERE name = 'revenue_model'), 'freemium', 'Freemium', '&#x1F381;', true),
    ((SELECT id FROM tag_categories WHERE name = 'revenue_model'), 'commission', 'Commission / Marketplace', '&#x1F4CA;', true)
ON CONFLICT (slug) DO NOTHING;

-- Funding Stage Tags
INSERT INTO tags (category_id, slug, display_name, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'funding_stage'), 'pre-seed', 'Pre-seed', '&#x1F331;', true),
    ((SELECT id FROM tag_categories WHERE name = 'funding_stage'), 'seed', 'Seed', '&#x1F33F;', true),
    ((SELECT id FROM tag_categories WHERE name = 'funding_stage'), 'series-a', 'Series A', '&#x1F4C8;', true),
    ((SELECT id FROM tag_categories WHERE name = 'funding_stage'), 'series-b', 'Series B', '&#x1F4C8;', true),
    ((SELECT id FROM tag_categories WHERE name = 'funding_stage'), 'series-c-plus', 'Series C+', '&#x1F680;', true),
    ((SELECT id FROM tag_categories WHERE name = 'funding_stage'), 'growth', 'Growth / Late', '&#x1F3C6;', true)
ON CONFLICT (slug) DO NOTHING;

-- Journey Stage Tags
INSERT INTO tags (category_id, slug, display_name, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'journey_stage'), 'exploring', 'Exploring', '&#x1F50D;', true),
    ((SELECT id FROM tag_categories WHERE name = 'journey_stage'), 'early-entry', 'Early Entry', '&#x1F6EB;', true),
    ((SELECT id FROM tag_categories WHERE name = 'journey_stage'), 'scaling', 'Scaling', '&#x1F3D7;', true),
    ((SELECT id FROM tag_categories WHERE name = 'journey_stage'), 'established', 'Established', '&#x1F3C6;', true)
ON CONFLICT (slug) DO NOTHING;

-- Concern Area Tags
INSERT INTO tags (category_id, slug, display_name, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'concern_area'), 'hiring', 'Hiring', '&#x1F465;', true),
    ((SELECT id FROM tag_categories WHERE name = 'concern_area'), 'pmf', 'Product-Market Fit', '&#x1F3AF;', true),
    ((SELECT id FROM tag_categories WHERE name = 'concern_area'), 'gtm', 'Go-to-Market', '&#x1F4E3;', true),
    ((SELECT id FROM tag_categories WHERE name = 'concern_area'), 'legal', 'Legal & Compliance', '&#x2696;', true),
    ((SELECT id FROM tag_categories WHERE name = 'concern_area'), 'fundraising', 'Fundraising', '&#x1F4B0;', true),
    ((SELECT id FROM tag_categories WHERE name = 'concern_area'), 'operations', 'Operations', '&#x2699;', true)
ON CONFLICT (slug) DO NOTHING;

-- Location Tags
INSERT INTO tags (category_id, slug, display_name, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'location'), 'east-coast', 'East Coast', '&#x1F307;', true),
    ((SELECT id FROM tag_categories WHERE name = 'location'), 'west-coast', 'West Coast', '&#x1F305;', true),
    ((SELECT id FROM tag_categories WHERE name = 'location'), 'location-undecided', 'Undecided', '&#x1F5FA;', true)
ON CONFLICT (slug) DO NOTHING;

-- Special Consideration Tags
INSERT INTO tags (category_id, slug, display_name, description, icon, is_predefined) VALUES
    ((SELECT id FROM tag_categories WHERE name = 'special'), 'itar-relevant', 'ITAR Relevant', 'International Traffic in Arms Regulations apply', '&#x1F6E1;', true),
    ((SELECT id FROM tag_categories WHERE name = 'special'), 'cfius-relevant', 'CFIUS Relevant', 'Committee on Foreign Investment review may apply', '&#x1F3DB;', true),
    ((SELECT id FROM tag_categories WHERE name = 'special'), 'regulated-industry', 'Regulated Industry', 'Subject to industry-specific regulations', '&#x1F4DC;', true),
    ((SELECT id FROM tag_categories WHERE name = 'special'), 'defense-hq-timing', 'Defense HQ Timing', 'Special HQ considerations for defense tech', '&#x26A0;', true),
    ((SELECT id FROM tag_categories WHERE name = 'special'), 'hipaa-relevant', 'HIPAA Relevant', 'Health data privacy regulations apply', '&#x1F3E5;', true),
    ((SELECT id FROM tag_categories WHERE name = 'special'), 'state-licensing', 'State Licensing', 'Requires state-by-state licensing', '&#x1F4CB;', true)
ON CONFLICT (slug) DO NOTHING;

-- ========================================
-- SEED DATA: QUIZ QUESTIONS
-- ========================================

INSERT INTO quiz_questions (question_key, question_text, question_subtitle, question_icon, display_order, is_multi_select, is_conditional) VALUES
    ('business_model', 'What''s your business model?', 'How do you primarily serve customers?', '&#x1F4BC;', 1, false, false),
    ('vertical', 'What''s your industry vertical?', 'Select the category that best describes your company', '&#x1F3E2;', 2, false, false),
    ('revenue_model', 'What''s your revenue model?', 'How do you generate revenue?', '&#x1F4B5;', 3, false, false),
    ('funding_stage', 'What''s your funding stage?', 'Current stage of your company', '&#x1F4C8;', 4, false, false),
    ('journey_stage', 'Where are you in your US journey?', 'Your current expansion status', '&#x1F5FA;', 5, false, false),
    ('concerns', 'What are your primary concerns?', 'Select all that apply', '&#x26A0;', 6, true, false),
    ('gov_contracts', 'Are you targeting government contracts?', 'US or European government sales', '&#x1F3DB;', 7, false, true),
    ('security_clearance', 'Do you need security clearances?', 'For government or defense work', '&#x1F512;', 8, false, true),
    ('licensing_status', 'Have you started the licensing process?', 'For regulated industries', '&#x1F4CB;', 9, false, true),
    ('hipaa_compliance', 'Is HIPAA compliance required?', 'For healthcare data handling', '&#x1F3E5;', 10, false, true)
ON CONFLICT (question_key) DO NOTHING;

-- ========================================
-- SEED DATA: QUIZ OPTIONS
-- ========================================

-- Business Model Options
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'business_model'), 'b2b', 'B2B', 'Selling to other businesses', '&#x1F3E2;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'business_model'), 'b2c', 'B2C', 'Selling directly to consumers', '&#x1F464;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'business_model'), 'b2b2c', 'B2B2C', 'Selling to businesses who serve consumers', '&#x1F465;', 3),
    ((SELECT id FROM quiz_questions WHERE question_key = 'business_model'), 'marketplace', 'Marketplace', 'Connecting buyers and sellers', '&#x1F6D2;', 4),
    ((SELECT id FROM quiz_questions WHERE question_key = 'business_model'), 'p2p', 'P2P / Consumer', 'Peer-to-peer or consumer platform', '&#x1F91D;', 5)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Vertical Options
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'saas', 'SaaS', 'Software as a Service', '&#x2601;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'fintech', 'Fintech', 'Financial technology', '&#x1F4B3;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'consumer', 'Consumer', 'Consumer products or services', '&#x1F6CD;', 3),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'deeptech', 'Deep Tech / AI', 'Advanced technology or AI', '&#x1F916;', 4),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'defense-tech', 'Defense Tech', 'Defense and security technology', '&#x1F6E1;', 5),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'govtech', 'GovTech', 'Government technology', '&#x1F3DB;', 6),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'healthcare', 'Healthcare', 'Healthcare and life sciences', '&#x1F3E5;', 7),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'climate-tech', 'Climate Tech', 'Climate and sustainability', '&#x1F331;', 8),
    ((SELECT id FROM quiz_questions WHERE question_key = 'vertical'), 'other-vertical', 'Other', 'Other industry', '&#x2699;', 9)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Revenue Model Options
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'revenue_model'), 'subscription', 'Subscription', 'Recurring subscription fees', '&#x1F504;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'revenue_model'), 'transactional', 'Transactional', 'Per-transaction or usage fees', '&#x1F4B5;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'revenue_model'), 'freemium', 'Freemium', 'Free tier with paid upgrades', '&#x1F381;', 3),
    ((SELECT id FROM quiz_questions WHERE question_key = 'revenue_model'), 'commission', 'Commission', 'Take rate on transactions', '&#x1F4CA;', 4)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Funding Stage Options
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'funding_stage'), 'pre-seed', 'Pre-seed', 'Early stage, pre-funding', '&#x1F331;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'funding_stage'), 'seed', 'Seed', 'Seed round completed', '&#x1F33F;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'funding_stage'), 'series-a', 'Series A', 'Series A completed', '&#x1F4C8;', 3),
    ((SELECT id FROM quiz_questions WHERE question_key = 'funding_stage'), 'series-b', 'Series B', 'Series B completed', '&#x1F4C8;', 4),
    ((SELECT id FROM quiz_questions WHERE question_key = 'funding_stage'), 'series-c-plus', 'Series C+', 'Series C or later', '&#x1F680;', 5),
    ((SELECT id FROM quiz_questions WHERE question_key = 'funding_stage'), 'growth', 'Growth / Late', 'Growth or late stage', '&#x1F3C6;', 6)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Journey Stage Options
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'journey_stage'), 'exploring', 'Exploring', 'Researching the US market', '&#x1F50D;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'journey_stage'), 'early-entry', 'Early Entry', 'First hire or entity setup', '&#x1F6EB;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'journey_stage'), 'scaling', 'Scaling', '5-20 US employees', '&#x1F3D7;', 3),
    ((SELECT id FROM quiz_questions WHERE question_key = 'journey_stage'), 'established', 'Established', 'Major US presence', '&#x1F3C6;', 4)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Concerns Options (Multi-select)
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'concerns'), 'hiring', 'Hiring', 'Finding the right talent', '&#x1F465;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'concerns'), 'pmf', 'Product-Market Fit', 'Adapting product for US', '&#x1F3AF;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'concerns'), 'gtm', 'Go-to-Market', 'Sales and marketing strategy', '&#x1F4E3;', 3),
    ((SELECT id FROM quiz_questions WHERE question_key = 'concerns'), 'legal', 'Legal & Compliance', 'Regulations and legal setup', '&#x2696;', 4),
    ((SELECT id FROM quiz_questions WHERE question_key = 'concerns'), 'fundraising', 'Fundraising', 'Raising US capital', '&#x1F4B0;', 5),
    ((SELECT id FROM quiz_questions WHERE question_key = 'concerns'), 'operations', 'Operations', 'Day-to-day operations', '&#x2699;', 6)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Government Contracts Options (Conditional)
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'gov_contracts'), 'us-gov', 'US Government', 'Targeting US federal/state contracts', '&#x1F1FA;&#x1F1F8;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'gov_contracts'), 'eu-gov', 'European Government', 'Targeting European government contracts', '&#x1F1EA;&#x1F1FA;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'gov_contracts'), 'both-gov', 'Both', 'Targeting both US and European governments', '&#x1F30D;', 3),
    ((SELECT id FROM quiz_questions WHERE question_key = 'gov_contracts'), 'neither-gov', 'Neither', 'Not targeting government contracts', '&#x1F3E2;', 4)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Security Clearance Options (Conditional)
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'security_clearance'), 'have-clearance', 'Yes, we have clearances', 'Team already has security clearances', '&#x2705;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'security_clearance'), 'need-clearance', 'Need to obtain', 'Will need to obtain clearances', '&#x1F512;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'security_clearance'), 'no-clearance', 'Not needed', 'Security clearances not required', '&#x274C;', 3)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- Licensing Status Options (Conditional)
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'licensing_status'), 'licensed', 'Already licensed', 'Have US licenses', '&#x2705;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'licensing_status'), 'in-progress', 'In progress', 'License applications submitted', '&#x23F3;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'licensing_status'), 'not-started', 'Not started', 'Haven''t begun licensing process', '&#x274C;', 3)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- HIPAA Options (Conditional)
INSERT INTO quiz_options (question_id, option_key, option_label, option_description, option_icon, display_order) VALUES
    ((SELECT id FROM quiz_questions WHERE question_key = 'hipaa_compliance'), 'hipaa-yes', 'Yes, HIPAA required', 'Handling protected health information', '&#x2705;', 1),
    ((SELECT id FROM quiz_questions WHERE question_key = 'hipaa_compliance'), 'hipaa-no', 'No, not required', 'Not handling health data', '&#x274C;', 2),
    ((SELECT id FROM quiz_questions WHERE question_key = 'hipaa_compliance'), 'hipaa-unsure', 'Unsure', 'Need to determine requirements', '&#x2753;', 3)
ON CONFLICT (question_id, option_key) DO NOTHING;

-- ========================================
-- SEED DATA: QUIZ CONDITIONS
-- ========================================

INSERT INTO quiz_conditions (source_question_key, source_option_keys, target_question_key, condition_type) VALUES
    ('vertical', ARRAY['defense-tech', 'govtech'], 'gov_contracts', 'show'),
    ('vertical', ARRAY['defense-tech', 'govtech'], 'security_clearance', 'show'),
    ('vertical', ARRAY['fintech'], 'licensing_status', 'show'),
    ('vertical', ARRAY['healthcare'], 'hipaa_compliance', 'show')
ON CONFLICT DO NOTHING;

-- ========================================
-- SEED DATA: DEFENSE TECH HQ TIMING MISTAKE
-- ========================================

INSERT INTO mistakes (
    title, icon, category, cost, preview, problem, points, remediation, resource_url,
    relevance_verticals, relevance_stages, relevance_journeys, relevance_worries,
    special_considerations, display_order, is_active
) VALUES (
    'Setting Up US HQ Too Early for Defense Tech',
    '&#x1F3DB;',
    'Strategy',
    '$500,000+ and lost opportunities',
    'Defense Tech companies should NOT rush to set up US HQ. Being European can be an advantage for European government contracts.',
    'Premature US HQ establishment for Defense Tech',
    '["European Defense Tech companies often rush to establish US headquarters without considering the implications", "Being a European entity can be advantageous for winning European government contracts - sovereignty matters", "US ITAR regulations create complex compliance requirements that may not be worth it early on", "CFIUS (Committee on Foreign Investment) can review and potentially block transactions involving foreign ownership", "Consider your primary market before any corporate restructuring - where will most of your revenue come from?"]',
    'Evaluate where your primary revenue will come from. If selling to European governments, maintain European HQ status. Consult with defense industry legal counsel before any corporate restructuring. The decision to flip to a US entity should be strategic, not automatic.',
    'https://home.treasury.gov/policy-issues/international/the-committee-on-foreign-investment-in-the-united-states-cfius',
    ARRAY['deeptech'],
    ARRAY['seed', 'series-a', 'series-b'],
    ARRAY['exploring', 'early'],
    ARRAY['operations', 'strategy'],
    ARRAY['defense-hq-timing', 'itar-relevant', 'cfius-relevant'],
    13,
    true
)
ON CONFLICT DO NOTHING;

-- ========================================
-- MIGRATE EXISTING MISTAKES TO TAGS
-- ========================================

-- This creates tag associations for existing mistakes based on their relevance arrays
-- Run this after the initial data is in place

-- Helper function to migrate relevance arrays to tags
CREATE OR REPLACE FUNCTION migrate_mistake_to_tags(p_mistake_id BIGINT) RETURNS void AS $$
DECLARE
    v_mistake RECORD;
    v_tag_slug TEXT;
    v_tag_id BIGINT;
BEGIN
    SELECT * INTO v_mistake FROM mistakes WHERE id = p_mistake_id;

    -- Migrate verticals (map old names to new slugs)
    FOREACH v_tag_slug IN ARRAY v_mistake.relevance_verticals LOOP
        -- Map old slugs to new slugs
        v_tag_slug := CASE v_tag_slug
            WHEN 'b2b-saas' THEN 'saas'
            WHEN 'deeptech' THEN 'deeptech'
            WHEN 'other' THEN 'other-vertical'
            ELSE v_tag_slug
        END;

        SELECT id INTO v_tag_id FROM tags WHERE slug = v_tag_slug;
        IF v_tag_id IS NOT NULL THEN
            INSERT INTO mistake_tags (mistake_id, tag_id, relevance_weight)
            VALUES (p_mistake_id, v_tag_id, 3)
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;

    -- Migrate stages
    FOREACH v_tag_slug IN ARRAY v_mistake.relevance_stages LOOP
        SELECT id INTO v_tag_id FROM tags WHERE slug = v_tag_slug;
        IF v_tag_id IS NOT NULL THEN
            INSERT INTO mistake_tags (mistake_id, tag_id, relevance_weight)
            VALUES (p_mistake_id, v_tag_id, 2)
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;

    -- Migrate journeys (map old names to new slugs)
    FOREACH v_tag_slug IN ARRAY v_mistake.relevance_journeys LOOP
        v_tag_slug := CASE v_tag_slug
            WHEN 'early' THEN 'early-entry'
            ELSE v_tag_slug
        END;

        SELECT id INTO v_tag_id FROM tags WHERE slug = v_tag_slug;
        IF v_tag_id IS NOT NULL THEN
            INSERT INTO mistake_tags (mistake_id, tag_id, relevance_weight)
            VALUES (p_mistake_id, v_tag_id, 2)
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;

    -- Migrate worries (map to concern_area tags)
    FOREACH v_tag_slug IN ARRAY v_mistake.relevance_worries LOOP
        v_tag_slug := CASE v_tag_slug
            WHEN 'recruiting' THEN 'hiring'
            WHEN 'product' THEN 'pmf'
            WHEN 'strategy' THEN 'gtm'
            ELSE v_tag_slug
        END;

        SELECT id INTO v_tag_id FROM tags WHERE slug = v_tag_slug;
        IF v_tag_id IS NOT NULL THEN
            INSERT INTO mistake_tags (mistake_id, tag_id, relevance_weight)
            VALUES (p_mistake_id, v_tag_id, 4)  -- Highest weight for concerns
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Run migration for all existing mistakes
DO $$
DECLARE
    v_mistake_id BIGINT;
BEGIN
    FOR v_mistake_id IN SELECT id FROM mistakes LOOP
        PERFORM migrate_mistake_to_tags(v_mistake_id);
    END LOOP;
END $$;

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_tags_category ON tags(category_id);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_mistake_tags_mistake ON mistake_tags(mistake_id);
CREATE INDEX IF NOT EXISTS idx_mistake_tags_tag ON mistake_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_quiz_options_question ON quiz_options(question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_conditions_source ON quiz_conditions(source_question_key);
CREATE INDEX IF NOT EXISTS idx_user_profiles_session ON user_profiles(session_id);

-- ========================================
-- HELPFUL VIEWS
-- ========================================

-- View mistakes with their tags
CREATE OR REPLACE VIEW mistakes_with_tags AS
SELECT
    m.*,
    COALESCE(
        json_agg(
            json_build_object(
                'tag_id', t.id,
                'slug', t.slug,
                'display_name', t.display_name,
                'category', tc.name,
                'weight', mt.relevance_weight
            )
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'
    ) as tags
FROM mistakes m
LEFT JOIN mistake_tags mt ON m.id = mt.mistake_id
LEFT JOIN tags t ON mt.tag_id = t.id
LEFT JOIN tag_categories tc ON t.category_id = tc.id
WHERE m.is_active = true
GROUP BY m.id;

-- View quiz questions with options
CREATE OR REPLACE VIEW quiz_questions_with_options AS
SELECT
    q.*,
    COALESCE(
        json_agg(
            json_build_object(
                'key', o.option_key,
                'label', o.option_label,
                'description', o.option_description,
                'icon', o.option_icon
            ) ORDER BY o.display_order
        ) FILTER (WHERE o.id IS NOT NULL),
        '[]'
    ) as options
FROM quiz_questions q
LEFT JOIN quiz_options o ON q.id = o.question_id AND o.is_active = true
WHERE q.is_active = true
GROUP BY q.id
ORDER BY q.display_order;

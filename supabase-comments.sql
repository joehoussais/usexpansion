-- ========================================
-- US EXPANSION ANTIPLAYBOOK - COMMENTS & SOURCES MIGRATION
-- Run this in Supabase SQL Editor after the main migrations
-- ========================================

-- ========================================
-- PHASE 1: COMMENTS SYSTEM
-- ========================================

-- Comments on mistakes
CREATE TABLE IF NOT EXISTS mistake_comments (
    id BIGSERIAL PRIMARY KEY,
    mistake_id INTEGER NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_id BIGINT REFERENCES mistake_comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    author_company TEXT,
    author_role TEXT,
    upvotes INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comment upvotes tracking
CREATE TABLE IF NOT EXISTS comment_upvotes (
    id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT REFERENCES mistake_comments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(comment_id, user_id)
);

-- ========================================
-- PHASE 2: ENHANCED SOURCE CITATIONS
-- ========================================

-- Source citations for mistakes
CREATE TABLE IF NOT EXISTS mistake_sources (
    id BIGSERIAL PRIMARY KEY,
    mistake_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    url TEXT,
    author_name TEXT,
    author_role TEXT,
    source_type TEXT DEFAULT 'article' CHECK (source_type IN ('article', 'interview', 'research', 'book', 'video', 'podcast', 'legal guide', 'case study', 'guide')),
    publication_date DATE,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- PHASE 3: SUBMISSION ENHANCEMENTS
-- ========================================

-- Enhanced community submissions with more fields
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS author_company TEXT;
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS author_linkedin TEXT;
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS sources JSONB DEFAULT '[]';
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS remediation TEXT;
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false;
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0;
ALTER TABLE community_mistakes ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================

-- Enable RLS
ALTER TABLE mistake_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistake_sources ENABLE ROW LEVEL SECURITY;

-- Comments: Public read for approved, users manage own
CREATE POLICY "Public read approved comments" ON mistake_comments
    FOR SELECT USING (is_approved = true AND is_deleted = false);

CREATE POLICY "Users manage own comments" ON mistake_comments
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert comments" ON mistake_comments
    FOR INSERT WITH CHECK (true);

-- Upvotes: Users manage own, public read count
CREATE POLICY "Users manage own upvotes" ON comment_upvotes
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert upvotes" ON comment_upvotes
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Sources: Public read
CREATE POLICY "Public read sources" ON mistake_sources
    FOR SELECT USING (true);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_mistake_comments_mistake ON mistake_comments(mistake_id);
CREATE INDEX IF NOT EXISTS idx_mistake_comments_user ON mistake_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_mistake_comments_parent ON mistake_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_mistake_comments_approved ON mistake_comments(is_approved) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_comment_upvotes_comment ON comment_upvotes(comment_id);
CREATE INDEX IF NOT EXISTS idx_mistake_sources_mistake ON mistake_sources(mistake_id);

-- ========================================
-- HELPFUL FUNCTIONS
-- ========================================

-- Function to get comment count for a mistake
CREATE OR REPLACE FUNCTION get_comment_count(p_mistake_id INTEGER)
RETURNS INTEGER AS $$
    SELECT COUNT(*)::INTEGER
    FROM mistake_comments
    WHERE mistake_id = p_mistake_id
      AND is_approved = true
      AND is_deleted = false;
$$ LANGUAGE SQL;

-- Function to toggle upvote
CREATE OR REPLACE FUNCTION toggle_comment_upvote(p_comment_id BIGINT, p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_exists BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM comment_upvotes
        WHERE comment_id = p_comment_id AND user_id = p_user_id
    ) INTO v_exists;

    IF v_exists THEN
        DELETE FROM comment_upvotes
        WHERE comment_id = p_comment_id AND user_id = p_user_id;

        UPDATE mistake_comments
        SET upvotes = upvotes - 1
        WHERE id = p_comment_id;

        RETURN false;
    ELSE
        INSERT INTO comment_upvotes (comment_id, user_id)
        VALUES (p_comment_id, p_user_id);

        UPDATE mistake_comments
        SET upvotes = upvotes + 1
        WHERE id = p_comment_id;

        RETURN true;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- VIEW FOR COMMENTS WITH METADATA
-- ========================================

CREATE OR REPLACE VIEW comments_with_metadata AS
SELECT
    c.*,
    (SELECT COUNT(*) FROM mistake_comments WHERE parent_id = c.id AND is_approved = true AND is_deleted = false) as reply_count,
    CASE WHEN c.parent_id IS NULL THEN 'root' ELSE 'reply' END as comment_type
FROM mistake_comments c
WHERE c.is_approved = true AND c.is_deleted = false;

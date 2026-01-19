// ========================================
// US EXPANSION ANTIPLAYBOOK - TAG MANAGER
// Tag operations and content matching algorithm
// ========================================

class TagManager {
    constructor() {
        this.tags = new Map();         // tag_id -> tag object
        this.tagsBySlug = new Map();   // slug -> tag object
        this.categories = new Map();   // category_id -> category object
        this.mistakeTags = new Map();  // mistake_id -> array of {tag_id, weight}
        this.initialized = false;
    }

    // Initialize from Supabase or fallback data
    async init(supabaseClient) {
        try {
            if (supabaseClient) {
                await this.loadFromSupabase(supabaseClient);
            } else {
                this.loadFallbackData();
            }
            this.initialized = true;
            return true;
        } catch (error) {
            console.warn('Tag manager init error, using fallback:', error);
            this.loadFallbackData();
            this.initialized = true;
            return true;
        }
    }

    // Load from Supabase
    async loadFromSupabase(supabase) {
        // Load categories
        const { data: categories, error: catError } = await supabase
            .from('tag_categories')
            .select('*')
            .order('display_order');

        if (catError) throw catError;
        categories.forEach(cat => this.categories.set(cat.id, cat));

        // Load tags
        const { data: tags, error: tagError } = await supabase
            .from('tags')
            .select('*')
            .eq('is_active', true);

        if (tagError) throw tagError;
        tags.forEach(tag => {
            this.tags.set(tag.id, tag);
            this.tagsBySlug.set(tag.slug, tag);
        });

        // Load mistake-tag relationships
        const { data: mistakeTags, error: mtError } = await supabase
            .from('mistake_tags')
            .select('*');

        if (mtError) throw mtError;
        mistakeTags.forEach(mt => {
            if (!this.mistakeTags.has(mt.mistake_id)) {
                this.mistakeTags.set(mt.mistake_id, []);
            }
            this.mistakeTags.get(mt.mistake_id).push({
                tag_id: mt.tag_id,
                weight: mt.relevance_weight
            });
        });
    }

    // Fallback data
    loadFallbackData() {
        // Categories
        const categoriesData = [
            { id: 1, name: 'business_model', display_name: 'Business Model', display_order: 1 },
            { id: 2, name: 'vertical', display_name: 'Industry Vertical', display_order: 2 },
            { id: 3, name: 'revenue_model', display_name: 'Revenue Model', display_order: 3 },
            { id: 4, name: 'funding_stage', display_name: 'Funding Stage', display_order: 4 },
            { id: 5, name: 'journey_stage', display_name: 'US Journey Stage', display_order: 5 },
            { id: 6, name: 'concern_area', display_name: 'Primary Concerns', display_order: 6 },
            { id: 7, name: 'location', display_name: 'Location Preference', display_order: 7 },
            { id: 8, name: 'special', display_name: 'Special Considerations', display_order: 8 },
            { id: 9, name: 'custom', display_name: 'Custom Tags', display_order: 99 }
        ];
        categoriesData.forEach(cat => this.categories.set(cat.id, cat));

        // Tags
        const tagsData = [
            // Business Model
            { id: 1, category_id: 1, slug: 'b2b', display_name: 'B2B', icon: '&#x1F3E2;' },
            { id: 2, category_id: 1, slug: 'b2c', display_name: 'B2C', icon: '&#x1F464;' },
            { id: 3, category_id: 1, slug: 'b2b2c', display_name: 'B2B2C', icon: '&#x1F465;' },
            { id: 4, category_id: 1, slug: 'marketplace', display_name: 'Marketplace', icon: '&#x1F6D2;' },
            { id: 5, category_id: 1, slug: 'p2p', display_name: 'P2P / Consumer', icon: '&#x1F91D;' },

            // Vertical
            { id: 10, category_id: 2, slug: 'saas', display_name: 'SaaS', icon: '&#x2601;' },
            { id: 11, category_id: 2, slug: 'fintech', display_name: 'Fintech', icon: '&#x1F4B3;' },
            { id: 12, category_id: 2, slug: 'consumer', display_name: 'Consumer', icon: '&#x1F6CD;' },
            { id: 13, category_id: 2, slug: 'deeptech', display_name: 'Deep Tech / AI', icon: '&#x1F916;' },
            { id: 14, category_id: 2, slug: 'defense-tech', display_name: 'Defense Tech', icon: '&#x1F6E1;' },
            { id: 15, category_id: 2, slug: 'govtech', display_name: 'GovTech', icon: '&#x1F3DB;' },
            { id: 16, category_id: 2, slug: 'healthcare', display_name: 'Healthcare', icon: '&#x1F3E5;' },
            { id: 17, category_id: 2, slug: 'climate-tech', display_name: 'Climate Tech', icon: '&#x1F331;' },
            { id: 18, category_id: 2, slug: 'other-vertical', display_name: 'Other', icon: '&#x2699;' },

            // Revenue Model
            { id: 20, category_id: 3, slug: 'subscription', display_name: 'Subscription', icon: '&#x1F504;' },
            { id: 21, category_id: 3, slug: 'transactional', display_name: 'Transactional', icon: '&#x1F4B5;' },
            { id: 22, category_id: 3, slug: 'freemium', display_name: 'Freemium', icon: '&#x1F381;' },
            { id: 23, category_id: 3, slug: 'commission', display_name: 'Commission', icon: '&#x1F4CA;' },

            // Funding Stage
            { id: 30, category_id: 4, slug: 'pre-seed', display_name: 'Pre-seed', icon: '&#x1F331;' },
            { id: 31, category_id: 4, slug: 'seed', display_name: 'Seed', icon: '&#x1F33F;' },
            { id: 32, category_id: 4, slug: 'series-a', display_name: 'Series A', icon: '&#x1F4C8;' },
            { id: 33, category_id: 4, slug: 'series-b', display_name: 'Series B', icon: '&#x1F4C8;' },
            { id: 34, category_id: 4, slug: 'series-c-plus', display_name: 'Series C+', icon: '&#x1F680;' },
            { id: 35, category_id: 4, slug: 'growth', display_name: 'Growth / Late', icon: '&#x1F3C6;' },

            // Journey Stage
            { id: 40, category_id: 5, slug: 'exploring', display_name: 'Exploring', icon: '&#x1F50D;' },
            { id: 41, category_id: 5, slug: 'early-entry', display_name: 'Early Entry', icon: '&#x1F6EB;' },
            { id: 42, category_id: 5, slug: 'scaling', display_name: 'Scaling', icon: '&#x1F3D7;' },
            { id: 43, category_id: 5, slug: 'established', display_name: 'Established', icon: '&#x1F3C6;' },

            // Concern Area
            { id: 50, category_id: 6, slug: 'hiring', display_name: 'Hiring', icon: '&#x1F465;' },
            { id: 51, category_id: 6, slug: 'pmf', display_name: 'Product-Market Fit', icon: '&#x1F3AF;' },
            { id: 52, category_id: 6, slug: 'gtm', display_name: 'Go-to-Market', icon: '&#x1F4E3;' },
            { id: 53, category_id: 6, slug: 'legal', display_name: 'Legal & Compliance', icon: '&#x2696;' },
            { id: 54, category_id: 6, slug: 'fundraising', display_name: 'Fundraising', icon: '&#x1F4B0;' },
            { id: 55, category_id: 6, slug: 'operations', display_name: 'Operations', icon: '&#x2699;' },

            // Location
            { id: 60, category_id: 7, slug: 'east-coast', display_name: 'East Coast', icon: '&#x1F307;' },
            { id: 61, category_id: 7, slug: 'west-coast', display_name: 'West Coast', icon: '&#x1F305;' },
            { id: 62, category_id: 7, slug: 'location-undecided', display_name: 'Undecided', icon: '&#x1F5FA;' },

            // Special Considerations
            { id: 70, category_id: 8, slug: 'itar-relevant', display_name: 'ITAR Relevant', icon: '&#x1F6E1;' },
            { id: 71, category_id: 8, slug: 'cfius-relevant', display_name: 'CFIUS Relevant', icon: '&#x1F3DB;' },
            { id: 72, category_id: 8, slug: 'regulated-industry', display_name: 'Regulated Industry', icon: '&#x1F4DC;' },
            { id: 73, category_id: 8, slug: 'defense-hq-timing', display_name: 'Defense HQ Timing', icon: '&#x26A0;' },
            { id: 74, category_id: 8, slug: 'hipaa-relevant', display_name: 'HIPAA Relevant', icon: '&#x1F3E5;' },
            { id: 75, category_id: 8, slug: 'state-licensing', display_name: 'State Licensing', icon: '&#x1F4CB;' }
        ];
        tagsData.forEach(tag => {
            this.tags.set(tag.id, tag);
            this.tagsBySlug.set(tag.slug, tag);
        });
    }

    // Get tag by ID
    getTag(tagId) {
        return this.tags.get(tagId);
    }

    // Get tag by slug
    getTagBySlug(slug) {
        return this.tagsBySlug.get(slug);
    }

    // Get tag ID by slug
    getTagId(slug) {
        const tag = this.tagsBySlug.get(slug);
        return tag ? tag.id : null;
    }

    // Get all tags
    getAllTags() {
        return Array.from(this.tags.values());
    }

    // Get tags by category
    getTagsByCategory(categoryName) {
        const category = Array.from(this.categories.values()).find(c => c.name === categoryName);
        if (!category) return [];
        return Array.from(this.tags.values()).filter(t => t.category_id === category.id);
    }

    // Get all categories
    getAllCategories() {
        return Array.from(this.categories.values()).sort((a, b) => a.display_order - b.display_order);
    }

    // Get tags for a mistake
    getMistakeTags(mistakeId) {
        const tagRelations = this.mistakeTags.get(mistakeId) || [];
        return tagRelations.map(rel => ({
            ...this.tags.get(rel.tag_id),
            weight: rel.weight
        })).filter(t => t.id);
    }

    // Convert user tag slugs to tag IDs
    slugsToIds(slugs) {
        return slugs.map(slug => this.getTagId(slug)).filter(id => id !== null);
    }

    // ========================================
    // CONTENT MATCHING ALGORITHM
    // ========================================

    /**
     * Score mistakes based on user profile tags
     * @param {Array} userTagSlugs - Array of tag slugs from user profile
     * @param {Array} mistakes - Array of mistake objects
     * @param {Array} specialConsiderations - Array of special consideration slugs
     * @returns {Array} - Sorted array of mistakes with relevance scores
     */
    getMatchedContent(userTagSlugs, mistakes, specialConsiderations = []) {
        const userTagIds = this.slugsToIds(userTagSlugs);
        const specialTagIds = this.slugsToIds(specialConsiderations);

        const scored = mistakes.map(mistake => {
            let score = 0;
            let matchedTags = [];
            let hasSpecialMatch = false;

            // Get tags for this mistake
            const mistakeTags = this.getMistakeTags(mistake.id);

            // Also check legacy relevance arrays if they exist
            const legacyTags = this.getLegacyMistakeTags(mistake);

            // Combine with any new tags
            const allMistakeTags = [...mistakeTags, ...legacyTags];

            // Calculate score based on tag matches
            allMistakeTags.forEach(mistakeTag => {
                const tagId = mistakeTag.id;
                const weight = mistakeTag.weight || 2;
                const tag = this.tags.get(tagId);

                if (userTagIds.includes(tagId)) {
                    score += weight;
                    matchedTags.push(tag);

                    // Check if this is a concern tag (highest weight category)
                    if (tag && this.categories.get(tag.category_id)?.name === 'concern_area') {
                        score += 2;  // Bonus for concern matches
                    }
                }

                // Special consideration matches get priority boost
                if (specialTagIds.includes(tagId)) {
                    score += 6;
                    hasSpecialMatch = true;
                }
            });

            // Check mistake's special_considerations array if it exists
            if (mistake.special_considerations && mistake.special_considerations.length > 0) {
                mistake.special_considerations.forEach(sc => {
                    if (specialConsiderations.includes(sc)) {
                        score += 6;
                        hasSpecialMatch = true;
                    }
                });
            }

            return {
                ...mistake,
                relevanceScore: score,
                matchedTags,
                hasSpecialMatch
            };
        });

        // Sort by score (descending), with special matches first
        return scored.sort((a, b) => {
            // Special matches always come first
            if (a.hasSpecialMatch && !b.hasSpecialMatch) return -1;
            if (!a.hasSpecialMatch && b.hasSpecialMatch) return 1;
            // Then by score
            return b.relevanceScore - a.relevanceScore;
        });
    }

    /**
     * Get legacy tags from mistake's relevance arrays
     * Maps old relevance arrays to new tag structure
     */
    getLegacyMistakeTags(mistake) {
        const tags = [];

        if (!mistake.relevance && !mistake.relevance_verticals) return tags;

        // Handle both nested and flat relevance structures
        const relevance = mistake.relevance || {
            verticals: mistake.relevance_verticals || [],
            stages: mistake.relevance_stages || [],
            journeys: mistake.relevance_journeys || [],
            worries: mistake.relevance_worries || []
        };

        // Map old vertical names to new slugs
        const verticalMap = {
            'b2b-saas': 'saas',
            'deeptech': 'deeptech',
            'other': 'other-vertical'
        };

        // Verticals
        if (relevance.verticals) {
            relevance.verticals.forEach(v => {
                const slug = verticalMap[v] || v;
                const tag = this.tagsBySlug.get(slug);
                if (tag) tags.push({ ...tag, weight: 3 });
            });
        }

        // Funding stages
        if (relevance.stages) {
            relevance.stages.forEach(s => {
                const tag = this.tagsBySlug.get(s);
                if (tag) tags.push({ ...tag, weight: 2 });
            });
        }

        // Journey stages (map old names)
        const journeyMap = { 'early': 'early-entry' };
        if (relevance.journeys) {
            relevance.journeys.forEach(j => {
                const slug = journeyMap[j] || j;
                const tag = this.tagsBySlug.get(slug);
                if (tag) tags.push({ ...tag, weight: 2 });
            });
        }

        // Worries/Concerns (map old names)
        const worryMap = {
            'recruiting': 'hiring',
            'product': 'pmf',
            'strategy': 'gtm'
        };
        if (relevance.worries) {
            relevance.worries.forEach(w => {
                const slug = worryMap[w] || w;
                const tag = this.tagsBySlug.get(slug);
                if (tag) tags.push({ ...tag, weight: 4 });  // Highest weight for concerns
            });
        }

        return tags;
    }

    /**
     * Get top N relevant mistakes
     */
    getTopMistakes(userTagSlugs, mistakes, specialConsiderations = [], count = 3) {
        const matched = this.getMatchedContent(userTagSlugs, mistakes, specialConsiderations);
        return matched.slice(0, count);
    }

    /**
     * Filter mistakes by specific tags
     */
    filterByTags(mistakes, requiredTagSlugs) {
        const requiredIds = this.slugsToIds(requiredTagSlugs);
        return mistakes.filter(mistake => {
            const mistakeTags = this.getMistakeTags(mistake.id);
            const mistakeTagIds = mistakeTags.map(t => t.id);
            return requiredIds.every(id => mistakeTagIds.includes(id));
        });
    }

    /**
     * Get mistakes with special consideration
     */
    getMistakesWithSpecialConsideration(mistakes, consideration) {
        return mistakes.filter(mistake => {
            // Check special_considerations array
            if (mistake.special_considerations?.includes(consideration)) {
                return true;
            }
            // Check tags
            const mistakeTags = this.getMistakeTags(mistake.id);
            return mistakeTags.some(t => t.slug === consideration);
        });
    }

    // ========================================
    // TAG MANAGEMENT (for content builder)
    // ========================================

    /**
     * Create a custom tag
     */
    async createCustomTag(supabase, tagData) {
        const customCategory = Array.from(this.categories.values()).find(c => c.name === 'custom');

        const { data, error } = await supabase
            .from('tags')
            .insert({
                category_id: customCategory?.id,
                slug: this.slugify(tagData.display_name),
                display_name: tagData.display_name,
                description: tagData.description,
                icon: tagData.icon || '&#x1F3F7;',
                is_predefined: false,
                is_active: true
            })
            .select()
            .single();

        if (error) throw error;

        // Add to local cache
        this.tags.set(data.id, data);
        this.tagsBySlug.set(data.slug, data);

        return data;
    }

    /**
     * Associate tags with a mistake
     */
    async setMistakeTags(supabase, mistakeId, tagAssignments) {
        // tagAssignments = [{ tag_id, relevance_weight }, ...]

        // First, remove existing tags
        await supabase
            .from('mistake_tags')
            .delete()
            .eq('mistake_id', mistakeId);

        // Insert new tags
        if (tagAssignments.length > 0) {
            const { error } = await supabase
                .from('mistake_tags')
                .insert(tagAssignments.map(ta => ({
                    mistake_id: mistakeId,
                    tag_id: ta.tag_id,
                    relevance_weight: ta.relevance_weight || 2
                })));

            if (error) throw error;
        }

        // Update local cache
        this.mistakeTags.set(mistakeId, tagAssignments);
    }

    /**
     * Helper to create URL-safe slug
     */
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // ========================================
    // RENDERING HELPERS
    // ========================================

    /**
     * Render tag as HTML chip
     */
    renderTagChip(tag, options = {}) {
        const { showIcon = true, showWeight = false, weight = null, removable = false } = options;
        const iconHtml = showIcon && tag.icon ? `<span class="tag-icon">${tag.icon}</span>` : '';
        const weightHtml = showWeight && weight ? `<span class="tag-weight">(${weight})</span>` : '';
        const removeBtn = removable ? `<button class="tag-remove" data-tag-id="${tag.id}">&times;</button>` : '';

        return `
            <span class="tag-chip" data-tag-slug="${tag.slug}" data-tag-id="${tag.id}">
                ${iconHtml}
                <span class="tag-label">${tag.display_name}</span>
                ${weightHtml}
                ${removeBtn}
            </span>
        `;
    }

    /**
     * Render tag selector for content builder
     */
    renderTagSelector(selectedTagIds = [], weights = {}) {
        let html = '';

        this.getAllCategories().forEach(category => {
            if (category.name === 'custom') return; // Custom tags shown separately

            const categoryTags = this.getTagsByCategory(category.name);
            if (categoryTags.length === 0) return;

            html += `
                <div class="tag-category-group" data-category="${category.name}">
                    <h5 class="tag-category-title">${category.display_name}</h5>
                    <div class="tag-options">
            `;

            categoryTags.forEach(tag => {
                const isSelected = selectedTagIds.includes(tag.id);
                const weight = weights[tag.id] || 2;

                html += `
                    <div class="tag-option ${isSelected ? 'selected' : ''}">
                        <label class="tag-checkbox-label">
                            <input type="checkbox"
                                   name="tags[]"
                                   value="${tag.id}"
                                   ${isSelected ? 'checked' : ''}
                                   data-tag-slug="${tag.slug}">
                            <span class="tag-icon">${tag.icon}</span>
                            <span class="tag-name">${tag.display_name}</span>
                        </label>
                        <input type="range"
                               class="tag-weight-slider"
                               min="1" max="5"
                               value="${weight}"
                               data-tag-id="${tag.id}"
                               ${!isSelected ? 'disabled' : ''}>
                        <span class="weight-value">${weight}</span>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        return html;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TagManager;
}

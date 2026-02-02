// ========================================
// US EXPANSION ANTIPLAYBOOK - QUIZ ENGINE
// Dynamic quiz with conditional logic and tag assignment
// ========================================

class QuizEngine {
    constructor(config = {}) {
        this.questions = [];
        this.conditions = [];
        this.options = {};
        this.state = {
            currentQuestionIndex: 0,
            questionPath: [],
            answers: {},
            selectedOptions: {},  // For multi-select tracking
            assignedTags: new Set(),
            specialConsiderations: new Set(),
            isComplete: false,
            profile: null
        };
        this.onQuestionChange = config.onQuestionChange || (() => {});
        this.onComplete = config.onComplete || (() => {});
        this.onTagAssigned = config.onTagAssigned || (() => {});
    }

    // Initialize quiz engine
    init() {
        this.loadFallbackData();
        this.buildQuestionPath();
        return true;
    }

    // Fallback data if Supabase unavailable
    loadFallbackData() {
        this.questions = [
            {
                id: 1,
                question_key: 'business_model',
                question_text: "What's your business model?",
                question_subtitle: 'How do you primarily serve customers?',
                question_icon: '&#x1F4BC;',
                display_order: 1,
                is_multi_select: false,
                is_conditional: false
            },
            {
                id: 2,
                question_key: 'vertical',
                question_text: "What's your industry vertical?",
                question_subtitle: 'Select the category that best describes your company',
                question_icon: '&#x1F3E2;',
                display_order: 2,
                is_multi_select: false,
                is_conditional: false
            },
            {
                id: 3,
                question_key: 'revenue_model',
                question_text: "What's your revenue model?",
                question_subtitle: 'How do you generate revenue?',
                question_icon: '&#x1F4B5;',
                display_order: 3,
                is_multi_select: false,
                is_conditional: false
            },
            {
                id: 4,
                question_key: 'funding_stage',
                question_text: "What's your funding stage?",
                question_subtitle: 'Current stage of your company',
                question_icon: '&#x1F4C8;',
                display_order: 4,
                is_multi_select: false,
                is_conditional: false
            },
            {
                id: 5,
                question_key: 'journey_stage',
                question_text: 'Where are you in your US journey?',
                question_subtitle: 'Your current expansion status',
                question_icon: '&#x1F5FA;',
                display_order: 5,
                is_multi_select: false,
                is_conditional: false
            },
            {
                id: 6,
                question_key: 'concerns',
                question_text: 'What are your primary concerns?',
                question_subtitle: 'Select all that apply',
                question_icon: '&#x26A0;',
                display_order: 6,
                is_multi_select: true,
                is_conditional: false
            },
            {
                id: 7,
                question_key: 'gov_contracts',
                question_text: 'Are you targeting government contracts?',
                question_subtitle: 'US or European government sales',
                question_icon: '&#x1F3DB;',
                display_order: 7,
                is_multi_select: false,
                is_conditional: true
            },
            {
                id: 8,
                question_key: 'security_clearance',
                question_text: 'Do you need security clearances?',
                question_subtitle: 'For government or defense work',
                question_icon: '&#x1F512;',
                display_order: 8,
                is_multi_select: false,
                is_conditional: true
            },
            {
                id: 9,
                question_key: 'licensing_status',
                question_text: 'Have you started the licensing process?',
                question_subtitle: 'For regulated industries',
                question_icon: '&#x1F4CB;',
                display_order: 9,
                is_multi_select: false,
                is_conditional: true
            },
            {
                id: 10,
                question_key: 'hipaa_compliance',
                question_text: 'Is HIPAA compliance required?',
                question_subtitle: 'For healthcare data handling',
                question_icon: '&#x1F3E5;',
                display_order: 10,
                is_multi_select: false,
                is_conditional: true
            }
        ];

        // Options for each question
        this.options = {
            1: [ // business_model
                { option_key: 'b2b', option_label: 'B2B', option_description: 'Selling to other businesses', option_icon: '&#x1F3E2;' },
                { option_key: 'b2c', option_label: 'B2C', option_description: 'Selling directly to consumers', option_icon: '&#x1F464;' },
                { option_key: 'b2b2c', option_label: 'B2B2C', option_description: 'Selling to businesses who serve consumers', option_icon: '&#x1F465;' },
                { option_key: 'marketplace', option_label: 'Marketplace', option_description: 'Connecting buyers and sellers', option_icon: '&#x1F6D2;' },
                { option_key: 'p2p', option_label: 'P2P / Consumer', option_description: 'Peer-to-peer or consumer platform', option_icon: '&#x1F91D;' }
            ],
            2: [ // vertical
                { option_key: 'saas', option_label: 'SaaS', option_description: 'Software as a Service', option_icon: '&#x2601;' },
                { option_key: 'fintech', option_label: 'Fintech', option_description: 'Financial technology', option_icon: '&#x1F4B3;' },
                { option_key: 'consumer', option_label: 'Consumer', option_description: 'Consumer products or services', option_icon: '&#x1F6CD;' },
                { option_key: 'deeptech', option_label: 'Deep Tech / AI', option_description: 'Advanced technology or AI', option_icon: '&#x1F916;' },
                { option_key: 'defense-tech', option_label: 'Defense Tech', option_description: 'Defense and security technology', option_icon: '&#x1F6E1;' },
                { option_key: 'govtech', option_label: 'GovTech', option_description: 'Government technology', option_icon: '&#x1F3DB;' },
                { option_key: 'healthcare', option_label: 'Healthcare', option_description: 'Healthcare and life sciences', option_icon: '&#x1F3E5;' },
                { option_key: 'climate-tech', option_label: 'Climate Tech', option_description: 'Climate and sustainability', option_icon: '&#x1F331;' },
                { option_key: 'other-vertical', option_label: 'Other', option_description: 'Other industry', option_icon: '&#x2699;' }
            ],
            3: [ // revenue_model
                { option_key: 'subscription', option_label: 'Subscription', option_description: 'Recurring subscription fees', option_icon: '&#x1F504;' },
                { option_key: 'transactional', option_label: 'Transactional', option_description: 'Per-transaction or usage fees', option_icon: '&#x1F4B5;' },
                { option_key: 'freemium', option_label: 'Freemium', option_description: 'Free tier with paid upgrades', option_icon: '&#x1F381;' },
                { option_key: 'commission', option_label: 'Commission', option_description: 'Take rate on transactions', option_icon: '&#x1F4CA;' }
            ],
            4: [ // funding_stage
                { option_key: 'pre-seed', option_label: 'Pre-seed', option_description: 'Early stage, pre-funding', option_icon: '&#x1F331;' },
                { option_key: 'seed', option_label: 'Seed', option_description: 'Seed round completed', option_icon: '&#x1F33F;' },
                { option_key: 'series-a', option_label: 'Series A', option_description: 'Series A completed', option_icon: '&#x1F4C8;' },
                { option_key: 'series-b', option_label: 'Series B', option_description: 'Series B completed', option_icon: '&#x1F4C8;' },
                { option_key: 'series-c-plus', option_label: 'Series C+', option_description: 'Series C or later', option_icon: '&#x1F680;' },
                { option_key: 'growth', option_label: 'Growth / Late', option_description: 'Growth or late stage', option_icon: '&#x1F3C6;' }
            ],
            5: [ // journey_stage
                { option_key: 'exploring', option_label: 'Exploring', option_description: 'Researching the US market', option_icon: '&#x1F50D;' },
                { option_key: 'early-entry', option_label: 'Early Entry', option_description: 'First hire or entity setup', option_icon: '&#x1F6EB;' },
                { option_key: 'scaling', option_label: 'Scaling', option_description: '5-20 US employees', option_icon: '&#x1F3D7;' },
                { option_key: 'established', option_label: 'Established', option_description: 'Major US presence', option_icon: '&#x1F3C6;' }
            ],
            6: [ // concerns (multi-select)
                { option_key: 'hiring', option_label: 'Hiring', option_description: 'Finding the right talent', option_icon: '&#x1F465;' },
                { option_key: 'pmf', option_label: 'Product-Market Fit', option_description: 'Adapting product for US', option_icon: '&#x1F3AF;' },
                { option_key: 'gtm', option_label: 'Go-to-Market', option_description: 'Sales and marketing strategy', option_icon: '&#x1F4E3;' },
                { option_key: 'legal', option_label: 'Legal & Compliance', option_description: 'Regulations and legal setup', option_icon: '&#x2696;' },
                { option_key: 'fundraising', option_label: 'Fundraising', option_description: 'Raising US capital', option_icon: '&#x1F4B0;' },
                { option_key: 'operations', option_label: 'Operations', option_description: 'Day-to-day operations', option_icon: '&#x2699;' }
            ],
            7: [ // gov_contracts (conditional)
                { option_key: 'us-gov', option_label: 'US Government', option_description: 'Targeting US federal/state contracts', option_icon: '&#x1F1FA;&#x1F1F8;' },
                { option_key: 'eu-gov', option_label: 'European Government', option_description: 'Targeting European government contracts', option_icon: '&#x1F1EA;&#x1F1FA;' },
                { option_key: 'both-gov', option_label: 'Both', option_description: 'Targeting both US and European governments', option_icon: '&#x1F30D;' },
                { option_key: 'neither-gov', option_label: 'Neither', option_description: 'Not targeting government contracts', option_icon: '&#x1F3E2;' }
            ],
            8: [ // security_clearance (conditional)
                { option_key: 'have-clearance', option_label: 'Yes, we have', option_description: 'Team already has security clearances', option_icon: '&#x2705;' },
                { option_key: 'need-clearance', option_label: 'Need to obtain', option_description: 'Will need to obtain clearances', option_icon: '&#x1F512;' },
                { option_key: 'no-clearance', option_label: 'Not needed', option_description: 'Security clearances not required', option_icon: '&#x274C;' }
            ],
            9: [ // licensing_status (conditional)
                { option_key: 'licensed', option_label: 'Already licensed', option_description: 'Have US licenses', option_icon: '&#x2705;' },
                { option_key: 'in-progress', option_label: 'In progress', option_description: 'License applications submitted', option_icon: '&#x23F3;' },
                { option_key: 'not-started', option_label: 'Not started', option_description: "Haven't begun licensing process", option_icon: '&#x274C;' }
            ],
            10: [ // hipaa_compliance (conditional)
                { option_key: 'hipaa-yes', option_label: 'Yes, required', option_description: 'Handling protected health information', option_icon: '&#x2705;' },
                { option_key: 'hipaa-no', option_label: 'No, not required', option_description: 'Not handling health data', option_icon: '&#x274C;' },
                { option_key: 'hipaa-unsure', option_label: 'Unsure', option_description: 'Need to determine requirements', option_icon: '&#x2753;' }
            ]
        };

        // Conditions
        this.conditions = [
            { source_question_key: 'vertical', source_option_keys: ['defense-tech', 'govtech'], target_question_key: 'gov_contracts', condition_type: 'show' },
            { source_question_key: 'vertical', source_option_keys: ['defense-tech', 'govtech'], target_question_key: 'security_clearance', condition_type: 'show' },
            { source_question_key: 'vertical', source_option_keys: ['fintech'], target_question_key: 'licensing_status', condition_type: 'show' },
            { source_question_key: 'vertical', source_option_keys: ['healthcare'], target_question_key: 'hipaa_compliance', condition_type: 'show' }
        ];
    }

    // Build the question path based on current answers
    buildQuestionPath() {
        this.state.questionPath = [];

        // Add core questions (non-conditional)
        const coreQuestions = this.questions.filter(q => !q.is_conditional);
        coreQuestions.forEach(q => {
            this.state.questionPath.push(q.question_key);
        });

        // Evaluate conditions for conditional questions
        this.evaluateConditions();
    }

    // Evaluate all conditions and update question path
    evaluateConditions() {
        const newPath = this.questions
            .filter(q => !q.is_conditional)
            .map(q => q.question_key);

        // Check each condition
        this.conditions.forEach(condition => {
            const sourceAnswer = this.state.answers[condition.source_question_key];
            const shouldShow = condition.source_option_keys.some(key => {
                if (Array.isArray(sourceAnswer)) {
                    return sourceAnswer.includes(key);
                }
                return sourceAnswer === key;
            });

            if (shouldShow && condition.condition_type === 'show') {
                // Find position to insert (after the source question)
                const sourceIndex = newPath.indexOf(condition.source_question_key);
                if (sourceIndex !== -1 && !newPath.includes(condition.target_question_key)) {
                    // Find the right position for this conditional question
                    const targetQuestion = this.questions.find(q => q.question_key === condition.target_question_key);
                    if (targetQuestion) {
                        // Insert based on display_order
                        let insertIndex = newPath.length;
                        for (let i = sourceIndex + 1; i < newPath.length; i++) {
                            const pathQuestion = this.questions.find(q => q.question_key === newPath[i]);
                            if (pathQuestion && pathQuestion.display_order > targetQuestion.display_order) {
                                insertIndex = i;
                                break;
                            }
                        }
                        newPath.splice(insertIndex, 0, condition.target_question_key);
                    }
                }
            }
        });

        this.state.questionPath = newPath;
    }

    // Get current question
    getCurrentQuestion() {
        const questionKey = this.state.questionPath[this.state.currentQuestionIndex];
        const question = this.questions.find(q => q.question_key === questionKey);
        if (!question) return null;

        const options = this.options[question.id] || [];
        return {
            ...question,
            options,
            currentIndex: this.state.currentQuestionIndex,
            totalQuestions: this.state.questionPath.length,
            isFirst: this.state.currentQuestionIndex === 0,
            isLast: this.state.currentQuestionIndex === this.state.questionPath.length - 1
        };
    }

    // Get question by key
    getQuestion(questionKey) {
        const question = this.questions.find(q => q.question_key === questionKey);
        if (!question) return null;
        const options = this.options[question.id] || [];
        return { ...question, options };
    }

    // Answer a question
    answer(questionKey, value) {
        const question = this.questions.find(q => q.question_key === questionKey);
        if (!question) return false;

        if (question.is_multi_select) {
            // Toggle selection for multi-select
            if (!this.state.selectedOptions[questionKey]) {
                this.state.selectedOptions[questionKey] = new Set();
            }

            if (Array.isArray(value)) {
                // Replace entire selection
                this.state.selectedOptions[questionKey] = new Set(value);
            } else {
                // Toggle single value
                if (this.state.selectedOptions[questionKey].has(value)) {
                    this.state.selectedOptions[questionKey].delete(value);
                } else {
                    this.state.selectedOptions[questionKey].add(value);
                }
            }

            this.state.answers[questionKey] = Array.from(this.state.selectedOptions[questionKey]);
        } else {
            this.state.answers[questionKey] = value;
        }

        // Re-evaluate conditions after answer
        this.evaluateConditions();

        // Assign tags based on answer
        this.assignTagsForAnswer(questionKey, this.state.answers[questionKey]);

        return true;
    }

    // Assign tags based on question answer
    assignTagsForAnswer(questionKey, value) {
        const values = Array.isArray(value) ? value : [value];

        // Map question answers to tag slugs
        const tagMappings = {
            business_model: values,
            vertical: values,
            revenue_model: values,
            funding_stage: values,
            journey_stage: values,
            concerns: values,  // Multi-select - already an array
            gov_contracts: values,
            security_clearance: values,
            licensing_status: values,
            hipaa_compliance: values
        };

        if (tagMappings[questionKey]) {
            tagMappings[questionKey].forEach(v => {
                this.state.assignedTags.add(v);
                this.onTagAssigned(v);
            });
        }

        // Special considerations
        if (questionKey === 'vertical') {
            if (values.includes('defense-tech') || values.includes('govtech')) {
                this.state.specialConsiderations.add('itar-relevant');
                this.state.specialConsiderations.add('cfius-relevant');
            }
            if (values.includes('fintech')) {
                this.state.specialConsiderations.add('regulated-industry');
                this.state.specialConsiderations.add('state-licensing');
            }
            if (values.includes('healthcare')) {
                this.state.specialConsiderations.add('hipaa-relevant');
            }
        }

        // Defense tech + early stage = HQ timing warning
        if (this.state.answers.vertical && this.state.answers.journey_stage) {
            const isDefenseTech = ['defense-tech', 'govtech'].includes(this.state.answers.vertical);
            const isEarlyStage = ['exploring', 'early-entry'].includes(this.state.answers.journey_stage);
            if (isDefenseTech && isEarlyStage) {
                this.state.specialConsiderations.add('defense-hq-timing');
            }
        }
    }

    // Move to next question
    next() {
        if (this.state.currentQuestionIndex < this.state.questionPath.length - 1) {
            this.state.currentQuestionIndex++;
            this.onQuestionChange(this.getCurrentQuestion());
            return true;
        }
        return false;
    }

    // Move to previous question
    previous() {
        if (this.state.currentQuestionIndex > 0) {
            this.state.currentQuestionIndex--;
            this.onQuestionChange(this.getCurrentQuestion());
            return true;
        }
        return false;
    }

    // Complete the quiz
    complete() {
        this.state.isComplete = true;
        this.state.profile = this.generateProfile();
        this.onComplete(this.state.profile);
        return this.state.profile;
    }

    // Generate user profile from answers
    generateProfile() {
        const answers = this.state.answers;

        // Determine archetype based on journey stage
        const archetypes = {
            'exploring': { name: 'The Explorer', avatar: '&#x1F50D;', level: 1, description: 'Early-stage company researching the US market' },
            'early-entry': { name: 'The Pioneer', avatar: '&#x1F6EB;', level: 2, description: 'Making first moves into the US market' },
            'scaling': { name: 'The Builder', avatar: '&#x1F3D7;', level: 3, description: 'Actively scaling US operations' },
            'established': { name: 'The Champion', avatar: '&#x1F3C6;', level: 4, description: 'Established US presence, optimizing for growth' }
        };

        const archetype = archetypes[answers.journey_stage] || archetypes.exploring;

        // Build attribute list
        const attributes = [];

        // Vertical
        const verticalLabels = {
            'saas': 'SaaS', 'fintech': 'Fintech', 'consumer': 'Consumer',
            'deeptech': 'Deep Tech / AI', 'defense-tech': 'Defense Tech',
            'govtech': 'GovTech', 'healthcare': 'Healthcare',
            'climate-tech': 'Climate Tech', 'other-vertical': 'Other'
        };
        if (answers.vertical) {
            attributes.push({ icon: '&#x1F3E2;', label: verticalLabels[answers.vertical] || answers.vertical });
        }

        // Business Model
        const businessLabels = {
            'b2b': 'B2B', 'b2c': 'B2C', 'b2b2c': 'B2B2C',
            'marketplace': 'Marketplace', 'p2p': 'P2P'
        };
        if (answers.business_model) {
            attributes.push({ icon: '&#x1F4BC;', label: businessLabels[answers.business_model] || answers.business_model });
        }

        // Funding Stage
        const stageLabels = {
            'pre-seed': 'Pre-seed', 'seed': 'Seed', 'series-a': 'Series A',
            'series-b': 'Series B', 'series-c-plus': 'Series C+', 'growth': 'Growth'
        };
        if (answers.funding_stage) {
            attributes.push({ icon: '&#x1F4C8;', label: stageLabels[answers.funding_stage] || answers.funding_stage });
        }

        // Concerns
        const concernLabels = {
            'hiring': 'Hiring Focus', 'pmf': 'PMF Focus', 'gtm': 'GTM Focus',
            'legal': 'Legal Focus', 'fundraising': 'Fundraising', 'operations': 'Ops Focus'
        };
        if (answers.concerns && answers.concerns.length > 0) {
            const primaryConcern = answers.concerns[0];
            attributes.push({ icon: '&#x26A0;', label: concernLabels[primaryConcern] || primaryConcern });
        }

        return {
            ...archetype,
            attributes,
            answers: { ...answers },
            tags: Array.from(this.state.assignedTags),
            specialConsiderations: Array.from(this.state.specialConsiderations),
            hasDefenseHqWarning: this.state.specialConsiderations.has('defense-hq-timing')
        };
    }

    // Check if Defense Tech HQ warning should show
    shouldShowDefenseHqWarning() {
        return this.state.specialConsiderations.has('defense-hq-timing');
    }

    // Get special warnings/considerations
    getWarnings() {
        const warnings = [];

        if (this.state.specialConsiderations.has('defense-hq-timing')) {
            warnings.push({
                type: 'priority',
                title: 'Important: US HQ Timing for Defense Tech',
                message: 'Based on your profile, you should know that Defense Tech companies often benefit from maintaining European HQ status when selling to European governments. Setting up a US HQ too early could cost you opportunities.',
                relatedMistakeTag: 'defense-hq-timing'
            });
        }

        if (this.state.specialConsiderations.has('state-licensing') &&
            this.state.answers.licensing_status === 'not-started') {
            warnings.push({
                type: 'warning',
                title: 'Licensing Timeline Alert',
                message: 'State-by-state licensing for fintech can take 18+ months. Consider starting the process early.',
                relatedMistakeTag: 'state-licensing'
            });
        }

        return warnings;
    }

    // Reset the quiz
    reset() {
        this.state = {
            currentQuestionIndex: 0,
            questionPath: [],
            answers: {},
            selectedOptions: {},
            assignedTags: new Set(),
            specialConsiderations: new Set(),
            isComplete: false,
            profile: null
        };
        this.buildQuestionPath();
    }

    // Get progress percentage
    getProgress() {
        return Math.round((this.state.currentQuestionIndex / this.state.questionPath.length) * 100);
    }

    // Get all answers
    getAnswers() {
        return { ...this.state.answers };
    }

    // Get assigned tags
    getTags() {
        return Array.from(this.state.assignedTags);
    }

    // Get special considerations
    getSpecialConsiderations() {
        return Array.from(this.state.specialConsiderations);
    }

    // Check if a question has been answered
    isAnswered(questionKey) {
        const answer = this.state.answers[questionKey];
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null;
    }

    // Get selected options for multi-select question
    getSelectedOptions(questionKey) {
        return this.state.selectedOptions[questionKey]
            ? Array.from(this.state.selectedOptions[questionKey])
            : [];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizEngine;
}

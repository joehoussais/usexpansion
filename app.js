// ========================================
// US EXPANSION ANTIPLAYBOOK - APP
// ========================================

// State management
const state = {
    currentQuestion: 1,
    totalQuestions: 4,
    answers: {},
    emailUnlocked: false,
    email: localStorage.getItem('rrw_email') || null,
    userProfile: null,
    selectedCategory: null,
    // Auth state
    user: null,
    isAdmin: false,
    // Data loaded from Supabase
    mistakesData: [],
    testimonialsData: [],
    communityMistakes: [],
    // New modules
    quizEngine: null,
    tagManager: null,
    contentBuilder: null
};

// Admin email list (you can also store this in Supabase)
const ADMIN_EMAILS = [
    'joseph@redriverwest.com',
    'admin@redriverwest.com',
    'team@redriverwest.com'
];

// Mobile Nav Toggle
function toggleMobileNav() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('mainNav');
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileNav() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('mainNav');
    burger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Check auth status first
        await checkAuthStatus();
    } catch (error) {
        console.error('Auth check failed:', error);
    }

    try {
        // Initialize new modules
        await initNewModules();
    } catch (error) {
        console.error('Module initialization failed:', error);
    }

    try {
        // Load data from Supabase
        await loadAllData();
    } catch (error) {
        console.error('Data loading failed:', error);
        useFallbackData();
    }

    // Initialize UI - these must always run
    initQuiz();
    initMistakesGrid();
    initTestimonials();
    initFilters();
    checkEmailStatus();
    initShareSection();
    renderCommunityMistakes();
    updateAuthUI();

    // Listen for auth changes
    try {
        supabase.auth.onAuthStateChange((event, session) => {
            state.user = session?.user || null;
            state.isAdmin = state.user ? ADMIN_EMAILS.includes(state.user.email) : false;
            updateAuthUI();
            updateShareSectionAuth();
        });
    } catch (error) {
        console.error('Auth state change listener failed:', error);
    }
});

// ========================================
// NEW MODULES INITIALIZATION
// ========================================

async function initNewModules() {
    // Initialize Tag Manager
    if (typeof TagManager !== 'undefined') {
        state.tagManager = new TagManager();
        await state.tagManager.init(supabase);
        console.log('Tag Manager initialized');
    }

    // Initialize Quiz Engine
    if (typeof QuizEngine !== 'undefined') {
        state.quizEngine = new QuizEngine({
            onQuestionChange: handleQuizQuestionChange,
            onComplete: handleQuizComplete,
            onTagAssigned: handleTagAssigned
        });
        await state.quizEngine.init(supabase);
        console.log('Quiz Engine initialized');
    }

    // Initialize Content Builder (only for admin)
    if (typeof ContentBuilder !== 'undefined' && state.tagManager) {
        state.contentBuilder = new ContentBuilder({
            supabase: supabase,
            tagManager: state.tagManager,
            onSave: handleContentSave,
            onDelete: handleContentDelete
        });
        console.log('Content Builder ready');
    }
}

function handleQuizQuestionChange(question) {
    console.log('Quiz question changed:', question);
}

function handleQuizComplete(profile) {
    console.log('Quiz completed with profile:', profile);
    // Show defense tech warning if applicable
    if (profile.hasDefenseHqWarning) {
        showDefenseWarningModal();
    }
}

function handleTagAssigned(tag) {
    console.log('Tag assigned:', tag);
}

function handleContentSave(mistakeId) {
    console.log('Content saved:', mistakeId);
    // Reload mistakes
    loadAllData().then(() => {
        initMistakesGrid();
    });
}

function handleContentDelete(mistakeId) {
    console.log('Content deleted:', mistakeId);
    // Reload mistakes
    loadAllData().then(() => {
        initMistakesGrid();
    });
}

// ========================================
// SUPABASE DATA LOADING
// ========================================

async function loadAllData() {
    try {
        // Load all data in parallel
        const [mistakes, testimonials, community] = await Promise.all([
            loadMistakes(),
            loadTestimonials(),
            loadCommunityMistakes()
        ]);

        // Only use Supabase data if we got results
        if (mistakes && mistakes.length > 0) {
            state.mistakesData = mistakes;
        } else {
            console.log('No mistakes from Supabase, using fallback');
            state.mistakesData = typeof mistakesData !== 'undefined' ? mistakesData : [];
        }

        if (testimonials && testimonials.length > 0) {
            state.testimonialsData = testimonials;
        } else {
            console.log('No testimonials from Supabase, using fallback');
            state.testimonialsData = typeof testimonialsData !== 'undefined' ? testimonialsData : [];
        }

        state.communityMistakes = community || [];

        console.log('Data loaded:', state.mistakesData.length, 'mistakes,', state.testimonialsData.length, 'testimonials');
    } catch (error) {
        console.error('Error loading data:', error);
        // Fall back to hardcoded data if Supabase fails
        useFallbackData();
    }
}

async function loadMistakes() {
    try {
        const { data, error } = await supabase
            .from('mistakes')
            .select('*')
            .eq('is_active', true)
            .order('display_order');

        if (error) {
            console.error('Supabase mistakes error:', error);
            return [];
        }

        if (!data || data.length === 0) return [];

        // Transform to match expected format
        return data.map(m => ({
            id: m.id,
            title: m.title,
            icon: m.icon,
            category: m.category,
            cost: m.cost,
            preview: m.preview,
            relevance: {
                verticals: m.relevance_verticals || [],
                stages: m.relevance_stages || [],
                journeys: m.relevance_journeys || [],
                worries: m.relevance_worries || []
            },
            content: {
                problem: m.problem,
                points: typeof m.points === 'string' ? JSON.parse(m.points) : m.points,
                remediation: m.remediation,
                resource: m.resource_url
            }
        }));
    } catch (err) {
        console.error('loadMistakes failed:', err);
        return [];
    }
}

async function loadTestimonials() {
    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('is_active', true)
            .order('display_order');

        if (error) {
            console.error('Supabase testimonials error:', error);
            return [];
        }

        if (!data || data.length === 0) return [];

        return data.map(t => ({
            id: t.id,
            content: t.content,
            author: t.author_name,
            role: t.author_role,
            avatar: t.author_avatar
        }));
    } catch (err) {
        console.error('loadTestimonials failed:', err);
        return [];
    }
}

async function loadCommunityMistakes() {
    try {
        const { data, error } = await supabase
            .from('community_mistakes')
            .select('*')
            .eq('approved', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase community_mistakes error:', error);
            return [];
        }

        if (!data || data.length === 0) return [];

        return data.map(m => ({
            id: m.id,
            title: m.title,
            story: m.story,
            cost: m.cost,
            category: m.category,
            author: {
                name: m.author_name,
                avatar: m.author_avatar,
                level: m.author_level,
                attributes: typeof m.author_attributes === 'string'
                    ? JSON.parse(m.author_attributes)
                    : m.author_attributes
            },
            timestamp: m.created_at
        }));
    } catch (err) {
        console.error('loadCommunityMistakes failed:', err);
        return [];
    }
}

function useFallbackData() {
    // Use data from data.js as fallback
    if (typeof mistakesData !== 'undefined') {
        state.mistakesData = mistakesData;
    }
    if (typeof testimonialsData !== 'undefined') {
        state.testimonialsData = testimonialsData;
    }
    state.communityMistakes = JSON.parse(localStorage.getItem('rrw_community_mistakes') || '[]');
    console.log('Using fallback data');
}

// ========================================
// QUIZ FUNCTIONALITY
// ========================================

function initQuiz() {
    // If QuizEngine is available, render dynamic quiz
    if (state.quizEngine) {
        renderCurrentQuestion();
    } else {
        // Fallback: attach click handlers to static HTML (if present)
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', handleOptionClick);
        });
    }

    // Initialize adventure character at starting position
    initAdventureCharacter();
}

// Render the current question from QuizEngine
function renderCurrentQuestion() {
    const container = document.getElementById('quizQuestionsContainer');
    if (!container || !state.quizEngine) return;

    const question = state.quizEngine.getCurrentQuestion();
    if (!question) return;

    // Update state for compatibility with existing code
    state.currentQuestion = question.currentIndex + 1;
    state.totalQuestions = question.totalQuestions;

    // Build question HTML
    let html = `
        <div class="quiz-question active" id="q${question.currentIndex + 1}">
            ${!question.isFirst ? '<button class="prev-btn" onclick="previousQuestion()">&#x2190; Previous</button>' : ''}
            <div class="question-icon">${question.question_icon || '&#x2753;'}</div>
            <h3 class="question-title">${question.question_text}</h3>
            ${question.question_subtitle ? `<p class="question-subtitle">${question.question_subtitle}</p>` : ''}
            <div class="options-grid ${question.is_multi_select ? 'multi-select' : ''} ${question.options.length > 4 ? 'options-vertical' : ''}">
    `;

    // Render options
    question.options.forEach(option => {
        const isSelected = question.is_multi_select
            ? state.quizEngine.getSelectedOptions(question.question_key).includes(option.option_key)
            : state.quizEngine.state.answers[question.question_key] === option.option_key;

        const hasDescription = option.option_description && option.option_description.length > 0;
        const wideClass = hasDescription ? 'wide' : '';

        html += `
            <button class="option-btn ${wideClass} ${isSelected ? 'selected' : ''}"
                    data-question="${question.question_key}"
                    data-value="${option.option_key}"
                    onclick="handleDynamicOptionClick(this)">
                <span class="option-icon">${option.option_icon || '&#x2022;'}</span>
                ${hasDescription ? `
                    <span class="option-text">
                        <span class="option-label">${option.option_label}</span>
                        <span class="option-desc">${option.option_description}</span>
                    </span>
                ` : `
                    <span class="option-label">${option.option_label}</span>
                `}
                ${question.is_multi_select ? '<span class="checkbox-indicator"></span>' : ''}
            </button>
        `;
    });

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Show/hide multi-select continue button
    const continueBtn = document.getElementById('multiSelectContinue');
    if (continueBtn) {
        if (question.is_multi_select) {
            continueBtn.classList.remove('hidden');
        } else {
            continueBtn.classList.add('hidden');
        }
    }

    // Update progress
    updateProgress();
}

// Handle option click for dynamic quiz
function handleDynamicOptionClick(btn) {
    const questionKey = btn.dataset.question;
    const value = btn.dataset.value;
    const question = state.quizEngine.getQuestion(questionKey);

    if (question.is_multi_select) {
        // Toggle selection for multi-select
        btn.classList.toggle('selected');
        state.quizEngine.answer(questionKey, value);
    } else {
        // Single select - record answer and advance
        const container = btn.closest('.quiz-question');
        container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        state.quizEngine.answer(questionKey, value);

        // Visual feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 100);

        // Auto-advance after short delay
        setTimeout(() => {
            advanceQuiz();
        }, 300);
    }
}

// Confirm multi-select and advance
function confirmMultiSelect() {
    const currentQuestion = state.quizEngine.getCurrentQuestion();
    if (currentQuestion && state.quizEngine.isAnswered(currentQuestion.question_key)) {
        advanceQuiz();
    }
}

// Advance to next question or show results
function advanceQuiz() {
    const hasNext = state.quizEngine.next();

    if (hasNext) {
        // Move character
        moveCharacterToStep(state.quizEngine.state.currentQuestionIndex + 1);
        // Render new question
        renderCurrentQuestion();
    } else {
        // Quiz complete
        const profile = state.quizEngine.complete();
        showDynamicResults(profile);
    }
}

// Show results from dynamic quiz
function showDynamicResults(profile) {
    // Move character to final destination
    moveCharacterToStep(state.totalQuestions);

    setTimeout(() => {
        document.getElementById('quizContainer').classList.add('hidden');

        // Store profile in state
        state.userProfile = profile;

        // Render the profile card
        renderProfile(profile);

        // Get relevant mistakes using tag matching
        const topMistakes = getRelevantMistakesFromTags(profile);
        renderTopMistakes(topMistakes);

        // Show results
        document.getElementById('resultsContainer').classList.remove('hidden');
        updateShareSection();
        document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });

        // Show defense warning modal if applicable
        if (profile.hasDefenseHqWarning) {
            setTimeout(() => {
                showDefenseWarningModal();
            }, 500);
        }
    }, 1000);
}

// Get relevant mistakes based on profile tags
function getRelevantMistakesFromTags(profile) {
    const mistakes = state.mistakesData;
    if (!mistakes || mistakes.length === 0) return [];

    const userTags = profile.tags || [];
    const specialConsiderations = profile.specialConsiderations || [];

    // Score each mistake
    const scored = mistakes.map(mistake => {
        let score = 0;
        const mistakeTags = mistake.tags || [];

        // Match regular tags
        mistakeTags.forEach(tag => {
            if (userTags.includes(tag)) {
                score += 2;
            }
        });

        // Bonus for concern matches (higher weight)
        const concernTags = userTags.filter(t => ['hiring', 'pmf', 'gtm', 'legal', 'fundraising', 'operations'].includes(t));
        concernTags.forEach(concern => {
            if (mistakeTags.includes(concern)) {
                score += 4;
            }
        });

        // Special consideration priority boost
        if (mistake.specialConsiderations) {
            mistake.specialConsiderations.forEach(sc => {
                if (specialConsiderations.includes(sc)) {
                    score += 6;
                }
            });
        }

        // Check for defense-hq-timing special tag
        if (specialConsiderations.includes('defense-hq-timing') && mistakeTags.includes('defense-hq-timing')) {
            score += 10; // High priority
        }

        return { ...mistake, score };
    });

    // Sort by score and return top 3
    return scored
        .filter(m => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

// ========================================
// ADVENTURE CHARACTER ANIMATION
// ========================================

function initAdventureCharacter() {
    const character = document.getElementById('founderCharacter');
    if (character) {
        character.setAttribute('data-step', '0');
    }

    // Initialize SVG path progress
    const pathProgress = document.getElementById('pathProgress');
    if (pathProgress) {
        const pathLength = pathProgress.getTotalLength();
        pathProgress.style.strokeDasharray = '12 8';
        pathProgress.style.strokeDashoffset = pathLength;
    }

    // Mark start checkpoint as reached
    const startDot = document.querySelector('.checkpoint-dot[data-step="0"]');
    if (startDot) startDot.classList.add('reached');
}

function moveCharacterToStep(step) {
    const character = document.getElementById('founderCharacter');
    if (!character) return;

    // Add walking animation
    character.classList.add('walking');

    // Update character position
    character.setAttribute('data-step', step.toString());

    // Animate the SVG path progress
    const pathProgress = document.getElementById('pathProgress');
    if (pathProgress) {
        const pathLength = pathProgress.getTotalLength();
        const progress = step / state.totalQuestions;
        const offset = pathLength * (1 - progress);
        pathProgress.style.strokeDashoffset = offset;
    }

    // Mark checkpoints as reached
    for (let i = 0; i <= step; i++) {
        // SVG checkpoint groups
        const checkpointGroup = document.querySelector(`.checkpoint-group[data-step="${i}"]`);
        if (checkpointGroup) checkpointGroup.classList.add('reached');

        // SVG checkpoint dots
        const checkpointDot = document.querySelector(`.checkpoint-dot[data-step="${i}"]`);
        if (checkpointDot) checkpointDot.classList.add('reached');

        // Journey labels below the map
        const journeyLabel = document.querySelector(`.journey-label[data-step="${i}"]`);
        if (journeyLabel) journeyLabel.classList.add('reached');
    }

    // Stop walking animation after movement completes
    setTimeout(() => {
        character.classList.remove('walking');

        // Check if character arrived at destination (USA)
        if (step >= state.totalQuestions) {
            character.classList.add('arrived');

            // Mark treasure as reached
            const treasureMarker = document.querySelector('.treasure-marker');
            if (treasureMarker) treasureMarker.classList.add('reached');

            setTimeout(() => {
                character.classList.remove('arrived');
            }, 1600);
        }
    }, 800);
}

function resetAdventureCharacter() {
    const character = document.getElementById('founderCharacter');
    if (character) {
        character.setAttribute('data-step', '0');
        character.classList.remove('walking', 'arrived');
    }

    // Reset SVG path progress
    const pathProgress = document.getElementById('pathProgress');
    if (pathProgress) {
        const pathLength = pathProgress.getTotalLength();
        pathProgress.style.strokeDashoffset = pathLength;
    }

    // Reset all SVG checkpoints
    document.querySelectorAll('.checkpoint-group, .checkpoint-dot, .treasure-marker').forEach(el => {
        el.classList.remove('reached');
    });

    // Reset journey labels
    document.querySelectorAll('.journey-label').forEach(el => {
        el.classList.remove('reached');
    });

    // Mark starting position
    const startDot = document.querySelector('.checkpoint-dot[data-step="0"]');
    if (startDot) startDot.classList.add('reached');
}

function handleOptionClick(e) {
    const btn = e.currentTarget;
    const question = btn.dataset.question;
    const value = btn.dataset.value;

    state.answers[question] = value;

    const container = btn.closest('.quiz-question');
    container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 100);

    setTimeout(() => {
        if (state.currentQuestion < state.totalQuestions) {
            goToQuestion(state.currentQuestion + 1);
        } else {
            showResults();
        }
    }, 300);
}

function goToQuestion(num) {
    document.querySelector(`#q${state.currentQuestion}`).classList.remove('active');
    state.currentQuestion = num;
    document.querySelector(`#q${num}`).classList.add('active');
    updateProgress();

    // Move the adventure character
    moveCharacterToStep(num);
}

function previousQuestion() {
    // Use dynamic quiz engine if available
    if (state.quizEngine) {
        const hasPrev = state.quizEngine.previous();
        if (hasPrev) {
            moveCharacterToStep(state.quizEngine.state.currentQuestionIndex);
            renderCurrentQuestion();
        }
    } else if (state.currentQuestion > 1) {
        goToQuestion(state.currentQuestion - 1);
    }
}

function updateProgress() {
    const percentage = (state.currentQuestion / state.totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `Question ${state.currentQuestion} of ${state.totalQuestions}`;
}

function showResults() {
    // Move character to final destination (USA!)
    moveCharacterToStep(state.totalQuestions);

    // Wait for character animation before showing results
    setTimeout(() => {
        document.getElementById('quizContainer').classList.add('hidden');

        const profile = getProfile(state.answers);
        const topMistakes = getRelevantMistakes(state.answers);

        state.userProfile = profile;

        renderProfile(profile);
        renderTopMistakes(topMistakes);

        document.getElementById('resultsContainer').classList.remove('hidden');
        updateShareSection();
        document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// Profile generation (moved from data.js to work with dynamic data)
function getProfile(answers) {
    const archetypes = {
        "exploring": { name: "The Explorer", description: "Early-stage company researching the US market", level: 1, avatar: "&#x1F50D;", traits: ["Curious", "Research-focused", "Pre-expansion"] },
        "early": { name: "The Pioneer", description: "Making first moves into the US market", level: 2, avatar: "&#x1F6EB;", traits: ["Bold", "First hires", "Entity setup"] },
        "scaling": { name: "The Builder", description: "Actively scaling US operations", level: 3, avatar: "&#x1F3D7;", traits: ["Growing team", "Revenue focus", "Scaling ops"] },
        "established": { name: "The Champion", description: "Established US presence, optimizing for growth", level: 4, avatar: "&#x1F3C6;", traits: ["Established", "Major market", "Optimization"] }
    };

    const archetype = archetypes[answers.journey] || archetypes.exploring;

    const verticalLabels = { 'b2b-saas': 'B2B SaaS', 'fintech': 'Fintech', 'consumer': 'Consumer', 'deeptech': 'Deep Tech / AI', 'marketplace': 'Marketplace', 'other': 'Other' };
    const stageLabels = { 'seed': 'Seed Stage', 'series-a': 'Series A', 'series-b': 'Series B+', 'growth': 'Growth Stage' };
    const worryLabels = { 'recruiting': 'Hiring Focus', 'product': 'PMF Focus', 'strategy': 'GTM Focus', 'operations': 'Ops Focus' };

    const attributes = [
        { icon: '&#x1F3E2;', label: verticalLabels[answers.vertical] || 'Unknown' },
        { icon: '&#x1F4C8;', label: stageLabels[answers.stage] || 'Unknown' },
        { icon: '&#x26A0;', label: worryLabels[answers.worry] || 'Unknown' }
    ];

    return { ...archetype, attributes };
}

function getRelevantMistakes(answers) {
    const scored = state.mistakesData.map(mistake => {
        let score = 0;
        if (mistake.relevance.verticals.includes(answers.vertical)) score += 3;
        if (mistake.relevance.stages.includes(answers.stage)) score += 2;
        if (mistake.relevance.journeys.includes(answers.journey)) score += 2;
        if (mistake.relevance.worries.includes(answers.worry)) score += 4;
        return { ...mistake, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

function renderProfile(profile) {
    document.getElementById('profileAvatar').innerHTML = profile.avatar;
    document.getElementById('profileTitle').textContent = profile.name;
    document.getElementById('profileType').textContent = profile.description;
    document.getElementById('levelBadge').textContent = profile.level;

    const attributesHtml = profile.attributes.map(attr => `
        <span class="attribute-tag">
            <span>${attr.icon}</span>
            <span>${attr.label}</span>
        </span>
    `).join('');
    document.getElementById('profileAttributes').innerHTML = attributesHtml;
}

function renderTopMistakes(mistakes) {
    const html = mistakes.map(mistake => `
        <div class="mistake-card" data-category="${mistake.category}" onclick="showMistakeDetail(${mistake.id})">
            <span class="mistake-icon">${mistake.icon}</span>
            <span class="mistake-category" data-category="${mistake.category}">${mistake.category}</span>
            <h4 class="mistake-title">${mistake.title}</h4>
            <p class="mistake-preview">${mistake.preview}</p>
            ${mistake.cost ? `<span class="mistake-cost">Cost: ${mistake.cost}</span>` : ''}
            <span class="mistake-cta">Learn more</span>
        </div>
    `).join('');
    document.getElementById('mistakesPreview').innerHTML = html;
}

function startQuiz() {
    // Reset quiz state if retaking
    if (state.currentQuestion > 1 || Object.keys(state.answers).length > 0) {
        state.currentQuestion = 1;
        state.answers = {};

        // Reset question display
        document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
        document.querySelector('#q1').classList.add('active');

        // Reset option selections
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));

        // Reset progress bar
        updateProgress();

        // Reset adventure character
        resetAdventureCharacter();

        // Show quiz container, hide results
        document.getElementById('quizContainer').classList.remove('hidden');
        document.getElementById('resultsContainer').classList.add('hidden');
    }

    // Scroll to quiz with offset to show all options
    const quizContainer = document.getElementById('quizContainer');
    const headerOffset = 80;
    const elementPosition = quizContainer.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ========================================
// MISTAKES GRID
// ========================================

function initMistakesGrid() {
    const grid = document.getElementById('mistakesGrid');
    const html = state.mistakesData.map(mistake => `
        <div class="mistake-card" data-category="${mistake.category}" onclick="showMistakeDetail(${mistake.id})">
            <span class="mistake-icon">${mistake.icon}</span>
            <span class="mistake-category" data-category="${mistake.category}">${mistake.category}</span>
            <h4 class="mistake-title">${mistake.title}</h4>
            <p class="mistake-preview">${mistake.preview}</p>
            ${mistake.cost ? `<span class="mistake-cost">Cost: ${mistake.cost}</span>` : ''}
            <span class="mistake-cta">Learn more</span>
        </div>
    `).join('');
    grid.innerHTML = html;
}

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
}

function handleFilter(e) {
    const filter = e.target.dataset.filter;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    document.querySelectorAll('#mistakesGrid .mistake-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function showMistakeDetail(id) {
    const mistake = state.mistakesData.find(m => m.id === id);
    if (!mistake) return;

    if (!state.emailUnlocked && !state.email) {
        state.pendingMistake = mistake;
        openModal('emailModal');
        return;
    }

    renderMistakeDetail(mistake);
    openModal('mistakeModal');
}

function renderMistakeDetail(mistake) {
    const pointsArray = Array.isArray(mistake.content.points)
        ? mistake.content.points
        : JSON.parse(mistake.content.points || '[]');

    // Get testimonials for this mistake
    const testimonials = mistake.content.testimonials || [];

    // Get sources for this mistake
    const sources = mistake.sources || [];

    // Get tags for display
    const tags = mistake.tags || [];

    const html = `
        <div class="mistake-detail-header">
            <span class="mistake-detail-icon">${mistake.icon}</span>
            <div class="mistake-detail-info">
                <span class="mistake-category" data-category="${mistake.category}">${mistake.category}</span>
                <h2 class="mistake-detail-title">${mistake.title}</h2>
                ${mistake.cost ? `<span class="mistake-cost">Potential Cost: ${mistake.cost}</span>` : ''}
            </div>
        </div>
        <div class="mistake-detail-body">
            <h3>&#x26A0; The Problem: ${mistake.content.problem}</h3>
            <ul class="mistake-points">
                ${pointsArray.map(point => `<li>${point}</li>`).join('')}
            </ul>

            <h3>&#x2705; How to Avoid It</h3>
            <p class="mistake-remediation">${mistake.content.remediation}</p>

            ${testimonials.length > 0 ? `
                <h3>&#x1F4AC; What Founders Say</h3>
                <div class="mistake-testimonials">
                    ${testimonials.map(t => `
                        <blockquote class="mistake-testimonial">
                            <p>"${t.quote}"</p>
                            <cite>— ${t.author}${t.role ? `, ${t.role}` : ''}</cite>
                        </blockquote>
                    `).join('')}
                </div>
            ` : ''}

            ${sources.length > 0 ? `
                <h3>&#x1F4DA; Sources & Further Reading</h3>
                <div class="mistake-sources">
                    ${sources.map(s => `
                        <div class="source-item">
                            <span class="source-type">${getSourceTypeIcon(s.type)}</span>
                            <div class="source-info">
                                ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-title">${s.title}</a>` : `<span class="source-title">${s.title}</span>`}
                                ${s.author ? `<span class="source-author">by ${s.author}${s.authorRole ? ` (${s.authorRole})` : ''}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : mistake.content.resource ? `
                <h3>&#x1F4DA; Resources</h3>
                <p><a href="${mistake.content.resource}" target="_blank" style="color: var(--teal-light);">${mistake.content.resource}</a></p>
            ` : ''}

            ${tags.length > 0 ? `
                <div class="mistake-tags">
                    ${tags.slice(0, 6).map(tag => `
                        <span class="mistake-tag">${getTagIcon(tag)} ${formatTagName(tag)}</span>
                    `).join('')}
                </div>
            ` : ''}

            <div class="mistake-comments-section">
                <h3>&#x1F4AC; Discussion</h3>
                <div id="commentsContainer-${mistake.id}" class="comments-container">
                    <div class="comments-loading">Loading comments...</div>
                </div>
                <div class="comment-form-container">
                    <form class="comment-form" onsubmit="handleCommentSubmit(event, ${mistake.id})">
                        <textarea id="commentInput-${mistake.id}" class="comment-input" placeholder="Share your experience or ask a question..." rows="3" maxlength="1000"></textarea>
                        <div class="comment-form-footer">
                            <span class="comment-char-count"><span id="commentCharCount-${mistake.id}">0</span>/1000</span>
                            <button type="submit" class="btn-comment-submit">Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.getElementById('mistakeDetail').innerHTML = html;

    // Add character counter for comment
    const commentInput = document.getElementById(`commentInput-${mistake.id}`);
    if (commentInput) {
        commentInput.addEventListener('input', function() {
            document.getElementById(`commentCharCount-${mistake.id}`).textContent = this.value.length;
        });
    }

    // Load comments for this mistake
    loadCommentsForMistake(mistake.id);
}

// Helper function for source type icons
function getSourceTypeIcon(type) {
    const icons = {
        'article': '&#x1F4F0;',
        'interview': '&#x1F399;',
        'research': '&#x1F4CA;',
        'book': '&#x1F4D6;',
        'video': '&#x1F3AC;',
        'podcast': '&#x1F3A7;',
        'legal guide': '&#x2696;',
        'case study': '&#x1F4BC;',
        'guide': '&#x1F4D1;'
    };
    return icons[type] || '&#x1F517;';
}

// Helper function for tag icons
function getTagIcon(tag) {
    const tagData = predefinedTags[tag];
    return tagData?.icon || '&#x1F3F7;';
}

// Helper function to format tag names
function formatTagName(tag) {
    const tagData = predefinedTags[tag];
    if (tagData) return tagData.display_name;
    return tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Load comments for a mistake
async function loadCommentsForMistake(mistakeId) {
    const container = document.getElementById(`commentsContainer-${mistakeId}`);
    if (!container) return;

    try {
        // Try to load from Supabase
        const { data, error } = await supabase
            .from('mistake_comments')
            .select('*')
            .eq('mistake_id', mistakeId)
            .eq('is_approved', true)
            .eq('is_deleted', false)
            .is('parent_id', null)
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;

        if (!data || data.length === 0) {
            container.innerHTML = `
                <div class="comments-empty">
                    <p>No comments yet. Be the first to share your experience!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = data.map(comment => renderComment(comment)).join('');
    } catch (error) {
        console.error('Error loading comments:', error);
        container.innerHTML = `
            <div class="comments-empty">
                <p>Comments are not available right now.</p>
            </div>
        `;
    }
}

// Render a single comment
function renderComment(comment) {
    const timeAgo = getTimeAgo(new Date(comment.created_at));
    return `
        <div class="comment" data-id="${comment.id}">
            <div class="comment-header">
                <div class="comment-avatar">${comment.author_avatar || '&#x1F464;'}</div>
                <div class="comment-meta">
                    <span class="comment-author">${escapeHtml(comment.author_name)}</span>
                    ${comment.author_company ? `<span class="comment-company">${escapeHtml(comment.author_company)}</span>` : ''}
                    <span class="comment-time">${timeAgo}</span>
                </div>
            </div>
            <div class="comment-body">
                <p>${escapeHtml(comment.content)}</p>
            </div>
            <div class="comment-actions">
                <button class="comment-action" onclick="handleUpvote(${comment.id})">
                    &#x1F44D; <span class="upvote-count">${comment.upvotes || 0}</span>
                </button>
                <button class="comment-action" onclick="showReplyForm(${comment.id})">
                    &#x21A9; Reply
                </button>
            </div>
        </div>
    `;
}

// Get time ago string
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

// Handle comment submission
async function handleCommentSubmit(e, mistakeId) {
    e.preventDefault();

    const input = document.getElementById(`commentInput-${mistakeId}`);
    const content = input.value.trim();

    if (!content) {
        showToast('Please enter a comment');
        return;
    }

    // Get author info
    let authorName = 'Anonymous';
    let authorAvatar = '&#x1F464;';
    let authorCompany = null;

    if (state.user) {
        authorName = state.user.user_metadata?.name || state.user.email.split('@')[0];
    } else if (state.userProfile) {
        authorName = state.userProfile.name;
        authorAvatar = state.userProfile.avatar;
    }

    try {
        const { data, error } = await supabase
            .from('mistake_comments')
            .insert({
                mistake_id: mistakeId,
                content: content,
                author_name: authorName,
                author_avatar: authorAvatar,
                author_company: authorCompany,
                user_id: state.user?.id || null,
                is_approved: false // Requires moderation
            });

        if (error) throw error;

        input.value = '';
        document.getElementById(`commentCharCount-${mistakeId}`).textContent = '0';
        showToast('Comment submitted! It will appear after moderation.');
    } catch (error) {
        console.error('Error submitting comment:', error);
        showToast('Error submitting comment. Please try again.');
    }
}

// Handle upvote
async function handleUpvote(commentId) {
    if (!state.user) {
        showToast('Please sign in to upvote');
        return;
    }

    try {
        const { data, error } = await supabase
            .rpc('toggle_comment_upvote', {
                p_comment_id: commentId,
                p_user_id: state.user.id
            });

        if (error) throw error;

        // Update UI
        const countEl = document.querySelector(`[data-id="${commentId}"] .upvote-count`);
        if (countEl) {
            const current = parseInt(countEl.textContent) || 0;
            countEl.textContent = data ? current + 1 : current - 1;
        }
    } catch (error) {
        console.error('Error upvoting:', error);
    }
}

// Show reply form
function showReplyForm(parentId) {
    showToast('Reply feature coming soon!');
}

function showAllMistakes() {
    document.getElementById('mistakes').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// TESTIMONIALS
// ========================================

function initTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    const html = state.testimonialsData.map(testimonial => {
        if (testimonial.type === 'video') {
            return `
                <div class="testimonial-card video-testimonial">
                    <div class="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/${testimonial.youtubeId}"
                            title="${testimonial.title}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">&#x1F3AC;</div>
                        <div class="author-info">
                            <span class="author-name">${testimonial.author}</span>
                            <span class="author-role">${testimonial.role}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="testimonial-card">
                    <p class="testimonial-content">${testimonial.content}</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">${testimonial.avatar}</div>
                        <div class="author-info">
                            <span class="author-name">${testimonial.author}</span>
                            <span class="author-role">${testimonial.role}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
    grid.innerHTML = html;
}

// ========================================
// EMAIL GATE / MODAL
// ========================================

function checkEmailStatus() {
    if (state.email) {
        state.emailUnlocked = true;
    }
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('emailModal').classList.remove('active');
    document.body.style.overflow = '';
}

function closeMistakeModal() {
    document.getElementById('mistakeModal').classList.remove('active');
    document.body.style.overflow = '';
}

async function handleEmailSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;

    if (email && email.includes('@')) {
        // Save to Supabase
        try {
            await supabase.from('email_subscribers').insert({
                email: email,
                vertical: state.answers.vertical || null,
                stage: state.answers.stage || null,
                journey: state.answers.journey || null,
                worry: state.answers.worry || null,
                source: 'content_gate'
            });
        } catch (error) {
            console.error('Error saving email:', error);
        }

        state.email = email;
        state.emailUnlocked = true;
        localStorage.setItem('rrw_email', email);

        closeModal();
        showToast('Content unlocked! Enjoy the full antiplaybook.');

        if (state.pendingMistake) {
            setTimeout(() => {
                renderMistakeDetail(state.pendingMistake);
                openModal('mistakeModal');
                state.pendingMistake = null;
            }, 500);
        }
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent-red);
        color: white;
        padding: 1rem 2rem;
        font-family: var(--font-pixel);
        font-size: 0.7rem;
        z-index: 3000;
        border: 3px solid var(--accent-red-light);
        box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
        animation: fadeIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(style);

// ========================================
// SMOOTH SCROLL FOR NAV LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
});

// ========================================
// SHARE YOUR MISTAKE SECTION
// ========================================

function initShareSection() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', handleCategorySelect);
    });

    const textarea = document.getElementById('mistakeStory');
    if (textarea) {
        textarea.addEventListener('input', updateCharCount);
    }
}

function handleCategorySelect(e) {
    const btn = e.currentTarget;
    const category = btn.dataset.category;

    state.selectedCategory = category;

    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function updateCharCount() {
    const textarea = document.getElementById('mistakeStory');
    const counter = document.getElementById('charCount');
    if (textarea && counter) {
        counter.textContent = textarea.value.length;
    }
}

function updateShareSection() {
    if (!state.userProfile) return;

    // Only show form if user is logged in
    if (!state.user) {
        updateShareSectionAuth();
        return;
    }

    document.getElementById('authPrompt').classList.add('hidden');
    document.getElementById('sharePrompt').classList.add('hidden');
    document.getElementById('shareForm').classList.remove('hidden');

    const profileHtml = `
        <div class="submitter-avatar">${state.userProfile.avatar}</div>
        <div class="submitter-info">
            <span class="submitter-name">${state.userProfile.name}</span>
            <span class="submitter-type">${state.userProfile.attributes.map(a => a.label).join(' • ')}</span>
        </div>
    `;
    document.getElementById('submitterProfile').innerHTML = profileHtml;
}

async function handleMistakeSubmit(e) {
    e.preventDefault();

    // Check if user is logged in
    if (!state.user) {
        showToast('Please sign in to submit your story');
        showAuthModal('login');
        return;
    }

    if (!state.selectedCategory) {
        showToast('Please select a category first!');
        return;
    }

    const title = document.getElementById('mistakeTitle').value.trim();
    const story = document.getElementById('mistakeStory').value.trim();
    const cost = document.getElementById('mistakeCost').value.trim();

    if (!title || !story) {
        showToast('Please fill in the title and story!');
        return;
    }

    // Save to Supabase
    try {
        const { error } = await supabase.from('community_mistakes').insert({
            title: title,
            story: story,
            cost: cost || null,
            category: state.selectedCategory,
            author_name: state.userProfile.name,
            author_avatar: state.userProfile.avatar,
            author_level: state.userProfile.level,
            author_attributes: JSON.stringify(state.userProfile.attributes),
            user_id: state.user.id,
            approved: false  // Requires admin approval
        });

        if (error) throw error;

        // Reset form
        document.getElementById('shareForm').reset();
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('selected'));
        state.selectedCategory = null;
        document.getElementById('charCount').textContent = '0';

        showToast('Thanks for sharing! Your submission is pending review.');
    } catch (error) {
        console.error('Error submitting mistake:', error);
        showToast('Error submitting. Please try again.');
    }
}

function renderCommunityMistakes() {
    const grid = document.getElementById('communityGrid');

    if (state.communityMistakes.length === 0) {
        grid.innerHTML = `
            <div class="community-empty">
                <div class="community-empty-icon">&#x1F4ED;</div>
                <p>No community mistakes yet.<br>Be the first to share!</p>
            </div>
        `;
        return;
    }

    const html = state.communityMistakes.map(mistake => {
        const companyType = mistake.author.attributes ?
            mistake.author.attributes.map(a => a.label).join(' • ') :
            'Founder';

        return `
            <div class="community-card" data-category="${mistake.category}">
                <div class="community-card-header">
                    <div class="community-avatar">${mistake.author.avatar}</div>
                    <div class="community-meta">
                        <span class="community-author">
                            ${mistake.author.name}
                            <span class="community-badge">Lvl ${mistake.author.level}</span>
                        </span>
                        <span class="community-company">${companyType}</span>
                    </div>
                    <span class="mistake-category community-category" data-category="${mistake.category}">${mistake.category}</span>
                </div>
                <h4 class="community-title">${escapeHtml(mistake.title)}</h4>
                <p class="community-story">${escapeHtml(mistake.story)}</p>
                ${mistake.cost ? `<span class="community-cost">Cost: ${escapeHtml(mistake.cost)}</span>` : ''}
            </div>
        `;
    }).join('');

    grid.innerHTML = html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// AUTHENTICATION
// ========================================

async function checkAuthStatus() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        state.user = session?.user || null;
        state.isAdmin = state.user ? ADMIN_EMAILS.includes(state.user.email) : false;
    } catch (error) {
        console.error('Error checking auth status:', error);
        state.user = null;
        state.isAdmin = false;
    }
}

function updateAuthUI() {
    const navAuth = document.getElementById('navAuth');
    const adminLink = document.getElementById('adminLink');

    if (state.user) {
        // User is logged in
        const initials = state.user.user_metadata?.name
            ? state.user.user_metadata.name.split(' ').map(n => n[0]).join('').toUpperCase()
            : state.user.email[0].toUpperCase();

        navAuth.innerHTML = `
            <div class="user-menu">
                <div class="user-avatar">${initials}</div>
                <button class="nav-link nav-auth-btn" onclick="handleLogout()">Sign Out</button>
            </div>
        `;

        // Show admin link if user is admin
        if (state.isAdmin) {
            adminLink.classList.remove('hidden');
        } else {
            adminLink.classList.add('hidden');
        }
    } else {
        // User is logged out
        navAuth.innerHTML = `
            <button class="nav-link nav-auth-btn" onclick="showAuthModal('login')">Sign In</button>
        `;
        adminLink.classList.add('hidden');
    }
}

function updateShareSectionAuth() {
    const authPrompt = document.getElementById('authPrompt');
    const sharePrompt = document.getElementById('sharePrompt');
    const shareForm = document.getElementById('shareForm');

    if (state.user) {
        // User is logged in - show quiz prompt or form
        authPrompt.classList.add('hidden');
        if (state.userProfile) {
            sharePrompt.classList.add('hidden');
            shareForm.classList.remove('hidden');
        } else {
            sharePrompt.classList.remove('hidden');
            shareForm.classList.add('hidden');
        }
    } else {
        // User is logged out - show auth prompt
        authPrompt.classList.remove('hidden');
        sharePrompt.classList.add('hidden');
        shareForm.classList.add('hidden');
    }
}

function showAuthModal(mode = 'login') {
    document.getElementById('authModal').classList.add('active');
    switchAuthMode(mode);
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function switchAuthMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        closeAuthModal();
        showToast('Welcome back!');
    } catch (error) {
        console.error('Login error:', error);
        showToast(error.message || 'Login failed. Please try again.');
    }
}

async function handleSignup(e) {
    e.preventDefault();

    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');

    if (!nameInput || !emailInput || !passwordInput) {
        showToast('Form error. Please refresh the page.');
        return;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        showToast('Please fill in all fields.');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error) throw error;

        closeAuthModal();
        showToast('Account created! Check your email to verify.');
    } catch (error) {
        console.error('Signup error:', error);
        showToast(error.message || 'Signup failed. Please try again.');
    }
}

async function handleLogout() {
    try {
        await supabase.auth.signOut();
        state.user = null;
        state.isAdmin = false;
        updateAuthUI();
        updateShareSectionAuth();
        showToast('Signed out successfully');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ========================================
// ADMIN PANEL
// ========================================

async function openAdminPanel() {
    // If not logged in, prompt to sign in first
    if (!state.user) {
        showAuthModal('login');
        showToast('Please sign in with an admin account');
        return;
    }

    // If logged in but not admin
    if (!state.isAdmin) {
        showToast('Access denied - admin account required');
        return;
    }

    document.getElementById('adminModal').classList.add('active');
    await loadPendingSubmissions();
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
}

function switchAdminTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.admin-tab[data-tab="${tab}"]`).classList.add('active');

    // Update content
    document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));

    // Map tab names to element IDs
    const tabIdMap = {
        'pending': 'adminPending',
        'approved': 'adminApproved',
        'subscribers': 'adminSubscribers',
        'content-builder': 'adminContentBuilder',
        'tags': 'adminTags'
    };

    const elementId = tabIdMap[tab] || `admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`;
    document.getElementById(elementId).classList.add('active');

    // Load data for tab
    if (tab === 'pending') loadPendingSubmissions();
    else if (tab === 'approved') loadApprovedSubmissions();
    else if (tab === 'subscribers') loadSubscribers();
    else if (tab === 'content-builder') initContentBuilderTab();
    else if (tab === 'tags') initTagsTab();
}

async function loadPendingSubmissions() {
    const grid = document.getElementById('pendingGrid');
    grid.innerHTML = '<p class="admin-loading">Loading...</p>';

    try {
        const { data, error } = await supabase
            .from('community_mistakes')
            .select('*')
            .eq('approved', false)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (data.length === 0) {
            grid.innerHTML = '<p class="admin-empty">No pending submissions</p>';
            return;
        }

        grid.innerHTML = data.map(s => `
            <div class="admin-card" data-id="${s.id}">
                <div class="admin-card-header">
                    <div>
                        <div class="admin-card-title">${escapeHtml(s.title)}</div>
                        <div class="admin-card-meta">${s.category} • ${s.author_name} • ${new Date(s.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="admin-card-body">${escapeHtml(s.story)}</div>
                ${s.cost ? `<div class="admin-card-meta">Cost: ${escapeHtml(s.cost)}</div>` : ''}
                <div class="admin-card-actions">
                    <button class="admin-btn admin-btn-approve" onclick="approveSubmission(${s.id})">Approve</button>
                    <button class="admin-btn admin-btn-reject" onclick="rejectSubmission(${s.id})">Reject</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading pending:', error);
        grid.innerHTML = '<p class="admin-empty">Error loading submissions</p>';
    }
}

async function loadApprovedSubmissions() {
    const grid = document.getElementById('approvedGrid');
    grid.innerHTML = '<p class="admin-loading">Loading...</p>';

    try {
        const { data, error } = await supabase
            .from('community_mistakes')
            .select('*')
            .eq('approved', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (data.length === 0) {
            grid.innerHTML = '<p class="admin-empty">No approved submissions</p>';
            return;
        }

        grid.innerHTML = data.map(s => `
            <div class="admin-card">
                <div class="admin-card-header">
                    <div>
                        <div class="admin-card-title">${escapeHtml(s.title)}</div>
                        <div class="admin-card-meta">${s.category} • ${s.author_name} • ${new Date(s.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="admin-card-body">${escapeHtml(s.story)}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading approved:', error);
        grid.innerHTML = '<p class="admin-empty">Error loading submissions</p>';
    }
}

async function loadSubscribers() {
    const tbody = document.getElementById('subscribersBody');
    tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

    try {
        const { data, error } = await supabase
            .from('email_subscribers')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">No subscribers yet</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(s => `
            <tr>
                <td>${escapeHtml(s.email)}</td>
                <td>${s.vertical || '-'}</td>
                <td>${s.stage || '-'}</td>
                <td>${new Date(s.created_at).toLocaleDateString()}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading subscribers:', error);
        tbody.innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
    }
}

async function approveSubmission(id) {
    try {
        const { error } = await supabase
            .from('community_mistakes')
            .update({ approved: true })
            .eq('id', id);

        if (error) throw error;

        showToast('Submission approved!');
        loadPendingSubmissions();
        // Reload community mistakes on main page
        const community = await loadCommunityMistakes();
        state.communityMistakes = community;
        renderCommunityMistakes();
    } catch (error) {
        console.error('Error approving:', error);
        showToast('Error approving submission');
    }
}

async function rejectSubmission(id) {
    if (!confirm('Are you sure you want to reject this submission? This will delete it.')) return;

    try {
        const { error } = await supabase
            .from('community_mistakes')
            .delete()
            .eq('id', id);

        if (error) throw error;

        showToast('Submission rejected');
        loadPendingSubmissions();
    } catch (error) {
        console.error('Error rejecting:', error);
        showToast('Error rejecting submission');
    }
}

// ========================================
// CONTENT BUILDER TAB
// ========================================

async function initContentBuilderTab() {
    if (!state.contentBuilder) {
        console.warn('Content Builder not initialized');
        return;
    }

    // Initialize content builder with existing mistakes
    await state.contentBuilder.init();

    // Populate existing mistakes dropdown for editing
    const existingSelect = document.getElementById('existingMistakes');
    if (existingSelect) {
        existingSelect.innerHTML = '<option value="">-- Select to edit --</option>';
        state.mistakesData.forEach(m => {
            existingSelect.innerHTML += `<option value="${m.id}">${m.title}</option>`;
        });
    }
}

function loadExistingMistake() {
    const select = document.getElementById('existingMistakes');
    const mistakeId = select.value;

    if (!mistakeId) {
        // Clear form for new mistake
        if (state.contentBuilder) {
            state.contentBuilder.clearForm();
        }
        return;
    }

    const mistake = state.mistakesData.find(m => m.id === parseInt(mistakeId));
    if (mistake && state.contentBuilder) {
        state.contentBuilder.loadMistakeForEdit(mistake);
    }
}

async function saveContentBuilderMistake() {
    if (!state.contentBuilder) {
        showToast('Content Builder not available');
        return;
    }

    try {
        await state.contentBuilder.saveMistake();
        showToast('Mistake saved successfully!');

        // Reload data
        await loadAllData();
        initMistakesGrid();

        // Update dropdown
        await initContentBuilderTab();
    } catch (error) {
        console.error('Error saving mistake:', error);
        showToast('Error saving mistake: ' + error.message);
    }
}

function previewContentBuilderMistake() {
    if (state.contentBuilder) {
        state.contentBuilder.showPreview();
        openModal('previewModal');
    }
}

async function deleteContentBuilderMistake() {
    const select = document.getElementById('existingMistakes');
    const mistakeId = select.value;

    if (!mistakeId) {
        showToast('Please select a mistake to delete');
        return;
    }

    if (!confirm('Are you sure you want to delete this mistake? This cannot be undone.')) {
        return;
    }

    try {
        const { error } = await supabase
            .from('mistakes')
            .delete()
            .eq('id', parseInt(mistakeId));

        if (error) throw error;

        showToast('Mistake deleted');

        // Clear form and reload
        if (state.contentBuilder) {
            state.contentBuilder.clearForm();
        }
        await loadAllData();
        initMistakesGrid();
        await initContentBuilderTab();
    } catch (error) {
        console.error('Error deleting mistake:', error);
        showToast('Error deleting mistake');
    }
}

// ========================================
// TAGS TAB
// ========================================

async function initTagsTab() {
    if (!state.tagManager) {
        console.warn('Tag Manager not initialized');
        return;
    }

    const container = document.getElementById('tagsOverview');
    if (!container) return;

    // Group tags by category
    const tagsByCategory = {};
    const allTags = state.tagManager.getAllTags();

    allTags.forEach(tag => {
        const category = tag.category || 'custom';
        if (!tagsByCategory[category]) {
            tagsByCategory[category] = [];
        }
        tagsByCategory[category].push(tag);
    });

    // Render tags grouped by category
    let html = '';
    for (const [category, tags] of Object.entries(tagsByCategory)) {
        html += `
            <div class="tag-category-group">
                <h4 class="tag-category-title">${formatCategoryName(category)}</h4>
                <div class="tag-chips">
                    ${tags.map(tag => `
                        <span class="tag-chip ${tag.is_predefined ? '' : 'custom-tag'}">
                            ${tag.icon || '🏷️'} ${tag.display_name}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Add custom tag creation form
    html += `
        <div class="create-custom-tag">
            <h4>Create Custom Tag</h4>
            <div class="custom-tag-form">
                <input type="text" id="customTagName" placeholder="Tag name" class="input-field">
                <select id="customTagCategory" class="input-field">
                    <option value="custom">Custom</option>
                    <option value="business_model">Business Model</option>
                    <option value="vertical">Vertical</option>
                    <option value="concern_area">Concern Area</option>
                    <option value="special">Special</option>
                </select>
                <input type="text" id="customTagIcon" placeholder="Emoji icon" class="input-field" maxlength="4">
                <button class="btn-primary" onclick="createCustomTag()">Add Tag</button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function formatCategoryName(category) {
    return category
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function createCustomTag() {
    if (!state.tagManager) {
        showToast('Tag Manager not available');
        return;
    }

    const name = document.getElementById('customTagName').value.trim();
    const category = document.getElementById('customTagCategory').value;
    const icon = document.getElementById('customTagIcon').value.trim() || '🏷️';

    if (!name) {
        showToast('Please enter a tag name');
        return;
    }

    try {
        await state.tagManager.createCustomTag(name, category, icon);
        showToast('Custom tag created!');

        // Clear form and refresh
        document.getElementById('customTagName').value = '';
        document.getElementById('customTagIcon').value = '';
        await initTagsTab();
    } catch (error) {
        console.error('Error creating tag:', error);
        showToast('Error creating tag: ' + error.message);
    }
}

// ========================================
// DEFENSE WARNING MODAL
// ========================================

function showDefenseWarningModal() {
    openModal('defenseWarningModal');
}

function closeDefenseWarningModal() {
    document.getElementById('defenseWarningModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// TESTIMONIAL MODAL
// ========================================

function openTestimonialModal() {
    openModal('testimonialModal');
}

function closeTestimonialModal() {
    document.getElementById('testimonialModal').classList.remove('active');
    document.body.style.overflow = '';
}

async function saveNewTestimonial() {
    const quote = document.getElementById('testimonialQuote').value.trim();
    const authorName = document.getElementById('testimonialAuthorName').value.trim();
    const authorRole = document.getElementById('testimonialAuthorRole').value.trim();
    const authorCompany = document.getElementById('testimonialAuthorCompany').value.trim();

    if (!quote || !authorName) {
        showToast('Please fill in quote and author name');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('testimonial_quotes')
            .insert({
                quote: quote,
                author_name: authorName,
                author_role: authorRole || null,
                author_company: authorCompany || null
            })
            .select()
            .single();

        if (error) throw error;

        showToast('Testimonial saved!');
        closeTestimonialModal();

        // Clear form
        document.getElementById('testimonialQuote').value = '';
        document.getElementById('testimonialAuthorName').value = '';
        document.getElementById('testimonialAuthorRole').value = '';
        document.getElementById('testimonialAuthorCompany').value = '';

        // Refresh content builder testimonial list if it exists
        if (state.contentBuilder) {
            await state.contentBuilder.loadTestimonials();
        }
    } catch (error) {
        console.error('Error saving testimonial:', error);
        showToast('Error saving testimonial');
    }
}

// ========================================
// PREVIEW MODAL
// ========================================

function closePreviewModal() {
    document.getElementById('previewModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// POINT/RESOURCE DYNAMIC INPUTS
// ========================================

function addPointInput() {
    const container = document.getElementById('pointsInputs');
    const newInput = document.createElement('div');
    newInput.className = 'point-input-group';
    newInput.innerHTML = `
        <input type="text" class="point-input input-field" placeholder="Key point...">
        <button type="button" class="btn-icon" onclick="removePointInput(this)">×</button>
    `;
    container.appendChild(newInput);
}

function removePointInput(btn) {
    const group = btn.closest('.point-input-group');
    if (document.querySelectorAll('.point-input-group').length > 1) {
        group.remove();
    } else {
        showToast('Must have at least one point');
    }
}

function addResourceInput() {
    const container = document.getElementById('resourcesInputs');
    const newInput = document.createElement('div');
    newInput.className = 'resource-input-group';
    newInput.innerHTML = `
        <input type="text" class="resource-title input-field" placeholder="Resource title...">
        <input type="url" class="resource-url input-field" placeholder="https://...">
        <select class="resource-type input-field">
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="tool">Tool</option>
            <option value="template">Template</option>
        </select>
        <button type="button" class="btn-icon" onclick="removeResourceInput(this)">×</button>
    `;
    container.appendChild(newInput);
}

function removeResourceInput(btn) {
    btn.closest('.resource-input-group').remove();
}

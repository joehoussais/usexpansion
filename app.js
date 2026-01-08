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
    // Data loaded from Supabase
    mistakesData: [],
    testimonialsData: [],
    communityMistakes: []
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load data from Supabase
    await loadAllData();

    // Initialize UI
    initQuiz();
    initMistakesGrid();
    initTestimonials();
    initFilters();
    checkEmailStatus();
    initShareSection();
    renderCommunityMistakes();
});

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

        state.mistakesData = mistakes;
        state.testimonialsData = testimonials;
        state.communityMistakes = community;

        console.log('Data loaded successfully from Supabase');
    } catch (error) {
        console.error('Error loading data:', error);
        // Fall back to hardcoded data if Supabase fails
        useFallbackData();
    }
}

async function loadMistakes() {
    const { data, error } = await supabase
        .from('mistakes')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

    if (error) throw error;

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
}

async function loadTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

    if (error) throw error;

    return data.map(t => ({
        id: t.id,
        content: t.content,
        author: t.author_name,
        role: t.author_role,
        avatar: t.author_avatar
    }));
}

async function loadCommunityMistakes() {
    const { data, error } = await supabase
        .from('community_mistakes')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

    if (error) throw error;

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
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleOptionClick);
    });
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
}

function updateProgress() {
    const percentage = (state.currentQuestion / state.totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `Question ${state.currentQuestion} of ${state.totalQuestions}`;
}

function showResults() {
    document.getElementById('quizContainer').classList.add('hidden');

    const profile = getProfile(state.answers);
    const topMistakes = getRelevantMistakes(state.answers);

    state.userProfile = profile;

    renderProfile(profile);
    renderTopMistakes(topMistakes);

    document.getElementById('resultsContainer').classList.remove('hidden');
    updateShareSection();
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
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
    document.getElementById('classifier').scrollIntoView({ behavior: 'smooth' });
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
            <ul>
                ${pointsArray.map(point => `<li>${point}</li>`).join('')}
            </ul>

            <h3>&#x2705; How to Avoid It</h3>
            <p>${mistake.content.remediation}</p>

            ${mistake.content.resource ? `
                <h3>&#x1F4DA; Resources</h3>
                <p><a href="${mistake.content.resource}" target="_blank" style="color: var(--teal-light);">${mistake.content.resource}</a></p>
            ` : ''}
        </div>
    `;
    document.getElementById('mistakeDetail').innerHTML = html;
}

function showAllMistakes() {
    document.getElementById('mistakes').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// TESTIMONIALS
// ========================================

function initTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    const html = state.testimonialsData.map(testimonial => `
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
    `).join('');
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

    document.getElementById('sharePrompt').style.display = 'none';
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

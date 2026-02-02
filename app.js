// ========================================
// US EXPANSION ANTIPLAYBOOK - APP
// Simplified: no auth, no comments, no community
// Email gate via Netlify Forms, share/export built in
// ========================================

// State management
const state = {
    currentQuestion: 1,
    totalQuestions: 4,
    answers: {},
    emailUnlocked: false,
    email: localStorage.getItem('rrw_email') || null,
    userProfile: null,
    mistakesData: [],
    testimonialsData: [],
    quizEngine: null
};

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
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quiz engine (fallback data only, no Supabase)
    initQuizEngine();

    // Load data from data.js (sole source)
    loadData();

    // Initialize UI
    initQuiz();
    initMistakesGrid();
    initTestimonials();
    initFilters();
    checkEmailStatus();

    // Check for shared results link
    loadFromShareableLink();
});

// ========================================
// DATA LOADING (from data.js only)
// ========================================

function loadData() {
    state.mistakesData = typeof mistakesData !== 'undefined' ? mistakesData : [];
    state.testimonialsData = typeof testimonialsData !== 'undefined' ? testimonialsData : [];
}

// ========================================
// QUIZ ENGINE INIT
// ========================================

function initQuizEngine() {
    if (typeof QuizEngine !== 'undefined') {
        state.quizEngine = new QuizEngine({
            onQuestionChange: function() {},
            onComplete: function(profile) {
                if (profile.hasDefenseHqWarning) {
                    showDefenseWarningModal();
                }
            },
            onTagAssigned: function() {}
        });
        // Init without Supabase — uses fallback data
        state.quizEngine.init(null);
    }
}

// ========================================
// QUIZ FUNCTIONALITY
// ========================================

function initQuiz() {
    if (state.quizEngine) {
        renderCurrentQuestion();
    }
    initAdventureCharacter();
}

function renderCurrentQuestion() {
    const container = document.getElementById('quizQuestionsContainer');
    if (!container || !state.quizEngine) return;

    const question = state.quizEngine.getCurrentQuestion();
    if (!question) return;

    state.currentQuestion = question.currentIndex + 1;
    state.totalQuestions = question.totalQuestions;

    let html = `
        <div class="quiz-question active" id="q${question.currentIndex + 1}">
            ${!question.isFirst ? '<button class="prev-btn" onclick="previousQuestion()">&#x2190; Previous</button>' : ''}
            <div class="question-icon">${question.question_icon || '&#x2753;'}</div>
            <h3 class="question-title">${question.question_text}</h3>
            ${question.question_subtitle ? `<p class="question-subtitle">${question.question_subtitle}</p>` : ''}
            <div class="options-grid ${question.is_multi_select ? 'multi-select' : ''} ${question.options.length > 4 ? 'options-vertical' : ''}">
    `;

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

    const continueBtn = document.getElementById('multiSelectContinue');
    if (continueBtn) {
        continueBtn.classList.toggle('hidden', !question.is_multi_select);
    }

    updateProgress();
}

function handleDynamicOptionClick(btn) {
    const questionKey = btn.dataset.question;
    const value = btn.dataset.value;
    const question = state.quizEngine.getQuestion(questionKey);

    if (question.is_multi_select) {
        btn.classList.toggle('selected');
        state.quizEngine.answer(questionKey, value);
    } else {
        const container = btn.closest('.quiz-question');
        container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        state.quizEngine.answer(questionKey, value);

        btn.style.transform = 'scale(0.95)';
        setTimeout(() => { btn.style.transform = ''; }, 100);

        setTimeout(() => { advanceQuiz(); }, 300);
    }
}

function confirmMultiSelect() {
    const currentQuestion = state.quizEngine.getCurrentQuestion();
    if (currentQuestion && state.quizEngine.isAnswered(currentQuestion.question_key)) {
        advanceQuiz();
    }
}

function advanceQuiz() {
    const hasNext = state.quizEngine.next();
    if (hasNext) {
        moveCharacterToStep(state.quizEngine.state.currentQuestionIndex + 1);
        renderCurrentQuestion();
    } else {
        const profile = state.quizEngine.complete();
        showDynamicResults(profile);
    }
}

function showDynamicResults(profile) {
    moveCharacterToStep(state.totalQuestions);

    setTimeout(() => {
        document.getElementById('quizContainer').classList.add('hidden');
        state.userProfile = profile;

        renderProfile(profile);

        const topMistakes = getRelevantMistakesFromTags(profile);
        renderTopMistakes(topMistakes);

        // Update profile summary
        const profileSummaryEl = document.getElementById('profileSummary');
        if (profileSummaryEl) {
            const summaryParts = [];
            if (profile.attributes) {
                profile.attributes.forEach(attr => {
                    if (attr.label && attr.label !== 'Unknown') summaryParts.push(attr.label);
                });
            }
            profileSummaryEl.textContent = summaryParts.length > 0
                ? `${profile.name} (${summaryParts.join(', ')})`
                : profile.name;
        }

        // Show priority risk banner
        if (topMistakes.length > 0) {
            const banner = document.getElementById('priorityRiskBanner');
            const title = document.getElementById('priorityRiskTitle');
            if (banner && title) {
                title.textContent = topMistakes[0].title;
                banner.classList.remove('hidden');
            }
        }

        // Show quick action plan from top mistakes
        renderQuickActionPlan(topMistakes);

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.remove('hidden');

        setTimeout(() => {
            const rect = resultsContainer.getBoundingClientRect();
            const offset = Math.max(0, rect.top + window.pageYOffset - (window.innerHeight * 0.1));
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }, 100);

        if (profile.hasDefenseHqWarning) {
            setTimeout(() => { showDefenseWarningModal(); }, 500);
        }
    }, 1000);
}

// ========================================
// QUICK ACTION PLAN
// ========================================

function renderQuickActionPlan(topMistakes) {
    const container = document.getElementById('quickActionPlan');
    const itemsContainer = document.getElementById('actionPlanItems');
    if (!container || !itemsContainer) return;

    const quickWins = topMistakes
        .filter(m => m.content && m.content.quickWin)
        .map(m => ({ title: m.title, quickWin: m.content.quickWin }));

    if (quickWins.length === 0) {
        container.classList.add('hidden');
        return;
    }

    const html = quickWins.map((item, i) => `
        <div class="action-plan-item">
            <span class="action-plan-number">${i + 1}</span>
            <div class="action-plan-content">
                <strong>${item.title}</strong>
                <p>${item.quickWin}</p>
            </div>
        </div>
    `).join('');

    itemsContainer.innerHTML = html;
    container.classList.remove('hidden');
}

// ========================================
// TAG-BASED MISTAKE MATCHING
// ========================================

function getRelevantMistakesFromTags(profile) {
    const mistakes = state.mistakesData;
    if (!mistakes || mistakes.length === 0) return [];

    const userTags = profile.tags || [];
    const specialConsiderations = profile.specialConsiderations || [];

    const scored = mistakes.map(mistake => {
        let score = 0;
        const mistakeTags = mistake.tags || [];

        mistakeTags.forEach(tag => {
            if (userTags.includes(tag)) score += 2;
        });

        const concernTags = userTags.filter(t => ['hiring', 'pmf', 'gtm', 'legal', 'fundraising', 'operations'].includes(t));
        concernTags.forEach(concern => {
            if (mistakeTags.includes(concern)) score += 4;
        });

        if (mistake.specialConsiderations) {
            mistake.specialConsiderations.forEach(sc => {
                if (specialConsiderations.includes(sc)) score += 6;
            });
        }

        if (specialConsiderations.includes('defense-hq-timing') && mistakeTags.includes('defense-hq-timing')) {
            score += 10;
        }

        return { ...mistake, score };
    });

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
    if (character) character.setAttribute('data-step', '0');

    const pathProgress = document.getElementById('pathProgress');
    if (pathProgress) {
        const pathLength = pathProgress.getTotalLength();
        pathProgress.style.strokeDasharray = '12 8';
        pathProgress.style.strokeDashoffset = pathLength;
    }

    const startDot = document.querySelector('.checkpoint-dot[data-step="0"]');
    if (startDot) startDot.classList.add('reached');
}

function moveCharacterToStep(step) {
    const character = document.getElementById('founderCharacter');
    if (!character) return;

    character.classList.add('walking');
    character.setAttribute('data-step', step.toString());

    const pathProgress = document.getElementById('pathProgress');
    if (pathProgress) {
        const pathLength = pathProgress.getTotalLength();
        const progress = step / state.totalQuestions;
        pathProgress.style.strokeDashoffset = pathLength * (1 - progress);
    }

    for (let i = 0; i <= step; i++) {
        const group = document.querySelector(`.checkpoint-group[data-step="${i}"]`);
        if (group) group.classList.add('reached');
        const dot = document.querySelector(`.checkpoint-dot[data-step="${i}"]`);
        if (dot) dot.classList.add('reached');
        const label = document.querySelector(`.journey-label[data-step="${i}"]`);
        if (label) label.classList.add('reached');
    }

    setTimeout(() => {
        character.classList.remove('walking');
        if (step >= state.totalQuestions) {
            character.classList.add('arrived');
            const treasure = document.querySelector('.treasure-marker');
            if (treasure) treasure.classList.add('reached');
            setTimeout(() => { character.classList.remove('arrived'); }, 1600);
        }
    }, 800);
}

function resetAdventureCharacter() {
    const character = document.getElementById('founderCharacter');
    if (character) {
        character.setAttribute('data-step', '0');
        character.classList.remove('walking', 'arrived');
    }
    const pathProgress = document.getElementById('pathProgress');
    if (pathProgress) {
        pathProgress.style.strokeDashoffset = pathProgress.getTotalLength();
    }
    document.querySelectorAll('.checkpoint-group, .checkpoint-dot, .treasure-marker').forEach(el => el.classList.remove('reached'));
    document.querySelectorAll('.journey-label').forEach(el => el.classList.remove('reached'));
    const startDot = document.querySelector('.checkpoint-dot[data-step="0"]');
    if (startDot) startDot.classList.add('reached');
}

function previousQuestion() {
    if (state.quizEngine) {
        const hasPrev = state.quizEngine.previous();
        if (hasPrev) {
            moveCharacterToStep(state.quizEngine.state.currentQuestionIndex);
            renderCurrentQuestion();
        }
    }
}

function updateProgress() {
    const percentage = (state.currentQuestion / state.totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `Question ${state.currentQuestion} of ${state.totalQuestions}`;
}

// ========================================
// PROFILE & RESULTS RENDERING
// ========================================

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
            <div class="mistake-card-top">
                <span class="mistake-category" data-category="${mistake.category}">${mistake.category}</span>
                ${mistake.severity ? `<span class="severity-badge severity-${mistake.severity}">${mistake.severity}</span>` : ''}
            </div>
            <h4 class="mistake-title">${mistake.title}</h4>
            <p class="mistake-preview">${mistake.preview}</p>
            ${mistake.cost ? `<span class="mistake-cost">Cost: ${mistake.cost}</span>` : ''}
            <span class="mistake-cta">Learn more</span>
        </div>
    `).join('');
    document.getElementById('mistakesPreview').innerHTML = html;
}

function startQuiz() {
    // Reset quiz engine
    if (state.quizEngine) {
        state.quizEngine.reset();
        state.currentQuestion = 1;
    }

    // Reset UI
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('resultsContainer').classList.add('hidden');

    // Hide priority banner and action plan
    const banner = document.getElementById('priorityRiskBanner');
    if (banner) banner.classList.add('hidden');
    const plan = document.getElementById('quickActionPlan');
    if (plan) plan.classList.add('hidden');

    resetAdventureCharacter();
    renderCurrentQuestion();

    // Scroll to quiz
    const quizContainer = document.getElementById('quizContainer');
    const offset = quizContainer.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
}

// ========================================
// MISTAKES GRID
// ========================================

function initMistakesGrid() {
    const grid = document.getElementById('mistakesGrid');
    const html = state.mistakesData.map(mistake => `
        <div class="mistake-card" data-category="${mistake.category}" onclick="showMistakeDetail(${mistake.id})">
            <span class="mistake-icon">${mistake.icon}</span>
            <div class="mistake-card-top">
                <span class="mistake-category" data-category="${mistake.category}">${mistake.category}</span>
                ${mistake.severity ? `<span class="severity-badge severity-${mistake.severity}">${mistake.severity}</span>` : ''}
            </div>
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

// ========================================
// MISTAKE DETAIL + INLINE EMAIL GATE
// ========================================

function showMistakeDetail(id) {
    const mistake = state.mistakesData.find(m => m.id === id);
    if (!mistake) return;

    renderMistakeDetail(mistake);
    openModal('mistakeModal');
}

function renderMistakeDetail(mistake) {
    const pointsArray = Array.isArray(mistake.content.points)
        ? mistake.content.points
        : JSON.parse(mistake.content.points || '[]');

    const testimonials = mistake.content.testimonials || [];
    const sources = mistake.sources || [];
    const tags = mistake.tags || [];
    const redFlags = mistake.content.redFlags || [];
    const actionItems = mistake.content.actionItems || [];
    const metrics = mistake.content.metrics || [];
    const quickWin = mistake.content.quickWin || '';
    const timeline = mistake.content.timeline || '';
    const unlocked = state.emailUnlocked;

    // Free content: problem, first 2 points, red flags, quick win
    // Gated: remaining points, action items, remediation, metrics, sources, testimonials

    let html = `
        <div class="mistake-detail-header">
            <span class="mistake-detail-icon">${mistake.icon}</span>
            <div class="mistake-detail-info">
                <div class="mistake-detail-badges">
                    <span class="mistake-category" data-category="${mistake.category}">${mistake.category}</span>
                    ${mistake.severity ? `<span class="severity-badge severity-${mistake.severity}">${mistake.severity}</span>` : ''}
                    ${timeline ? `<span class="timeline-badge">${timeline}</span>` : ''}
                </div>
                <h2 class="mistake-detail-title">${mistake.title}</h2>
                ${mistake.cost ? `<span class="mistake-cost">Potential Cost: ${mistake.cost}</span>` : ''}
            </div>
        </div>
        <div class="mistake-detail-body">
            <h3>&#x26A0; The Problem</h3>
            <p class="mistake-problem">${mistake.content.problem}</p>

            <h3>&#x1F4A1; Key Points</h3>
            <ul class="mistake-points">
                ${pointsArray.slice(0, 2).map(point => `<li>${point}</li>`).join('')}
            </ul>
    `;

    // Red flags (free)
    if (redFlags.length > 0) {
        html += `
            <h3>&#x1F6A9; Red Flags</h3>
            <ul class="red-flags-list">
                ${redFlags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
        `;
    }

    // Quick win (free)
    if (quickWin) {
        html += `
            <div class="quick-win-callout">
                <h4>&#x26A1; Quick Win — Do This Week</h4>
                <p>${quickWin}</p>
            </div>
        `;
    }

    // === GATE POINT ===
    if (!unlocked) {
        html += `
            <div class="content-gate">
                <div class="gate-fade"></div>
                <div class="gate-form">
                    <h4>Unlock the Full Action Plan</h4>
                    <p>Get the complete checklist, metrics, remediation steps, and sources for this mistake.</p>
                    <form class="inline-email-form" onsubmit="handleInlineEmailSubmit(event, ${mistake.id})">
                        <input type="email" class="email-input" placeholder="your@email.com" required>
                        <button type="submit" class="btn btn-primary">Unlock</button>
                    </form>
                    <p class="gate-note">Free. No spam. Unsubscribe anytime.</p>
                </div>
            </div>
        </div>
        `;
    } else {
        // UNLOCKED: show remaining points
        if (pointsArray.length > 2) {
            html += `
                <ul class="mistake-points">
                    ${pointsArray.slice(2).map(point => `<li>${point}</li>`).join('')}
                </ul>
            `;
        }

        // Action items
        if (actionItems.length > 0) {
            html += `
                <h3>&#x2705; Action Checklist</h3>
                <ul class="action-checklist">
                    ${actionItems.map(item => `
                        <li class="action-item">
                            <label><input type="checkbox"> ${item}</label>
                        </li>
                    `).join('')}
                </ul>
            `;
        }

        // How to avoid
        html += `
            <h3>&#x1F6E1; How to Avoid It</h3>
            <p class="mistake-remediation">${mistake.content.remediation}</p>
        `;

        // Metrics
        if (metrics.length > 0) {
            html += `
                <h3>&#x1F4CA; Metrics to Track</h3>
                <ul class="metrics-list">
                    ${metrics.map(m => `<li>${m}</li>`).join('')}
                </ul>
            `;
        }

        // Testimonials
        if (testimonials.length > 0) {
            html += `
                <h3>&#x1F4AC; What Founders Say</h3>
                <div class="mistake-testimonials">
                    ${testimonials.map(t => `
                        <blockquote class="mistake-testimonial">
                            <p>"${t.quote}"</p>
                            <cite>— ${t.author}${t.role ? `, ${t.role}` : ''}</cite>
                        </blockquote>
                    `).join('')}
                </div>
            `;
        }

        // Sources
        if (sources.length > 0) {
            html += `
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
            `;
        }

        // Tags
        if (tags.length > 0) {
            html += `
                <div class="mistake-tags">
                    ${tags.slice(0, 6).map(tag => `
                        <span class="mistake-tag">${getTagIcon(tag)} ${formatTagName(tag)}</span>
                    `).join('')}
                </div>
            `;
        }

        html += `</div>`;
    }

    document.getElementById('mistakeDetail').innerHTML = html;
}

// ========================================
// INLINE EMAIL GATE (Netlify Forms)
// ========================================

function checkEmailStatus() {
    if (state.email) {
        state.emailUnlocked = true;
    }
}

async function handleInlineEmailSubmit(e, mistakeId) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    const email = input.value;

    if (!email || !email.includes('@')) return;

    // Submit to Netlify Forms
    try {
        const formData = new URLSearchParams();
        formData.append('form-name', 'email-subscribers');
        formData.append('email', email);
        formData.append('vertical', state.quizEngine?.state?.answers?.vertical || '');
        formData.append('stage', state.quizEngine?.state?.answers?.funding_stage || '');
        formData.append('journey', state.quizEngine?.state?.answers?.journey_stage || '');
        formData.append('concerns', (state.quizEngine?.state?.answers?.concerns || []).join(','));
        formData.append('source', 'content_gate');

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        }).catch(err => console.error('Email submit error:', err));
    } catch (error) {
        console.error('Error saving email:', error);
    }

    // Unlock immediately (don't block on network)
    state.email = email;
    state.emailUnlocked = true;
    localStorage.setItem('rrw_email', email);

    showToast('Content unlocked! Enjoy the full antiplaybook.');

    // Re-render the mistake with full content
    const mistake = state.mistakesData.find(m => m.id === mistakeId);
    if (mistake) {
        renderMistakeDetail(mistake);
    }
}

// ========================================
// HELPERS
// ========================================

function getSourceTypeIcon(type) {
    const icons = {
        'article': '&#x1F4F0;', 'interview': '&#x1F399;', 'research': '&#x1F4CA;',
        'book': '&#x1F4D6;', 'video': '&#x1F3AC;', 'podcast': '&#x1F3A7;',
        'legal guide': '&#x2696;', 'case study': '&#x1F4BC;', 'guide': '&#x1F4D1;'
    };
    return icons[type] || '&#x1F517;';
}

function getTagIcon(tag) {
    const tagData = typeof predefinedTags !== 'undefined' ? predefinedTags[tag] : null;
    return tagData?.icon || '&#x1F3F7;';
}

function formatTagName(tag) {
    const tagData = typeof predefinedTags !== 'undefined' ? predefinedTags[tag] : null;
    if (tagData) return tagData.display_name;
    return tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
// MODALS
// ========================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMistakeModal() {
    document.getElementById('mistakeModal').classList.remove('active');
    document.body.style.overflow = '';
}

function showDefenseWarningModal() {
    openModal('defenseWarningModal');
}

function closeDefenseWarningModal() {
    document.getElementById('defenseWarningModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================

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
const _toastStyle = document.createElement('style');
_toastStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(_toastStyle);

// ========================================
// SHARE & EXPORT
// ========================================

function generateShareableLink() {
    if (!state.quizEngine) return window.location.origin + window.location.pathname;
    const answers = state.quizEngine.getAnswers();
    const encoded = btoa(JSON.stringify(answers));
    return window.location.origin + window.location.pathname + '?r=' + encoded;
}

function copyShareLink() {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link).then(() => {
        showToast('Link copied to clipboard!');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = link;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        showToast('Link copied to clipboard!');
    });
}

function loadFromShareableLink() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('r');
    if (!encoded) return;

    try {
        const answers = JSON.parse(atob(encoded));
        if (!state.quizEngine || !answers || typeof answers !== 'object') return;

        // Replay answers
        Object.entries(answers).forEach(([key, value]) => {
            state.quizEngine.answer(key, value);
        });

        // Complete and show results
        const profile = state.quizEngine.complete();
        state.userProfile = profile;

        // Short delay to let DOM settle
        setTimeout(() => {
            showDynamicResults(profile);
        }, 200);
    } catch (e) {
        console.error('Invalid share link:', e);
    }
}

function exportResultsPDF() {
    window.print();
}

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
    header.style.boxShadow = currentScrollY > 100 ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none';
    lastScrollY = currentScrollY;
});

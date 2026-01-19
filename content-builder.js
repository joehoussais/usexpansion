// ========================================
// US EXPANSION ANTIPLAYBOOK - CONTENT BUILDER
// Admin interface for creating and editing mistakes
// ========================================

class ContentBuilder {
    constructor(config = {}) {
        this.supabase = config.supabase;
        this.tagManager = config.tagManager;
        this.onSave = config.onSave || (() => {});
        this.onDelete = config.onDelete || (() => {});
        this.currentMistake = null;
        this.isEditing = false;
        this.quillEditor = null;
    }

    // Initialize the content builder
    async init() {
        this.setupEventListeners();
        await this.loadMistakesList();
        await this.loadTestimonials();
        this.initRichEditor();
    }

    // Initialize Quill rich text editor
    initRichEditor() {
        if (typeof Quill !== 'undefined') {
            this.quillEditor = new Quill('#rich-editor', {
                theme: 'snow',
                placeholder: 'Add detailed content here (optional)...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                    ]
                }
            });
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Edit existing mistake dropdown
        const editDropdown = document.getElementById('editExistingMistake');
        if (editDropdown) {
            editDropdown.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.loadMistakeForEdit(parseInt(e.target.value));
                } else {
                    this.resetForm();
                }
            });
        }

        // Form submission
        const form = document.getElementById('contentBuilderForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMistake();
            });
        }

        // Add point button
        const addPointBtn = document.getElementById('addPointBtn');
        if (addPointBtn) {
            addPointBtn.addEventListener('click', () => this.addPointField());
        }

        // Add resource button
        const addResourceBtn = document.getElementById('addResourceBtn');
        if (addResourceBtn) {
            addResourceBtn.addEventListener('click', () => this.addResourceField());
        }

        // Add testimonial button
        const addTestimonialBtn = document.getElementById('addNewTestimonialBtn');
        if (addTestimonialBtn) {
            addTestimonialBtn.addEventListener('click', () => this.showTestimonialModal());
        }

        // Preview button
        const previewBtn = document.getElementById('previewMistakeBtn');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => this.showPreview());
        }

        // Delete button
        const deleteBtn = document.getElementById('deleteMistakeBtn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deleteMistake());
        }

        // Reset button
        const resetBtn = document.getElementById('resetFormBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetForm());
        }

        // Tag checkbox changes - enable/disable weight sliders
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[name="tags[]"]')) {
                const slider = e.target.closest('.tag-option')?.querySelector('.tag-weight-slider');
                if (slider) {
                    slider.disabled = !e.target.checked;
                }
            }
        });

        // Weight slider changes
        document.addEventListener('input', (e) => {
            if (e.target.matches('.tag-weight-slider')) {
                const valueDisplay = e.target.closest('.tag-option')?.querySelector('.weight-value');
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value;
                }
            }
        });

        // Remove point buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.remove-point-btn')) {
                e.target.closest('.point-input-group').remove();
            }
            if (e.target.matches('.remove-resource-btn')) {
                e.target.closest('.resource-input-group').remove();
            }
        });
    }

    // Load list of existing mistakes for dropdown
    async loadMistakesList() {
        const dropdown = document.getElementById('editExistingMistake');
        if (!dropdown) return;

        try {
            const { data: mistakes, error } = await this.supabase
                .from('mistakes')
                .select('id, title, category')
                .eq('is_active', true)
                .order('display_order');

            if (error) throw error;

            dropdown.innerHTML = '<option value="">-- Create New Mistake --</option>';
            mistakes.forEach(m => {
                dropdown.innerHTML += `<option value="${m.id}">${m.title} (${m.category})</option>`;
            });
        } catch (err) {
            console.error('Failed to load mistakes list:', err);
        }
    }

    // Load existing testimonials for selection
    async loadTestimonials() {
        const container = document.getElementById('testimonialSelector');
        if (!container) return;

        try {
            const { data: testimonials, error } = await this.supabase
                .from('testimonial_quotes')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) throw error;

            container.innerHTML = testimonials.map(t => `
                <label class="testimonial-option">
                    <input type="checkbox" name="testimonials[]" value="${t.id}">
                    <span class="testimonial-preview">
                        <span class="testimonial-quote">"${t.quote.substring(0, 80)}..."</span>
                        <span class="testimonial-author">- ${t.author_name}</span>
                    </span>
                </label>
            `).join('') || '<p class="no-testimonials">No testimonials available. Add one below.</p>';
        } catch (err) {
            console.error('Failed to load testimonials:', err);
        }
    }

    // Load a mistake for editing
    async loadMistakeForEdit(mistakeId) {
        try {
            const { data: mistake, error } = await this.supabase
                .from('mistakes')
                .select('*')
                .eq('id', mistakeId)
                .single();

            if (error) throw error;

            this.currentMistake = mistake;
            this.isEditing = true;
            this.populateForm(mistake);

            // Load associated tags
            await this.loadMistakeTags(mistakeId);

            // Load associated testimonials
            await this.loadMistakeTestimonials(mistakeId);

            // Load associated resources
            await this.loadMistakeResources(mistakeId);

            // Show delete button
            const deleteBtn = document.getElementById('deleteMistakeBtn');
            if (deleteBtn) deleteBtn.style.display = 'inline-block';

        } catch (err) {
            console.error('Failed to load mistake:', err);
            this.showToast('Failed to load mistake', 'error');
        }
    }

    // Populate form with mistake data
    populateForm(mistake) {
        document.getElementById('cbTitle').value = mistake.title || '';
        document.getElementById('cbIcon').value = mistake.icon || '';
        document.getElementById('cbCategory').value = mistake.category || 'Product';
        document.getElementById('cbCost').value = mistake.cost || '';
        document.getElementById('cbPreview').value = mistake.preview || '';
        document.getElementById('cbProblem').value = mistake.problem || '';
        document.getElementById('cbRemediation').value = mistake.remediation || '';
        document.getElementById('cbResourceUrl').value = mistake.resource_url || '';

        // Populate points
        const pointsContainer = document.getElementById('pointsContainer');
        pointsContainer.innerHTML = '';
        const points = typeof mistake.points === 'string' ? JSON.parse(mistake.points) : mistake.points || [];
        points.forEach(point => this.addPointField(point));
        if (points.length === 0) this.addPointField();

        // Populate special considerations
        const specialSelect = document.getElementById('cbSpecialConsiderations');
        if (specialSelect && mistake.special_considerations) {
            Array.from(specialSelect.options).forEach(opt => {
                opt.selected = mistake.special_considerations.includes(opt.value);
            });
        }

        // Rich content
        if (this.quillEditor && mistake.rich_content) {
            this.quillEditor.root.innerHTML = mistake.rich_content;
        }
    }

    // Load tags for a mistake
    async loadMistakeTags(mistakeId) {
        try {
            const { data, error } = await this.supabase
                .from('mistake_tags')
                .select('tag_id, relevance_weight')
                .eq('mistake_id', mistakeId);

            if (error) throw error;

            // Check the appropriate tag checkboxes and set weights
            data.forEach(({ tag_id, relevance_weight }) => {
                const checkbox = document.querySelector(`input[name="tags[]"][value="${tag_id}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    const slider = checkbox.closest('.tag-option')?.querySelector('.tag-weight-slider');
                    if (slider) {
                        slider.disabled = false;
                        slider.value = relevance_weight;
                        const valueDisplay = slider.closest('.tag-option')?.querySelector('.weight-value');
                        if (valueDisplay) valueDisplay.textContent = relevance_weight;
                    }
                }
            });
        } catch (err) {
            console.error('Failed to load mistake tags:', err);
        }
    }

    // Load testimonials for a mistake
    async loadMistakeTestimonials(mistakeId) {
        try {
            const { data, error } = await this.supabase
                .from('mistake_testimonials')
                .select('testimonial_id')
                .eq('mistake_id', mistakeId);

            if (error) throw error;

            data.forEach(({ testimonial_id }) => {
                const checkbox = document.querySelector(`input[name="testimonials[]"][value="${testimonial_id}"]`);
                if (checkbox) checkbox.checked = true;
            });
        } catch (err) {
            console.error('Failed to load mistake testimonials:', err);
        }
    }

    // Load resources for a mistake
    async loadMistakeResources(mistakeId) {
        try {
            const { data, error } = await this.supabase
                .from('mistake_resources')
                .select('resources(*)')
                .eq('mistake_id', mistakeId);

            if (error) throw error;

            const resourcesContainer = document.getElementById('resourcesContainer');
            resourcesContainer.innerHTML = '';

            if (data.length === 0) {
                this.addResourceField();
            } else {
                data.forEach(({ resources: resource }) => {
                    this.addResourceField(resource);
                });
            }
        } catch (err) {
            console.error('Failed to load mistake resources:', err);
        }
    }

    // Add a point input field
    addPointField(value = '') {
        const container = document.getElementById('pointsContainer');
        const div = document.createElement('div');
        div.className = 'point-input-group';
        div.innerHTML = `
            <input type="text" name="points[]" value="${this.escapeHtml(value)}" placeholder="Enter a key point..." class="point-input">
            <button type="button" class="remove-point-btn btn-icon">&times;</button>
        `;
        container.appendChild(div);
    }

    // Add a resource input field
    addResourceField(resource = {}) {
        const container = document.getElementById('resourcesContainer');
        const div = document.createElement('div');
        div.className = 'resource-input-group';
        div.innerHTML = `
            <input type="text" name="resource_title[]" value="${this.escapeHtml(resource.title || '')}" placeholder="Resource title" class="resource-title-input">
            <input type="url" name="resource_url[]" value="${this.escapeHtml(resource.url || '')}" placeholder="URL" class="resource-url-input">
            <select name="resource_type[]" class="resource-type-select">
                <option value="article" ${resource.resource_type === 'article' ? 'selected' : ''}>Article</option>
                <option value="video" ${resource.resource_type === 'video' ? 'selected' : ''}>Video</option>
                <option value="tool" ${resource.resource_type === 'tool' ? 'selected' : ''}>Tool</option>
                <option value="template" ${resource.resource_type === 'template' ? 'selected' : ''}>Template</option>
                <option value="guide" ${resource.resource_type === 'guide' ? 'selected' : ''}>Guide</option>
            </select>
            <button type="button" class="remove-resource-btn btn-icon">&times;</button>
        `;
        container.appendChild(div);
    }

    // Show testimonial creation modal
    showTestimonialModal() {
        const modal = document.getElementById('testimonialModal');
        if (modal) {
            modal.style.display = 'flex';
            document.getElementById('newTestimonialQuote').value = '';
            document.getElementById('newTestimonialAuthor').value = '';
            document.getElementById('newTestimonialRole').value = '';
            document.getElementById('newTestimonialCompany').value = '';
        }
    }

    // Save new testimonial
    async saveNewTestimonial() {
        const quote = document.getElementById('newTestimonialQuote').value.trim();
        const author = document.getElementById('newTestimonialAuthor').value.trim();
        const role = document.getElementById('newTestimonialRole').value.trim();
        const company = document.getElementById('newTestimonialCompany').value.trim();

        if (!quote || !author) {
            this.showToast('Quote and author are required', 'error');
            return;
        }

        try {
            const { data, error } = await this.supabase
                .from('testimonial_quotes')
                .insert({
                    quote,
                    author_name: author,
                    author_role: role,
                    author_company: company,
                    author_avatar: '&#x1F4AC;',
                    is_active: true
                })
                .select()
                .single();

            if (error) throw error;

            // Close modal
            document.getElementById('testimonialModal').style.display = 'none';

            // Reload testimonials
            await this.loadTestimonials();

            // Auto-select the new testimonial
            setTimeout(() => {
                const checkbox = document.querySelector(`input[name="testimonials[]"][value="${data.id}"]`);
                if (checkbox) checkbox.checked = true;
            }, 100);

            this.showToast('Testimonial created', 'success');
        } catch (err) {
            console.error('Failed to save testimonial:', err);
            this.showToast('Failed to save testimonial', 'error');
        }
    }

    // Collect form data
    collectFormData() {
        // Points
        const points = Array.from(document.querySelectorAll('input[name="points[]"]'))
            .map(input => input.value.trim())
            .filter(v => v);

        // Tags with weights
        const tagAssignments = [];
        document.querySelectorAll('input[name="tags[]"]:checked').forEach(checkbox => {
            const tagId = parseInt(checkbox.value);
            const slider = checkbox.closest('.tag-option')?.querySelector('.tag-weight-slider');
            const weight = slider ? parseInt(slider.value) : 2;
            tagAssignments.push({ tag_id: tagId, relevance_weight: weight });
        });

        // Testimonials
        const testimonialIds = Array.from(document.querySelectorAll('input[name="testimonials[]"]:checked'))
            .map(cb => parseInt(cb.value));

        // Resources
        const resources = [];
        document.querySelectorAll('.resource-input-group').forEach(group => {
            const title = group.querySelector('input[name="resource_title[]"]').value.trim();
            const url = group.querySelector('input[name="resource_url[]"]').value.trim();
            const type = group.querySelector('select[name="resource_type[]"]').value;
            if (title && url) {
                resources.push({ title, url, resource_type: type });
            }
        });

        // Special considerations
        const specialConsiderations = Array.from(document.getElementById('cbSpecialConsiderations').selectedOptions)
            .map(opt => opt.value);

        // Rich content
        const richContent = this.quillEditor ? this.quillEditor.root.innerHTML : '';

        return {
            title: document.getElementById('cbTitle').value.trim(),
            icon: document.getElementById('cbIcon').value.trim() || '&#x1F4DD;',
            category: document.getElementById('cbCategory').value,
            cost: document.getElementById('cbCost').value.trim(),
            preview: document.getElementById('cbPreview').value.trim(),
            problem: document.getElementById('cbProblem').value.trim(),
            points: JSON.stringify(points),
            remediation: document.getElementById('cbRemediation').value.trim(),
            resource_url: document.getElementById('cbResourceUrl').value.trim(),
            special_considerations: specialConsiderations,
            rich_content: richContent === '<p><br></p>' ? '' : richContent,
            tagAssignments,
            testimonialIds,
            resources
        };
    }

    // Validate form data
    validateFormData(data) {
        const errors = [];

        if (!data.title) errors.push('Title is required');
        if (!data.preview) errors.push('Preview text is required');
        if (!data.problem) errors.push('Problem statement is required');
        if (data.points === '[]') errors.push('At least one point is required');
        if (!data.remediation) errors.push('Remediation advice is required');

        return errors;
    }

    // Save mistake
    async saveMistake() {
        const data = this.collectFormData();
        const errors = this.validateFormData(data);

        if (errors.length > 0) {
            this.showToast(errors.join('. '), 'error');
            return;
        }

        try {
            // Prepare mistake data (without relations)
            const mistakeData = {
                title: data.title,
                icon: data.icon,
                category: data.category,
                cost: data.cost,
                preview: data.preview,
                problem: data.problem,
                points: data.points,
                remediation: data.remediation,
                resource_url: data.resource_url || null,
                special_considerations: data.special_considerations,
                rich_content: data.rich_content,
                is_active: true
            };

            let mistakeId;

            if (this.isEditing && this.currentMistake) {
                // Update existing
                const { error } = await this.supabase
                    .from('mistakes')
                    .update(mistakeData)
                    .eq('id', this.currentMistake.id);

                if (error) throw error;
                mistakeId = this.currentMistake.id;
            } else {
                // Get next display order
                const { data: maxOrder } = await this.supabase
                    .from('mistakes')
                    .select('display_order')
                    .order('display_order', { ascending: false })
                    .limit(1)
                    .single();

                mistakeData.display_order = (maxOrder?.display_order || 0) + 1;

                // Insert new
                const { data: newMistake, error } = await this.supabase
                    .from('mistakes')
                    .insert(mistakeData)
                    .select()
                    .single();

                if (error) throw error;
                mistakeId = newMistake.id;
            }

            // Save tags
            await this.saveMistakeTags(mistakeId, data.tagAssignments);

            // Save testimonials
            await this.saveMistakeTestimonials(mistakeId, data.testimonialIds);

            // Save resources
            await this.saveMistakeResources(mistakeId, data.resources);

            this.showToast(this.isEditing ? 'Mistake updated!' : 'Mistake created!', 'success');

            // Reload mistakes list
            await this.loadMistakesList();

            // Callback
            this.onSave(mistakeId);

            if (!this.isEditing) {
                this.resetForm();
            }

        } catch (err) {
            console.error('Failed to save mistake:', err);
            this.showToast('Failed to save: ' + err.message, 'error');
        }
    }

    // Save mistake tags
    async saveMistakeTags(mistakeId, tagAssignments) {
        // Delete existing
        await this.supabase
            .from('mistake_tags')
            .delete()
            .eq('mistake_id', mistakeId);

        // Insert new
        if (tagAssignments.length > 0) {
            const { error } = await this.supabase
                .from('mistake_tags')
                .insert(tagAssignments.map(ta => ({
                    mistake_id: mistakeId,
                    tag_id: ta.tag_id,
                    relevance_weight: ta.relevance_weight
                })));

            if (error) throw error;
        }
    }

    // Save mistake testimonials
    async saveMistakeTestimonials(mistakeId, testimonialIds) {
        // Delete existing
        await this.supabase
            .from('mistake_testimonials')
            .delete()
            .eq('mistake_id', mistakeId);

        // Insert new
        if (testimonialIds.length > 0) {
            const { error } = await this.supabase
                .from('mistake_testimonials')
                .insert(testimonialIds.map((tid, idx) => ({
                    mistake_id: mistakeId,
                    testimonial_id: tid,
                    display_order: idx
                })));

            if (error) throw error;
        }
    }

    // Save mistake resources
    async saveMistakeResources(mistakeId, resources) {
        // Delete existing resource links
        await this.supabase
            .from('mistake_resources')
            .delete()
            .eq('mistake_id', mistakeId);

        // Create/update resources and link
        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i];

            // Insert resource (or get existing by URL)
            const { data: existingResource } = await this.supabase
                .from('resources')
                .select('id')
                .eq('url', resource.url)
                .single();

            let resourceId;

            if (existingResource) {
                resourceId = existingResource.id;
                // Update if exists
                await this.supabase
                    .from('resources')
                    .update({ title: resource.title, resource_type: resource.resource_type })
                    .eq('id', resourceId);
            } else {
                // Insert new
                const { data: newResource, error } = await this.supabase
                    .from('resources')
                    .insert({
                        title: resource.title,
                        url: resource.url,
                        resource_type: resource.resource_type,
                        is_active: true
                    })
                    .select()
                    .single();

                if (error) throw error;
                resourceId = newResource.id;
            }

            // Link to mistake
            await this.supabase
                .from('mistake_resources')
                .insert({
                    mistake_id: mistakeId,
                    resource_id: resourceId,
                    display_order: i
                });
        }
    }

    // Delete mistake
    async deleteMistake() {
        if (!this.isEditing || !this.currentMistake) return;

        if (!confirm('Are you sure you want to delete this mistake? This cannot be undone.')) {
            return;
        }

        try {
            // Soft delete (set is_active to false)
            const { error } = await this.supabase
                .from('mistakes')
                .update({ is_active: false })
                .eq('id', this.currentMistake.id);

            if (error) throw error;

            this.showToast('Mistake deleted', 'success');
            this.onDelete(this.currentMistake.id);
            this.resetForm();
            await this.loadMistakesList();
        } catch (err) {
            console.error('Failed to delete mistake:', err);
            this.showToast('Failed to delete', 'error');
        }
    }

    // Show preview
    showPreview() {
        const data = this.collectFormData();
        const points = JSON.parse(data.points);

        const previewHtml = `
            <div class="mistake-preview-content">
                <div class="preview-header">
                    <span class="preview-icon">${data.icon}</span>
                    <span class="preview-category">${data.category}</span>
                    <span class="preview-cost">${data.cost}</span>
                </div>
                <h3 class="preview-title">${data.title}</h3>
                <p class="preview-text">${data.preview}</p>
                <div class="preview-problem">
                    <strong>Problem:</strong> ${data.problem}
                </div>
                <ul class="preview-points">
                    ${points.map(p => `<li>${p}</li>`).join('')}
                </ul>
                <div class="preview-remediation">
                    <strong>How to Avoid:</strong> ${data.remediation}
                </div>
                ${data.rich_content ? `<div class="preview-rich-content">${data.rich_content}</div>` : ''}
            </div>
        `;

        const modal = document.getElementById('previewModal');
        const container = document.getElementById('previewContent');
        if (modal && container) {
            container.innerHTML = previewHtml;
            modal.style.display = 'flex';
        }
    }

    // Reset form
    resetForm() {
        this.currentMistake = null;
        this.isEditing = false;

        document.getElementById('contentBuilderForm')?.reset();
        document.getElementById('editExistingMistake').value = '';

        // Reset points
        const pointsContainer = document.getElementById('pointsContainer');
        if (pointsContainer) {
            pointsContainer.innerHTML = '';
            this.addPointField();
        }

        // Reset resources
        const resourcesContainer = document.getElementById('resourcesContainer');
        if (resourcesContainer) {
            resourcesContainer.innerHTML = '';
            this.addResourceField();
        }

        // Reset tag checkboxes
        document.querySelectorAll('input[name="tags[]"]').forEach(cb => {
            cb.checked = false;
            const slider = cb.closest('.tag-option')?.querySelector('.tag-weight-slider');
            if (slider) {
                slider.disabled = true;
                slider.value = 2;
            }
        });

        // Reset testimonials
        document.querySelectorAll('input[name="testimonials[]"]').forEach(cb => cb.checked = false);

        // Reset special considerations
        const specialSelect = document.getElementById('cbSpecialConsiderations');
        if (specialSelect) {
            Array.from(specialSelect.options).forEach(opt => opt.selected = false);
        }

        // Reset rich editor
        if (this.quillEditor) {
            this.quillEditor.root.innerHTML = '';
        }

        // Hide delete button
        const deleteBtn = document.getElementById('deleteMistakeBtn');
        if (deleteBtn) deleteBtn.style.display = 'none';
    }

    // Helper: escape HTML
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Show toast notification
    showToast(message, type = 'info') {
        // Use existing toast function if available
        if (typeof showToast === 'function') {
            showToast(message, type);
            return;
        }

        // Fallback: simple toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            background: ${type === 'error' ? '#FF4D4D' : type === 'success' ? '#00D9FF' : '#1A2A3A'};
            color: white;
            border-radius: 4px;
            z-index: 10000;
            font-family: 'Press Start 2P', cursive;
            font-size: 10px;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentBuilder;
}

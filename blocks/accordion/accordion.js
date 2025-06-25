/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */
export default async function decorate(block) {
    const lang = 'EN';
    const languages = await getData();
    [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
    const tooltip = createTooltip();
    summary.appendChild(tooltip)

    summary.addEventListener('mouseover', () => {
        tooltip.classList.add('tooltip--active');
        const hasAttribute = details.hasAttribute('open');
        if(hasAttribute) {
            tooltip.innerHTML = languages.data[1][lang] ?? 'Close';
        } else {
            tooltip.innerHTML = languages.data[0][lang] ?? 'Open';
        }
    })

    summary.addEventListener('mouseleave', () => {
        tooltip.classList.remove('tooltip--active');
    })

    summary.addEventListener('click', () => {
        setTimeout(() => {
            triggerRerender(details, tooltip, languages, lang)
        }, 0);
    })
  });
}

function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip')
    tooltip.innerHTML='test';
    return tooltip;
}

function triggerRerender(details, tooltip, languages, lang) {
        const hasAttribute = details.hasAttribute('open');
        if(hasAttribute) {
            tooltip.innerHTML = languages.data[1][lang] ?? 'Close';
        } else {
            tooltip.innerHTML = languages.data[0][lang] ?? 'Open';
        }
}

async function getData() {
        const res = await fetch('/data.json');
        const data = await res.json();
        return data;
}
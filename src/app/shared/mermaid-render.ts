let diagramId = 0;

/**
 * Angular parses the `<br />` in a node label as a real element, which
 * `textContent` drops. Turn each one back into text so Mermaid still sees the
 * line break.
 */
function diagramSource(diagram: HTMLElement): string {
    const copy = diagram.cloneNode(true) as HTMLElement;
    copy.querySelectorAll('br').forEach(br => br.replaceWith('<br/>'));
    return copy.textContent?.trim() ?? '';
}

/**
 * Finds every not-yet-rendered `.mermaid` element inside `container` and
 * replaces its text content with the rendered SVG diagram.
 *
 * Safe to call multiple times on the same container: elements that were
 * already rendered (marked with `data-mermaid-rendered`) are skipped.
 */
export async function renderMermaidDiagrams(container: HTMLElement): Promise<void> {
    const diagrams = Array.from(
        container.querySelectorAll<HTMLElement>('.mermaid:not([data-mermaid-rendered])')
    );

    if (!diagrams.length) {
        return;
    }

    // Claim them before the first await, so a nested component rendering the
    // same diagrams at the same time skips them.
    diagrams.forEach(diagram => diagram.dataset['mermaidRendered'] = 'true');

    const mermaid = (await import('mermaid')).default;

    mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'dark',
        themeVariables: {
            background: '#131719',
            primaryColor: '#16201f',
            primaryTextColor: '#e9e7e2',
            primaryBorderColor: '#3ee6b0',
            lineColor: '#7d8a86',
            secondaryColor: '#101315',
            tertiaryColor: '#1a1f22',
            textColor: '#e9e7e2',
            edgeLabelBackground: '#131719',
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Consolas, monospace'
        }
    });

    for (const diagram of diagrams) {
        try {
            const source = diagramSource(diagram);
            const { svg, bindFunctions } = await mermaid.render(`project-diagram-${diagramId++}`, source);
            diagram.innerHTML = svg;
            bindFunctions?.(diagram);

            // Mermaid sizes the SVG to 100% of its box, which shrinks wide flowcharts
            // to an unreadable size on phones. Keep a minimum width so the
            // (overflow-x: auto) container scrolls instead.
            const rendered = diagram.querySelector('svg');
            const naturalWidth = rendered?.viewBox.baseVal?.width ?? 0;
            if (rendered && naturalWidth > 0) {
                rendered.style.minWidth = `${Math.round(Math.min(naturalWidth, 640))}px`;
            }
        } catch (error) {
            diagram.removeAttribute('data-mermaid-rendered');
            console.error('Unable to render Mermaid diagram.', error);
        }
    }
}

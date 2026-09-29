# Add light and dark modes

## Build
- Add a reusable theme toggle with sun and moon icons.
- Show it in the top area of the portfolio and every project case study.
- Default to the visitor’s system preference, then remember their manual choice in the browser.
- Apply the theme before the page paints to avoid a bright flash.
- Update translucent panels, tags, links, grid lines, and image outlines so both themes remain readable.

## Technical details
- Toggle a `dark` class on the document root and store `light` or `dark` in local storage.
- Keep the current semantic color tokens and extend dark-specific surface tokens rather than duplicating page styles.
- Use the existing design-system button and Lucide icons with accessible labels and tooltips.
- Verify the home page and a case study in both themes, including the current narrow viewport.

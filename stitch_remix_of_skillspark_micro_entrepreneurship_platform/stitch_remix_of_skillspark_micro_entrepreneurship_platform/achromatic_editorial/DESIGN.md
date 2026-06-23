---
name: Achromatic Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 88px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.12em
  mono-label:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-page: 64px
  gutter: 24px
  stack-xl: 120px
  stack-md: 48px
  stack-sm: 12px
---

## Brand & Style
The design system embodies an ultra-premium, high-fashion editorial aesthetic tailored for an avant-garde technical audience. The brand personality is cold, precise, and sophisticated, intentionally eschewing warmth for a "gallery-space" atmosphere. It draws heavily from **Minimalism** and **Glassmorphism**, specifically utilizing "stark light" themes to evoke the feeling of a high-end physical lookbook or a technical schematic for a luxury product.

The emotional response is one of exclusivity and absolute clarity. The interface acts as a silent, high-fidelity frame for content, prioritizing negative space as a functional element rather than a void. Every interaction should feel deliberate and weighted, mirroring the tactile experience of turning thick, matte paper in an architectural journal.

## Colors
The palette is strictly monochromatic, relying on value and transparency rather than hue.
- **Base Surface:** Pure White (#FFFFFF) serves as the primary canvas.
- **Alt Surface:** Near-White (#FAFAFA) is used for subtle depth separation in secondary containers.
- **Primary Text:** Jet-Black (#0A0A0A) ensures maximum contrast and a sharp, ink-on-paper feel.
- **Secondary/Disabled:** Mid-grays are used sparingly for non-interactive metadata or placeholder states.
- **Interaction:** Selection states are indicated by pure black fills or high-contrast reversals. No accent colors are permitted; the "pop" comes from the radical shift in contrast.

## Typography
This design system relies on a dramatic scale contrast. 
- **Headlines:** Use Playfair Display for an editorial serif feel. Headlines should be oversized with tight tracking to create a "blocky" visual weight on the page.
- **UI Chrome & Labels:** Use Inter. Small labels must be set in uppercase with generous letter-spacing (0.12em) to maintain legibility at small sizes and evoke technical precision.
- **Hierarchy:** The jump between `label-sm` and `headline-xl` should be extreme to create a dynamic, asymmetric visual interest.

## Layout & Spacing
The layout follows an **Asymmetric Editorial Grid**. It is not strictly fluid; it uses intentional "dead zones" of negative space to guide the eye.
- **Desktop:** 12-column grid with ultra-wide margins (64px+). Content should often be offset (e.g., spanning columns 3 through 10) to create tension.
- **Mobile:** Transition to a 4-column grid with 20px margins. Headlines should scale aggressively to prevent horizontal overflow.
- **Rhythm:** Use a 4px baseline grid for UI elements, but utilize large "stacking" blocks (120px) to separate major content sections, ensuring the UI feels uncrowded and premium.

## Elevation & Depth
Depth is achieved through high-fidelity **Glassmorphism** and studio lighting.
- **Surfaces:** Floating panels use 60-80% opacity white with a heavy `backdrop-filter: blur(20px)`. 
- **Borders:** All elevated elements must have a 1px solid hairline border in a very light gray (#E5E5E5) to define the edge against the white background.
- **Shadows:** Use asymmetric, long shadows that mimic directional studio lighting (e.g., `offset-y: 20px`, `blur: 40px`, `color: rgba(0,0,0,0.04)`). 
- **Lighting:** A subtle top-down white inner shadow can be used on buttons to simulate a "beveled" glass edge.

## Shapes
The shape language is disciplined and architectural. 
- **Corner Radius:** Standard elements use a 4px to 8px radius. This is "Soft" but leans toward "Sharp" to maintain a technical, engineered appearance.
- **Interactive Elements:** Buttons and input fields should strictly adhere to the 4px (rounded-sm) or 8px (rounded-md) rules. Large cards can occasionally use 12px if the content is highly organic (like photography).

## Components
- **Buttons:** Primary buttons are solid #0A0A0A with white text. Hover states trigger a subtle 1.02x scale. Secondary buttons are transparent with 1px black borders.
- **Input Fields:** Minimalist lines. Use a bottom-only border (1px) that thickens to 2px on focus. No background fill unless the field is active.
- **Chips/Tags:** Small caps text, rectangular, 4px border radius, light gray background (#F1F1F1).
- **Cards:** Utilize the glassmorphism spec. Ensure the 1px hairline border is present. Shadows should be "long and soft," appearing only on hover to indicate interactivity.
- **Iconography:** Use ultra-thin (1px or 0.5pt) monochrome stroke icons. No fills.
- **Lists:** High-contrast separators (1px #F1F1F1). Large vertical padding between items to maintain the editorial feel.
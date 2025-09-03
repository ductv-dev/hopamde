/**
 * Comprehensive CSS Properties Type Definition
 * This file contains all CSS properties as TypeScript types for type-safe styling
 */

export type CSSProperties = {
  // Layout Properties
  display?:
    | 'block'
    | 'inline'
    | 'inline-block'
    | 'flex'
    | 'inline-flex'
    | 'grid'
    | 'inline-grid'
    | 'table'
    | 'inline-table'
    | 'table-row'
    | 'table-cell'
    | 'table-column'
    | 'table-column-group'
    | 'table-footer-group'
    | 'table-header-group'
    | 'table-row-group'
    | 'none'
    | 'contents'
    | 'flow-root'
    | 'list-item'
    | 'run-in';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number | 'auto';
  float?: 'left' | 'right' | 'none';
  clear?: 'left' | 'right' | 'both' | 'none';

  // Box Model Properties
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  margin?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  padding?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  border?: string;
  borderWidth?: string | number;
  borderStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  borderColor?: string;
  borderTop?: string;
  borderTopWidth?: string | number;
  borderTopStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  borderTopColor?: string;
  borderRight?: string;
  borderRightWidth?: string | number;
  borderRightStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  borderRightColor?: string;
  borderBottom?: string;
  borderBottomWidth?: string | number;
  borderBottomStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  borderBottomColor?: string;
  borderLeft?: string;
  borderLeftWidth?: string | number;
  borderLeftStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  borderLeftColor?: string;
  borderRadius?: string | number;
  borderTopLeftRadius?: string | number;
  borderTopRightRadius?: string | number;
  borderBottomRightRadius?: string | number;
  borderBottomLeftRadius?: string | number;
  boxSizing?: 'content-box' | 'border-box' | 'padding-box';
  boxShadow?: string;
  outline?: string;
  outlineWidth?: string | number;
  outlineStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
  outlineColor?: string;
  outlineOffset?: string | number;

  // Flexbox Properties
  flex?: string | number;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexFlow?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number | 'auto' | 'content';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'left'
    | 'right';
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end';
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'start'
    | 'end'
    | 'baseline'
    | 'first baseline'
    | 'last baseline';
  order?: number;

  // Grid Properties
  grid?: string;
  gridTemplate?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridArea?: string;
  gridColumn?: string;
  gridColumnStart?: string | number;
  gridColumnEnd?: string | number;
  gridRow?: string;
  gridRowStart?: string | number;
  gridRowEnd?: string | number;
  gridGap?: string | number;
  gridColumnGap?: string | number;
  gridRowGap?: string | number;
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
  placeItems?: string;
  placeSelf?: string;
  placeContent?: string;

  // Typography Properties
  color?: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?:
    | number
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontVariant?: string;
  lineHeight?: string | number;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
  textAlignLast?:
    | 'auto'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'start'
    | 'end';
  textDecoration?: string;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'overline'
    | 'line-through'
    | 'blink';
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  textDecorationColor?: string;
  textDecorationThickness?: string | number;
  textIndent?: string | number;
  textJustify?: 'auto' | 'inter-word' | 'inter-character' | 'distribute';
  textOverflow?: 'clip' | 'ellipsis' | string;
  textShadow?: string;
  textTransform?:
    | 'none'
    | 'capitalize'
    | 'uppercase'
    | 'lowercase'
    | 'full-width'
    | 'full-size-kana';
  textUnderlineOffset?: string | number;
  textUnderlinePosition?: 'auto' | 'under' | 'left' | 'right';
  verticalAlign?:
    | 'baseline'
    | 'sub'
    | 'super'
    | 'text-top'
    | 'text-bottom'
    | 'middle'
    | 'top'
    | 'bottom'
    | string
    | number;
  whiteSpace?:
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'pre-wrap'
    | 'pre-line'
    | 'break-spaces';
  wordBreak?:
    | 'normal'
    | 'break-all'
    | 'keep-all'
    | 'break-word'
    | 'break-spaces';
  wordSpacing?: string | number;
  wordWrap?: 'normal' | 'break-word' | 'break-spaces';
  letterSpacing?: string | number;
  fontStretch?:
    | 'normal'
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded';
  fontVariantCaps?:
    | 'normal'
    | 'small-caps'
    | 'all-small-caps'
    | 'petite-caps'
    | 'all-petite-caps'
    | 'unicase'
    | 'titling-caps';
  fontVariantNumeric?: string;
  fontVariantLigatures?: string;
  fontFeatureSettings?: string;
  fontLanguageOverride?: string;
  fontOpticalSizing?: 'auto' | 'none';
  fontPalette?: string;
  fontSynthesis?: string;
  fontSynthesisWeight?: 'auto' | 'none';
  fontSynthesisStyle?: 'auto' | 'none';
  fontSynthesisSmallCaps?: 'auto' | 'none';

  // Background Properties
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundRepeat?:
    | 'repeat'
    | 'repeat-x'
    | 'repeat-y'
    | 'no-repeat'
    | 'space'
    | 'round'
    | 'initial'
    | 'inherit';
  backgroundAttachment?: 'scroll' | 'fixed' | 'local' | 'initial' | 'inherit';
  backgroundPosition?: string;
  backgroundPositionX?: string | number;
  backgroundPositionY?: string | number;
  backgroundSize?: string | number;
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
  backgroundOrigin?: 'border-box' | 'padding-box' | 'content-box';
  backgroundBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';

  // Visual Properties
  opacity?: number;
  visibility?: 'visible' | 'hidden' | 'collapse';
  cursor?:
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'grab'
    | 'grabbing'
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'zoom-in'
    | 'zoom-out';
  clip?: string;
  clipPath?: string;
  filter?: string;
  backdropFilter?: string;
  transform?: string;
  transformOrigin?: string;
  transformStyle?: 'flat' | 'preserve-3d';
  perspective?: string | number | 'none';
  perspectiveOrigin?: string;
  backfaceVisibility?: 'visible' | 'hidden';
  transition?: string;
  transitionProperty?: string;
  transitionDuration?: string | number;
  transitionTimingFunction?: string;
  transitionDelay?: string | number;
  animation?: string;
  animationName?: string;
  animationDuration?: string | number;
  animationTimingFunction?: string;
  animationDelay?: string | number;
  animationIterationCount?: number | 'infinite';
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  animationPlayState?: 'running' | 'paused';

  // List Properties
  listStyle?: string;
  listStyleType?: string;
  listStylePosition?: 'inside' | 'outside';
  listStyleImage?: string;

  // Table Properties
  tableLayout?: 'auto' | 'fixed';
  borderCollapse?: 'separate' | 'collapse';
  borderSpacing?: string | number;
  captionSide?:
    | 'top'
    | 'bottom'
    | 'block-start'
    | 'block-end'
    | 'inline-start'
    | 'inline-end';
  emptyCells?: 'show' | 'hide';

  // Content Properties
  content?: string;
  quotes?: string;
  counterReset?: string;
  counterIncrement?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
  userSelect?: 'auto' | 'text' | 'none' | 'contain' | 'all';
  pointerEvents?:
    | 'auto'
    | 'none'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'fill'
    | 'stroke'
    | 'all'
    | 'inherit';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
  overflowWrap?: 'normal' | 'break-word' | 'break-spaces';
  hyphens?: 'none' | 'manual' | 'auto';
  tabSize?: string | number;
  textOrientation?: 'mixed' | 'upright' | 'sideways';
  writingMode?:
    | 'horizontal-tb'
    | 'vertical-rl'
    | 'vertical-lr'
    | 'sideways-rl'
    | 'sideways-lr';
  direction?: 'ltr' | 'rtl';
  unicodeBidi?:
    | 'normal'
    | 'embed'
    | 'bidi-override'
    | 'isolate'
    | 'isolate-override'
    | 'plaintext';

  // Print Properties
  pageBreakAfter?:
    | 'auto'
    | 'always'
    | 'avoid'
    | 'left'
    | 'right'
    | 'recto'
    | 'verso';
  pageBreakBefore?:
    | 'auto'
    | 'always'
    | 'avoid'
    | 'left'
    | 'right'
    | 'recto'
    | 'verso';
  pageBreakInside?:
    | 'auto'
    | 'avoid'
    | 'avoid-page'
    | 'avoid-column'
    | 'avoid-region';
  orphans?: number;
  widows?: number;

  // CSS Variables
  [key: `--${string}`]: string | number;

  // Vendor Prefixes
  WebkitAppearance?: string;
  WebkitBackgroundClip?: string;
  WebkitBackgroundOrigin?: string;
  WebkitBorderImage?: string;
  WebkitBoxAlign?: string;
  WebkitBoxDirection?: string;
  WebkitBoxFlex?: number;
  WebkitBoxOrdinalGroup?: number;
  WebkitBoxOrient?: string;
  WebkitBoxPack?: string;
  WebkitBoxShadow?: string;
  WebkitBoxSizing?: string;
  WebkitColumnBreakAfter?: string;
  WebkitColumnBreakBefore?: string;
  WebkitColumnBreakInside?: string;
  WebkitColumnCount?: number;
  WebkitColumnGap?: string | number;
  WebkitColumnRule?: string;
  WebkitColumnRuleColor?: string;
  WebkitColumnRuleStyle?: string;
  WebkitColumnRuleWidth?: string | number;
  WebkitColumnSpan?: number;
  WebkitColumnWidth?: string | number;
  WebkitColumns?: string;
  WebkitFilter?: string;
  WebkitFlex?: string | number;
  WebkitFlexBasis?: string | number;
  WebkitFlexDirection?: string;
  WebkitFlexFlow?: string;
  WebkitFlexGrow?: number;
  WebkitFlexShrink?: number;
  WebkitFlexWrap?: string;
  WebkitJustifyContent?: string;
  WebkitOrder?: number;
  WebkitPerspective?: string | number;
  WebkitPerspectiveOrigin?: string;
  WebkitTapHighlightColor?: string;
  WebkitTextFillColor?: string;
  WebkitTextSizeAdjust?: string;
  WebkitTextStroke?: string;
  WebkitTextStrokeColor?: string;
  WebkitTextStrokeWidth?: string | number;
  WebkitTransform?: string;
  WebkitTransformOrigin?: string;
  WebkitTransformStyle?: string;
  WebkitTransition?: string;
  WebkitTransitionDelay?: string | number;
  WebkitTransitionDuration?: string | number;
  WebkitTransitionProperty?: string;
  WebkitTransitionTimingFunction?: string;
  WebkitUserSelect?: string;
  WebkitWritingMode?: string;

  // Mozilla Prefixes
  MozAppearance?: string;
  MozBorderImage?: string;
  MozBoxAlign?: string;
  MozBoxDirection?: string;
  MozBoxFlex?: number;
  MozBoxOrdinalGroup?: number;
  MozBoxOrient?: string;
  MozBoxPack?: string;
  MozBoxShadow?: string;
  MozBoxSizing?: string;
  MozColumnCount?: number;
  MozColumnGap?: string | number;
  MozColumnRule?: string;
  MozColumnRuleColor?: string;
  MozColumnRuleStyle?: string;
  MozColumnRuleWidth?: string | number;
  MozColumnWidth?: string | number;
  MozColumns?: string;
  MozContextProperties?: string;
  MozFloatEdge?: string;
  MozForceBrokenImageIcon?: number;
  MozImageRegion?: string;
  MozMarginEnd?: string | number;
  MozMarginStart?: string | number;
  MozOpacity?: number;
  MozOutline?: string;
  MozOutlineColor?: string;
  MozOutlineOffset?: string | number;
  MozOutlineRadius?: string | number;
  MozOutlineRadiusBottomleft?: string | number;
  MozOutlineRadiusBottomright?: string | number;
  MozOutlineRadiusTopleft?: string | number;
  MozOutlineRadiusTopright?: string | number;
  MozOutlineStyle?: string;
  MozOutlineWidth?: string | number;
  MozPaddingEnd?: string | number;
  MozPaddingStart?: string | number;
  MozPerspective?: string | number;
  MozPerspectiveOrigin?: string;
  MozTabSize?: string | number;
  MozTextAlignLast?: string;
  MozTextDecorationColor?: string;
  MozTextDecorationLine?: string;
  MozTextDecorationStyle?: string;
  MozTransform?: string;
  MozTransformOrigin?: string;
  MozTransition?: string;
  MozTransitionDelay?: string | number;
  MozTransitionDuration?: string | number;
  MozTransitionProperty?: string;
  MozTransitionTimingFunction?: string;
  MozUserFocus?: string;
  MozUserInput?: string;
  MozUserModify?: string;
  MozUserSelect?: string;
  MozWindowDragging?: string;
  MozWindowShadow?: string;

  // Microsoft Prefixes
  msAccelerator?: string;
  msBlockProgression?: string;
  msContentZoomChaining?: string;
  msContentZoomLimit?: string;
  msContentZoomLimitMax?: number;
  msContentZoomLimitMin?: number;
  msContentZoomSnap?: string;
  msContentZoomSnapPoints?: string;
  msContentZoomSnapType?: string;
  msContentZooming?: string;
  msFilter?: string;
  msFlex?: string | number;
  msFlexAlign?: string;
  msFlexDirection?: string;
  msFlexItemAlign?: string;
  msFlexLinePack?: string;
  msFlexNegative?: number;
  msFlexOrder?: number;
  msFlexPack?: string;
  msFlexPositive?: number;
  msFlexPreferredSize?: string | number;
  msFlexWrap?: string;
  msFlowFrom?: string;
  msFlowInto?: string;
  msGridColumns?: string;
  msGridRows?: string;
  msHighContrastAdjust?: string;
  msHyphenateLimitChars?: string;
  msHyphenateLimitLines?: number;
  msHyphenateLimitZone?: string | number;
  msHyphens?: string;
  msImeAlign?: string;
  msOverflowStyle?: string;
  msPerspective?: string | number;
  msPerspectiveOrigin?: string;
  msScrollChaining?: string;
  msScrollLimit?: string;
  msScrollLimitXMax?: string | number;
  msScrollLimitXMin?: string | number;
  msScrollLimitYMax?: string | number;
  msScrollLimitYMin?: string | number;
  msScrollRails?: string;
  msScrollSnapPointsX?: string;
  msScrollSnapPointsY?: string;
  msScrollSnapType?: string;
  msScrollSnapX?: string;
  msScrollSnapY?: string;
  msScrollTranslation?: string;
  msTextAutospace?: string;
  msTextCombineHorizontal?: string;
  msTextOverflow?: string;
  msTouchAction?: string;
  msTouchSelect?: string;
  msTransform?: string;
  msTransformOrigin?: string;
  msTransition?: string;
  msTransitionDelay?: string | number;
  msTransitionDuration?: string | number;
  msTransitionProperty?: string;
  msTransitionTimingFunction?: string;
  msUserSelect?: string;
  msWordBreak?: string;
  msWrapFlow?: string;
  msWrapMargin?: string | number;
  msWrapThrough?: string;
};

// Utility types for common CSS patterns
export type CSSLength = string | number;
export type CSSColor = string;
export type CSSAngle = string | number;
export type CSSTime = string | number;
export type CSSFrequency = string | number;
export type CSSPercentage = string | number;
export type CSSNumber = number;

// CSS Custom Properties type
export type CSSCustomProperties = Record<`--${string}`, string | number>;

// Extended CSS Properties with custom properties
export type ExtendedCSSProperties = CSSProperties & CSSCustomProperties;

// CSS-in-JS style object type
export type CSSStyleObject = ExtendedCSSProperties;

// CSS class name type
export type CSSClassName = string;

// CSS selector type
export type CSSSelector = string;

// CSS media query type
export type CSSMediaQuery = string;

// CSS keyframes type
export type CSSKeyframes = Record<string, CSSProperties>;

// CSS animation type
export type CSSAnimation = {
  name: string;
  duration?: string | number;
  timingFunction?: string;
  delay?: string | number;
  iterationCount?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  playState?: 'running' | 'paused';
};

// CSS transition type
export type CSSTransition = {
  property?: string;
  duration?: string | number;
  timingFunction?: string;
  delay?: string | number;
};

// CSS transform type
export type CSSTransform = {
  translate?: string | number;
  translateX?: string | number;
  translateY?: string | number;
  translateZ?: string | number;
  scale?: string | number;
  scaleX?: string | number;
  scaleY?: string | number;
  scaleZ?: string | number;
  rotate?: string | number;
  rotateX?: string | number;
  rotateY?: string | number;
  rotateZ?: string | number;
  skew?: string | number;
  skewX?: string | number;
  skewY?: string | number;
  perspective?: string | number;
  matrix?: string;
  matrix3d?: string;
};

// CSS filter type
export type CSSFilter = {
  blur?: string | number;
  brightness?: string | number;
  contrast?: string | number;
  dropShadow?: string;
  grayscale?: string | number;
  hueRotate?: string | number;
  invert?: string | number;
  opacity?: string | number;
  saturate?: string | number;
  sepia?: string | number;
  url?: string;
};

// CSS backdrop filter type
export type CSSBackdropFilter = CSSFilter;

// CSS box shadow type
export type CSSBoxShadow = {
  offsetX?: string | number;
  offsetY?: string | number;
  blurRadius?: string | number;
  spreadRadius?: string | number;
  color?: string;
  inset?: boolean;
};

// CSS text shadow type
export type CSSTextShadow = {
  offsetX?: string | number;
  offsetY?: string | number;
  blurRadius?: string | number;
  color?: string;
};

// CSS border radius type
export type CSSBorderRadius = {
  topLeft?: string | number;
  topRight?: string | number;
  bottomRight?: string | number;
  bottomLeft?: string | number;
};

// CSS margin type
export type CSSMargin = {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
};

// CSS padding type
export type CSSPadding = {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
};

// CSS border type
export type CSSBorder = {
  width?: string | number;
  style?: string;
  color?: string;
};

// CSS outline type
export type CSSOutline = {
  width?: string | number;
  style?: string;
  color?: string;
  offset?: string | number;
};

// CSS background type
export type CSSBackground = {
  color?: string;
  image?: string;
  repeat?: string;
  attachment?: string;
  position?: string;
  size?: string | number;
  clip?: string;
  origin?: string;
  blendMode?: string;
};

// CSS font type
export type CSSFont = {
  family?: string;
  size?: string | number;
  weight?: string | number;
  style?: string;
  variant?: string;
  stretch?: string;
  lineHeight?: string | number;
};

// CSS flex type
export type CSSFlex = {
  grow?: number;
  shrink?: number;
  basis?: string | number;
};

// CSS grid type
export type CSSGrid = {
  template?: string;
  templateColumns?: string;
  templateRows?: string;
  templateAreas?: string;
  gap?: string | number;
  columnGap?: string | number;
  rowGap?: string | number;
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: string;
};

// CSS animation keyframes type
export type CSSKeyframesRule = Record<string, CSSProperties>;

// CSS media query rule type
export type CSSMediaQueryRule = {
  query: string;
  styles: CSSProperties;
};

// CSS pseudo-class type
export type CSSPseudoClass =
  | ':hover'
  | ':focus'
  | ':active'
  | ':visited'
  | ':link'
  | ':target'
  | ':first-child'
  | ':last-child'
  | ':nth-child'
  | ':nth-last-child'
  | ':first-of-type'
  | ':last-of-type'
  | ':nth-of-type'
  | ':nth-last-of-type'
  | ':only-child'
  | ':only-of-type'
  | ':empty'
  | ':root'
  | ':not'
  | ':is'
  | ':where'
  | ':has'
  | ':enabled'
  | ':disabled'
  | ':checked'
  | ':indeterminate'
  | ':default'
  | ':required'
  | ':optional'
  | ':valid'
  | ':invalid'
  | ':in-range'
  | ':out-of-range'
  | ':placeholder-shown'
  | ':read-only'
  | ':read-write'
  | ':autofill'
  | ':user-invalid'
  | ':blank'
  | ':current'
  | ':past'
  | ':future'
  | ':playing'
  | ':paused'
  | ':seeking'
  | ':buffering'
  | ':stalled'
  | ':muted'
  | ':volume-locked'
  | ':fullscreen'
  | ':picture-in-picture'
  | ':modal'
  | ':inert'
  | ':scope'
  | ':host'
  | ':host-context'
  | ':defined'
  | ':slotted'
  | ':part'
  | ':theme'
  | ':container'
  | ':state'
  | ':popover-open'
  | ':open'
  | ':closed'
  | ':selected'
  | ':highlight'
  | ':marker'
  | ':spelling-error'
  | ':grammar-error'
  | ':user-select'
  | ':user-drag'
  | ':user-modify'
  | ':user-zoom'
  | ':user-valid'
  | ':user-invalid'
  | ':user-required'
  | ':user-optional'
  | ':user-read-only'
  | ':user-read-write'
  | ':user-autofill'
  | ':user-blank'
  | ':user-current'
  | ':user-past'
  | ':user-future'
  | ':user-playing'
  | ':user-paused'
  | ':user-seeking'
  | ':user-buffering'
  | ':user-stalled'
  | ':user-muted'
  | ':user-volume-locked'
  | ':user-fullscreen'
  | ':user-picture-in-picture'
  | ':user-modal'
  | ':user-inert'
  | ':user-scope'
  | ':user-host'
  | ':user-host-context'
  | ':user-defined'
  | ':user-slotted'
  | ':user-part'
  | ':user-theme'
  | ':user-container'
  | ':user-state'
  | ':user-popover-open'
  | ':user-open'
  | ':user-closed'
  | ':user-selected'
  | ':user-highlight'
  | ':user-marker'
  | ':user-spelling-error'
  | ':user-grammar-error';

// CSS pseudo-element type
export type CSSPseudoElement =
  | '::before'
  | '::after'
  | '::first-line'
  | '::first-letter'
  | '::selection'
  | '::backdrop'
  | '::placeholder'
  | '::marker'
  | '::spelling-error'
  | '::grammar-error'
  | '::highlight'
  | '::target-text'
  | '::view-transition'
  | '::view-transition-group'
  | '::view-transition-image-pair'
  | '::view-transition-old'
  | '::view-transition-new'
  | '::part'
  | '::slotted'
  | '::theme'
  | '::container'
  | '::state'
  | '::popover-open'
  | '::open'
  | '::closed'
  | '::selected'
  | '::highlight'
  | '::marker'
  | '::spelling-error'
  | '::grammar-error';

// CSS selector type
export type CSSSelectorType = string | CSSPseudoClass | CSSPseudoElement;

// CSS rule type
export type CSSRule = {
  selector: CSSSelectorType;
  properties: CSSProperties;
};

// CSS stylesheet type
export type CSSStylesheet = {
  rules: CSSRule[];
  mediaQueries?: CSSMediaQueryRule[];
  keyframes?: CSSKeyframesRule[];
  imports?: string[];
  charset?: string;
  namespace?: string;
  supports?: string[];
  page?: string[];
  fontFace?: string[];
  counterStyle?: string[];
  fontFeatureValues?: string[];
  viewport?: string[];
  document?: string[];
  region?: string[];
  property?: string[];
  layer?: string[];
  scope?: string[];
  startingStyle?: string[];
};

// Export all types
export type {
  CSSProperties,
  CSSLength,
  CSSColor,
  CSSAngle,
  CSSTime,
  CSSFrequency,
  CSSPercentage,
  CSSNumber,
  CSSCustomProperties,
  ExtendedCSSProperties,
  CSSStyleObject,
  CSSClassName,
  CSSSelector,
  CSSMediaQuery,
  CSSKeyframes,
  CSSAnimation,
  CSSTransition,
  CSSTransform,
  CSSFilter,
  CSSBackdropFilter,
  CSSBoxShadow,
  CSSTextShadow,
  CSSBorderRadius,
  CSSMargin,
  CSSPadding,
  CSSBorder,
  CSSOutline,
  CSSBackground,
  CSSFont,
  CSSFlex,
  CSSGrid,
  CSSKeyframesRule,
  CSSMediaQueryRule,
  CSSPseudoClass,
  CSSPseudoElement,
  CSSSelectorType,
  CSSRule,
  CSSStylesheet,
};

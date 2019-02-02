import { animate, animation, AnimationMetadata, AnimationReferenceMetadata, style } from '@angular/animations';
import { AnimationParams, EaseOut } from '../animations.model';

const base: AnimationMetadata[] = [
  style({
    opacity: `{{startOpacity}}`,
    transform: `{{fromPosition}}`
  }),
  animate(
    `{{duration}} {{delay}} {{easing}}`,
    style({
      opacity: `{{endOpacity}}`,
      transform: `{{toPosition}}`
    })
  )
];

const baseParams: AnimationParams = {
  delay: '0s',
  duration: '500ms',
  easing: EaseOut.sine,
  endOpacity: 1,
  startOpacity: 0,
  fromPosition: '',
  toPosition: ''
};

export const fadeIn: AnimationReferenceMetadata = animation(base, {
  params: baseParams
});

export const fadeOut: AnimationReferenceMetadata = animation(base, {
  params: {
    delay: '0s',
    duration: '500ms',
    easing: EaseOut.sine,
    endOpacity: 0,
    startOpacity: 1
  }
});

export const fadeInDown: AnimationReferenceMetadata = animation(base, {
  params: {
    ...baseParams,
    startOpacity: 0,
    endOpacity: 1,
    fromPosition: 'translateY(-50px)',
    toPosition: 'translateY(0)'
  }
});

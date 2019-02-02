import { animate, animation, AnimationMetadata, AnimationReferenceMetadata, style } from '@angular/animations';
import { AnimationParams, EaseOut, EaseIn } from '../animations.model';

const base: AnimationMetadata[] = [
  style({
    opacity: `{{ startOpacity }}`,
    height: `{{ startHeight }}`,
  }),
  animate(
    `{{duration}} {{delay}} {{easing}}`,
    style({
      opacity: `{{ endOpacity }}`,
      height: `{{ endHeight }}`
    })
  )
];

const baseParams: AnimationParams = {
  delay: '0s',
  duration: '500ms',
  easing: EaseIn.quad,
  startOpacity: 0,
  endOpacity: 1,
  startHeight: '',
  endHeight: ''
};

export const growVerIn: AnimationReferenceMetadata = animation(base, {
  params: {
    ...baseParams,
    easing: EaseIn.quad,
    startOpacity: 0,
    endOpacity: 1,
    startHeight: '0px',
    endHeight: '*'
  }
});

export const growVerOut: AnimationReferenceMetadata = animation(base, {
  params: {
    ...baseParams,
    easing: EaseOut.quad,
    startOpacity: 1,
    endOpacity: 0,
    startHeight: '*',
    endHeight: '0px'
  }
});
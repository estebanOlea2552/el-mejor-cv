import { trigger, style, transition, animate } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [

  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0)' }))
  ]),

  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
  ])
]);
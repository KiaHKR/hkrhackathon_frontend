import { animate, query, state, style, transition, trigger } from "@angular/animations";

export const tabFadeAnimation =
    trigger('tabsFadeTrigger', [
        state('shown', style({
            opacity: 1,
        })),
        state('hidden', style({
            opacity: 0,
        })),
        transition('hidden <=> shown', [
            animate('0.3s')
        ])
    ])
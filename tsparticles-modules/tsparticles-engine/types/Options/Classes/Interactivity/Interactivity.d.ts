import { Events } from "./Events/Events";
import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { InteractivityDetect } from "../../../Enums/InteractivityDetect";
import { Modes } from "./Modes/Modes";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
    get detect_on(): InteractivityDetect | keyof typeof InteractivityDetect;
    set detect_on(value: InteractivityDetect | keyof typeof InteractivityDetect);
    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;
    events: Events;
    modes: Modes;
    constructor();
    load(data?: RecursivePartial<IInteractivity>): void;
}

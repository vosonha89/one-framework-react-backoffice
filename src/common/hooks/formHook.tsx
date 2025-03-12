import { AnyType } from 'one-frontend-framework';
import { ComponentState } from '../../common/types/componentState';

/**
 * Input form hook
 * @param componentState 
 * @param setcomponentState 
 * @returns 
 */
function InputFormHook<T extends ComponentState>(componentState: T, setcomponentState: React.Dispatch<React.SetStateAction<T>>){
    function handleFormInputChanged(target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | AnyType): void {
        const pageState: T = componentState.copy();
        pageState.handleFormInputChanged(target);
        setcomponentState(pageState);
    }
    return {
        handleFormInputChanged
    }
}

export default InputFormHook;
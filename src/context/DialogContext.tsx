import React, { createContext, useContext, useReducer, Fragment } from "react";
// COMPONENTS
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

interface DialogState {
  children: React.ReactNode;
  isOpen: boolean;
}

interface DialogContextValue {
  state: DialogState;
  dispatch: React.Dispatch<DialogAction>;
}

const initialState: DialogState = {
  children: null,
  isOpen: false,
};

// Define the type for the dialog actions
type DialogAction =
  | { type: "OPEN_DIALOG"; payload: Partial<DialogState> }
  | { type: "CLOSE_DIALOG" };

// Define the reducer function that takes the state and action and returns the new state
const reducer = (state: DialogState, action: DialogAction): DialogState => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { ...state, ...action.payload, isOpen: true };
    case "CLOSE_DIALOG":
      return initialState;
    default:
      return state;
  }
};

// Create the dialog context with the initial state
const DialogContext = createContext<DialogContextValue>({
  state: initialState,
  dispatch: () => {},
});

// Create a custom provider component that wraps the children with the dialog context and the dialog component
const DialogProvider = ({ children } : { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Define the toggleOpen function that toggles the open value
  const toggleOpen = () => {
    state.isOpen
      ? dispatch({ type: "CLOSE_DIALOG" })
      : dispatch({ type: "OPEN_DIALOG", payload: { children } })
  };

  // Return the provider component with the dialog context value and the dialog component
  return (
    <DialogContext.Provider value={{ state, dispatch }}>
      <Fragment>
        {React.Children.only(children)}
        <Dialog open={state.isOpen} onOpenChange={toggleOpen} modal={true} >
          <DialogOverlay>
            <DialogContent className="shad-dialog" >
              {state.children}
            </DialogContent>
          </DialogOverlay>
        </Dialog>
      </Fragment>
    </DialogContext.Provider>
  );
};

export default DialogProvider;

export const useDialog = () => {
  return useContext(DialogContext);
};

export const selectTerminal = ({ terminal }: RootState) => terminal;
export const selectKernelId = ({ terminal }: RootState) => terminal.kernelId;
export const selectTerminalStatus = ({ terminal }: RootState) => terminal.status;

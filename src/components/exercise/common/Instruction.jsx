import { InstructionQuizPart } from '@components/parts/instruction';

export const Instruction = ({ exercise, answer, handleAnswer }) => {
  switch (exercise?.type) {
    case 'quiz':
      return (
        <InstructionQuizPart handleAnswer={handleAnswer} answer={answer} exercise={exercise} />
      );
    default:
      return null;
  }
};

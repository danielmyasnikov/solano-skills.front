import React, { useState } from 'react';
import InstructionSvg from '@assets/Instruction';
import { InstructionQuizPart } from '@components/parts/instruction';
import SectionHeader from '@components/exercise/common/SectionHeader';
import { ExperienceTag } from '@components/exercise/common/ExperienceTag';

export const Instruction = ({ exercise, children, xp, answer, handleAnswer }) => {
  const [isInstructionHidden, setIsInstructionHidden] = useState(false);

  const handleSize = () => {
    setIsInstructionHidden(!isInstructionHidden);
  };

  function RenderInstructionPart() {
    if (!exercise) {
      return null;
    }

    switch (exercise.type) {
      case 'quiz':
        return (
          <InstructionQuizPart handleAnswer={handleAnswer} answer={answer} exercise={exercise} />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <SectionHeader
        icon={<InstructionSvg />}
        title={
          <>
            <span>Инструкции</span>
            <ExperienceTag xp={xp} />
          </>
        }
        onClick={handleSize}
      />
      {RenderInstructionPart()}
      {children}
    </>
  );
};

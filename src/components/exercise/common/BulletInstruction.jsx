import InstructionSvg from '@assets/Instruction';
import SectionHeader from '@components/exercise/common/SectionHeader';
import { BulletPoint } from '@components/exercise/common/BulletPoint';
import { ExperienceTag } from '@components/exercise/common/ExperienceTag';

export const BulletInstruction = ({
  onSetActiveExercise,
  doneExercises,
  activeExercise,
  nestedExercise,
  children,
  xp,
}) => {
  const doneExercisesIds = [...doneExercises];

  return (
    <>
      <SectionHeader
        icon={<InstructionSvg />}
        title={
          <>
            <span>
              Инструкции {activeExercise}/{nestedExercise.length}
            </span>
            <ExperienceTag xp={xp} floatRight />
          </>
        }
      >
        {nestedExercise?.map((item, i) => {
          const isActiveBullet = activeExercise === i + 1;
          const isDoneBullet = doneExercisesIds?.find((id) => id === i + 1) !== undefined;

          return (
            <BulletPoint
              key={i}
              index={i}
              isActive={isActiveBullet}
              isDone={isDoneBullet}
              onClick={() => {
                if (isDoneBullet) {
                  onSetActiveExercise({ activeExercise: i });
                }
              }}
            />
          );
        })}
      </SectionHeader>
      {children}
    </>
  );
};

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
  const doneExercisesIds = doneExercises.map((e) => e.activeExercise);
  const lastId = doneExercises.length - 1;

  return (
    <>
      <SectionHeader
        icon={<InstructionSvg />}
        title={
          <>
            <span>
              Инструкции {activeExercise + 1}/{nestedExercise.length}
            </span>
            <ExperienceTag xp={xp} floatRight />
          </>
        }
      >
        {nestedExercise?.map((item, i) => {
          const isActiveBullet = activeExercise === i;
          const isDoneBullet = doneExercisesIds?.find((id) => id === i) !== undefined;
          const isLastBullet = doneExercisesIds?.find((id) => id === lastId - 1) !== undefined;

          return (
            <BulletPoint
              key={i}
              index={i}
              isActive={isActiveBullet}
              isDone={isDoneBullet}
              onClick={() => {
                if (isDoneBullet || isLastBullet) {
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

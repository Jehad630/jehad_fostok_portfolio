import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import monoFont from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff?url';

const SNIPPETS: { code: string; position: [number, number, number]; color: string }[] = [
  {
    code: `Scaffold(
  body: Column(
    children: [
      HeroHeader(),
      PhoneCluster(),
    ],
  ),
)`,
    position: [-9.5, 4.6, -11],
    color: '#8A90A2',
  },
  {
    code: `BlocBuilder<ProjectsCubit, ProjectsState>(
  builder: (context, state) => switch (state) {
    Loaded(:final items) => ProjectList(items),
    _ => const Loader(),
  },
)`,
    position: [1.5, 5.4, -13],
    color: '#7C83FD',
  },
  {
    code: `final result = await repo.fetchSubscriptions();
result.fold(
  (failure) => emit(Failed(failure)),
  (subs) => emit(Loaded(subs)),
);`,
    position: [-10.5, -2.2, -12],
    color: '#8A90A2',
  },
  {
    code: `await supabase
  .from('expenses')
  .select()
  .eq('user_id', uid)
  .range(from, to);`,
    position: [5.5, -3.6, -10],
    color: '#5EEAD4',
  },
  {
    code: `getIt.registerLazySingleton<AuthRepository>(
  () => AuthRepositoryImpl(getIt()),
);`,
    position: [-3.5, -5.6, -14],
    color: '#7C83FD',
  },
];

interface CodeLayerProps {
  count: number;
  animate: boolean;
}

/** Faint Dart snippets far behind the phones — what's under the UI. */
export function CodeLayer({ count, animate }: CodeLayerProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!animate || !group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.position.y = SNIPPETS[i].position[1] + Math.sin(t * 0.15 + i * 1.7) * 0.35;
    });
  });

  return (
    <group ref={group}>
      {SNIPPETS.slice(0, count).map((s) => (
        <Text
          key={s.code}
          font={monoFont}
          position={s.position}
          fontSize={0.3}
          lineHeight={1.5}
          anchorX="left"
          anchorY="top"
          color={s.color}
          fillOpacity={0.09}
          material-toneMapped={false}
          material-depthWrite={false}
        >
          {s.code}
        </Text>
      ))}
    </group>
  );
}
